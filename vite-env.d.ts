/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 在这里列出你所有以 VITE_ 开头的自定义环境变量
  readonly VITE_PUBLIC_SUPABASE_URL: string
  readonly VITE_PUBLIC_SUPABASE_ANON_KEY: string
  // ... 更多环境变量
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}