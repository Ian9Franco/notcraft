import { NextResponse } from "next/server"
import { getObject, checkObjectExists } from "@/logic/storage/r2"

async function streamToBuffer(stream: ReadableStream<Uint8Array>): Promise<Buffer> {
    const reader = stream.getReader()
    const chunks: Uint8Array[] = []
  
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      if (value) chunks.push(value)
    }
  
    return Buffer.concat(chunks)
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

    // Obtener el objeto
    const response = await getObject(modPath)

    if (!response.Body) {
      return NextResponse.json({ error: "No se pudo obtener el contenido del mod" }, { status: 500 })
    }

    // Extraer el nombre del archivo de la ruta
    const fileName = modPath.split("/").pop() || "mod.jar"

    // Configurar los headers para la descarga
    const headers = new Headers()
    headers.set("Content-Type", "application/java-archive")
    headers.set("Content-Disposition", `attachment; filename="${fileName}"`)

    if (response.ContentLength) {
      headers.set("Content-Length", response.ContentLength.toString())
    }

    // Convertir el cuerpo a un ArrayBuffer
    const buffer = await streamToBuffer(response.Body)

    // Devolver el archivo como respuesta
    return new NextResponse(buffer, {
      headers,
    })
  } catch (error) {
    console.error("Error al descargar el mod:", error)
    return NextResponse.json({ error: "Error al descargar el mod" }, { status: 500 })
  }
}
