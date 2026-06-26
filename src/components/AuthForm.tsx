import { useState, useRef } from 'react';

export default function AuthForm({ redirectTo }: { redirectTo: string }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loadingMode, setLoadingMode] = useState<'signin' | 'signup' | null>(null);
  const [message, setMessage] = useState({ text: '', type: '' });

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleAction = async (mode: 'signin' | 'signup') => {
    setLoadingMode(mode);
    setMessage({ text: '', type: '' });
    try {
      const endpoint = mode === 'signin' ? '/api/signin' : '/api/signup';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, redirectTo })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '认证失败');

      if (mode === 'signin') {
        setMessage({ text: '🚀 登录成功，正在进入...', type: 'success' });
        setTimeout(() => { window.location.href = data.url || redirectTo; }, 500);
      } else {
        setMessage({ text: '✅ 注册成功！请查收验证邮件。', type: 'success' });
      }
    } catch (err: any) {
      setMessage({ text: `❌ ${err.message}`, type: 'error' });
    } finally {
      setLoadingMode(null);
    }
  };

  return (
    <div className="w-full max-w-[400px] bg-white p-8 sm:p-10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">水世界通行证</h1>
        <p className="text-gray-500 text-sm mt-2">统一身份认证中心</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">邮箱地址</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                passwordRef.current?.focus();
              }
            }}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-800 placeholder-gray-400"
            placeholder="name@water555.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">访问密码</label>
          <input 
            type="password" 
            ref={passwordRef}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (isRegisterMode) {
                  confirmPasswordRef.current?.focus();
                } else {
                  handleAction('signin');
                }
              }
            }}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-800 placeholder-gray-400"
            placeholder="••••••••"
          />
          {!isRegisterMode && (
            <div className="text-right mt-2">
              <a href="/forgot-password" className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors">
                忘记密码？
              </a>
            </div>
          )}
        </div>

        {isRegisterMode && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">确认密码</label>
            <input 
              type="password" 
              ref={confirmPasswordRef}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  if (password !== confirmPassword) {
                    setMessage({ text: '❌ 两次输入的密码不一致', type: 'error' });
                    return;
                  }
                  handleAction('signup');
                }
              }}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white outline-none transition-all text-gray-800 placeholder-gray-400"
              placeholder="••••••••"
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 pt-2">
          <button 
            onClick={() => {
              if (isRegisterMode) {
                setIsRegisterMode(false);
                setMessage({ text: '', type: '' });
              } else {
                handleAction('signin');
              }
            }}
            disabled={loadingMode !== null}
            className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 shadow-md shadow-blue-100"
          >
            {isRegisterMode ? '前往登录' : (loadingMode === 'signin' ? '处理中...' : '登录')}
          </button>
          <button 
            onClick={() => {
              if (!isRegisterMode) {
                setIsRegisterMode(true);
                setMessage({ text: '⚠️ 请在下方输入框重复密码以确认', type: 'error' });
                return;
              }
              if (password !== confirmPassword) {
                setMessage({ text: '❌ 两次输入的密码不一致', type: 'error' });
                return;
              }
              handleAction('signup');
            }}
            disabled={loadingMode !== null}
            className="w-full bg-gray-900 text-white font-bold py-3.5 rounded-xl hover:bg-black active:scale-95 transition-all disabled:opacity-50 shadow-md"
          >
            {isRegisterMode ? (loadingMode === 'signup' ? '处理中...' : '注册') : '前往注册'}
          </button>
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
