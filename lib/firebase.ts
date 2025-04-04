/**
 * Configuración y exportación de servicios Firebase
 * Este archivo centraliza la inicialización de Firebase y exporta los servicios necesarios
 */
import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Inicializar Firebase solo una vez (patrón singleton)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

// Servicios de Firebase
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
const googleAuthProvider = new GoogleAuthProvider()

// Exportar servicios y proveedor de autenticación
export { auth, db, storage, googleAuthProvider }

// Verificar si las variables de entorno están configuradas
if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
  console.warn(
    "Firebase environment variables are not set. Using mock implementations. Set up your environment variables for full functionality.",
  )
}

