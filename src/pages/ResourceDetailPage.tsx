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
    <div className="py-16 sm:py-20 bg-[#080B12] text-left">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          to="/resources"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回实用手册 (Resources)</span>
        </Link>

        {/* Masthead */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold">
            <span>{resource.type}</span>
            <span className="text-slate-700">·</span>
            <span>REUSABLE SPECIFICATION</span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
            {resource.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic border-l-2 border-cyan-400 pl-4 py-1">
            {resource.summary}
          </p>
        </div>

        {/* Content Body */}
        <div className="text-sm sm:text-base text-slate-300 leading-relaxed space-y-6 whitespace-pre-line font-normal">
          {resource.content}
        </div>

        {/* Copyable Snippet Box */}
        {resource.copyableSnippet && (
          <div className="rounded-2xl border border-cyan-900/50 bg-[#0C1424] p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-300 font-bold uppercase">
                可直接复用的 AI Prompt 配方 / 核对模版
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '已复制到剪贴板' : '一键复制配方'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-[#080B12] border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed overflow-x-auto">
              {resource.copyableSnippet}
            </pre>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs">
          <Link to="/resources" className="text-slate-400 hover:text-white transition-colors">
            ← 返回实用手册
          </Link>
          <Link to="/picks" className="text-cyan-400 hover:text-cyan-300 font-semibold">
            探索实测工具库 (Picks) →
          </Link>
        </div>
      </div>
    </div>
  );
};
