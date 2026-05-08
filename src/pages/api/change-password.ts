import type { APIRoute } from 'astro';
import { createAuthClient } from '../../lib/supabase';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { newPassword } = await request.json();
    const supabase = createAuthClient(cookies, request);
    
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ message: 'Success' }), { 
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
