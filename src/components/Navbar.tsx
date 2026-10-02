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
    { label: 'Products', href: '/products' },
    { label: 'Picks', href: '/picks' },
    { label: 'Lab', href: '/lab' },
    { label: 'Journal', href: '/journal' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#080B12]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text wordmark */}
        <Link 
          to="/" 
          className="font-display text-xl font-extrabold tracking-tight text-white hover:text-cyan-400 transition-colors"
        >
          QUINNVERSE
        </Link>

        {/* Zone 2: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive = path === link.href || (link.href !== '/' && path.startsWith(link.href));
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`py-1 relative transition-colors ${
                  isActive ? 'text-white font-semibold' : 'hover:text-white text-slate-300'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-400 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 rounded-lg transition-colors cursor-pointer"
            title="全局搜索 (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline font-mono text-[11px] text-slate-500">⌘K</span>
          </button>

          {/* Work with Quinnverse primary CTA */}
          <Link
            to="/work-with-us"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-700/60 rounded-lg transition-colors whitespace-nowrap"
          >
            <span>Work with Quinnverse</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
            aria-label="切换菜单"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#0A0E18] px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/finder"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-cyan-300 hover:text-white hover:bg-slate-800 transition-colors font-medium"
            >
              Finder 需求诊断
            </Link>
            <Link
              to="/resources"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Resources 实用手册
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
            <Link
              to="/work-with-us"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm"
            >
              <span>Work with Quinnverse</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-950" />
            </Link>
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
              <Link to="/disclosure" onClick={() => setMobileMenuOpen(false)} className="hover:text-slate-300">
                商业与返佣政策
              </Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-slate-300">
                联系工作室
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
