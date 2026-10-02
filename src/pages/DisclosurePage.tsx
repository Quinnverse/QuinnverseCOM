import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from '../utils/router';

export const DisclosurePage: React.FC = () => {
  return (
    <div className="py-16 sm:py-24 bg-[#F8FAFC] text-left">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Masthead */}
        <div className="space-y-3 border-b border-slate-200 pb-8">
          <div className="inline-block text-xs font-bold font-mono tracking-wider uppercase text-blue-700 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full">
            TRANSPARENCY & ETHICS
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black text-slate-950 tracking-tight">
            商业透明度与返佣政策
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            关于选品中立性、商业合作、Affiliate 链接与缺点披露的独立宣言。
          </p>
        </div>

        {/* Content Clauses */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-10 space-y-7 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-sm">
          <div className="space-y-2">
            <h3 className="font-bold text-slate-950 text-base">1. Picks 不出售收录席位与排名</h3>
            <p className="text-slate-600">
              任何软件服务商都无法通过付费、赞助或商务互换购买进入 Quinnverse Picks 的资格。收录的唯一硬性准则是：该工具在实际开发或日常生产流中被深度使用过，并且确实解决了明确的问题。
            </p>
          </div>

          <div className="space-y-2 border-t border-slate-100 pt-5">
            <h3 className="font-bold text-slate-950 text-base">2. 推广返佣 (Affiliate / Referral) 的透明标注</h3>
            <p className="text-slate-600">
              本站部分第三方工具链接可能包含官方推广返佣标识。当您通过专属链接访问或订阅相关服务时，Quinnverse 可能会从服务商处获得微薄的佣金提成。这笔收益将百分之百用于覆盖本站的服务器租用、域名续费与自研产品的实验研发。
            </p>
            <p className="text-slate-600">
              凡含有合作返佣的页面，均会显式标注合作提示，并且始终提供纯净的官方原生直达链接供您自主选择。
            </p>
          </div>

          <div className="space-y-2 border-t border-slate-100 pt-5">
            <h3 className="font-bold text-slate-950 text-base">3. 缺点与局限披露与商业关系绝对独立</h3>
            <p className="text-slate-600">
              即使某个工具存在深度推广合作，它在实际使用中暴露出的缺陷（如：索引慢、定价贵、配置繁琐、国内访问受阻等），依然会一视同仁地清晰列在“局限与避坑”及“劝退谁”一栏中。不因返佣掩盖缺点，不因无合作恶意贬低。
            </p>
          </div>

          <div className="space-y-2 border-t border-slate-100 pt-5">
            <h3 className="font-bold text-slate-950 text-base">4. 动态降级与淘汰机制</h3>
            <p className="text-slate-600">
              软件工具会随着版本迭代而变化。如果收录的某款工具在后续版本中出现严重体验退步、恶意涨价或隐私违规，其实测结论与 Evidence Level 将被即刻降级，直至从 Picks 库中完全移除。
            </p>
          </div>
        </div>

        {/* Back Navigation */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-bold">
          <Link to="/" className="text-slate-500 hover:text-slate-900 transition-colors">
            ← 返回 Quinnverse 首页
          </Link>
          <Link to="/picks" className="text-slate-900 hover:underline">
            探索 Picks 实测库 →
          </Link>
        </div>
      </div>
    </div>
  );
};
