import { NextResponse } from "next/server"
import { getObjectStream, checkObjectExists } from "@/logic/storage/r2"
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

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const modPath = url.searchParams.get("path") || "mods/create-1.20.1-6.0.4.jar"

    // Verificar si el archivo existe
    const modExists = await checkObjectExists(modPath)

    if (!modExists) {
      return NextResponse.json({ error: `El mod ${modPath} no se encontró en el bucket` }, { status: 404 })
    }

    // Obtener el stream del objeto
    const stream = await getObjectStream(modPath)

    // Convertir el stream a buffer
    const buffer = await streamToBuffer(stream)

    // Extraer el nombre del archivo de la ruta
    const fileName = modPath.split("/").pop() || "mod.jar"

    // Configurar los headers para la descarga
    const headers = new Headers()
    headers.set("Content-Type", "application/java-archive")
    headers.set("Content-Disposition", `attachment; filename="${fileName}"`)
    headers.set("Content-Length", buffer.length.toString())

    // Devolver el archivo como respuesta
    return new NextResponse(buffer, {
      headers,
    })
  } catch (error) {
    console.error("Error al descargar el mod:", error)
    return NextResponse.json({ error: "Error al descargar el mod" }, { status: 500 })
  }
}
