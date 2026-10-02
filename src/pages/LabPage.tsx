import React, { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '../utils/router';
import { LAB_EXPERIMENTS, JOURNAL_ARTICLES, RESOURCES } from '../data/database';

type LabCategory = 'ALL' | 'BUILD' | 'EXPERIMENT' | 'METHOD' | 'NOTE';

export const LabPage: React.FC = () => {
  const [category, setCategory] = useState<LabCategory>('ALL');
  const tabs: { id: LabCategory; label: string }[] = [
    { id: 'ALL', label: '全部' },
    { id: 'BUILD', label: '构建日志' },
    { id: 'EXPERIMENT', label: '产品实验' },
    { id: 'METHOD', label: '方法教程' },
    { id: 'NOTE', label: '手记观点' },
  ];

  const items = useMemo(() => {
    const experiments = LAB_EXPERIMENTS.map((x) => ({ id: x.id, category: 'EXPERIMENT' as LabCategory, label: '产品实验', title: x.title, summary: x.whatWasBuilt, date: x.date, href: `/lab/${x.slug}` }));
    const journals = JOURNAL_ARTICLES.map((x) => ({ id: x.id, category: (x.category === 'BUILD LOG' ? 'BUILD' : x.category === 'ENGINEERING' ? 'METHOD' : 'NOTE') as LabCategory, label: x.category === 'BUILD LOG' ? '构建日志' : x.category === 'ENGINEERING' ? '方法教程' : '手记观点', title: x.title, summary: x.excerpt, date: x.date, href: `/journal/${x.slug}` }));
    const resources = RESOURCES.map((x) => ({ id: x.id, category: 'METHOD' as LabCategory, label: '方法教程', title: x.title, summary: x.summary, date: 'RESOURCE', href: `/resources/${x.slug}` }));
    return [...experiments, ...journals, ...resources];
  }, []);

  const visible = category === 'ALL' ? items : items.filter((item) => item.category === category);

  return (
    <div className="py-16 sm:py-24 bg-[#F8FAFC] text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-3">
          <div className="inline-block text-xs font-bold font-mono tracking-wider uppercase text-amber-800 bg-amber-50 border border-amber-200 px-3.5 py-1 rounded-full">BUILD · EXPERIMENT · LEARN</div>
          <h1 className="font-display text-4xl sm:text-6xl font-black text-slate-950 tracking-tight">Quinnverse Lab</h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">这里是 Quinnverse 的公开实验场：做产品的过程、没有变成正式产品的实验、可以复用的方法，以及构建过程中留下的判断与复盘，都在这里持续沉淀。</p>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-5">
          {tabs.map((tab) => <button key={tab.id} onClick={() => setCategory(tab.id)} className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${category === tab.id ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-950'}`}>{tab.label}</button>)}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visible.map((item) => (
            <Link key={`${item.category}-${item.id}`} to={item.href} className="group rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 hover:border-slate-400 hover:shadow-xl transition-all flex flex-col justify-between min-h-56">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4"><span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">{item.label}</span><span className="font-mono text-[11px] text-slate-400">{item.date}</span></div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-950 group-hover:text-blue-600 transition-colors">{item.title}</h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">{item.summary}</p>
              </div>
              <div className="pt-5 mt-5 border-t border-slate-100 inline-flex items-center gap-1 text-xs font-bold text-slate-900">打开内容 <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" /></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
