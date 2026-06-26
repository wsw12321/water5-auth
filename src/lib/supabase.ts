import { createServerClient, parseCookieHeader } from '@supabase/ssr'
import type { CookieMethodsServer } from '@supabase/ssr'
import type { AstroCookies } from 'astro'
import { getSharedCookieOptions } from './config'

export const createAuthClient = (cookies: AstroCookies, request: Request) => {
  const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing VITE_PUBLIC_SUPABASE_URL or VITE_PUBLIC_SUPABASE_ANON_KEY')
  }

  const sharedCookieOptions = getSharedCookieOptions()

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
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

export const getCurrentAuthUser = async (cookies: AstroCookies, request: Request) => {
  try {
    const supabase = createAuthClient(cookies, request)
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      console.error('Failed to read Supabase auth user:', error.message)
      return null
    }

    return data.user ?? null
  } catch (error) {
    console.error(
      'Failed to initialize Supabase auth client:',
      error instanceof Error ? error.message : error,
    )
    return null
  }
}
