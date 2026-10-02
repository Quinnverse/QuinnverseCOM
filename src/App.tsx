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
    const PRODUCT_NAMES: Record<string, string> = {
      'job-application-copilot': '海外求职助手 Job OS',
      'tingmo': '听默 TingMo',
      'weread-dashboard': '微信读书数据看板',
      'cloze-recitation': '完形填空背诵记忆',
    };
    const PICK_NAMES: Record<string, string> = {
      cursor: 'Cursor', n8n: 'n8n', obsidian: 'Obsidian',
      dify: 'Dify', comfyui: 'ComfyUI', gemini: 'Google Gemini',
    };
    const JOURNAL_NAMES: Record<string, string> = {
      'ai-workflow-specs': 'AI 编码规则文件',
      'building-tingmo': '把专业课变成播客',
      'weread-data-pipeline': '微信读书数据管线',
      'active-recall-recitation': '主动回忆与背诵',
      'anti-slop-guide': '独立工具去油腻指南',
    };

    const seg = path.split('/').filter(Boolean);
    let title = 'Quinnverse — 独立产品工作室';

    if (seg.length === 0) {
      title = 'Quinnverse — 独立产品工作室';
    } else if (seg[0] === 'products') {
      title = seg[1]
        ? `${PRODUCT_NAMES[seg[1]] ?? seg[1]} — Quinnverse 自研产品`
        : '自研产品 — Quinnverse';
    } else if (seg[0] === 'picks') {
      title = seg[1]
        ? `${PICK_NAMES[seg[1]] ?? seg[1]} 实测与避坑 — Quinnverse Picks`
        : '精选实测库 — Quinnverse Picks';
    } else if (seg[0] === 'finder') {
      title = '需求诊断器 — 说清约束，我帮你排除';
    } else if (seg[0] === 'lab') {
      title = seg[1] ? '实验详情 — Quinnverse Lab' : '实验室 — 进行中的实验';
    } else if (seg[0] === 'journal') {
      title = seg[1]
        ? `${JOURNAL_NAMES[seg[1]] ?? seg[1]} — Quinnverse 手记`
        : '深度手记 — Quinnverse Journal';
    } else if (seg[0] === 'resources') {
      title = seg[1] ? '资源详情 — Quinnverse 资源库' : '实用手册与配方 — Quinnverse';
    } else if (seg[0] === 'about') {
      title = '关于 Quinnverse — 独立产品工作室';
    } else if (seg[0] === 'work-with-us') {
      title = '合作开发 — 与 Quinnverse 一起做';
    } else if (seg[0] === 'contact') {
      title = '联系与反馈 — Quinnverse';
    } else if (seg[0] === 'disclosure') {
      title = '商业透明与返佣政策 — Quinnverse';
    } else {
      title = '页面未找到 — Quinnverse';
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
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
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
