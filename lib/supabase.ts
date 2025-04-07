import { createClient } from "@supabase/supabase-js"

// Verificar si estamos en el navegador o en el servidor durante la compilación
const isBrowser = typeof window !== "undefined"

// Obtener las variables de entorno o usar valores predeterminados para evitar errores
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-url.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"

// Cliente principal para uso en el cliente
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: isBrowser, // Solo persistir la sesión en el navegador
  },
})

// Cliente con rol de servicio para operaciones administrativas
// ¡ADVERTENCIA! Solo usar en funciones del servidor, nunca en el cliente
export const getServiceSupabase = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-key"
  return createClient(supabaseUrl, supabaseServiceKey)
}

// Verificar si las variables de entorno están configuradas
if (isBrowser && (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
  console.warn(
    "Supabase environment variables are not set. Using mock implementations. Set up your environment variables for full functionality.",
  )
}

