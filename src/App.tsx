import React, { useState, useEffect } from 'react';
import { RouterProvider, useRouter } from './utils/router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { EnglishHomePage } from './pages/EnglishHomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { PicksPage } from './pages/PicksPage';
import { PickDetailPage } from './pages/PickDetailPage';
import { FinderPage } from './pages/FinderPage';
import { LabPage } from './pages/LabPage';
import { LabDetailPage } from './pages/LabDetailPage';
import { JournalPage } from './pages/JournalPage';
import { JournalDetailPage } from './pages/JournalDetailPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ResourceDetailPage } from './pages/ResourceDetailPage';
import { AboutPage } from './pages/AboutPage';
import { WorkWithUsPage } from './pages/WorkWithUsPage';
import { ContactPage } from './pages/ContactPage';
import { DisclosurePage } from './pages/DisclosurePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { localeFromPath, stripLocale } from './i18n/locale';

const AppContent: React.FC = () => {
  const { path } = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const locale = localeFromPath(path);
  const route = stripLocale(path);

  useEffect(() => {
    const en = locale === 'en';
    const titles: Record<string, string> = {
      '/': en ? 'Quinnverse — Independent Product Studio' : 'Quinnverse — 独立产品工作室',
      '/products': en ? 'Products — Quinnverse' : '自研产品 — Quinnverse',
      '/picks': en ? 'Tested Tools — Quinnverse' : '精选实测 — Quinnverse',
      '/finder': en ? 'Finder — Quinnverse' : '需求诊断器 — Quinnverse',
      '/lab': en ? 'Lab — Quinnverse' : '实验室 — Quinnverse',
      '/about': en ? 'About — Quinnverse' : '关于 Quinnverse',
      '/contact': en ? 'Contact — Quinnverse' : '联系与反馈 — Quinnverse',
      '/work-with-us': en ? 'Work with Quinnverse' : '与 Quinnverse 合作',
      '/disclosure': en ? 'Disclosure — Quinnverse' : '商业透明政策 — Quinnverse',
    };
    document.documentElement.lang = en ? 'en' : 'zh-CN';
    document.title = titles[route] || (en ? 'Quinnverse' : 'Quinnverse — 独立产品工作室');
  }, [locale, route]);

  const renderCurrentPage = () => {
    const en = locale === 'en';
    if (route === '/') return en ? <EnglishHomePage /> : <HomePage />;
    if (route === '/products') return <ProductsPage locale={locale} />;
    if (route === '/picks') return <PicksPage locale={locale} />;
    if (route === '/finder') return <FinderPage />;
    if (route === '/lab') return <LabPage locale={locale} />;
    if (route === '/journal') return <JournalPage />;
    if (route === '/resources') return <ResourcesPage />;
    if (route === '/about') return <AboutPage />;
    if (route === '/work-with-us') return <WorkWithUsPage />;
    if (route === '/contact') return <ContactPage />;
    if (route === '/disclosure') return <DisclosurePage />;
    if (route.startsWith('/products/')) return <ProductDetailPage slug={route.replace('/products/', '').split('/')[0]} locale={locale} />;
    if (route.startsWith('/picks/')) return <PickDetailPage slug={route.replace('/picks/', '').split('/')[0]} />;
    if (route.startsWith('/lab/')) return <LabDetailPage slug={route.replace('/lab/', '').split('/')[0]} />;
    if (route.startsWith('/journal/')) return <JournalDetailPage slug={route.replace('/journal/', '').split('/')[0]} />;
    if (route.startsWith('/resources/')) return <ResourceDetailPage slug={route.replace('/resources/', '').split('/')[0]} />;
    return <NotFoundPage />;
  };

  return <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-[#0B132B] selection:text-white"><Navbar onOpenSearch={() => setSearchOpen(true)} /><main className="flex-1">{renderCurrentPage()}</main><Footer /><SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} /></div>;
};
export default function App() { return <RouterProvider><AppContent /></RouterProvider>; }
