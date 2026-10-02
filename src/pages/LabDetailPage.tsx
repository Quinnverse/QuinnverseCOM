import React from 'react';
import { ArrowLeft, ExternalLink, Github, BookOpen } from 'lucide-react';
import { Link, useRouter } from '../utils/router';
import { LAB_EXPERIMENTS, JOURNAL_ARTICLES } from '../data/database';

export const LabDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const { navigate } = useRouter();
  const exp = LAB_EXPERIMENTS.find((e) => e.slug === slug) || LAB_EXPERIMENTS[0];
  const relatedJournal = JOURNAL_ARTICLES.filter((j) => exp.relatedJournal?.includes(j.slug));

  return (
    <div className="py-16 sm:py-20 bg-[#080B12] text-left">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link
          to="/lab"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回实验室 (Lab)</span>
        </Link>

        {/* Masthead */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="flex items-center gap-3 text-xs">
            <span className="font-mono text-cyan-400 font-bold">{exp.slug.toUpperCase()}</span>
            <span className="text-slate-700">·</span>
            <span className="text-amber-400 font-mono font-semibold bg-amber-950/60 border border-amber-800/50 px-2 py-0.5 rounded">
              {exp.status}
            </span>
            <span className="text-slate-700">·</span>
            <span className="text-slate-500 font-mono text-[11px]">Logged: {exp.date}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            {exp.title}
          </h1>
        </div>

        {/* Hypothesis */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            01 / THE HYPOTHESIS 实验假说
          </h2>
          <div className="rounded-xl border border-slate-800 bg-[#0C1220] p-6 text-sm text-slate-200 leading-relaxed">
            {exp.hypothesis}
          </div>
        </div>

        {/* What was Built */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            02 / WHAT WAS BUILT 实际构建了什么
          </h2>
          <div className="rounded-xl border border-slate-800 bg-[#0C1220] p-6 text-sm text-slate-300 leading-relaxed">
            {exp.whatWasBuilt}
          </div>
        </div>

        {/* What Happened & What Failed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-xl border border-slate-800 bg-[#0C1220] p-6 space-y-2">
            <div className="text-xs font-mono font-bold text-emerald-400 uppercase">
              实测现象 (WHAT HAPPENED)
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {exp.whatHappened}
            </p>
          </div>

          <div className="rounded-xl border border-rose-950/60 bg-[#160B0E] p-6 space-y-2">
            <div className="text-xs font-mono font-bold text-rose-400 uppercase">
              失效边界与踩坑 (WHAT FAILED)
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {exp.whatFailed}
            </p>
          </div>
        </div>

        {/* Learnings */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            03 / LEARNINGS 沉淀结论与下步流转
          </h2>
          <div className="rounded-xl border border-slate-800 bg-[#0C1220] p-6 text-sm text-slate-300 leading-relaxed">
            {exp.learnings}
          </div>
        </div>

        {/* Related Journal Articles */}
        {relatedJournal.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="text-xs font-mono text-slate-400 uppercase font-semibold">
              相关实测手记
            </div>
            <div className="space-y-2">
              {relatedJournal.map((art) => (
                <Link
                  key={art.id}
                  to={`/journal/${art.slug}`}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-[#0C1220] hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs sm:text-sm font-semibold text-white">{art.title}</span>
                  </div>
                  <span className="text-xs text-cyan-400">阅读全文 →</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <Link to="/lab" className="text-xs text-slate-400 hover:text-white transition-colors">
            ← 返回实验室
          </Link>

          {exp.githubUrl && (
            <a
              href={exp.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
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
