/**
 * Implementaciones simuladas de servicios Firebase
 * Se utilizan cuando Firebase no está configurado correctamente
 */
import type { User } from "firebase/auth"

/**
 * Autenticación simulada
 */
const mockAuth = {
  currentUser: null,
  onAuthStateChanged: (callback: (user: User | null) => void) => {
    callback(null)
    return () => {}
  },
  signInWithPopup: async () => ({ user: null }),
  signOut: async () => {},
}

/**
 * Firestore simulado con métodos comunes
 */
const mockFirestore = {
  collection: () => ({
    add: async () => ({ id: "mock-id" }),
    doc: () => ({
      get: async () => ({
        exists: false,
        data: () => ({}),
      }),
      set: async () => {},
      update: async () => {},
      delete: async () => {},
    }),
    where: () => mockFirestore.collection(),
    orderBy: () => mockFirestore.collection(),
    limit: () => mockFirestore.collection(),
    get: async () => ({
      docs: [],
      forEach: () => {},
    }),
  }),
  doc: () => ({
    get: async () => ({
      exists: false,
      data: () => ({}),
    }),
    set: async () => {},
    update: async () => {},
    delete: async () => {},
  }),
}

/**
 * Storage simulado
 */
const mockStorage = {
  ref: () => ({
    put: async () => ({
      ref: {
        getDownloadURL: async () => "https://placeholder.com/image.jpg",
      },
    }),
    getDownloadURL: async () => "https://placeholder.com/image.jpg",
    uploadBytes: async () => ({}),
  }),
}

/**
 * Proveedor de autenticación de Google simulado
 */
const mockGoogleAuthProvider = {}

// Exportar servicios simulados
export const auth = mockAuth
export const db = mockFirestore
export const storage = mockStorage
export const googleAuthProvider = mockGoogleAuthProvider

