import type { APIRoute } from 'astro';
import { createAuthClient } from '../../../lib/supabase';

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/';

  if (code) {
    const supabase = createAuthClient(cookies, request);
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // 成功用 code 换取 session，直接跳转到 next（例如 /change-password）
      return redirect(next);
    } else {
      console.error('exchangeCodeForSession error:', error.message);
    }
  }

  // 失败或没有 code 的情况，跳回登录页并携带错误信息
  return redirect('/login?error=invalid_or_expired_code');
};
