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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/80 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-2xl rounded-2xl border border-slate-800 bg-[#0C1220] shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-[#090D17]">
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
            className="w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {results.length > 0 ? (
            results.map((item, index) => {
              const isSelected = index === selectedIndex;
              const typeColor = 
                item.type === 'PRODUCT' ? 'text-cyan-400 bg-cyan-950/60 border-cyan-800/40' :
                item.type === 'PICK' ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800/40' :
                item.type === 'LAB' ? 'text-amber-400 bg-amber-950/60 border-amber-800/40' :
                item.type === 'JOURNAL' ? 'text-sky-400 bg-sky-950/60 border-sky-800/40' :
                'text-indigo-400 bg-indigo-950/60 border-indigo-800/40';

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.url)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors text-left ${
                    isSelected ? 'bg-slate-800/90 border border-slate-700' : 'hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <div className="space-y-1 pr-4 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${typeColor}`}>
                        {item.type}
                      </span>
                      <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">
                      {item.subtitle}
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center text-slate-500">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-xs text-slate-400 space-y-1">
              <p>未找到匹配的公开资产。</p>
              <p className="text-[11px] text-slate-500">
                可尝试搜索工具名（如 Cursor、n8n）或需求关键词。
              </p>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-slate-800/80 bg-[#090D17] flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">↓</kbd>
              <span>导航</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
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
