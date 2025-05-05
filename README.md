# Sitio Web de Servidor y Modpack de Minecraft

Este proyecto fue desarrollado como una web personal para un servidor privado de Minecraft, pensado para ser utilizado exclusivamente por un grupo de amigos.  
También lo realicé como parte de mi portfolio para demostrar conocimientos en desarrollo fullstack con tecnologías modernas.

## 🎯 Objetivo del Proyecto

Crear una experiencia web que combine:

- Descarga organizada de modpacks y recursos personalizados (sonidos, partículas, shaders, etc.)
- Presentación de temporadas del servidor
- Autenticación por Discord
- Integración con Google Drive para almacenamiento
- Diseño responsive con estética inspirada en Minecraft
- Fundamentos de accesibilidad y usabilidad

## 🔐 Accesibilidad

La web no está pensada para el público general. Todo el contenido está dirigido a un entorno cerrado, sin funcionalidad pública.

## 🧩 Tecnologías Utilizadas

- **Next.js 14** – Framework de React con App Router
- **React 18** – Librería para la UI
- **Tailwind CSS** – Estilos por utilidades
- **shadcn/ui** – Componentes accesibles y adaptables
- **Supabase** – Autenticación con OAuth de Discord
- **Lucide React** – Iconografía moderna
- **Google Drive API** – Para descargar archivos directamente desde Drive

## ⚙️ Lógica Implementada

- Creación de sistema de descargas con enlaces directos a Drive (usando `uc?export=download&id=...`)
- Gestión de IDs y visibilidad de carpetas en Drive
- Manejo de modpacks requeridos y opcionales, organizados por tipo
- Condición de descarga habilitada o deshabilitada según disponibilidad de recursos
- Uso de contexto global (`UserContext`) para manejar autenticación
- Separación clara entre rutas, componentes, estilos y lógica
- Uso de `backdrop-filter` y transparencia en modo oscuro y claro con Tailwind y CSS custom

## 📁 Organización de Recursos

En Google Drive, estructuré los archivos en carpetas específicas para:

- Modpack completo
- Mods requeridos
- Mods opcionales divididos en:
  - Partículas
  - Sonidos
  - Shaders
  - Animaciones

Todos los archivos fueron subidos con permisos de solo lectura y los IDs fueron extraídos para integrarlos como variables de entorno en la app.

## 🖼️ Galería (en desarrollo)

La idea es incluir una galería donde los usuarios autenticados puedan subir y ver capturas de pantalla del servidor.  
Por el momento, no está implementada y no es una prioridad.

## 🗂️ Estructura del Código

- `/app`: rutas y layout del sitio (Next.js App Router)
- `/components`: todos los componentes reutilizables
- `/context`: manejo de contexto de usuario
- `/lib`: funciones utilitarias y helpers
- `/public`: archivos estáticos, favicon, imágenes

---

Este proyecto me permitió aplicar y practicar múltiples áreas del desarrollo web moderno, integrando frontend, backend como servicio (BaaS), diseño UI/UX y gestión de archivos externos.  
Fue pensado con una mentalidad de "web-app": ligera, usable, responsive y organizada.


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

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
```
