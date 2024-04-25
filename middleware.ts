import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}
export const config = {
    matcher: [
      /* Match all request paths except for the following: */
      /*
       * - Static files (_next/static)
       * - Image optimization files (_next/image)
       * - Favicon (favicon.ico)
       * - Any file extension for common image formats (prevents blocking static images)
       */
      '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
  };