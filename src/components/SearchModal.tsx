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
  typeLabel: string;
  title: string;
  subtitle: string;
  url: string;
}

const TYPE_META: Record<string, string> = {
  PRODUCT: '产品',
  PICK: '实测',
  LAB: '实验',
  JOURNAL: '手记',
  RESOURCE: '资源',
};

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { navigate } = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const allItems: SearchResultItem[] = useMemo(() => {
    const items: SearchResultItem[] = [];

    PRODUCTS.forEach((p) => {
      items.push({
        id: p.id,
        type: 'PRODUCT',
        typeLabel: TYPE_META.PRODUCT,
        title: p.name,
        subtitle: p.tagline,
        url: `/products/${p.slug}`,
      });
    });

    PICKS.forEach((pick) => {
      items.push({
        id: pick.id,
        type: 'PICK',
        typeLabel: TYPE_META.PICK,
        title: pick.name,
        subtitle: `${pick.category} · ${pick.summary}`,
        url: `/picks/${pick.slug}`,
      });
    });

    LAB_EXPERIMENTS.forEach((exp) => {
      items.push({
        id: exp.id,
        type: 'LAB',
        typeLabel: TYPE_META.LAB,
        title: exp.title,
        subtitle: exp.slug,
        url: `/lab/${exp.slug}`,
      });
    });

    JOURNAL_ARTICLES.forEach((art) => {
      items.push({
        id: art.id,
        type: 'JOURNAL',
        typeLabel: TYPE_META.JOURNAL,
        title: art.title,
        subtitle: `${art.date} · ${art.excerpt}`,
        url: `/journal/${art.slug}`,
      });
    });

    RESOURCES.forEach((res) => {
      items.push({
        id: res.id,
        type: 'RESOURCE',
        typeLabel: TYPE_META.RESOURCE,
        title: res.title,
        subtitle: res.summary,
        url: `/resources/${res.slug}`,
      });
    });

    return items;
  }, []);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return allItems.slice(0, 8);
    return allItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.typeLabel.includes(q)
      )
      .slice(0, 10);
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
      if (results[selectedIndex]) handleSelect(results[selectedIndex].url);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 px-4 pt-20 backdrop-blur-sm sm:pt-28"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[75vh] w-full max-w-2xl flex-col overflow-hidden rounded-card border border-line bg-surface"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 搜索框 */}
        <div className="flex items-center border-b border-line bg-surface-2 px-5 py-4">
          <Search className="mr-3 h-5 w-5 shrink-0 text-faint" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="搜索产品、实测工具、实验或手记…"
            className="w-full bg-transparent text-[14.5px] text-ink placeholder:text-faint focus:outline-none"
          />
          <button
            onClick={onClose}
            aria-label="关闭搜索"
            className="cursor-pointer rounded-chip p-1.5 text-faint transition-colors hover:bg-line-soft hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* 结果 */}
        <div className="flex-1 space-y-1 overflow-y-auto p-3">
          {results.length > 0 ? (
            results.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.url)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`flex w-full items-center justify-between gap-4 rounded-chip border p-3.5 text-left transition-colors ${
                  index === selectedIndex
                    ? 'border-line bg-surface-2'
                    : 'border-transparent hover:bg-surface-2'
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="chip !py-0.5 !px-1.5 !text-[10px]">{item.typeLabel}</span>
                    <span className="truncate text-[14px] font-medium text-ink">{item.title}</span>
                  </div>
                  <p className="mt-1 truncate text-[12px] text-muted">{item.subtitle}</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-faint" />
              </button>
            ))
          ) : (
            <div className="px-6 py-14 text-center">
              <p className="text-[14px] font-medium text-ink">没有匹配的内容</p>
              <p className="mt-2 text-[12.5px] text-muted">
                试试工具名（如 Cursor、n8n）或场景关键词。
              </p>
            </div>
          )}
        </div>

        {/* 快捷键提示 */}
        <div className="flex items-center justify-between border-t border-line bg-surface-2 px-5 py-3 text-[11.5px] text-muted">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <kbd className="rounded-chip border border-line bg-surface px-1.5 py-0.5 data">↑</kbd>
              <kbd className="rounded-chip border border-line bg-surface px-1.5 py-0.5 data">↓</kbd>
              导航
            </span>
            <span className="flex items-center gap-1.5">
              <kbd className="rounded-chip border border-line bg-surface px-1.5 py-0.5">
                <CornerDownLeft className="inline h-2.5 w-2.5" />
              </kbd>
              打开
            </span>
          </div>
          <span>Esc 关闭</span>
        </div>
      </div>
    </div>
  );
};