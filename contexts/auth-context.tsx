"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from "react"

interface AuthContextType {
  token: string | null
  isLoggedIn: boolean
  login: (token: string) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const storedToken = window.localStorage.getItem("authToken")
      const storedLoginStatus = window.localStorage.getItem("isLoggedIn") === "true"
      
      if (storedToken) {
        setToken(storedToken)
      }
      setIsLoggedIn(storedLoginStatus)
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = (newToken: string) => {
    try {
      setToken(newToken)
      setIsLoggedIn(true)
      window.localStorage.setItem("authToken", newToken)
      window.localStorage.setItem("isLoggedIn", "true")
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  }

  const logout = () => {
    try {
      setToken(null)
      setIsLoggedIn(false)
      window.localStorage.removeItem("authToken")
      window.localStorage.setItem("isLoggedIn", "false")
    } catch (error) {
      console.error("Error removing from localStorage:", error)
    }
  }

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 