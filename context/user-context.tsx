"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { supabase } from "@/lib/supabase"
import type { Session } from "@supabase/supabase-js"

// Define user type
export interface UserData {
  id: string
  email?: string
  displayName?: string
  photoURL?: string
  provider?: string
}

// Define context type
interface UserContextType {
  user: UserData | null
  session: Session | null
  isLoading: boolean
  signInWithDiscord: () => Promise<void>
  logout: () => Promise<void>
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>
}

// Create context with default values
const UserContext = createContext<UserContextType | undefined>(undefined)

// Provider component
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true)

      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session)

      if (session) {
        const userData: UserData = {
          id: session.user.id,
          email: session.user.email || undefined,
          displayName: session.user.user_metadata.full_name || session.user.user_metadata.name,
          photoURL: session.user.user_metadata.avatar_url,
          provider: "discord",
        }
        setUser(userData)
      } else {
        setUser(null)
      }

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)

        if (session) {
          const userData: UserData = {
            id: session.user.id,
            email: session.user.email || undefined,
            displayName: session.user.user_metadata.full_name || session.user.user_metadata.name,
            photoURL: session.user.user_metadata.avatar_url,
            provider: "discord",
          }
          setUser(userData)
        } else {
          setUser(null)
        }
        setIsLoading(false)
      })

      setIsLoading(false)

      return () => {
        subscription.unsubscribe()
      }
    }

    initAuth()
  }, [])

  const signInWithDiscord = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "discord",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (error) {
      console.error("Error signing in with Discord:", error)
    }
  }

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
      setSession(null)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <UserContext.Provider value={{ user, session, isLoading, signInWithDiscord, logout, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

// Custom hook to use the context
export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error("useUser must be used within a UserProvider")
  return context
}
