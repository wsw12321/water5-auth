# Supabase Auth Setup

This app owns the authentication UI for `.water555.com`, using the Auth portion of the same physical Supabase project that also stores yantao business data.

## Supabase Dashboard

Create or choose the shared Supabase project used by both `water5-auth` and `wsw-yantao-next`.

Copy:

- Project URL -> `VITE_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_AUTH_SUPABASE_URL`
- Project API anon public key -> `VITE_PUBLIC_SUPABASE_ANON_KEY` and `NEXT_PUBLIC_AUTH_SUPABASE_ANON_KEY`
- Project API service role secret -> `BUSINESS_SUPABASE_SERVICE_ROLE_KEY` in `wsw-yantao-next`

Auth settings:

- Site URL: `https://auth.water555.com`
- Additional Redirect URLs:
  - `https://auth.water555.com/api/auth/callback`
  - `https://auth.water555.com/success`
  - `https://yantao.water555.com/**`
  - `http://localhost:3000/**`
  - `http://localhost:4321/**`

Email settings:

- Enable email/password provider.
- If email confirmation is enabled, confirmation links redirect to `https://auth.water555.com/success`.
- Password reset links are handled by `https://auth.water555.com/api/auth/callback?next=/change-password`.

## App Environment

```env
VITE_PUBLIC_SUPABASE_URL=<shared project url>
VITE_PUBLIC_SUPABASE_ANON_KEY=<shared project anon key>
VITE_PUBLIC_AUTH_URL=https://auth.water555.com
VITE_PUBLIC_SITE_URL=https://yantao.water555.com
VITE_AUTH_COOKIE_DOMAIN=.water555.com
VITE_ALLOWED_REDIRECT_ORIGINS=http://localhost:3000,http://localhost:4321
```

Use the same project URL and anon key in `wsw-yantao-next` as `NEXT_PUBLIC_AUTH_SUPABASE_URL` and `NEXT_PUBLIC_AUTH_SUPABASE_ANON_KEY`. Business-table access in `wsw-yantao-next` still uses a separate server-only service role client for migration safety.
