import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowUpRight } from 'lucide-react';
import { useRouter, Link } from '../utils/router';

interface NavbarProps {
  onOpenSearch: () => void;
}

const NAV_LINKS = [
  { label: '首页', href: '/' },
  { label: '自研产品', href: '/products' },
  { label: '精选实测', href: '/picks' },
  { label: '实验室', href: '/lab' },
  { label: '手记', href: '/journal' },
  { label: '资源库', href: '/resources' },
  { label: '关于', href: '/about' },
];

const SECONDARY_LINKS = [
  { label: '需求诊断器', href: '/finder' },
  { label: '合作交流', href: '/work-with-us' },
  { label: '商业披露', href: '/disclosure' },
  { label: '联系反馈', href: '/contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { path } = useRouter();

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

  // 路由切换后自动收起移动端菜单
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [path]);

  const isActive = (href: string) =>
    href === '/' ? path === '/' : path === href || path.startsWith(href + '/');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-line bg-surface/92 backdrop-blur-md">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        {/* 品牌 */}
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Quinnverse 首页">
          <span className="text-[17px] font-extrabold tracking-[-0.03em] text-ink">QUINNVERSE</span>
          <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
        </Link>

        {/* 桌面导航 */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`relative py-1 text-[13.5px] transition-colors ${
                isActive(link.href)
                  ? 'text-ink font-semibold'
                  : 'text-muted hover:text-ink font-medium'
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-brand-600" />
              )}
            </Link>
          ))}
        </nav>

        {/* 右侧操作区 */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenSearch}
            title="全局搜索 (⌘K)"
            aria-label="打开全局搜索"
            className="hidden sm:flex items-center gap-2 h-8 px-2.5 rounded-chip border border-line bg-surface text-muted hover:border-ink hover:text-ink transition-colors cursor-pointer"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="data text-faint">⌘K</span>
          </button>

          <Link
            to="/work-with-us"
            className="hidden sm:inline-flex btn btn-primary h-9 !py-0 !px-4 text-[13px]"
          >
            合作交流
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="lg:hidden p-2 -mr-2 text-ink-soft hover:text-ink cursor-pointer"
            aria-label={mobileMenuOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* 移动端抽屉 */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-line bg-surface">
          <div className="container-site py-5">
            <div className="grid grid-cols-2 gap-1">
              {[...NAV_LINKS, ...SECONDARY_LINKS].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`rounded-chip px-3 py-2.5 text-[13.5px] transition-colors ${
                    isActive(link.href)
                      ? 'bg-brand-50 text-brand-800 font-semibold'
                      : 'text-ink-soft hover:bg-surface-2 font-medium'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-4 border-t border-line-soft pt-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="btn btn-outline w-full"
              >
                <Search className="h-4 w-4" />
                全局搜索 ⌘K
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};