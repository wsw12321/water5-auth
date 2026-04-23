import { createServerClient, parseCookieHeader } from '@supabase/ssr'
// 🌟 引入最新的类型定义
import type { CookieMethodsServer } from '@supabase/ssr'
import type { AstroCookies } from 'astro'

export const createAuthClient = (cookies: AstroCookies, request: Request) => {
  return createServerClient(
    import.meta.env.VITE_PUBLIC_SUPABASE_URL,
    import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get('Cookie') ?? '')
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            // 使用 as any 强行消除 Astro 和 Supabase 的选项类型冲突
            cookies.set(name, value, {
              ...options,
              domain: '.wsw.wiki',
              path: '/',
              secure: true,
              httpOnly: true,
              sameSite: 'lax',
            } as any) 
          })
        },
      } as CookieMethodsServer, // 🌟 显式断言，彻底消除弃用警告
    }
  )
}