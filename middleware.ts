import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Create a Supabase client that hooks into the request/response lifecycle
  const supabase = createMiddlewareClient({ req, res })

  // This will refresh the session if needed
  await supabase.auth.getSession()

  return res
}

// Apply middleware to all routes except for static files and public assets
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
