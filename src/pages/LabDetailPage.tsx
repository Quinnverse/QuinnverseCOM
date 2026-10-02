import React from 'react';
import { ArrowLeft, Github, FileText, X } from 'lucide-react';
import { Link } from '../utils/router';
import { LAB_EXPERIMENTS, JOURNAL_ARTICLES } from '../data/database';

export const LabDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const exp = LAB_EXPERIMENTS.find((e) => e.slug === slug);

  if (!exp) {
    return (
      <section className="band">
        <div className="container-site">
          <div className="mx-auto max-w-md py-16 text-center">
            <h1 className="!text-[28px]">没有这个实验</h1>
            <p className="lead mt-4">可能链接有误，或者实验已经下线。</p>
            <Link to="/lab" className="btn btn-primary mt-8">
              <ArrowLeft className="h-4 w-4" />
              返回实验室
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const relatedJournal = JOURNAL_ARTICLES.filter((j) => exp.relatedJournal?.includes(j.slug));

  return (
    <>
      {/* ============ 页头 ============ */}
      <section className="band-sm border-b border-line-soft">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <Link
              to="/lab"
              className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              返回实验室
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="data text-brand-600">{exp.slug}</span>
              <span className="chip chip-warn">{exp.status}</span>
              <span className="data text-faint">{exp.date}</span>
            </div>

            <h1 className="mt-5">{exp.title}</h1>
          </div>
        </div>
      </section>

      {/* ============ 假设 ============ */}
      <section className="band-sm">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-card border border-line bg-surface-2 p-7">
              <span className="rail-label">假设</span>
              <p className="mt-3.5 text-[16.5px] font-medium leading-relaxed text-ink">{exp.hypothesis}</p>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-3">
              <div className="card p-6">
                <span className="rail-label">做了什么</span>
                <p className="mt-3.5 text-[13.5px] leading-relaxed text-ink-soft">{exp.whatWasBuilt}</p>
              </div>
              <div className="card border-ok-600/25 bg-ok-50/40 p-6">
                <span className="rail-label">实际结果</span>
                <p className="mt-3.5 text-[13.5px] leading-relaxed text-ink-soft">{exp.whatHappened}</p>
              </div>
              <div className="card border-warn-600/25 bg-warn-50/50 p-6">
                <div className="flex items-center gap-1.5">
                  <X className="h-3 w-3 text-warn-600" />
                  <span className="rail-label">哪里失败了</span>
                </div>
                <p className="mt-3.5 text-[13.5px] leading-relaxed text-ink-soft">{exp.whatFailed}</p>
              </div>
            </div>

            <div className="card mt-5 border-l-2 border-l-brand-600 p-7">
              <span className="rail-label">结论</span>
              <p className="mt-3.5 text-[15px] leading-relaxed text-ink">{exp.learnings}</p>
            </div>

            {/* 相关手记 */}
            {relatedJournal.length > 0 && (
              <div className="mt-12">
                <span className="rail-label">相关手记</span>
                <div className="mt-4 space-y-2">
                  {relatedJournal.map((art) => (
                    <Link
                      key={art.id}
                      to={`/journal/${art.slug}`}
                      className="card card-hover flex items-center justify-between gap-4 p-5"
                    >
                      <div className="flex min-w-0 items-center gap-3.5">
                        <FileText className="h-4 w-4 shrink-0 text-brand-600" />
                        <span className="truncate text-[14px] font-medium text-ink">{art.title}</span>
                      </div>
                      <span className="shrink-0 text-[12.5px] text-muted">阅读全文 →</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 底部 */}
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <Link to="/lab" className="text-[13.5px] text-muted transition-colors hover:text-ink">
                ← 返回实验室
              </Link>
              {exp.githubUrl && (
                <a href={exp.githubUrl} target="_blank" rel="noreferrer" className="btn btn-outline !py-2 !text-[13px]">
                  <Github className="h-3.5 w-3.5" />
                  查看源码
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};