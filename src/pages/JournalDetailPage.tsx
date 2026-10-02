import React from 'react';
import { ArrowLeft, BookOpen, Tag, ArrowRight } from 'lucide-react';
import { Link, useRouter } from '../utils/router';
import { JOURNAL_ARTICLES, PICKS, PRODUCTS } from '../data/database';

export const JournalDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { navigate } = useRouter();
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug) || JOURNAL_ARTICLES[0];
  const relatedPicks = PICKS.filter((p) => article.relatedPicks?.includes(p.slug));
  const relatedProducts = PRODUCTS.filter((p) => article.relatedProducts?.includes(p.slug));

  return (
    <div className="py-16 sm:py-24 bg-[#F8FAFC] text-left">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          to="/journal"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回手记目录 (Journal)</span>
        </Link>

        {/* Article Header */}
        <div className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <span className="text-purple-700 font-bold bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">{article.category}</span>
            <span className="text-slate-300">·</span>
            <span>{article.date}</span>
            <span className="text-slate-300">·</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-700 italic border-l-2 border-slate-900 pl-4 py-1 leading-relaxed font-medium">
            {article.excerpt}
          </p>
        </div>

        {/* Article Body */}
        <div className="text-sm sm:text-base text-slate-800 leading-relaxed space-y-6 whitespace-pre-line font-normal">
          {article.content}
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-slate-200 flex items-center gap-2 text-xs text-slate-500">
          <Tag className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <div className="flex flex-wrap gap-2">
            {article.tags.map((t) => (
              <span key={t} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium">
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Related Assets (Content Graph) */}
        {(relatedPicks.length > 0 || relatedProducts.length > 0) && (
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 space-y-4 shadow-sm">
            <div className="text-xs font-mono text-slate-900 font-bold uppercase tracking-wider">
              RELATED ASSETS 本文关联的工具与产品
            </div>
            <div className="space-y-2.5">
              {relatedPicks.map((pick) => (
                <Link
                  key={pick.id}
                  to={`/picks/${pick.slug}`}
                  className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:border-slate-400 transition-colors text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-950 flex items-center gap-2">
                      <span>[PICK] {pick.name}</span>
                      <span className="font-mono text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold">{pick.evidenceLevel}</span>
                    </div>
                    <div className="text-slate-600 line-clamp-1">{pick.summary}</div>
                  </div>
                  <span className="text-slate-900 font-bold shrink-0 ml-3">查看实测 →</span>
                </Link>
              ))}

              {relatedProducts.map((prod) => (
                <Link
                  key={prod.id}
                  to={`/products/${prod.slug}`}
                  className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:border-slate-400 transition-colors text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-950 flex items-center gap-2">
                      <span>[PRODUCT] {prod.name}</span>
                      <span className="font-mono text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 font-bold">{prod.stage}</span>
                    </div>
                    <div className="text-slate-600 line-clamp-1">{prod.tagline}</div>
                  </div>
                  <span className="text-slate-900 font-bold shrink-0 ml-3">查看产品 →</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs font-bold">
          <Link to="/journal" className="text-slate-500 hover:text-slate-900 transition-colors">
            ← 返回手记目录
          </Link>
          <Link to="/resources" className="text-slate-900 hover:underline">
            查看实用手册与资源 →
          </Link>
        </div>
      </div>
    </div>
  );
};
