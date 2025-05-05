Aquí tenés tu README actualizado en **lenguaje Markdown (md)**, con las modificaciones que mencionaste:

```md
# Sitio Web de Servidor y Modpack de Minecraft

Este proyecto es un sitio web para un servidor personalizado de Minecraft con modpack. Ofrece información sobre el servidor, descargas organizadas de recursos y una futura galería para compartir capturas.

## Características

- Diseño oscuro con estilo Minecraft
- Página de inicio con descripción del servidor
- Sección de descarga de modpack completo y recursos opcionales
- Información del servidor con detalles de temporadas
- Autenticación con Discord mediante Supabase
- Archivos alojados en Google Drive
- Galería planeada (actualmente no funcional y sin prioridad)

## Requisitos

- Node.js 18.x o superior
- NPM o Yarn

## Instalación

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/tuusuario/minecraft-server-website.git
   cd minecraft-server-website
   ```

2. Instalá las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Creá un archivo `.env.local` en la raíz del proyecto con las siguientes variables:
   ```env
   # Google Drive IDs
   NEXT_PUBLIC_DRIVE_MODPACK_COMPLETE_ID=tu-id-modpack
   NEXT_PUBLIC_DRIVE_MODPACK_FOLDER_ID=tu-id-carpeta-principal
   NEXT_PUBLIC_DRIVE_PARTICLES_FOLDER_ID=tu-id-carpeta-particulas
   NEXT_PUBLIC_DRIVE_ANIMATIONS_FOLDER_ID=tu-id-carpeta-animaciones
   NEXT_PUBLIC_DRIVE_SOUNDS_FOLDER_ID=tu-id-carpeta-sonidos
   NEXT_PUBLIC_DRIVE_SHADERS_FOLDER_ID=tu-id-carpeta-shaders
   ```

4. Iniciá el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   yarn dev
   ```

5. Abrí [http://localhost:3000](http://localhost:3000) en tu navegador para ver el sitio.

## Configuración de Google Drive

### 1. Organización de Carpetas

1. Creá una carpeta principal en Google Drive (por ejemplo: "Minecraft Server Modpack")
2. Dentro de esa carpeta, creá las siguientes subcarpetas:
   - `Modpack Completo` (ZIP del modpack)
   - `Mods Requeridos` (mods esenciales)
   - `Mods Opcionales`, que incluye:
     - `Partículas`
     - `Animaciones`
     - `Sonidos`
     - `Shaders`

### 2. Subida de Archivos

- Subí el archivo ZIP del modpack completo a la carpeta correspondiente.
- Subí los mods individuales en sus respectivas subcarpetas.

### 3. Permisos de Compartir

- Asegurate de que cada carpeta tenga permisos públicos de solo lectura (modo "Cualquier persona con el enlace puede ver").

### 4. Obtener IDs

- Obtené los IDs de cada carpeta y archivo desde la URL.
- Usá esos IDs para completar las variables de entorno.

### 5. Formato de enlace de descarga directa

```text
https://drive.google.com/uc?export=download&id=TU_ID
```

## Estado de la Galería

La funcionalidad de galería aún no está implementada. Requiere una base de datos, posiblemente Firebase o alguna alternativa. No es prioridad actualmente.

## Dependencias

- Next.js 14
- React 18
- Tailwind CSS
- shadcn/ui
- Supabase (autenticación con Discord)
- Lucide React (iconos)

## Estructura del Proyecto

- `/app` – Rutas y páginas de la aplicación
- `/components` – Componentes reutilizables
- `/context` – Contextos de React (UserContext)
- `/lib` – Utilidades y configuraciones
- `/public` – Archivos estáticos

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
```
