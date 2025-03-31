import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// Importación de getStorage comentada para evitar problemas en tiempo de compilación
// import { getStorage } from "firebase/storage"

// Configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Inicializar Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Exportar servicios de Firebase
export const auth = getAuth(app)
export const db = getFirestore(app)

// Exportar storage solo si estamos en el cliente
let storage: any = null;
if (typeof window !== 'undefined') {
  const initStorage = async () => {
    const { getStorage } = await import('firebase/storage');
    storage = getStorage(app);
  };
  initStorage();
}
export { storage };