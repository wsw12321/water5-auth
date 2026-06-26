import type { APIRoute } from 'astro';
import { createAuthClient } from '../../lib/supabase';
import { resolveSafeRedirectUrl } from '../../lib/config';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { email, password, redirectTo } = await request.json();
    const safeRedirectTo = resolveSafeRedirectUrl(redirectTo);

    if (!safeRedirectTo) {
      return new Response(JSON.stringify({ error: '跳转地址不被允许' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const supabase = createAuthClient(cookies, request);
    
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ url: safeRedirectTo }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || '内部服务错误' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
