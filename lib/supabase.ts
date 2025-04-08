import { createClient } from '@supabase/supabase-js'

const isBrowser = typeof window !== 'undefined'

// These MUST be defined in `.env.local`
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // ONLY used server-side

// Client for client-side usage
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: isBrowser,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})

// Client for server-side use ONLY
export const getServiceSupabase = () => {
  return createClient(supabaseUrl, serviceRoleKey)
}
