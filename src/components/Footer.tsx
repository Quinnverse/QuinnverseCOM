import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SITE_SETTINGS } from '../data/database';
import { Link } from '../utils/router';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/90 bg-white text-slate-600 pt-16 pb-12 text-xs text-left relative overflow-hidden">
      <div className="absolute top-12 left-1/3 w-1/2 h-24 pointer-events-none opacity-25 hidden md:block">
        <svg className="w-full h-full" viewBox="0 0 500 100" fill="none">
          <path d="M0,80 Q250,0 500,60" stroke="#94A3B8" strokeWidth="2" strokeDasharray="6 6" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12">
          <div className="space-y-4 max-w-sm">
            <Link to="/" className="font-display text-3xl font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>QUINNVERSE.</span>
            </Link>
            <p className="text-slate-600 leading-relaxed text-xs">
              <span className="font-bold text-slate-900">发现真正好用的工具。找不到合适的，就自己做一个。</span>
              <br />
              <span className="text-slate-400 font-mono text-[11px]">Find better tools. Build what’s missing.</span>
              <br />
              独立产品工作室，专注于开发解决具体硬性卡点的独立软件，并提供经过真实使用检验的工具实测。
            </p>

            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold transition-all shadow-xs"
              >
                <span>Contact</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs">
            <div>
              <div className="font-bold text-slate-900 mb-3 text-xs tracking-wider">自研产品</div>
              <ul className="space-y-2.5 text-slate-600 font-medium">
                <li><Link to="/products/job-application-copilot" className="hover:text-slate-900 transition-colors">海外求职助手 (Beta)</Link></li>
                <li><a href="https://tingmo.quinnverse.tech" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors flex items-center gap-1">听墨 (TingMo) 播客 <ArrowUpRight className="w-3 h-3 text-slate-400" /></a></li>
                <li><a href="https://weread.quinnverse.tech" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors flex items-center gap-1">微信读书看板 <ArrowUpRight className="w-3 h-3 text-slate-400" /></a></li>
                <li><a href="https://clozerecitation.quinnverse.tech" target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors flex items-center gap-1">完形填空记忆 <ArrowUpRight className="w-3 h-3 text-slate-400" /></a></li>
                <li><Link to="/products" className="text-blue-600 font-bold hover:underline">浏览全部产品 →</Link></li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-slate-900 mb-3 text-xs tracking-wider">工具探索</div>
              <ul className="space-y-2.5 text-slate-600 font-medium">
                <li><Link to="/picks" className="hover:text-slate-900 transition-colors">精选深度实测库</Link></li>
                <li><Link to="/finder" className="hover:text-slate-900 transition-colors">需求诊断筛选器</Link></li>
                <li><Link to="/disclosure" className="hover:text-slate-900 transition-colors">商业透明与返佣政策</Link></li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-slate-900 mb-3 text-xs tracking-wider">内容与实验</div>
              <ul className="space-y-2.5 text-slate-600 font-medium">
                <li><Link to="/journal" className="hover:text-slate-900 transition-colors">工程与复盘手记</Link></li>
                <li><Link to="/resources" className="hover:text-slate-900 transition-colors">实用手册与配方</Link></li>
                <li><Link to="/lab" className="hover:text-slate-900 transition-colors">前沿原型实验室</Link></li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-slate-900 mb-3 text-xs tracking-wider">工作室与合作</div>
              <ul className="space-y-2.5 text-slate-600 font-medium">
                <li><Link to="/about" className="hover:text-slate-900 transition-colors">关于 Quinnverse</Link></li>
                <li><Link to="/work-with-us" className="hover:text-slate-900 transition-colors">与我们合作开发</Link></li>
                <li><Link to="/contact" className="hover:text-slate-900 transition-colors">联系与反馈</Link></li>
                <li><a href={SITE_SETTINGS.githubUrl} target="_blank" rel="noreferrer" className="hover:text-slate-900 transition-colors flex items-center gap-1">GitHub 开源仓库 <ArrowUpRight className="w-3 h-3 text-slate-400" /></a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-50 p-6 border border-slate-200/80 text-[11px] leading-relaxed text-slate-600 space-y-1.5">
          <div className="font-bold text-slate-900 flex items-center gap-1.5">
            <span>中立评测与商业返佣声明</span>
          </div>
          <p>
            Quinnverse Picks 绝不出售收录席位与排名。本站部分第三方工具链接可能包含推广返佣（Affiliate / Referral），该收益用于支持工作室独立服务器开销。无论是否存在商业合作，页面均如实披露该工具的缺点、局限与网络限制，并始终提供官方纯净入口供自主选择。
          </p>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div>
            © 2026 Quinnverse. 保留所有权利 · 个人独立产品工作室
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span>主体性质：个人非经营性网站</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-700 hover:text-blue-600 underline underline-offset-2 transition-colors font-mono font-bold"
            >
              {SITE_SETTINGS.icpNumber}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
