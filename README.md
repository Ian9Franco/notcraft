# Sitio Web de Servidor y Modpack de Minecraft

Este proyecto es un sitio web para un servidor personalizado de Minecraft con modpack. Ofrece información sobre el servidor, descargas de modpack y galerías para que los usuarios compartan capturas de pantalla.

## Características

- Diseño oscuro con estilo Minecraft
- Página de inicio con descripción del servidor
- Sección de descarga de modpack
- Sección de packs de recursos recomendados
- Información del servidor con detalles de temporadas
- Galería donde los usuarios pueden subir capturas
- Autenticación mediante Firebase
- Almacenamiento de imágenes en Firebase Storage

## Requisitos

- Node.js 18.x o superior
- NPM o Yarn
- Cuenta de Firebase

## Instalación

1. Cloná el repositorio:
\`\`\`bash
git clone https://github.com/tuusuario/minecraft-server-website.git
cd minecraft-server-website
\`\`\`

2. Instala las dependencias:
\`\`\`bash
npm install
# o
yarn install
\`\`\`

3. Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:
\`\`\`
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=tu-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=tu-app-id

# Google Drive IDs
NEXT_PUBLIC_DRIVE_MODPACK_COMPLETE_ID=id-del-modpack-completo
NEXT_PUBLIC_DRIVE_MODPACK_FOLDER_ID=id-de-la-carpeta-principal
NEXT_PUBLIC_DRIVE_PARTICLES_FOLDER_ID=id-de-la-carpeta-particulas
NEXT_PUBLIC_DRIVE_ANIMATIONS_FOLDER_ID=id-de-la-carpeta-animaciones
NEXT_PUBLIC_DRIVE_SOUNDS_FOLDER_ID=id-de-la-carpeta-sonidos
NEXT_PUBLIC_DRIVE_SHADERS_FOLDER_ID=id-de-la-carpeta-shaders
\`\`\`

4. Inicia el servidor de desarrollo:
\`\`\`bash
npm run dev
# o
yarn dev
\`\`\`

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el sitio.

## Guía de Configuración

### 1. Configuración de Firebase

#### 1.1 Crear un Proyecto en Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Agregar proyecto"
3. Ingresa un nombre para tu proyecto (ej. "minecraft-server-website")
4. Sigue los pasos para configurar Google Analytics (opcional)
5. Haz clic en "Crear proyecto"

#### 1.2 Configurar Autenticación
1. En el panel lateral, haz clic en "Authentication"
2. Haz clic en "Comenzar"
3. Selecciona "Google" como proveedor de inicio de sesión
4. Habilita el proveedor de Google y configura el correo electrónico de soporte
5. Guarda los cambios

#### 1.3 Configurar Firestore Database
1. En el panel lateral, haz clic en "Firestore Database"
2. Haz clic en "Crear base de datos"
3. Selecciona "Comenzar en modo de prueba" (cambiaremos las reglas después)
4. Selecciona la ubicación más cercana a tus usuarios
5. Haz clic en "Habilitar"

#### 1.4 Configurar Storage
1. En el panel lateral, haz clic en "Storage"
2. Haz clic en "Comenzar"
3. Acepta la configuración predeterminada
4. Selecciona la ubicación más cercana a tus usuarios
5. Haz clic en "Habilitar"

#### 1.5 Configurar Reglas de Seguridad

##### Reglas para Firestore
\`\`\`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /galleryImages/{image} {
      allow read: if true;
      allow create: if request.auth != null && 
                      request.resource.data.uploadedBy == request.auth.uid &&
                      request.resource.data.description.size() <= 50;
      allow update, delete: if request.auth != null && 
                              resource.data.uploadedBy == request.auth.uid;
    }
  }
}
\`\`\`

##### Reglas para Storage
\`\`\`
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /gallery/{imageId} {
      allow read: if true;
      allow write: if request.auth != null && 
                     request.resource.size < 5 * 1024 * 1024;
    }
  }
}
\`\`\`

#### 1.6 Obtener Credenciales de Firebase
1. En el panel lateral, haz clic en el ícono de engranaje (Configuración del proyecto)
2. Selecciona "Configuración del proyecto"
3. Desplázate hacia abajo hasta "Tus aplicaciones" y haz clic en el ícono de web (</>) para agregar una aplicación web
4. Registra tu aplicación con un apodo (ej. "minecraft-web")
5. Copia las credenciales de Firebase que se muestran (apiKey, authDomain, etc.)
6. Estas credenciales se usarán en el archivo .env.local

### 2. Configuración de Google Drive

#### 2.1 Organizar Carpetas en Google Drive
1. Inicia sesión en [Google Drive](https://drive.google.com/)
2. Crea una carpeta principal llamada "Minecraft Server Modpack"
3. Dentro de esta carpeta, crea las siguientes subcarpetas:
   - "Modpack Completo" (para el archivo ZIP completo)
   - "Mods Requeridos" (para los mods esenciales)
   - "Mods Opcionales" con subcarpetas:
     - "Partículas"
     - "Animaciones"
     - "Sonidos"
     - "Shaders"

#### 2.2 Subir Archivos
1. Sube el archivo ZIP del modpack completo a la carpeta "Modpack Completo"
2. Sube los mods individuales a sus respectivas carpetas

#### 2.3 Configurar Permisos de Compartir
1. Haz clic derecho en la carpeta principal "Minecraft Server Modpack"
2. Selecciona "Compartir"
3. Cambia la configuración a "Cualquier persona con el enlace puede ver"
4. Copia el enlace compartido

#### 2.4 Obtener IDs de Archivos y Carpetas
1. Para cada carpeta y archivo, necesitarás obtener su ID de Google Drive
2. El ID se encuentra en la URL cuando abres el archivo o carpeta
   - Ejemplo: `https://drive.google.com/drive/folders/1AbCdEfGhIjKlMnOpQrStUvWxYz` (el ID es "1AbCdEfGhIjKlMnOpQrStUvWxYz")
