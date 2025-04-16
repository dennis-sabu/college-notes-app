"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Mock user type to simulate Firebase User
interface User {
  uid: string
  email: string | null
  displayName: string | null
}

type UserRole = "student" | "teacher" | null

interface AuthContextType {
  user: User | null
  userRole: UserRole
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [loading, setLoading] = useState(true)

  // Check for saved user in localStorage on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    const savedRole = localStorage.getItem("userRole")

    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setUserRole(savedRole as UserRole)
    }

    setLoading(false)
  }, [])

  // Mock login function
  const login = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create mock user
    const mockUser: User = {
      uid: `user-${Date.now()}`,
      email,
      displayName: email.split("@")[0],
    }

    // Save to state and localStorage
    setUser(mockUser)
    setUserRole("teacher") // Default to teacher for demo
    localStorage.setItem("user", JSON.stringify(mockUser))
    localStorage.setItem("userRole", "teacher")
  }

  // Mock signup function
  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create mock user
    const mockUser: User = {
      uid: `user-${Date.now()}`,
      email,
      displayName: name,
    }

    // Save to state and localStorage
    setUser(mockUser)
    setUserRole(role)
    localStorage.setItem("user", JSON.stringify(mockUser))
    localStorage.setItem("userRole", role as string)
  }

  // Mock logout function
  const logout = async () => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Clear state and localStorage
    setUser(null)
    setUserRole(null)
    localStorage.removeItem("user")
    localStorage.removeItem("userRole")
  }

  return (
    <AuthContext.Provider value={{ user, userRole, loading, login, signup, logout }}>{children}</AuthContext.Provider>
  )
}
