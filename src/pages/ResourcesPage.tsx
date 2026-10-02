import React from 'react';
import { Copy, Check, ArrowRight } from 'lucide-react';
import { Link } from '../utils/router';
import { RESOURCES } from '../data/database';

export const ResourcesPage: React.FC = () => {
  return (
    <div className="py-16 sm:py-24 bg-[#F8FAFC] text-left">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-block text-xs font-bold font-mono tracking-wider uppercase text-blue-700 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full">
            REUSABLE GUIDES & SKILLS
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black text-slate-950 tracking-tight">
            Quinnverse Resources
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            拿走就能放进你自己工作流的工具手册、选型核对清单与结构化 AI Prompt 配方。
          </p>
        </div>

        {/* Resources Grid */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RESOURCES.map((res) => (
              <div
                key={res.id}
                className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-xl transition-all space-y-6 text-left"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-blue-700 font-bold bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">{res.type}</span>
                    <span className="text-slate-400 font-mono text-[11px]">即用资产</span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-slate-950 leading-snug">
                    {res.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {res.summary}
                  </p>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {res.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <Link
                    to={`/resources/${res.slug}`}
                    className="font-bold text-slate-950 hover:text-blue-600 inline-flex items-center gap-1"
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
