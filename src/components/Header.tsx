import React from 'react';
import { Github, SlidersHorizontal, Map, ChevronDown } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  lang: Language;
  onToggleLang: () => void;
  onOpenSitemap: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  lang,
  onToggleLang,
  onOpenSitemap,
}) => {
  const isZh = lang === 'zh';
  const isHome = currentTab === 'home';

  const navLinks = [
    { id: 'products', labelZh: '产品', labelEn: 'Products' },
    { id: 'tested', labelZh: '实测', labelEn: 'Tested' },
    { id: 'lab', labelZh: '实验室', labelEn: 'Lab' },
    { id: 'about', labelZh: '关于', labelEn: 'About' },
    { id: 'contact', labelZh: '合作', labelEn: 'Contact' },
  ];

  return (
    <header
      className={`w-full z-40 transition-colors ${
        isHome
          ? 'absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent border-b border-white/5'
          : 'sticky top-0 bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/80'
      }`}
    >
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-6 sm:px-8">
        {/* Left: Brand Wordmark */}
        <button
          onClick={() => onNavigate('home')}
          className="text-left focus-visible:outline-none group"
        >
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-white transition-opacity group-hover:opacity-90">
            Quinnverse
          </span>
        </button>

        {/* Center / Right: Nav Links & Actions matching screenshot */}
        <div className="flex items-center gap-6 sm:gap-8">
          <nav className="hidden md:flex items-center gap-7 text-sm font-normal text-slate-300">
            {navLinks.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-white font-medium'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {isZh ? item.labelZh : item.labelEn}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-4 text-slate-300">
            {/* GitHub Icon */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-slate-300 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>

            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1 text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              <span>{lang === 'zh' ? 'EN' : '中'}</span>
              <ChevronDown className="h-3 w-3 opacity-70" />
            </button>

            {/* Subtle Studio / Sitemap triggers */}
            <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-white/10">
              <button
                onClick={() => onNavigate('studio')}
                className="text-[11px] text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1"
                title="Quinnverse Studio 后台"
              >
                <SlidersHorizontal className="h-3 w-3 text-indigo-400" />
                <span>后台</span>
              </button>
              <button
                onClick={onOpenSitemap}
                className="text-[11px] text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1"
                title="全站架构图走查"
              >
                <Map className="h-3 w-3 text-blue-400" />
                <span>架构</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <div className="flex md:hidden overflow-x-auto border-t border-white/10 bg-black/40 px-4 py-2 gap-4 text-xs font-medium text-slate-300 scrollbar-none">
        {navLinks.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`whitespace-nowrap ${
              currentTab === item.id ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isZh ? item.labelZh : item.labelEn}
          </button>
        ))}
        <button
          onClick={() => onNavigate('studio')}
          className="whitespace-nowrap text-indigo-400 ml-auto"
        >
          后台
        </button>
      </div>
    </header>
  );
};
