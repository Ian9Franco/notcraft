import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

// Cliente principal para uso en el cliente
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Cliente con rol de servicio para operaciones administrativas
// ¡ADVERTENCIA! Solo usar en funciones del servidor, nunca en el cliente
export const getServiceSupabase = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string
  return createClient(supabaseUrl, supabaseServiceKey)
}

// Verificar si las variables de entorno están configuradas
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn(
    "Supabase environment variables are not set. Using mock implementations. Set up your environment variables for full functionality.",
  )
}

