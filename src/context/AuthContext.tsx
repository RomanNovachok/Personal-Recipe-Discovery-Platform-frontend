import { createContext, useContext, useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";

interface AuthUser {
  userId: string
  email: string
}

interface AuthContextType {
  isAuthenticated: boolean
  token: string | null
  user: AuthUser | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))
  const [user, setUser] = useState<AuthUser | null>(null)

  const isAuthenticated = !!token

  const decodeUser = (jwt: string): AuthUser | null => {
    try {
      const decoded: any = jwtDecode(jwt)
      return {
        userId: decoded.sub,
        email: decoded.email,
      }
    } catch {
      return null
    }
  }

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
    const decodedUser = decodeUser(newToken)
    setUser(decodedUser)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
      const decodedUser = decodeUser(storedToken)
      setUser(decodedUser)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
