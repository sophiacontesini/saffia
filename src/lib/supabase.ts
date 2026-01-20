import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const defaultUrl = 'https://placeholder.supabase.co'
const defaultKey = 'placeholder-key'

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === defaultUrl || supabaseAnonKey === defaultKey) {
  console.warn('⚠️ Supabase não configurado. Configure as variáveis de ambiente no arquivo .env')
}

export const supabase = createClient(
  supabaseUrl || defaultUrl,
  supabaseAnonKey || defaultKey
)
