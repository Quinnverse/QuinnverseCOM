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
    <div className="py-16 sm:py-24 bg-[#F8FAFC] text-left">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-block text-xs font-bold font-mono tracking-wider uppercase text-purple-800 bg-purple-50 border border-purple-200 px-3.5 py-1 rounded-full">
            FIELD NOTES & LOGS
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black text-slate-950 tracking-tight">
            Quinnverse Journal
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            关于独立构建、工具实测复盘、工程切片与去油腻思考的深度长文记录。
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl max-w-fit">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
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
                className="group rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 hover:border-slate-400 hover:shadow-xl transition-all flex flex-col justify-between shadow-2xs text-left"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                    <span className="text-purple-700 font-bold bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">{art.category}</span>
                    <span className="text-slate-300">·</span>
                    <span>{art.date}</span>
                    <span className="text-slate-300">·</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-slate-950 group-hover:text-blue-600 transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5 text-[11px] text-slate-500">
                    {art.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-blue-600">
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
