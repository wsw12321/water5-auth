import { useState } from 'react';

export default function ChangePasswordForm({ email }: { email?: string | null }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleAction = async () => {
    if (!password || !confirmPassword) {
      setMessage({ text: '❌ 请输入并确认新密码', type: 'error' });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ text: '❌ 两次输入的密码不一致', type: 'error' });
      return;
    }

    if (password.length < 6) {
      setMessage({ text: '❌ 密码长度不能少于 6 位', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });
    try {
      const res = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '请求失败');

      setMessage({ text: '✅ 密码修改成功！', type: 'success' });
      // 清空输入框
      setPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setMessage({ text: `❌ ${err.message}`, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="w-full max-w-[400px] bg-white p-8 sm:p-10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-4">尚未登录</h1>
        <p className="text-gray-500 text-sm mb-8">请先登录或通过重置邮件验证身份后再修改密码。</p>
        <a 
          href="/login"
          className="block w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-100"
        >
          前往登录
        </a>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[400px] bg-white p-8 sm:p-10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">修改密码</h1>
        <p className="text-gray-500 text-sm mt-2">当前登录账号：<span className="font-semibold text-gray-800">{email}</span></p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">新密码</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-800 placeholder-gray-400"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">确认新密码</label>
          <input 
            type="password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-800 placeholder-gray-400"
            placeholder="••••••••"
          />
        </div>

        <div className="pt-2">
          <button 
            onClick={handleAction}
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 shadow-md shadow-blue-100"
          >
            {loading ? '处理中...' : '确认修改'}
          </button>
        </div>
        
        {message.type === 'success' && (
          <div className="text-center mt-4">
            <a href="https://prompt.wsw.wiki" className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
              返回主站
            </a>
          </div>
        )}
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
