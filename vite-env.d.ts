/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_SUPABASE_URL: string
  readonly VITE_PUBLIC_SUPABASE_ANON_KEY: string
  readonly VITE_PUBLIC_AUTH_URL?: string
  readonly VITE_PUBLIC_SITE_URL?: string
  readonly VITE_AUTH_COOKIE_DOMAIN?: string
  readonly VITE_ALLOWED_REDIRECT_ORIGINS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
