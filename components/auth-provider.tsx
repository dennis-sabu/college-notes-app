'use client'

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { getBrowserClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"

type UserRole = "student" | "teacher" | null

interface AuthContextType {
  user: User | null
  userRole: UserRole
  userDetails: { full_name: string | null } | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  userDetails: null,
  loading: true,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [userDetails, setUserDetails] = useState<{ full_name: string | null } | null>(null)
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()
  const supabase = getBrowserClient()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      setUser(session?.user || null)

      if (session?.user) {
        const { data, error } = await supabase
          .from("users")
          .select("role, full_name")
          .eq("id", session.user.id)
          .single()

        if (data) {
          setUserRole(data.role as UserRole)
          setUserDetails({ full_name: data.full_name })
        }
      } else {
        setUserRole(null)
        setUserDetails(null)
      }

      setLoading(false)
    })

    const initializeAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session) {
        setSession(session)
        setUser(session.user)

        const { data } = await supabase
          .from("users")
          .select("role, full_name")
          .eq("id", session.user.id)
          .single()

        if (data) {
          setUserRole(data.role as UserRole)
          setUserDetails({ full_name: data.full_name })
        }
      }

      setLoading(false)
    }

    initializeAuth()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    return { error }
  }

  const signUp = async (email: string, password: string, name: string, role: UserRole) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          role: role,
        },
      },
    })

    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userRole,
        userDetails,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
