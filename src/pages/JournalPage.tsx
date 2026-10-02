import React, { useState, useMemo } from 'react';
import { BookOpen, ArrowRight, Tag } from 'lucide-react';
import { Link } from '../utils/router';
import { JOURNAL_ARTICLES } from '../data/database';

export const JournalPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'BUILD LOG', 'ENGINEERING', 'CRITIQUE'];

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'ALL') return JOURNAL_ARTICLES;
    return JOURNAL_ARTICLES.filter((a) => a.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="py-16 sm:py-20 bg-[#080B12] text-left">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-mono font-semibold text-sky-400 tracking-wider">
            FIELD NOTES & LOGS
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            Quinnverse Journal
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            关于独立构建、工具实测复盘、工程切片与去油腻思考的深度长文记录。
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/80 border border-slate-800 rounded-xl max-w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-cyan-300 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'ALL' ? '全部文章' : cat}
            </button>
          ))}
        </div>

        {/* Articles List */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((art) => (
              <Link
                key={art.id}
                to={`/journal/${art.slug}`}
                className="group rounded-2xl border border-slate-800 bg-[#0C1220] p-6 sm:p-7 hover:border-sky-500/50 hover:bg-[#0E1626] transition-all flex flex-col justify-between shadow-sm text-left"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <span className="text-sky-400 font-bold">{art.category}</span>
                    <span className="text-slate-700">·</span>
                    <span>{art.date}</span>
                    <span className="text-slate-700">·</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] text-slate-500">
                    {art.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-400">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-sky-400">
                  <span>阅读手记全文 →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
