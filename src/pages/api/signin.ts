import type { APIRoute } from 'astro'
import { createAuthClient } from '../../lib/supabase'

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData()
  const email = formData.get('email')?.toString()
  const password = formData.get('password')?.toString()
  // 允许主站通过 URL 参数传递回跳地址，默认跳回主站
  const url = new URL(request.url)
  const redirectTo = url.searchParams.get('redirect_to') || 'https://main.wsw.wiki'

  if (!email || !password) {
    return new Response(JSON.stringify({ error: '邮箱和密码不能为空' }), { status: 400 })
  }

  const supabase = createAuthClient(cookies, request)
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    // 登录失败，跳回登录页并携带错误信息 (实际开发中可通过 URL 参数传递错误)
    return redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  // 登录成功，Cookie 已经种到了 .wsw.wiki 下，干净地跳回主站！
  return redirect(redirectTo)
}