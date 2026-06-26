# Repository Guidelines

## Project Structure & Module Organization

`water5-auth` is an Astro auth site deployed with the Cloudflare adapter. Route pages live in `src/pages`, with server endpoints under `src/pages/api`. React UI islands are in `src/components`, shared Astro shells are in `src/layouts`, and environment/Supabase helpers are in `src/lib`. Global Tailwind v4 setup and base styles are in `src/styles/global.css`. Static files belong in `public`; imported assets belong in `src/assets`. Setup notes for Supabase Auth are in `docs/`. Treat `dist/` as generated output.

## Build, Test, and Development Commands

- `pnpm install`: install dependencies from `pnpm-lock.yaml`.
- `pnpm dev`: start the local Astro dev server at `localhost:4321`.
- `pnpm build`: create the production Cloudflare/Astro output in `dist/`.
- `pnpm preview`: preview the built site locally.
- `pnpm generate-types`: run `wrangler types` to refresh Cloudflare worker bindings/types.

Use Node `>=22.12.0`, as declared in `package.json`.

## Coding Style & Naming Conventions

Use TypeScript ES modules. Match nearby file style when editing; current TS/TSX files use 2-space indentation, single quotes, semicolons, and explicit exported helpers. Name React components and Astro layouts in PascalCase, for example `AuthForm.tsx` or `AuthLayout.astro`. Name route files by URL path, for example `forgot-password.astro`, and API files by endpoint action, for example `signin.ts`. Prefer shared helpers in `src/lib` for URL, cookie, and Supabase logic instead of duplicating auth checks in endpoints.

## Testing Guidelines

There is no dedicated test runner configured yet. For now, validate changes with `pnpm build` and manually exercise the affected auth flow through `pnpm dev`. For auth work, test successful and failed paths for sign-in, sign-up, password reset, password change, safe redirects, and cookie behavior. If tests are added later, keep them close to the feature and document the new command here.

## Commit & Pull Request Guidelines

Git history uses a mix of short Chinese summaries and Conventional Commit prefixes such as `feat:`, `style:`, and `refactor:`. Keep commits concise and action-focused, for example `feat: add password reset flow` or `fix: validate redirect origin`. Pull requests should describe the user-facing change, list validation commands run, link related issues, and include screenshots for UI changes. Note any Supabase dashboard or environment-variable changes explicitly.

## Security & Configuration Tips

Do not commit real `.env` secrets. Use `.env.example` for local setup and `.env.production.example` for deployment shape. Keep redirect and cookie-domain changes aligned with `docs/supabase-auth-setup.md`, `src/lib/config.ts`, and `wrangler.jsonc`.
