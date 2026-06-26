import { createServerClient, parseCookieHeader } from '@supabase/ssr'
import type { CookieMethodsServer } from '@supabase/ssr'
import type { AstroCookies } from 'astro'
import { getSharedCookieOptions } from './config'

export const createAuthClient = (cookies: AstroCookies, request: Request) => {
  const sharedCookieOptions = getSharedCookieOptions()

  return createServerClient(
    import.meta.env.VITE_PUBLIC_SUPABASE_URL,
    import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookieOptions: sharedCookieOptions,
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get('Cookie') ?? '')
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookies.set(name, value, {
              ...options,
              ...sharedCookieOptions,
            } as any) 
          })
        },
      } as CookieMethodsServer,
    }
  )
}
