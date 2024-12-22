"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { userApi } from "@/utils/api"
import { User, AuthContextType } from "@/types"
import { ReactNode } from "react"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const storedToken = window.localStorage.getItem("authToken")
      const storedUserId = window.localStorage.getItem("userId")
      const storedLoginStatus = window.localStorage.getItem("isLoggedIn") === "true"
      
      if (storedToken) {
        setToken(storedToken)
      }
      if (storedUserId) {
        setUserId(storedUserId)
      }
      setIsLoggedIn(storedLoginStatus)
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = (newToken: string,newUserId: string) => {
    try {
      setToken(newToken)
      setUserId(newUserId)
      setIsLoggedIn(true)
      window.localStorage.setItem("authToken", newToken)
      window.localStorage.setItem("userId", newUserId)
      window.localStorage.setItem("isLoggedIn", "true")
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  }

  const logout = () => {
    try {
      setToken(null)
      setUserId(null)
      setIsLoggedIn(false)
      window.localStorage.removeItem("authToken")
      window.localStorage.removeItem("userId")
      window.localStorage.setItem("isLoggedIn", "false")
    } catch (error) {
      console.error("Error removing from localStorage:", error)
    }
  }

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, login, logout, isLoading, userId }}>
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