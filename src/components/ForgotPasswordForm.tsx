import { useState } from 'react';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleAction = async () => {
    if (!email) {
      setMessage({ text: '❌ 请输入邮箱地址', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });
    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '请求失败');

      setMessage({ text: '✅ 重置链接已发送到您的邮箱，请查收！', type: 'success' });
    } catch (err: any) {
      setMessage({ text: `❌ ${err.message}`, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[400px] bg-white p-8 sm:p-10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">找回密码</h1>
        <p className="text-gray-500 text-sm mt-2">输入注册邮箱以重置您的密码</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">邮箱地址</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-800 placeholder-gray-400"
            placeholder="name@wsw.wiki"
          />
        </div>

        <div className="pt-2">
          <button 
            onClick={handleAction}
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 shadow-md shadow-blue-100"
          >
            {loading ? '发送中...' : '发送重置邮件'}
          </button>
        </div>
        
        <div className="text-center mt-4">
          <a href="/login" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
            返回登录
          </a>
        </div>
      </div>

      {message.text && (
        <div className={`mt-8 p-4 rounded-xl text-xs font-bold text-center border transition-all ${
          message.type === 'error' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'
        }`}>
          {message.text}
        </div>
      )}
    </div>
  );
}
