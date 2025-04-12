import { NextResponse } from "next/server"
import JSZip from "jszip"
import { listObjects, getObjectStream, checkObjectExists } from "@/logic/storage/r2"
import type { Readable } from "stream"

// Helper para convertir un stream a buffer
async function streamToBuffer(stream: Readable): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = []
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)))
    stream.on("error", (err) => reject(err))
    stream.on("end", () => resolve(Buffer.concat(chunks)))
  })
}

export async function GET() {
  try {
    // Verificar si el archivo específico existe
    const specificModPath = "mods/create-1.20.1-6.0.4.jar"
    const specificModExists = await checkObjectExists(specificModPath)

    if (!specificModExists) {
      console.warn(`El archivo específico ${specificModPath} no se encontró en el bucket.`)
      // Continuamos con la generación del ZIP, pero registramos la advertencia
    }

    // Crear un nuevo archivo ZIP
    const zip = new JSZip()

    // Listar todos los objetos en el bucket
    const objects = await listObjects()

    if (!objects.Contents || objects.Contents.length === 0) {
      return NextResponse.json({ error: "No se encontraron archivos en el bucket" }, { status: 404 })
    }

    // Variable para rastrear si encontramos algún archivo
    let filesAdded = 0

    // Añadir cada archivo al ZIP
    for (const object of objects.Contents) {
      if (!object.Key) continue

      try {
        // Obtener el stream del objeto
        const stream = await getObjectStream(object.Key)

        // Convertir el stream a buffer
        const buffer = await streamToBuffer(stream)

        // Añadir el archivo al ZIP (manteniendo la estructura de carpetas)
        zip.file(object.Key, buffer)
        filesAdded++

        // Registrar si encontramos el archivo específico
        if (object.Key === specificModPath) {
          console.log(`Archivo específico ${specificModPath} encontrado y añadido al ZIP.`)
        }
      } catch (error) {
        console.error(`Error al procesar el archivo ${object.Key}:`, error)
        // Continuamos con el siguiente archivo
      }
    }

    if (filesAdded === 0) {
      return NextResponse.json({ error: "No se pudieron añadir archivos al ZIP" }, { status: 500 })
    }

    // Generar el archivo ZIP
    const zipBuffer = await zip.generateAsync({
      type: "nodebuffer",
      compression: "DEFLATE",
      compressionOptions: {
        level: 6, // nivel de compresión (1-9)
      },
    })

    // Configurar los headers para la descarga
    const headers = new Headers()
    headers.set("Content-Type", "application/zip")
    headers.set("Content-Disposition", `attachment; filename="netherious-modpack.zip"`)
    headers.set("Content-Length", zipBuffer.length.toString())

    // Devolver el archivo ZIP como respuesta
    return new NextResponse(zipBuffer, {
      headers,
    })
  } catch (error) {
    console.error("Error al generar el archivo ZIP:", error)
    return NextResponse.json({ error: "Error al generar el archivo ZIP" }, { status: 500 })
  }
}
