import { supabase } from '../lib/supabase'

export interface User {
  id: string
  email: string
  nome?: string
}

export const authService = {
  async signUp(email: string, password: string, nome: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nome: nome
        }
      }
    })
    if (error) throw error
    return data
  },

  async updateUserProfile(nome: string) {
    const { data, error } = await supabase.auth.updateUser({
      data: { nome }
    })
    if (error) throw error
    return data
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      return {
        id: user.id,
        email: user.email || '',
        nome: user.user_metadata?.nome || ''
      } as User
    }
    return null
  },

  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        callback({
          id: session.user.id,
          email: session.user.email || '',
          nome: session.user.user_metadata?.nome || ''
        })
      } else {
        callback(null)
      }
    })
  }
}
