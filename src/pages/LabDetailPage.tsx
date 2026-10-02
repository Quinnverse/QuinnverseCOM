import React from 'react';
import { ArrowLeft, ExternalLink, Github, BookOpen } from 'lucide-react';
import { Link, useRouter } from '../utils/router';
import { LAB_EXPERIMENTS, JOURNAL_ARTICLES } from '../data/database';

export const LabDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { navigate } = useRouter();
  const exp = LAB_EXPERIMENTS.find((e) => e.slug === slug) || LAB_EXPERIMENTS[0];
  const relatedJournal = JOURNAL_ARTICLES.filter((j) => exp.relatedJournal?.includes(j.slug));

  return (
    <div className="py-16 sm:py-24 bg-[#F8FAFC] text-left">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          to="/lab"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回实验室 (Lab)</span>
        </Link>

        {/* Masthead */}
        <div className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex items-center gap-3 text-xs">
            <span className="font-mono text-blue-600 font-bold">{exp.slug.toUpperCase()}</span>
            <span className="text-slate-300">·</span>
            <span className="text-amber-800 font-mono font-bold bg-amber-50 border border-amber-200 px-3 py-0.5 rounded-full">
              {exp.status}
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500 font-mono text-[11px]">Logged: {exp.date}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-black text-slate-950 tracking-tight">
            {exp.title}
          </h1>
        </div>

        {/* Hypothesis */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider">
            01 / THE HYPOTHESIS 实验假说
          </h2>
          <div className="rounded-3xl border border-amber-200 bg-amber-50/40 p-7 text-sm text-slate-800 leading-relaxed font-medium">
            {exp.hypothesis}
          </div>
        </div>

        {/* What was Built */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
            02 / WHAT WAS BUILT 实际构建了什么
          </h2>
          <div className="rounded-3xl border border-slate-200/90 bg-white p-7 text-sm text-slate-700 leading-relaxed shadow-xs">
            {exp.whatWasBuilt}
          </div>
        </div>

        {/* What Happened & What Failed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-slate-200/90 bg-white p-7 space-y-2 shadow-xs">
            <div className="text-xs font-mono font-bold text-emerald-800 uppercase">
              实测现象 (WHAT HAPPENED)
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {exp.whatHappened}
            </p>
          </div>

          <div className="rounded-3xl border border-rose-200 bg-rose-50/40 p-7 space-y-2">
            <div className="text-xs font-mono font-bold text-rose-800 uppercase">
              失效边界与踩坑 (WHAT FAILED)
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {exp.whatFailed}
            </p>
          </div>
        </div>

        {/* Learnings */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
            03 / LEARNINGS 沉淀结论与下步流转
          </h2>
          <div className="rounded-3xl border border-slate-200/90 bg-white p-7 text-sm text-slate-700 leading-relaxed shadow-xs">
            {exp.learnings}
          </div>
        </div>

        {/* Related Journal Articles */}
        {relatedJournal.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <div className="text-xs font-mono text-slate-500 uppercase font-semibold">
              相关实测手记
            </div>
            <div className="space-y-2">
              {relatedJournal.map((art) => (
                <Link
                  key={art.id}
                  to={`/journal/${art.slug}`}
                  className="flex items-center justify-between p-4.5 rounded-2xl border border-slate-200 bg-white hover:border-slate-400 transition-colors shadow-2xs"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span className="text-xs sm:text-sm font-bold text-slate-900">{art.title}</span>
                  </div>
                  <span className="text-xs text-blue-600 font-semibold">阅读全文 →</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <Link to="/lab" className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
            ← 返回实验室
          </Link>

          {exp.githubUrl && (
            <a
              href={exp.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>查看开源分支</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
