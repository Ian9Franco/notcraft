"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useUser } from "@/context/user-context"
import { collection, addDoc, getDocs, query, orderBy, limit, Timestamp } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "@/lib/firebase"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Loader2, Upload, Camera } from "lucide-react"

interface GalleryImage {
  id: string
  imageUrl: string
  description: string
  uploadedBy: string
  uploadedAt: Timestamp
}

export default function GalleryPage() {
  const { user, signInWithGoogle } = useUser()

  const [images, setImages] = useState<GalleryImage[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Fetch gallery images
  useEffect(() => {
    async function fetchImages() {
      try {
        const q = query(collection(db, "galleryImages"), orderBy("uploadedAt", "desc"), limit(20))
        const querySnapshot = await getDocs(q)

        const fetchedImages: GalleryImage[] = []
        querySnapshot.forEach((doc) => {
          fetchedImages.push({
            id: doc.id,
            ...(doc.data() as Omit<GalleryImage, "id">),
          })
        })

        setImages(fetchedImages)
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

      // Check if user has already uploaded 3 images
      const userImagesQuery = query(
        collection(db, "galleryImages"),
        // where("uploadedBy", "==", user.uid)
      )
      const userImagesSnapshot = await getDocs(userImagesQuery)

      if (userImagesSnapshot.size >= 3) {
        alert("Has alcanzado el límite de 3 imágenes por usuario")
        setIsUploading(false)
        return
      }

      // Upload image to Firebase Storage
      const storageRef = ref(storage, `gallery/${Date.now()}_${selectedFile.name}`)
      await uploadBytes(storageRef, selectedFile)
      const downloadURL = await getDownloadURL(storageRef)

      // Add document to Firestore
      const docRef = await addDoc(collection(db, "galleryImages"), {
        imageUrl: downloadURL,
        description: description,
        uploadedBy: user.uid,
        uploadedAt: Timestamp.now(),
      })

      // Add new image to state
      setImages([
        {
          id: docRef.id,
          imageUrl: downloadURL,
          description: description,
          uploadedBy: user.uid,
          uploadedAt: Timestamp.now(),
        },
        ...images,
      ])

      // Reset form
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
      <SectionHeader
        title="Galería"
        subtitle="Comparte y descubre impresionantes capturas de nuestro servidor de Minecraft."
      />

      {/* Upload Section */}
      <section className="bg-secondary/50 border border-border rounded-lg p-6 max-w-3xl mx-auto fade-in-section hover-effect">
        <h3 className="font-minecraft text-xl text-accent mb-4">Subir Imagen</h3>

        {!user ? (
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Inicia sesión para subir tus capturas de pantalla</p>
            <Button onClick={signInWithGoogle} className="minecraft-style button-glow">
              <span>Iniciar Sesión con Google</span>
            </Button>
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
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center"
                      disabled={isUploading}
                    >
                      <Camera className="mr-2 h-4 w-4" />
                      <span>{selectedFile ? "Cambiar imagen" : "Seleccionar imagen"}</span>
                    </Button>
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

                <Button
                  type="submit"
                  className="w-full minecraft-style button-glow"
                  disabled={!selectedFile || isUploading}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Subiendo...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      <span>Subir Imagen</span>
                    </>
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-center border border-border rounded-md bg-background/50 p-2 h-[200px]">
                {previewUrl ? (
                  <div className="relative w-full h-full">
                    <Image src={previewUrl || "/placeholder.svg"} alt="Preview" fill className="object-contain" />
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Vista previa de la imagen</p>
                )}
              </div>
            </div>
          </form>
        )}
      </section>

      {/* Gallery Grid */}
      <section className="fade-in-section">
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
              <Card
                key={image.id}
                className="polaroid overflow-hidden bg-white border-0 hover-effect"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <figure>
                  <div className="relative h-48 md:h-56">
                    <Image
                      src={image.imageUrl || "/placeholder.svg"}
                      alt={image.description}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <figcaption>{image.description || "Sin descripción"}</figcaption>
                </figure>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

