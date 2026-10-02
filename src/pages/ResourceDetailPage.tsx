import React, { useState } from 'react';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { Link, useRouter } from '../utils/router';
import { RESOURCES } from '../data/database';

export const ResourceDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { navigate } = useRouter();
  const resource = RESOURCES.find((r) => r.slug === slug) || RESOURCES[0];
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (resource.copyableSnippet) {
      navigator.clipboard.writeText(resource.copyableSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="py-16 sm:py-24 bg-[#F8FAFC] text-left">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          to="/resources"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回实用手册 (Resources)</span>
        </Link>

        {/* Masthead */}
        <div className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-blue-700 font-bold">
            <span className="bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">{resource.type}</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500">REUSABLE SPECIFICATION</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            {resource.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic border-l-2 border-slate-900 pl-4 py-1 font-medium">
            {resource.summary}
          </p>
        </div>

        {/* Content Body */}
        <div className="text-sm sm:text-base text-slate-800 leading-relaxed space-y-6 whitespace-pre-line font-normal">
          {resource.content}
        </div>

        {/* Copyable Snippet Box */}
        {resource.copyableSnippet && (
          <div className="rounded-3xl border border-slate-200 bg-white p-7 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-900 font-bold uppercase tracking-wider">
                可直接复用的 AI Prompt 配方 / 核对模版
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#0B132B] hover:bg-black rounded-full shadow-xs transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '已复制到剪贴板' : '一键复制配方'}</span>
              </button>
            </div>
            <pre className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed overflow-x-auto">
              {resource.copyableSnippet}
            </pre>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs font-bold">
          <Link to="/resources" className="text-slate-500 hover:text-slate-900 transition-colors">
            ← 返回实用手册
          </Link>
          <Link to="/picks" className="text-slate-900 hover:underline">
            探索实测工具库 (Picks) →
          </Link>
        </div>
      </div>
    </div>
  );
};
