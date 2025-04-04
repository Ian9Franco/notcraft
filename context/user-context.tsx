"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  type User as FirebaseUser,
} from "firebase/auth"
import { auth } from "@/lib/firebase"

/**
 * Tipo de usuario simplificado con propiedades esenciales
 */
type User = {
  uid: string
  displayName: string | null
  email: string | null
  photoURL: string | null
} | null

/**
 * Tipo del contexto de usuario con métodos de autenticación
 */
interface UserContextType {
  user: User
  loading: boolean
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
}

// Contexto con valor inicial undefined
const UserContext = createContext<UserContextType | undefined>(undefined)

/**
 * Proveedor de contexto de usuario que gestiona la autenticación
 * @param children - Componentes hijos que tendrán acceso al contexto
 */
export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [loading, setLoading] = useState(true)

  // Efecto para observar cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Extraer solo las propiedades necesarias del usuario de Firebase
        setUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    // Limpiar el observador al desmontar
    return () => unsubscribe()
  }, [])

  /**
   * Inicia sesión con Google
   */
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error("Error signing in with Google:", error)
    }
  }

  /**
   * Cierra la sesión del usuario actual
   */
  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  // Valor del contexto con usuario y métodos de autenticación
  const value = { user, loading, signInWithGoogle, logout }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

/**
 * Hook personalizado para acceder al contexto de usuario
 * @throws Error si se usa fuera de un UserProvider
 */
export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

