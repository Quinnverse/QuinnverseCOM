import React from 'react';
import { Copy, Check, ArrowRight } from 'lucide-react';
import { Link } from '../utils/router';
import { RESOURCES } from '../data/database';

export const ResourcesPage: React.FC = () => {
  return (
    <div className="py-16 sm:py-20 bg-[#080B12] text-left">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-mono font-semibold text-cyan-400 tracking-wider">
            REUSABLE GUIDES & SKILLS
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            Quinnverse Resources
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            拿走就能放进你自己工作流的工具手册、选型核对清单与结构化 AI Prompt 配方。
          </p>
        </div>

        {/* Resources Grid */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RESOURCES.map((res) => (
              <div
                key={res.id}
                className="rounded-2xl border border-slate-800 bg-[#0C1220] p-6 sm:p-7 flex flex-col justify-between shadow-sm space-y-6 hover:border-slate-700 transition-all text-left"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-cyan-400 font-semibold">{res.type}</span>
                    <span className="text-slate-500 font-mono text-[11px]">即用资产</span>
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug">
                    {res.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {res.summary}
                  </p>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {res.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <Link
                    to={`/resources/${res.slug}`}
                    className="font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1"
                  >
                    <span>阅读完整手册 & 复制配方</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
