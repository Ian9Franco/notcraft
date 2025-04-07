"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { supabase } from "@/lib/supabase"
import type { User as SupabaseUser } from "@supabase/supabase-js"

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

  // Convertir usuario de Supabase al formato esperado por la aplicación
  const formatUser = (supabaseUser: SupabaseUser | null): User => {
    if (!supabaseUser) return null

    // Acceder de forma segura a las propiedades de user_metadata
    const metadata = supabaseUser.user_metadata || {}

    return {
      uid: supabaseUser.id,
      displayName: metadata.full_name || metadata.name || null,
      email: supabaseUser.email || null, // Asegurarse de que email sea string | null
      photoURL: metadata.avatar_url || null, // Asegurarse de que photoURL sea string | null
    }
  }

  useEffect(() => {
    // Establecer sesión inicial
    const initSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(formatUser(session?.user || null))
      setLoading(false)
    }

    initSession()

    // Suscribirse a cambios de autenticación
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(formatUser(session?.user || null))
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  /**
   * Inicia sesión con Google
   */
  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
        },
      })
      if (error) throw error
    } catch (error) {
      console.error("Error signing in with Google:", error)
    }
  }

  /**
   * Cierra la sesión del usuario actual
   */
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
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

