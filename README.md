# water5-auth

Astro / Cloudflare unified auth site. This app connects to the Auth part of the shared Supabase project and owns registration, login, password reset, password changes, sign-out, and shared `.water555.com` cookies.

## Local Development

```sh
pnpm install
cp .env.example .env
pnpm dev
```

Use `.env.production.example` as the production deployment template.

## Environment

- `VITE_PUBLIC_SUPABASE_URL`: shared Supabase project URL.
- `VITE_PUBLIC_SUPABASE_ANON_KEY`: shared Supabase project anon key.
- `VITE_PUBLIC_AUTH_URL`: auth site URL, defaulting to `https://auth.water555.com`.
- `VITE_PUBLIC_SITE_URL`: default app URL, defaulting to `https://yantao.water555.com`.
- `VITE_AUTH_COOKIE_DOMAIN`: production shared cookie domain, defaulting to `.water555.com`.
- `VITE_ALLOWED_REDIRECT_ORIGINS`: extra allowed login redirect origins, comma separated.

## Supabase Auth

Configure Supabase Auth in the shared Supabase project with:

- Site URL: `https://auth.water555.com`
- Redirect URLs:
  - `https://auth.water555.com/api/auth/callback`
  - `https://auth.water555.com/success`
  - `https://yantao.water555.com/**`
  - `http://localhost:3000/**`
  - `http://localhost:4321/**`

The auth setup checklist is in `docs/supabase-auth-setup.md`. The yantao single-project setup is in `../wsw-yantao-next/docs/supabase-single-project-setup.md`.

## Commands

| Command | Action |
| :------ | :----- |
| `pnpm dev` | Start local dev server at `localhost:4321`. |
| `pnpm build` | Build production output to `./dist/`. |
| `pnpm preview` | Preview the built site. |
| `pnpm generate-types` | Generate Cloudflare worker types. |
