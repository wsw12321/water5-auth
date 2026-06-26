const DEFAULT_AUTH_URL = 'https://auth.water555.com';
const DEFAULT_COOKIE_DOMAIN = '.water555.com';
const DEFAULT_SITE_URL = 'https://yantao.water555.com';

function trimTrailingSlash(value: string) {
  return value.replace(/\/+$/, '');
}

export function getAuthUrl() {
  return trimTrailingSlash(import.meta.env.VITE_PUBLIC_AUTH_URL || DEFAULT_AUTH_URL);
}

export function getSiteUrl() {
  return trimTrailingSlash(import.meta.env.VITE_PUBLIC_SITE_URL || DEFAULT_SITE_URL);
}

export function getCookieDomain() {
  return import.meta.env.VITE_AUTH_COOKIE_DOMAIN || DEFAULT_COOKIE_DOMAIN;
}

function getAdditionalRedirectOrigins() {
  const values = (import.meta.env.VITE_ALLOWED_REDIRECT_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  return values.flatMap((origin) => {
    try {
      return [new URL(origin).origin];
    } catch {
      return [];
    }
  });
}

function isLocalhost(hostname: string) {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
}

function isCookieDomainHost(hostname: string) {
  const cookieDomain = getCookieDomain().replace(/^\./, '');
  return hostname === cookieDomain || hostname.endsWith(`.${cookieDomain}`);
}

export function getSharedCookieOptions() {
  if (!import.meta.env.PROD) {
    return {
      path: '/',
      sameSite: 'lax' as const,
      secure: false,
    };
  }

  return {
    domain: getCookieDomain(),
    path: '/',
    sameSite: 'lax' as const,
    secure: true,
  };
}

export function resolveSafeRedirectUrl(value: unknown, fallback = getAuthUrl()) {
  if (typeof value !== 'string' || !value.trim()) {
    return fallback;
  }

  let redirectUrl: URL;
  try {
    redirectUrl = new URL(value, getAuthUrl());
  } catch {
    return null;
  }

  const allowedOrigins = new Set([
    new URL(getAuthUrl()).origin,
    new URL(getSiteUrl()).origin,
    ...getAdditionalRedirectOrigins(),
  ]);

  if (allowedOrigins.has(redirectUrl.origin)) {
    return redirectUrl.toString();
  }

  if (!import.meta.env.PROD && isLocalhost(redirectUrl.hostname)) {
    return redirectUrl.toString();
  }

  if (redirectUrl.protocol === 'https:' && isCookieDomainHost(redirectUrl.hostname)) {
    return redirectUrl.toString();
  }

  return null;
}
