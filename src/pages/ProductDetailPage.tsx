import React from 'react';
import { ArrowLeft, ExternalLink, Check, ShieldAlert, BookOpen } from 'lucide-react';
import { Link, useRouter } from '../utils/router';
import { PRODUCTS, JOURNAL_ARTICLES } from '../data/database';

export const ProductDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { navigate } = useRouter();
  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const relatedJournal = JOURNAL_ARTICLES.filter((j) => product.relatedJournal?.includes(j.slug));

  return (
    <div className="py-16 sm:py-24 bg-[#F8FAFC] text-left">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回产品矩阵 (Products)</span>
        </Link>

        {/* Product Masthead */}
        <div className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-mono text-blue-700 font-bold bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
              BUILT BY QUINNVERSE
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-emerald-700 font-mono font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              Stage: {product.stage}
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
            {product.name}
          </h1>

          <p className="text-lg sm:text-2xl font-bold text-slate-800 leading-relaxed">
            {product.tagline}
          </p>

          <p className="text-sm text-slate-600 leading-relaxed">
            {product.summary}
          </p>
        </div>

        {/* The Problem */}
        <div className="space-y-4">
          <h2 className="font-mono text-xs font-bold text-blue-600 uppercase tracking-wider">
            01 / THE PROBLEM 针对的核心痛点
          </h2>
          <div className="rounded-3xl border border-slate-200/90 bg-white p-7 text-sm text-slate-700 leading-relaxed space-y-3 shadow-xs">
            <p>{product.problemSolved}</p>
            <p className="text-xs text-slate-500">
              在快节奏的海量岗位投递中，求职者大量的时间被浪费在机械重复输入完全相同的教育经历、工作时长和技能标签上，且很难追踪哪份申请对应了哪套材料版本。
            </p>
          </div>
        </div>

        {/* The Deterministic Workflow */}
        {product.workflow && (
          <div className="space-y-4">
            <h2 className="font-mono text-xs font-bold text-blue-600 uppercase tracking-wider">
              02 / DETERMINISTIC WORKFLOW 确定性处理链路
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.workflow.map((step) => (
                <div key={step.step} className="rounded-3xl border border-slate-200/90 bg-white p-6 space-y-2 shadow-xs">
                  <div className="font-mono text-blue-600 font-black text-lg">{step.step}</div>
                  <div className="text-sm font-bold text-slate-950">{step.title}</div>
                  <div className="text-xs text-slate-600 leading-relaxed">{step.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Principles */}
        <div className="space-y-4">
          <h2 className="font-mono text-xs font-bold text-blue-600 uppercase tracking-wider">
            03 / ENGINEERING PRINCIPLES 工程底线与准则
          </h2>
          <div className="rounded-3xl border border-slate-200/90 bg-white p-7 space-y-3 shadow-xs">
            <ul className="space-y-3">
              {product.principles.map((pri, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{pri}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech Stack & Status */}
        <div className="space-y-4">
          <h2 className="font-mono text-xs font-bold text-slate-500 uppercase tracking-wider">
            04 / TECHNICAL SPECS 底层技术栈
          </h2>
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs shadow-2xs">
            <div className="text-slate-800 font-mono font-semibold">
              {product.techStack.join(' · ')}
            </div>
            <div className="text-slate-500 font-mono">
              {product.independentSiteStatus}
            </div>
          </div>
        </div>

        {/* Related Journal Field Notes */}
        {relatedJournal.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="text-xs font-mono text-slate-500 uppercase font-semibold">
              相关实测手记与 Build Log
            </div>
            <div className="space-y-2">
              {relatedJournal.map((art) => (
                <Link
                  key={art.id}
                  to={`/journal/${art.slug}`}
                  className="flex items-center justify-between p-4.5 rounded-2xl border border-slate-200 bg-white hover:border-slate-400 transition-colors shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span className="text-xs sm:text-sm font-bold text-slate-900">{art.title}</span>
                  </div>
                  <span className="text-xs text-blue-600 font-semibold">阅读全文 →</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Action Callout */}
        <div className="rounded-3xl bg-[#0B132B] p-8 sm:p-10 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="text-lg font-bold">申请加入内部内测 (Beta Access)</h3>
            <p className="text-xs text-slate-300">
              如果您正在进行高频海外岗位申请并深受机械填表困扰，欢迎联系我们体验内测插件。
            </p>
          </div>
          <Link
            to="/work-with-us"
            className="px-6 py-3 text-xs font-bold text-slate-950 bg-white hover:bg-slate-100 rounded-full whitespace-nowrap shadow-sm"
          >
            申请内测交流 →
          </Link>
        </div>
      </div>
    </div>
  );
};
