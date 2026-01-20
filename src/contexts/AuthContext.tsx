import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { authService, type User } from '../services/authService'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, nome: string) => Promise<void>
  updateProfile: (nome: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    authService.getCurrentUser().then((currentUser) => {
      setUser(currentUser as User | null)
      setLoading(false)
    })

    const { data: { subscription } } = authService.onAuthStateChange((user) => {
      setUser(user)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    await authService.signIn(email, password)
  }

  const signUp = async (email: string, password: string, nome: string) => {
    await authService.signUp(email, password, nome)
  }

  const updateProfile = async (nome: string) => {
    await authService.updateUserProfile(nome)
    const currentUser = await authService.getCurrentUser()
    setUser(currentUser)
  }

  const signOut = async () => {
    await authService.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, updateProfile, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
