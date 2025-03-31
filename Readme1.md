# Netherious - Minecraft Server Website

Este repositorio contiene el código fuente para el sitio web del servidor de Minecraft Netherious.

## Estructura de Imágenes

A continuación se detallan las ubicaciones de las imágenes utilizadas en cada sección del sitio web. Puedes buscar estas ubicaciones con Ctrl+F para encontrarlas fácilmente en el código.

### Imágenes Generales

- **Logo del Servidor**: Utilizado en el componente `AnimatedLogo` y como fallback en varios lugares.
  - Ubicación: `/components/animated-logo.tsx`
  - Búsqueda: `AnimatedLogo`

- **Fondo del Sitio**: Imagen de fondo utilizada en todo el sitio.
  - Ubicación: `/app/globals.css`
  - Búsqueda: `background-image: url("/images/dirt-background.png")`
  - Modo claro: `background-image: url("/images/light-dirt-background.png")`

### Página de Inicio

- **Imagen de Fondo del Hero**: Imagen principal en la sección de bienvenida.
  - Ubicación: `/app/page.tsx`
  - Búsqueda: `bgImage="/placeholder.svg?height=800&width=1600"`

- **Imágenes de Mods Destacados**: Imágenes para cada mod destacado.
  - Ubicación: `/app/page.tsx`
  - Búsqueda: `imageSrc="/placeholder.svg?height=300&width=400"`

- **Imagen de Promo del Servidor**: Imagen lateral en la sección de promoción.
  - Ubicación: `/app/page.tsx`
  - Búsqueda: `src="/placeholder.svg?height=400&width=600"`

### Página de Modpack

- **Imágenes de Mods**: No hay imágenes específicas, pero se pueden añadir en:
  - Ubicación: `/app/modpack/page.tsx`
  - Búsqueda: `id={FEATURED_MODS_ID}`

### Página de Resource Packs

- **Imágenes de Resource Packs**: Imágenes para cada resource pack.
  - Ubicación: `/app/resource-packs/page.tsx`
  - Búsqueda: `imageSrc="/placeholder.svg?height=200&width=400"`

### Página de Server Info

- **Imágenes de Temporadas**: Imágenes para cada temporada del servidor.
  - Ubicación: `/app/server-info/page.tsx`
  - Búsqueda: `seasons.map((season)`

### Página de Galería

- **Imágenes de la Galería**: Imágenes subidas por los usuarios.
  - Ubicación: `/app/gallery/page.tsx`
  - Búsqueda: `images.map((image, index)`

### Componentes

- **Partículas y Efectos**: Imágenes y texturas para efectos visuales.
  - Ubicación: `/components/animated-cube.tsx`
  - Búsqueda: `particleTexture = new THREE.TextureLoader().load`

- **Avatar de Usuario**: Imagen de perfil del usuario.
  - Ubicación: `/components/header.tsx`
  - Búsqueda: `user.photoURL || "/placeholder.svg?height=32&width=32"`

## Personalización de Imágenes

Para reemplazar las imágenes:

1. Coloca tus imágenes en la carpeta `/public/images/`
2. Actualiza las rutas en los archivos correspondientes
3. Asegúrate de mantener las proporciones adecuadas para cada tipo de imagen

## Temporadas y Mods

Para actualizar los mods destacados por temporada:

1. Localiza la sección con ID `FEATURED_MODS_ID` en `/app/modpack/page.tsx`
2. Actualiza el array `featuredMods` con los nuevos mods
3. Puedes cambiar el ID para cada temporada (ej: `featured-mods-season-2`)

Para actualizar las versiones del modpack:

1. Localiza la sección con ID `MODPACK_VERSIONS_ID` en `/app/modpack/page.tsx`
2. Actualiza el array `modpackVersions` con las nuevas versiones disponibles

