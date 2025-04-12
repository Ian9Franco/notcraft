import { NextResponse } from "next/server"
import JSZip from "jszip"
import { listObjects, getObjectStream } from "@/logic/storage/r2"
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
    // Crear un nuevo archivo ZIP
    const zip = new JSZip()

    // Listar todos los objetos en el bucket
    const objects = await listObjects()

    if (!objects.Contents || objects.Contents.length === 0) {
      return NextResponse.json({ error: "No se encontraron archivos en el bucket" }, { status: 404 })
    }

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
      } catch (error) {
        console.error(`Error al procesar el archivo ${object.Key}:`, error)
        // Continuamos con el siguiente archivo
      }
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