3. Anota los IDs de:
   - Carpeta principal
   - Archivo ZIP del modpack completo
   - Cada carpeta de categoría de mods opcionales
   - Mods individuales (si deseas enlaces directos)

#### 2.5 Crear Enlaces de Descarga Directa
1. Para crear un enlace de descarga directa, usa el siguiente formato:
   - `https://drive.google.com/uc?export=download&id=TU_ID_AQUI`
2. Reemplaza "TU_ID_AQUI" con el ID del archivo
3. Para archivos grandes (>100MB), Google Drive puede mostrar una pantalla de confirmación
   - En estos casos, considera usar servicios como `gdrive-copy` o dividir los archivos

### 3. Actualizar Enlaces en el Código

Una vez que tengas todos los IDs, deberás actualizar los enlaces en el código:

1. En `app/modpack/page.tsx`, reemplaza:
   - `MODPACK_ID` con el ID del archivo ZIP del modpack completo
   - `MODPACK_FOLDER_ID` con el ID de la carpeta principal
   - `PARTICLES_FOLDER_ID`, `ANIMATIONS_FOLDER_ID`, etc. con los IDs de las carpetas correspondientes
   - Los IDs de mods individuales en los enlaces de descarga

2. Puedes acceder a estos valores desde las variables de entorno:
   \`\`\`javascript
   const modpackId = process.env.NEXT_PUBLIC_DRIVE_MODPACK_COMPLETE_ID;
   \`\`\`

### 4. Pruebas y Verificación

1. Verifica que todos los enlaces de descarga funcionen correctamente
2. Prueba la autenticación con Firebase
3. Prueba la subida de imágenes a la galería
4. Verifica que las animaciones y efectos visuales funcionen correctamente

### Notas Adicionales

- Considera implementar un sistema de caché para los enlaces de Google Drive
- Para archivos muy grandes, considera usar un servicio de descarga alternativo
- Mantén actualizados los IDs de Google Drive si reemplazas archivos
- Realiza copias de seguridad regulares de tu base de datos Firestore

## Dependencias

- Next.js 14
- React 18
- Tailwind CSS
- shadcn/ui
- Firebase (Auth, Firestore, Storage)
- Lucide React (iconos)

## Estructura del Proyecto

- `/app` - Rutas y páginas de la aplicación
- `/components` - Componentes reutilizables
- `/context` - Contextos de React (UserContext)
- `/lib` - Utilidades y configuraciones
- `/public` - Archivos estáticos

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

