import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowUpRight } from 'lucide-react';
import { useRouter, Link } from '../utils/router';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { path } = useRouter();

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearch]);

  const navLinks = [
    { label: '首页', href: '/' },
    { label: '自研产品', href: '/products' },
    { label: '精选实测', href: '/picks' },
    { label: '前沿实验室', href: '/lab' },
    { label: '深度手记', href: '/journal' },
    { label: '关于我们', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all shadow-2xs">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Wordmark */}
        <Link 
          to="/" 
          className="font-display text-xl sm:text-2xl font-black tracking-tight text-slate-900 hover:text-slate-700 transition-colors flex items-center gap-2"
        >
          <span>QUINNVERSE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mb-0.5" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-600">
          {navLinks.map((link) => {
            const isActive = link.href === '/' ? path === '/' : path.startsWith(link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`py-1 relative transition-colors ${
                  isActive ? 'text-slate-950 font-black' : 'hover:text-slate-900 text-slate-600'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-blue-600" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions: Search & Pill Button */}
        <div className="flex items-center gap-3">
          {/* Quick Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200/80 rounded-full transition-colors cursor-pointer"
            title="全局搜索 (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-700" />
            <span className="hidden sm:inline font-mono text-[11px] text-slate-500">⌘K</span>
          </button>

          {/* Work with Quinnverse primary CTA - Warm refined pill button */}
          <Link
            to="/work-with-us"
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-blue-600 rounded-full transition-all shadow-xs hover:shadow-md whitespace-nowrap active:scale-98"
          >
            <span>合作交流</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
            aria-label="切换菜单"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 py-5 space-y-4 shadow-lg">
          <div className="grid grid-cols-2 gap-2 text-sm font-bold">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3.5 py-2.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/finder"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors"
            >
              需求诊断器
            </Link>
            <Link
              to="/resources"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              实用手册与资源
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              to="/work-with-us"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-1.5 px-5 py-3 text-xs font-bold text-white bg-slate-900 hover:bg-blue-600 rounded-full shadow-sm"
            >
              <span>与工作室交流</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-1 font-medium">
              <Link to="/disclosure" onClick={() => setMobileMenuOpen(false)} className="hover:text-slate-800">
                商业返佣政策
              </Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-slate-800">
                联系与反馈
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
