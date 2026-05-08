import { useState } from 'react';

export default function HomeDashboard({ email }: { email?: string | null }) {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/signout', { method: 'POST' });
      if (res.ok) {
        window.location.reload();
      } else {
        console.error('登出失败');
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[600px] space-y-6">
      
      {/* 账户状态卡片 */}
      <div className="bg-white p-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden">
        {/* 背景装饰图案 */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-5 rounded-bl-full pointer-events-none"></div>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">水世界通行证</h1>
            <p className="text-gray-500 text-sm mt-0.5">统一身份认证中心</p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          {email ? (
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">当前登录账号</p>
                <p className="text-gray-900 font-medium text-lg">{email}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="/change-password"
                  className="flex-1 flex justify-center items-center py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black active:scale-95 transition-all shadow-md"
                >
                  修改密码
                </a>
                <button 
                  onClick={handleSignOut}
                  disabled={loading}
                  className="flex-1 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 active:scale-95 transition-all disabled:opacity-50"
                >
                  {loading ? '处理中...' : '退出登录'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-center py-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">当前未登录</h2>
                <p className="text-gray-500 text-sm">请登录您的水世界通行证以使用更多功能</p>
              </div>
              <a 
                href="/login"
                className="block w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-md shadow-blue-100"
              >
                前往登录
              </a>
            </div>
          )}
        </div>
      </div>

      {/* 关联站点区域 */}
      <div>
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 px-1">旗下服务</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <a 
            href="https://ai.wsw.wiki" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1 transition-all flex flex-col items-center justify-center text-center h-full min-h-[200px]"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-gray-900 font-bold text-lg group-hover:text-blue-600 transition-colors">Prompt 饮水机</h3>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">发现与分享优质 AI 提示词，提升创作效率。</p>
            </div>
          </a>
          
          {/* 这里预留了第二个应用卡片的位置 */}
          <div className="bg-gray-50/50 p-6 sm:p-8 rounded-2xl border-2 border-gray-200 border-dashed flex flex-col items-center justify-center text-center text-gray-400 opacity-80 h-full min-h-[200px]">
            <div className="w-12 h-12 rounded-full border-2 border-gray-300 border-dashed flex items-center justify-center text-gray-300 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-sm font-medium">更多服务敬请期待</span>
          </div>
        </div>
      </div>

    </div>
  );
}
