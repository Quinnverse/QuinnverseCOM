import React from 'react';
import { FlaskConical, ArrowRight, Github } from 'lucide-react';
import { Link } from '../utils/router';
import { LAB_EXPERIMENTS } from '../data/database';

export const LabPage: React.FC = () => {
  return (
    <div className="py-16 sm:py-20 bg-[#080B12] text-left">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-mono font-semibold text-amber-400 tracking-wider">
            EXPERIMENTS IN PROGRESS
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            Quinnverse Lab
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            这里记录 Quinnverse 正在打磨的原型、自动化探索与规则实验。这里的东西不一定保证都能成为正式产品，但每一项都真实写过代码、跑过流程，并且留下了失败与避坑的经验。真实性优先于数量充数。
          </p>
        </div>

        {/* Experiments List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-800 pb-3">
            <span>当前公开实验 ({LAB_EXPERIMENTS.length})</span>
            <span className="font-mono text-[11px]">不造假 · 失败实验亦如实保留</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LAB_EXPERIMENTS.map((exp) => (
              <div
                key={exp.id}
                className="rounded-2xl border border-slate-800 bg-[#0C1220] p-6 sm:p-8 flex flex-col justify-between shadow-xl space-y-6 hover:border-slate-700 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-cyan-400 font-bold">{exp.slug.toUpperCase()}</span>
                    <span className="font-mono text-amber-400 text-[11px] font-semibold bg-amber-950/60 border border-amber-800/50 px-2 py-0.5 rounded">
                      {exp.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">
                    {exp.title}
                  </h3>

                  <div className="rounded-xl bg-[#090D17] p-3.5 border border-slate-800 text-xs text-slate-300">
                    <span className="font-bold text-amber-400">假说 (Hypothesis)：</span>
                    <p className="mt-1 leading-relaxed">{exp.hypothesis}</p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {exp.whatWasBuilt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono text-[11px]">Date: {exp.date}</span>
                  <Link
                    to={`/lab/${exp.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-cyan-400 hover:text-cyan-300"
                  >
                    <span>查看完整实验复盘与踩坑</span>
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
