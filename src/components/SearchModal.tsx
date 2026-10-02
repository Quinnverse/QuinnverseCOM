import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useRouter } from '../utils/router';
import { PRODUCTS, PICKS, LAB_EXPERIMENTS, JOURNAL_ARTICLES, RESOURCES } from '../data/database';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResultItem {
  id: string;
  type: 'PRODUCT' | 'PICK' | 'LAB' | 'JOURNAL' | 'RESOURCE';
  title: string;
  subtitle: string;
  url: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { navigate } = useRouter();

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Global keydown for ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Compile unified searchable items
  const allItems: SearchResultItem[] = useMemo(() => {
    const items: SearchResultItem[] = [];

    // Products
    PRODUCTS.forEach((p) => {
      items.push({
        id: p.id,
        type: 'PRODUCT',
        title: p.name,
        subtitle: p.tagline,
        url: p.family === 'GLOBAL_PRODUCT' ? `/products/${p.slug}` : (p.externalUrl || `/products`),
      });
    });

    // Picks
    PICKS.forEach((pick) => {
      items.push({
        id: pick.id,
        type: 'PICK',
        title: `${pick.name} (${pick.category})`,
        subtitle: `${pick.evidenceLevel} · ${pick.summary}`,
        url: `/picks/${pick.slug}`,
      });
    });

    // Lab
    LAB_EXPERIMENTS.forEach((exp) => {
      items.push({
        id: exp.id,
        type: 'LAB',
        title: `${exp.slug.toUpperCase()}: ${exp.title}`,
        subtitle: `${exp.status} · ${exp.hypothesis}`,
        url: `/lab/${exp.slug}`,
      });
    });

    // Journal
    JOURNAL_ARTICLES.forEach((art) => {
      items.push({
        id: art.id,
        type: 'JOURNAL',
        title: art.title,
        subtitle: `${art.category} · ${art.excerpt}`,
        url: `/journal/${art.slug}`,
      });
    });

    // Resources
    RESOURCES.forEach((res) => {
      items.push({
        id: res.id,
        type: 'RESOURCE',
        title: res.title,
        subtitle: `${res.type} · ${res.summary}`,
        url: `/resources/${res.slug}`,
      });
    });

    return items;
  }, []);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return allItems.slice(0, 8);

    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [query, allItems]);

  const handleSelect = (url: string) => {
    onClose();
    if (url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      navigate(url);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(results.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex].url);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-slate-900/40 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-slate-100 bg-slate-50/70">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="搜索产品、实测工具、实验记录或手记..."
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {results.length > 0 ? (
            results.map((item, index) => {
              const isSelected = index === selectedIndex;
              const typeBadge = 
                item.type === 'PRODUCT' ? 'text-blue-700 bg-blue-50 border-blue-200' :
                item.type === 'PICK' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' :
                item.type === 'LAB' ? 'text-amber-700 bg-amber-50 border-amber-200' :
                item.type === 'JOURNAL' ? 'text-purple-700 bg-purple-50 border-purple-200' :
                'text-indigo-700 bg-indigo-50 border-indigo-200';

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.url)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all text-left ${
                    isSelected ? 'bg-slate-100/90 border border-slate-200 shadow-2xs' : 'hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="space-y-1 pr-4 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${typeBadge}`}>
                        {item.type}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">
                      {item.subtitle}
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center text-slate-400">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-xs text-slate-500 space-y-1">
              <p className="font-semibold text-slate-700">未找到匹配的公开资产</p>
              <p className="text-[11px] text-slate-400">
                可尝试搜索工具名（如 Cursor、n8n）或场景关键词。
              </p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-mono text-[10px] shadow-2xs">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-mono text-[10px] shadow-2xs">↓</kbd>
              <span>导航</span>
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-mono text-[10px] shadow-2xs">
                <CornerDownLeft className="w-2.5 h-2.5 inline" />
              </kbd>
              <span>打开</span>
            </span>
          </div>
          <div>
            <span>ESC 关闭</span>
          </div>
        </div>
      </div>
    </div>
  );
};
