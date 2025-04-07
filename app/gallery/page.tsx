"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Loader2, Upload, Camera, X, LogIn } from "lucide-react"
import { useUser } from "@/context/user-context"
import { supabase } from "@/lib/supabase"
import { ScrollReveal } from "@/components/animations"
import { GameButton } from "@/components/ui/button"
import { GameCard, SectionHeader } from "@/components/ui/card"
import { Input, Textarea } from "@/components/ui/form-elements"

/**
 * Interfaz para imágenes de la galería
 */
interface GalleryImage {
  id: string
  image_url: string
  description: string
  uploaded_by: string
  uploaded_at: string
}

/**
 * Página de galería
 * Permite a los usuarios ver y subir imágenes
 */
export default function GalleryPage() {
  const { user, signInWithGoogle } = useUser()

  const [images, setImages] = useState<GalleryImage[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  // Fetch gallery images
  useEffect(() => {
    async function fetchImages() {
      try {
        const { data, error } = await supabase
          .from("gallery_images")
          .select("*")
          .order("uploaded_at", { ascending: false })
          .limit(20)

        if (error) throw error

        setImages(data || [])
      } catch (error) {
        console.error("Error fetching images:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [])

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Clear selected file
  const clearSelectedFile = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
  }

  // Handle upload
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      alert("Por favor inicia sesión para subir imágenes")
      return
    }

    if (!selectedFile) {
      alert("Por favor selecciona una imagen")
      return
    }

    if (description.length > 50) {
      alert("La descripción no puede superar los 50 caracteres")
      return
    }

    try {
      setIsUploading(true)

      // Verificar límite de imágenes por usuario
      const { count, error: countError } = await supabase
        .from("gallery_images")
        .select("*", { count: "exact", head: true })
        .eq("uploaded_by", user.uid)

      if (countError) throw countError

      if (count && count >= 3) {
        alert("Has alcanzado el límite de 3 imágenes por usuario")
        setIsUploading(false)
        return
      }

      // Generar un nombre de archivo único
      const fileExt = selectedFile.name.split(".").pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      const filePath = `${user.uid}/${fileName}`

      // Subir imagen a Supabase Storage
      const { error: uploadError } = await supabase.storage.from("gallery").upload(filePath, selectedFile)

      if (uploadError) throw uploadError

      // Obtener URL pública
      const { data } = supabase.storage.from("gallery").getPublicUrl(filePath)
      const imageUrl = data.publicUrl

      // Guardar metadata en la base de datos
      const { data: newImage, error: dbError } = await supabase
        .from("gallery_images")
        .insert([
          {
            image_url: imageUrl,
            description: description,
            uploaded_by: user.uid,
          },
        ])
        .select()
        .single()

      if (dbError) throw dbError

      // Actualizar estado local
      setImages([newImage, ...images])

      // Resetear formulario
      setSelectedFile(null)
      setPreviewUrl(null)
      setDescription("")

      alert("Imagen subida correctamente")
    } catch (error) {
      console.error("Error uploading image:", error)
      alert("Error al subir la imagen")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-12 py-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <SectionHeader
          title="Galería"
          subtitle="Comparte y descubre impresionantes capturas de nuestro servidor de Minecraft."
        />
      </motion.div>

      {/* Upload Section */}
      <ScrollReveal>
        <GameCard className="max-w-3xl mx-auto" borderGlow>
          <h3 className="font-minecraft text-xl text-accent mb-4">Subir Imagen</h3>

          {!user ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-4">Inicia sesión para subir tus capturas de pantalla</p>
              <GameButton onClick={signInWithGoogle} variant="accent" icon={<LogIn className="h-5 w-5" />}>
                Iniciar Sesión con Google
              </GameButton>
            </div>
          ) : (
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Imagen (PNG, JPG)</label>
                    <div className="relative">
                      <Input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={handleFileChange}
                        disabled={isUploading}
                        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                      />
                      <GameButton
                        variant="outline"
                        fullWidth
                        disabled={isUploading}
                        icon={<Camera className="h-5 w-5" />}
                      >
                        {selectedFile ? "Cambiar imagen" : "Seleccionar imagen"}
                      </GameButton>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Descripción <span className="text-xs text-muted-foreground">(máx. 50 caracteres)</span>
                    </label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      maxLength={50}
                      placeholder="Describe tu imagen"
                      disabled={isUploading}
                      className="resize-none"
                    />
                    <div className="text-right text-xs text-muted-foreground mt-1">{description.length}/50</div>
                  </div>

                  <button type="submit" className="w-full">
                    <GameButton
                      variant="accent"
                      fullWidth
                      disabled={!selectedFile || isUploading}
                      icon={isUploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
                    >
                      {isUploading ? "Subiendo..." : "Subir Imagen"}
                    </GameButton>
                  </button>
                </div>

                <div className="flex items-center justify-center border border-border rounded-md bg-background/50 p-2 h-[200px] relative">
                  {previewUrl ? (
                    <>
                      <div className="relative w-full h-full">
                        <Image src={previewUrl || "/placeholder.svg"} alt="Preview" fill className="object-contain" />
                      </div>
                      <button
                        type="button"
                        onClick={clearSelectedFile}
                        className="absolute top-2 right-2 bg-background/80 p-1 rounded-full hover:bg-background"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">Vista previa de la imagen</p>
                  )}
                </div>
              </div>
            </form>
          )}
        </GameCard>
      </ScrollReveal>

      {/* Gallery Grid */}
      <ScrollReveal direction="up">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay imágenes en la galería. ¡Sé el primero en subir una!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => setSelectedImage(image)}
              >
                <GameCard className="overflow-hidden cursor-pointer h-full">
                  <div className="relative h-48 md:h-56 mb-2">
                    <Image
                      src={image.image_url || "/placeholder.svg"}
                      alt={image.description}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <p className="text-center font-minecraft text-sm">{image.description || "Sin descripción"}</p>
                </GameCard>
              </motion.div>
            ))}
          </div>
        )}
      </ScrollReveal>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] w-full bg-background rounded-lg overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 bg-background/80 p-2 rounded-full"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative h-[70vh]">
                <Image
                  src={selectedImage.image_url || "/placeholder.svg"}
                  alt={selectedImage.description}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="p-4 bg-background">
                <p className="font-minecraft text-lg text-accent">{selectedImage.description || "Sin descripción"}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

