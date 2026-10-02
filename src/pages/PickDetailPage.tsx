import React from 'react';
import { ArrowLeft, ExternalLink, Check, AlertTriangle, ShieldCheck, BookOpen } from 'lucide-react';
import { Link, useRouter } from '../utils/router';
import { PICKS, JOURNAL_ARTICLES } from '../data/database';

export const PickDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { navigate } = useRouter();
  const pick = PICKS.find((p) => p.slug === slug) || PICKS[0];
  const relatedJournal = JOURNAL_ARTICLES.filter((j) => pick.relatedJournal?.includes(j.slug));

  const badgeStyle =
    pick.evidenceLevel === 'DAILY DRIVER' ? 'text-emerald-800 bg-emerald-50 border-emerald-200' :
    pick.evidenceLevel === 'USED IN PROJECT' ? 'text-blue-800 bg-blue-50 border-blue-200' :
    pick.evidenceLevel === 'TESTED' ? 'text-amber-800 bg-amber-50 border-amber-200' :
    'text-slate-600 bg-slate-100 border-slate-200';

  return (
    <div className="py-16 sm:py-24 bg-[#F8FAFC] text-left">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          to="/picks"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回实测库 (Picks)</span>
        </Link>

        {/* Masthead */}
        <div className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-500 font-bold">{pick.category}</span>
            <span className="text-slate-300">·</span>
            <span className={`font-mono text-xs font-bold px-3 py-1 rounded-full border ${badgeStyle}`}>
              {pick.evidenceLevel}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500 font-mono text-[11px]">Last Tested: {pick.lastTested}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
            {pick.name}
          </h1>

          <p className="text-lg sm:text-xl font-bold text-slate-800">
            {pick.summary}
          </p>

          <p className="text-sm text-slate-600 leading-relaxed">
            {pick.whatItDoes}
          </p>
        </div>

        {/* What We Found (实测结论) */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
            01 / WHAT WE FOUND 实测结论
          </h2>
          <div className="rounded-3xl border border-slate-200/90 bg-white p-7 text-sm text-slate-800 leading-relaxed shadow-xs font-medium">
            {pick.whatWeFound}
          </div>
        </div>

        {/* Strengths vs Shortcomings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Where it works well */}
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-7 space-y-3">
            <div className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-700" />
              <span>WHERE IT WORKS WELL (核心亮点)</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800 font-medium">
              {pick.worksWell.map((w, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Where it falls short */}
          <div className="rounded-3xl border border-rose-200 bg-rose-50/40 p-7 space-y-3">
            <div className="text-xs font-mono font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-700" />
              <span>WHERE IT FALLS SHORT (局限与避坑)</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800 font-medium">
              {pick.fallsShort.map((f, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-700 font-bold">✕</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Best for vs Not for */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 space-y-2 shadow-xs">
            <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              BEST FOR (适合谁)
            </div>
            <div className="text-xs sm:text-sm text-slate-800 font-medium flex flex-wrap gap-2 pt-1">
              {pick.bestFor.map((b, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-slate-100 text-slate-800">
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 space-y-2 shadow-xs">
            <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              NOT FOR (劝退谁)
            </div>
            <div className="text-xs sm:text-sm text-rose-700 font-medium flex flex-wrap gap-2 pt-1">
              {pick.notFor.map((n, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800">
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing & Domestic Access */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
            02 / PRICING & ACCESS 费用与网络访问
          </h2>
          <div className="rounded-3xl border border-slate-200/90 bg-white p-7 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs shadow-xs">
            <div>
              <span className="text-slate-400 font-mono font-semibold uppercase">费用模式</span>
              <div className="font-bold text-slate-900 text-sm mt-1">{pick.pricingAccess.pricingModel}</div>
            </div>
            <div>
              <span className="text-slate-400 font-mono font-semibold uppercase">国内直连</span>
              <div className="font-bold text-slate-900 text-sm mt-1">{pick.pricingAccess.accessFromChina}</div>
            </div>
            <div>
              <span className="text-slate-400 font-mono font-semibold uppercase">定价说明</span>
              <div className="text-slate-600 mt-1">{pick.pricingAccess.pricingNote}</div>
            </div>
          </div>
        </div>

        {/* Alternatives */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
            03 / ALTERNATIVES 常见替代方案
          </h2>
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 flex flex-wrap items-center gap-3 text-xs shadow-2xs">
            <span className="text-slate-500 font-medium">如果不选它，可考虑：</span>
            {pick.alternatives.map((alt, i) => (
              <span key={i} className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 font-mono font-bold">
                {alt}
              </span>
            ))}
          </div>
        </div>

        {/* Related Journal Field Notes */}
        {relatedJournal.length > 0 && (
          <div className="space-y-3 pt-2">
            <h2 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
              04 / RELATED FIELD NOTES 相关实测手记
            </h2>
            <div className="space-y-2">
              {relatedJournal.map((art) => (
                <Link
                  key={art.id}
                  to={`/journal/${art.slug}`}
                  className="flex items-center justify-between p-4.5 rounded-2xl border border-slate-200 bg-white hover:border-slate-400 transition-colors shadow-2xs"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span className="text-xs sm:text-sm font-bold text-slate-900">{art.title}</span>
                  </div>
                  <span className="text-xs text-blue-600 font-semibold">阅读全文 →</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Affiliate Disclosure Box */}
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-xs text-slate-600 space-y-2">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>选品中立性与合作返佣说明</span>
          </div>
          <p className="leading-relaxed">
            {pick.affiliateRelationship ? (
              <span>本条目包含官方专属优惠或合作返佣链接。当您通过本链接使用相关服务时，Quinnverse 可能会从服务商处获得推广收益，用于支持服务器运营。商业关系与 Evidence Level 严格解耦，不影响上述缺点与劝退披露。</span>
            ) : (
              <span>该工具为独立自用实测收录，Quinnverse 与该服务商无任何商业合作或返佣关系。</span>
            )}
          </p>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <Link to="/picks" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
            ← 返回实测库
          </Link>

          <a
            href={pick.officialUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-[#0B132B] hover:bg-black rounded-full shadow-sm transition-all"
          >
            <span>访问官方网站 (Official)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
