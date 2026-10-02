import React from 'react';
import { ArrowRight, ExternalLink, Wrench, ShieldCheck, Check } from 'lucide-react';
import { Link } from '../utils/router';
import { PRODUCTS } from '../data/database';

export const ProductsPage: React.FC = () => {
  const featured = PRODUCTS.find((p) => p.family === 'GLOBAL_PRODUCT') || PRODUCTS[0];
  const smallTools = PRODUCTS.filter((p) => p.family === 'SMALL_TOOL');

  return (
    <div className="py-16 sm:py-20 bg-[#080B12] text-left">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-mono font-semibold text-cyan-400 tracking-wider">
            BUILT BY QUINNVERSE
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            Tools built because something useful was missing.
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            这里是 Quinnverse 亲自设计、编码与维护的软件产品。有些卡点足够复杂，需要一套完整的系统去承载；有些卡点足够具体，一个小工具就已经足够好。
          </p>
        </div>

        {/* Level 1: Featured Global Product */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-xs">
            <span className="font-mono text-cyan-400 font-bold uppercase tracking-wider">01 / FEATURED GLOBAL PRODUCT</span>
            <span className="text-slate-600">———</span>
            <span className="text-emerald-400 font-mono font-semibold bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
              Stage: {featured.stage}
            </span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#0C1220] p-6 sm:p-10 shadow-2xl space-y-8">
            <div className="space-y-3">
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
                {featured.name}
              </h2>
              <p className="text-base sm:text-lg font-semibold text-cyan-200">
                {featured.tagline}
              </p>
              <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
                {featured.problemSolved}
              </p>
            </div>

            {/* Core Features & Principles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800/80">
              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                  核心能力矩阵 (Key Features)
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {featured.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">·</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                  确定性工程原则 (Engineering Principles)
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {featured.principles.map((pri, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{pri}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions & Status */}
            <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-400 font-mono">
                {featured.techStack.join(' · ')}
              </div>
              <div className="flex items-center gap-4">
                <Link
                  to={`/products/${featured.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm transition-colors"
                >
                  <span>查看详细系统链路与内测申请</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Level 2: Small Tools Matrix */}
        <div className="space-y-6 pt-6">
          <div className="space-y-2">
            <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              02 / SMALL TOOLS 轻量独立工具
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
              有些问题值得成为完整产品。有些问题，一个小工具就够了。
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              这些小工具均有独立的二级域名运行，无冗余商业干扰，打开即用。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {smallTools.map((tool) => (
              <div
                key={tool.id}
                className="rounded-2xl border border-slate-800 bg-[#0C1220] p-6 flex flex-col justify-between shadow-sm space-y-6 hover:border-slate-700 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-cyan-400 font-semibold">{tool.stage}</span>
                    <span className="font-mono text-slate-500 text-[11px]">{tool.techStack[0]}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white">{tool.name}</h3>

                  <p className="text-xs font-semibold text-slate-300 leading-snug">
                    {tool.tagline}
                  </p>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {tool.problemSolved}
                  </p>

                  <div className="pt-2 border-t border-slate-800/80 space-y-1 text-xs text-slate-400">
                    {tool.features.slice(0, 2).map((f, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <span className="text-cyan-400 font-bold">✓</span>
                        <span className="line-clamp-1">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">quinnverse.tech subdomain</span>
                  <a
                    href={tool.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors"
                  >
                    <span>打开工具</span>
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
