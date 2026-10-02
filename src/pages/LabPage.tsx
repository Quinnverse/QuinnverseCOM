import React from 'react';
import { FlaskConical, ArrowRight, Github } from 'lucide-react';
import { Link } from '../utils/router';
import { LAB_EXPERIMENTS } from '../data/database';

export const LabPage: React.FC = () => {
  return (
    <div className="py-16 sm:py-24 bg-[#F8FAFC] text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-block text-xs font-bold font-mono tracking-wider uppercase text-amber-800 bg-amber-50 border border-amber-200 px-3.5 py-1 rounded-full">
            EXPERIMENTS IN PROGRESS
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black text-slate-950 tracking-tight">
            Quinnverse Lab
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            这里记录 Quinnverse 正在打磨的原型、自动化探索与规则实验。这里的东西不一定保证都能成为正式产品，但每一项都真实写过代码、跑过流程，并且留下了失败与避坑的经验。真实性优先于数量充数。
          </p>
        </div>

        {/* Experiments List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200 pb-3">
            <span className="font-bold text-slate-900">当前公开实验 ({LAB_EXPERIMENTS.length})</span>
            <span className="font-mono text-[11px]">不造假 · 失败实验亦如实保留</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LAB_EXPERIMENTS.map((exp) => (
              <div
                key={exp.id}
                className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-9 flex flex-col justify-between shadow-2xs hover:shadow-xl transition-all space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-blue-600 font-bold">{exp.slug.toUpperCase()}</span>
                    <span className="font-mono text-amber-800 text-[11px] font-bold bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                      {exp.status}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-slate-950">
                    {exp.title}
                  </h3>

                  <div className="rounded-2xl bg-amber-50/50 p-4 border border-amber-200/80 text-xs text-slate-700">
                    <span className="font-bold text-amber-800">假说 (Hypothesis)：</span>
                    <p className="mt-1 leading-relaxed font-medium">{exp.hypothesis}</p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {exp.whatWasBuilt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">Date: {exp.date}</span>
                  <Link
                    to={`/lab/${exp.slug}`}
                    className="inline-flex items-center gap-1 font-bold text-slate-900 hover:text-blue-600"
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
