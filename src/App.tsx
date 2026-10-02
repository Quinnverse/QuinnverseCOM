import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SitemapModal } from './components/SitemapModal';

// Pages
import { HomePage } from './components/pages/HomePage';
import { ProductsPage } from './components/pages/ProductsPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { AgentPage } from './components/pages/AgentPage';
import { TestedPage } from './components/pages/TestedPage';
import { LabPage } from './components/pages/LabPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { StudioPage } from './components/pages/StudioPage';

// Data & types
import { Language, ToolItem, ProductItem, LabPost } from './types';
import { storageService } from './services/storageService';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('job-application-copilot');
  const [lang, setLang] = useState<Language>('zh');
  const [isSitemapOpen, setIsSitemapOpen] = useState(false);

  // Dynamic Data
  const [tools, setTools] = useState<ToolItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [labPosts, setLabPosts] = useState<LabPost[]>([]);

  // Modals for deep detail inspection
  const [selectedToolModal, setSelectedToolModal] = useState<ToolItem | null>(null);
  const [selectedPostModal, setSelectedPostModal] = useState<LabPost | null>(null);

  const refreshData = () => {
    setTools(storageService.getTools());
    setProducts(storageService.getProducts());
    setLabPosts(storageService.getLabPosts());
  };

  useEffect(() => {
    refreshData();

    // Listen to local storage changes
    const handler = () => refreshData();
    window.addEventListener('quinnverse-data-updated', handler);
    return () => window.removeEventListener('quinnverse-data-updated', handler);
  }, []);

  const handleNavigate = (tab: string, productId?: string) => {
    if (productId) {
      setSelectedProductId(productId);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'zh' ? 'en' : 'zh'));
  };

  // Find active product for detail view
  const activeProduct =
    products.find((p) => p.slug === selectedProductId || p.id === selectedProductId) ||
    products[0];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* 3-Zone Clean Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenSitemap={() => setIsSitemapOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            lang={lang}
            tools={tools}
            products={products}
            labPosts={labPosts}
            onSelectTool={(tool) => setSelectedToolModal(tool)}
            onSelectPost={(post) => setSelectedPostModal(post)}
          />
        )}

        {currentTab === 'products' && (
          <ProductsPage
            onNavigate={handleNavigate}
            lang={lang}
            products={products}
          />
        )}

        {currentTab === 'product-copilot' && activeProduct && (
          <ProductDetailPage
            onNavigate={handleNavigate}
            lang={lang}
            product={activeProduct}
          />
        )}

        {(currentTab === 'agent' || currentTab === 'tested') && (
          <TestedPage
            onNavigate={handleNavigate}
            lang={lang}
            tools={tools}
            selectedToolModal={selectedToolModal}
            onOpenToolModal={(tool) => setSelectedToolModal(tool)}
            onCloseToolModal={() => setSelectedToolModal(null)}
          />
        )}

        {currentTab === 'lab' && (
          <LabPage
            onNavigate={handleNavigate}
            lang={lang}
            labPosts={labPosts}
            selectedPostModal={selectedPostModal}
            onOpenPostModal={(post) => setSelectedPostModal(post)}
            onClosePostModal={() => setSelectedPostModal(null)}
          />
        )}

        {currentTab === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            lang={lang}
          />
        )}

        {currentTab === 'contact' && (
          <ContactPage
            onNavigate={handleNavigate}
            lang={lang}
          />
        )}

        {currentTab === 'studio' && (
          <StudioPage
            onNavigate={handleNavigate}
            lang={lang}
            tools={tools}
            products={products}
            labPosts={labPosts}
            onRefreshData={refreshData}
          />
        )}
      </main>

      {/* Quiet Refined Footer (for subpages) */}
      {currentTab !== 'home' && <Footer onNavigate={handleNavigate} lang={lang} />}

      {/* Sitemap & User Flows Architectural Modal */}
      <SitemapModal
        isOpen={isSitemapOpen}
        onClose={() => setIsSitemapOpen(false)}
        onNavigate={handleNavigate}
        lang={lang}
      />
    </div>
  );
}
