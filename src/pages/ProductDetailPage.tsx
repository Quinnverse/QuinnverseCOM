import React from 'react';
import { ArrowLeft, ExternalLink, Check, ShieldAlert, BookOpen } from 'lucide-react';
import { Link, useRouter } from '../utils/router';
import { PRODUCTS, JOURNAL_ARTICLES } from '../data/database';

export const ProductDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { navigate } = useRouter();
  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const relatedJournal = JOURNAL_ARTICLES.filter((j) => product.relatedJournal?.includes(j.slug));

  return (
    <div className="py-16 sm:py-20 bg-[#080B12] text-left">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回产品矩阵 (Products)</span>
        </Link>

        {/* Product Masthead */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-mono text-cyan-400 font-bold">BUILT BY QUINNVERSE</span>
            <span className="text-slate-700">·</span>
            <span className="text-emerald-400 font-mono font-semibold bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
              Stage: {product.stage}
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            {product.name}
          </h1>

          <p className="text-base sm:text-xl font-semibold text-cyan-200 leading-relaxed">
            {product.tagline}
          </p>

          <p className="text-sm text-slate-300 leading-relaxed">
            {product.summary}
          </p>
        </div>

        {/* The Problem */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider font-mono text-xs text-cyan-400">
            01 / THE PROBLEM 针对的核心痛点
          </h2>
          <div className="rounded-xl border border-slate-800 bg-[#0C1220] p-6 text-sm text-slate-300 leading-relaxed space-y-3">
            <p>{product.problemSolved}</p>
            <p className="text-xs text-slate-400">
              在快节奏的海量岗位投递中，求职者大量的时间被浪费在机械重复输入完全相同的教育经历、工作时长和技能标签上，且很难追踪哪份申请对应了哪套材料版本。
            </p>
          </div>
        </div>

        {/* The Deterministic Workflow */}
        {product.workflow && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider font-mono text-xs text-cyan-400">
              02 / DETERMINISTIC WORKFLOW 确定性处理链路
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.workflow.map((step) => (
                <div key={step.step} className="rounded-xl border border-slate-800 bg-[#0C1220] p-5 space-y-2">
                  <div className="font-mono text-cyan-400 font-bold text-sm">{step.step}</div>
                  <div className="text-sm font-bold text-white">{step.title}</div>
                  <div className="text-xs text-slate-400 leading-relaxed">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Principles */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider font-mono text-xs text-cyan-400">
            03 / ENGINEERING PRINCIPLES 工程底线与准则
          </h2>
          <div className="rounded-xl border border-slate-800 bg-[#0C1220] p-6 space-y-3">
            <ul className="space-y-2.5">
              {product.principles.map((pri, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{pri}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech Stack & Status */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white uppercase tracking-wider font-mono text-xs text-cyan-400">
            04 / TECHNICAL SPECS 底层技术栈
          </h2>
          <div className="rounded-xl border border-slate-800 bg-[#0C1220] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div className="text-slate-300 font-mono">
              {product.techStack.join(' · ')}
            </div>
            <div className="text-slate-500 font-mono">
              {product.independentSiteStatus}
            </div>
          </div>
        </div>

        {/* Related Journal Field Notes */}
        {relatedJournal.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-800">
            <div className="text-xs font-mono text-slate-400 uppercase font-semibold">
              相关实测手记与 Build Log
            </div>
            <div className="space-y-2">
              {relatedJournal.map((art) => (
                <Link
                  key={art.id}
                  to={`/journal/${art.slug}`}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-[#0C1220] hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs sm:text-sm font-semibold text-white">{art.title}</span>
                  </div>
                  <span className="text-xs text-cyan-400">阅读全文 →</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Action Callout */}
        <div className="rounded-2xl border border-cyan-900/50 bg-[#0C1424] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">申请加入内部内测 (Beta Access)</h3>
            <p className="text-xs text-slate-400">
              如果您正在进行高频海外岗位申请并深受机械填表困扰，欢迎联系我们体验内测插件。
            </p>
          </div>
          <Link
            to="/work-with-us"
            className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg whitespace-nowrap shadow-sm"
          >
            申请内测交流 →
          </Link>
        </div>
      </div>
    </div>
  );
};
