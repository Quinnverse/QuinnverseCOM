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
    <div className="py-16 sm:py-20 bg-[#080B12] text-left">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          to="/journal"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回手记目录 (Journal)</span>
        </Link>

        {/* Article Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-sky-400 font-bold">{article.category}</span>
            <span className="text-slate-700">·</span>
            <span>{article.date}</span>
            <span className="text-slate-700">·</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
            {article.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 italic border-l-2 border-sky-400 pl-4 py-1 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Article Body */}
        <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-6 whitespace-pre-line font-normal">
          {article.content}
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
          <Tag className="w-3.5 h-3.5 text-sky-400 shrink-0" />
          <div className="flex flex-wrap gap-2">
            {article.tags.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded bg-slate-800 text-slate-300">
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Related Assets (Content Graph) */}
        {(relatedPicks.length > 0 || relatedProducts.length > 0) && (
          <div className="rounded-2xl border border-slate-800 bg-[#0C1220] p-6 space-y-4">
            <div className="text-xs font-mono text-cyan-400 font-bold uppercase">
              RELATED ASSETS 本文关联的工具与产品
            </div>
            <div className="space-y-2">
              {relatedPicks.map((pick) => (
                <Link
                  key={pick.id}
                  to={`/picks/${pick.slug}`}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-[#090D17] hover:border-slate-700 transition-colors text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-white flex items-center gap-2">
                      <span>[PICK] {pick.name}</span>
                      <span className="font-mono text-[10px] text-emerald-400">{pick.evidenceLevel}</span>
                    </div>
                    <div className="text-slate-400 line-clamp-1">{pick.summary}</div>
                  </div>
                  <span className="text-cyan-400 font-semibold shrink-0 ml-3">查看实测 →</span>
                </Link>
              ))}

              {relatedProducts.map((prod) => (
                <Link
                  key={prod.id}
                  to={`/products/${prod.slug}`}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-[#090D17] hover:border-slate-700 transition-colors text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-white flex items-center gap-2">
                      <span>[PRODUCT] {prod.name}</span>
                      <span className="font-mono text-[10px] text-cyan-400">{prod.stage}</span>
                    </div>
                    <div className="text-slate-400 line-clamp-1">{prod.tagline}</div>
                  </div>
                  <span className="text-cyan-400 font-semibold shrink-0 ml-3">查看产品 →</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs">
          <Link to="/journal" className="text-slate-400 hover:text-white transition-colors">
            ← 返回手记目录
          </Link>
          <Link to="/resources" className="text-cyan-400 hover:text-cyan-300 font-semibold">
            查看实用手册与资源 →
          </Link>
        </div>
      </div>
    </div>
  );
};
