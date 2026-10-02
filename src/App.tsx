import React, { useState, useEffect } from 'react';
import { RouterProvider, useRouter } from './utils/router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';

// Pages
import { HomePage } from './pages/HomePage';
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

  // Sync document title for SEO
  useEffect(() => {
    let title = 'Quinnverse — Independent Product Studio';
    if (path.startsWith('/products/')) {
      const slug = path.replace('/products/', '');
      title = `${slug.toUpperCase()} — Built by Quinnverse`;
    } else if (path === '/products') {
      title = 'Products — Built by Quinnverse';
    } else if (path.startsWith('/picks/')) {
      const slug = path.replace('/picks/', '');
      title = `${slug.toUpperCase()} 实测与避坑 — Quinnverse Picks`;
    } else if (path === '/picks') {
      title = 'Picks 实测工具库 — Tested & Recommended | Quinnverse';
    } else if (path === '/finder') {
      title = 'Quinnverse Finder — 需求诊断与工具筛选';
    } else if (path.startsWith('/lab/')) {
      title = 'Lab 实验详情 — Quinnverse Lab';
    } else if (path === '/lab') {
      title = 'Quinnverse Lab — Experiments in Progress';
    } else if (path.startsWith('/journal/')) {
      title = 'Journal 深度手记 — Quinnverse Journal';
    } else if (path === '/journal') {
      title = 'Quinnverse Journal — Field Notes & Logs';
    } else if (path.startsWith('/resources/')) {
      title = 'Resources 实用手册与技能 — Quinnverse';
    } else if (path === '/resources') {
      title = 'Quinnverse Resources — Reusable Guides & Skills';
    } else if (path === '/about') {
      title = 'About Quinnverse — Independent Product Studio';
    } else if (path === '/work-with-us') {
      title = 'Work with Quinnverse — Studio Collaboration';
    } else if (path === '/contact') {
      title = 'Contact & Feedback — Quinnverse';
    } else if (path === '/disclosure') {
      title = 'Commercial Transparency & Affiliate Policy — Quinnverse';
    }
    document.title = title;
  }, [path]);

  // Route Dispatcher
  const renderCurrentPage = () => {
    // Exact routes
    if (path === '/' || path === '') return <HomePage />;
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

    // Dynamic parameterized routes
    if (path.startsWith('/products/')) {
      const slug = path.replace('/products/', '').split('/')[0];
      return <ProductDetailPage slug={slug} />;
    }
    if (path.startsWith('/picks/')) {
      const slug = path.replace('/picks/', '').split('/')[0];
      return <PickDetailPage slug={slug} />;
    }
    if (path.startsWith('/lab/')) {
      const slug = path.replace('/lab/', '').split('/')[0];
      return <LabDetailPage slug={slug} />;
    }
    if (path.startsWith('/journal/')) {
      const slug = path.replace('/journal/', '').split('/')[0];
      return <JournalDetailPage slug={slug} />;
    }
    if (path.startsWith('/resources/')) {
      const slug = path.replace('/resources/', '').split('/')[0];
      return <ResourceDetailPage slug={slug} />;
    }

    // Default 404
    return <NotFoundPage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-[#0B132B] selection:text-white">
      {/* Top Navigation */}
      <Navbar onOpenSearch={() => setSearchOpen(true)} />

      {/* Main Page Body */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global ⌘K Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
