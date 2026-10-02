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

const AppContent: React.FC = () => {
  const { path } = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => {
    let title = path === '/en' ? 'Quinnverse — Independent Product Studio' : 'Quinnverse — 独立产品工作室';
    if (path.startsWith('/products/')) title = 'Product — Built by Quinnverse';
    else if (path === '/products') title = 'Products — Built by Quinnverse';
    else if (path.startsWith('/picks/')) title = '实测与避坑 — Quinnverse Picks';
    else if (path === '/picks') title = 'Picks 实测工具库 — Quinnverse';
    else if (path === '/finder') title = 'Quinnverse Finder — 需求诊断与工具筛选';
    else if (path.startsWith('/lab/')) title = 'Lab 实验详情 — Quinnverse Lab';
    else if (path === '/lab') title = 'Quinnverse Lab — Build · Experiment · Learn';
    else if (path.startsWith('/journal/')) title = 'Journal 深度手记 — Quinnverse';
    else if (path === '/journal') title = 'Quinnverse Journal — Field Notes & Logs';
    else if (path.startsWith('/resources/')) title = 'Resources — Quinnverse';
    else if (path === '/resources') title = 'Quinnverse Resources';
    else if (path === '/about') title = 'About Quinnverse';
    else if (path === '/work-with-us') title = 'Work with Quinnverse';
    else if (path === '/contact') title = 'Contact & Feedback — Quinnverse';
    document.title = title;
  }, [path]);

  const renderCurrentPage = () => {
    if (path === '/' || path === '') return <HomePage />;
    if (path === '/en') return <EnglishHomePage />;
    if (path === '/products') return <ProductsPage />;
    if (path === '/picks') return <PicksPage />;
    if (path === '/finder') return <FinderPage />;
    if (path === '/lab') return <LabPage />;
    if (path === '/journal') return <JournalPage />;
    if (path === '/resources') return <ResourcesPage />;
    if (path === '/about') return <AboutPage />;
    if (path === '/work-with-us') return <WorkWithUsPage />;
    if (path === '/contact') return <ContactPage />;
    if (path === '/disclosure') return <DisclosurePage />;
    if (path.startsWith('/products/')) return <ProductDetailPage slug={path.replace('/products/', '').split('/')[0]} />;
    if (path.startsWith('/picks/')) return <PickDetailPage slug={path.replace('/picks/', '').split('/')[0]} />;
    if (path.startsWith('/lab/')) return <LabDetailPage slug={path.replace('/lab/', '').split('/')[0]} />;
    if (path.startsWith('/journal/')) return <JournalDetailPage slug={path.replace('/journal/', '').split('/')[0]} />;
    if (path.startsWith('/resources/')) return <ResourceDetailPage slug={path.replace('/resources/', '').split('/')[0]} />;
    return <NotFoundPage />;
  };

  return <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-[#0B132B] selection:text-white"><Navbar onOpenSearch={() => setSearchOpen(true)} /><main className="flex-1">{renderCurrentPage()}</main><Footer /><SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} /></div>;
};
export default function App() { return <RouterProvider><AppContent /></RouterProvider>; }
