import React from 'react';
import { SITE_SETTINGS } from '../data/database';
import { Link } from '../utils/router';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#06080E] text-slate-400 py-14 text-xs text-left">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          {/* Brand Info */}
          <div className="space-y-3 max-w-sm">
            <Link to="/" className="font-display text-lg font-extrabold text-white hover:text-cyan-400 transition-colors">
              QUINNVERSE
            </Link>
            <p className="text-slate-400 leading-relaxed text-xs">
              Find better tools. Build what’s missing.
              <br />
              发现真正好用的工具。找不到合适的，就自己做一个。
              <br />
              独立产品工作室，专注于开发解决具体硬性卡点的独立软件，并提供经过真实使用检验的工具实测。
            </p>
          </div>

          {/* Quick Nav Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs">
            <div>
              <div className="font-bold text-white mb-2.5">Products</div>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/products/job-application-copilot" className="hover:text-cyan-400 transition-colors">Job Copilot (Beta)</Link></li>
                <li><a href="https://tingmo.quinnverse.tech" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">听默 (TingMo) ↗</a></li>
                <li><a href="https://weread.quinnverse.tech" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">微信读书看板 ↗</a></li>
                <li><a href="https://clozerecitation.quinnverse.tech" target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">完形填空记忆 ↗</a></li>
                <li><Link to="/products" className="text-cyan-400 hover:text-cyan-300 font-medium">查看所有产品 →</Link></li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-white mb-2.5">Discovery</div>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/picks" className="hover:text-cyan-400 transition-colors">Picks 实测库</Link></li>
                <li><Link to="/finder" className="hover:text-cyan-400 transition-colors">Finder 需求诊断</Link></li>
                <li><Link to="/disclosure" className="hover:text-cyan-400 transition-colors">选品与返佣政策</Link></li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-white mb-2.5">Content & Lab</div>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/journal" className="hover:text-cyan-400 transition-colors">Journal 深度手记</Link></li>
                <li><Link to="/resources" className="hover:text-cyan-400 transition-colors">Resources 实用手册</Link></li>
                <li><Link to="/lab" className="hover:text-cyan-400 transition-colors">Lab 实验记录</Link></li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-white mb-2.5">Studio</div>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/about" className="hover:text-cyan-400 transition-colors">About Quinnverse</Link></li>
                <li><Link to="/work-with-us" className="hover:text-cyan-400 transition-colors">Work with Quinnverse</Link></li>
                <li><Link to="/contact" className="hover:text-cyan-400 transition-colors">联系与反馈</Link></li>
                <li><a href={SITE_SETTINGS.githubUrl} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">GitHub 开源 ↗</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Commercial & Affiliate Disclosure Statement */}
        <div className="rounded-xl bg-[#090D17] p-4 border border-slate-800 text-[11px] leading-relaxed text-slate-400 space-y-1">
          <div className="font-bold text-slate-200">
            中立评测与商业返佣声明：
          </div>
          <p>
            Quinnverse Picks 绝不出售收录席位与排名。本站部分第三方工具链接可能包含推广返佣（Affiliate / Referral），该收益用于支持工作室独立服务器开销。无论是否存在商业合作，页面均如实披露该工具的缺点、局限与网络限制，并始终提供官方纯净入口供自主选择。
          </p>
        </div>

        {/* Legal & Compliance Footer */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 Quinnverse. All rights reserved. 个人独立产品工作室
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span>主体性质：个人非经营性网站</span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-cyan-400 underline underline-offset-2 transition-colors font-mono font-medium"
            >
              {SITE_SETTINGS.icpNumber}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
