import React from 'react';
import { Github, Twitter, Linkedin, Mail, ExternalLink, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  onNavigate: (tab: string) => void;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, lang }) => {
  const isZh = lang === 'zh';

  return (
    <footer className="w-full border-t border-slate-800 bg-[#060910] text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <span className="text-xl font-bold tracking-tight text-white">Quinnverse</span>
            <p className="mt-3 text-sm leading-relaxed text-slate-400 max-w-sm">
              {isZh
                ? '把真实的问题，做成真正能用的东西。独立产品工作室 · 自研产品 · AI 工具实测 · 实验'
                : 'Turning genuine problems into tangible tools that actually work. Independent product studio, tested AI database, and maker lab.'}
            </p>
            <div className="mt-5 flex items-center gap-4 text-slate-400">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:hi@quinnverse.tech"
                className="hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Products */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              {isZh ? '自研产品' : 'Products'}
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('product-copilot')}
                  className="hover:text-white transition-colors text-left"
                >
                  Job Application Copilot
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('agent')}
                  className="hover:text-white transition-colors text-left"
                >
                  {isZh ? 'AI 工具筛选 Agent' : 'Tool Finder Agent'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition-colors text-left"
                >
                  {isZh ? '小型工具与实验' : 'Micro Utilities'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Tested & Lab */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              {isZh ? '实测与实验室' : 'Tested & Lab'}
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('tested')}
                  className="hover:text-white transition-colors text-left"
                >
                  {isZh ? 'Quinnverse 实测数据库' : 'Tested Database'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lab')}
                  className="hover:text-white transition-colors text-left"
                >
                  {isZh ? '构建日志 (Build Log)' : 'Build Logs'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lab')}
                  className="hover:text-white transition-colors text-left"
                >
                  {isZh ? '产品实验与手记' : 'Experiments & Essays'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Studio & About */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              {isZh ? '工作室与联系' : 'Studio & About'}
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  {isZh ? '关于 Quinnverse' : 'About Quinnverse'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors text-left"
                >
                  {isZh ? '合作与收录' : 'Partnership & Contact'}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('studio')}
                  className="text-blue-400 hover:text-blue-300 transition-colors text-left font-medium"
                >
                  {isZh ? '⚡ 进入管理后台 (Studio)' : '⚡ Open Studio CMS'}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© 2026 Quinnverse. All rights reserved. 独立产品工作室.</p>
          <div className="flex items-center gap-6">
            <span>独立构建 · 真实使用 · 持续实验</span>
            <span className="font-mono text-slate-600">v4.0 Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
