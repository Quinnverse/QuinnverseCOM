import React from 'react';
import { ArrowRight, Github } from 'lucide-react';
import { Link } from '../utils/router';
import { LAB_EXPERIMENTS, SITE_SETTINGS } from '../data/database';

export const LabPage: React.FC = () => {
  return (
    <>
      {/* ============ 页头 ============ */}
      <section className="band-sm border-b border-line-soft">
        <div className="container-site">
          <div className="max-w-3xl">
            <span className="chip chip-warn">实验室</span>
            <h1 className="mt-6">进行中的实验</h1>
            <p className="lead mt-6 max-w-2xl">
              这里记录还在打磨的原型、自动化探索和规则实验。它们不一定都成为正式产品，
              但每一项都真写过代码、跑过流程，并且把失败的部分留了下来。
            </p>
          </div>
        </div>
      </section>

      {/* ============ 实验列表 ============ */}
      <section className="band-sm">
        <div className="container-site">
          <div className="flex items-baseline justify-between border-b border-line pb-3">
            <span className="text-[13px] text-muted">
              当前公开 <strong className="font-semibold text-ink">{LAB_EXPERIMENTS.length}</strong> 项实验
            </span>
            <span className="data text-faint">失败的实验也保留</span>
          </div>

          <div className="mt-8 space-y-5">
            {LAB_EXPERIMENTS.map((exp) => (
              <article key={exp.id} className="card card-hover p-7 sm:p-9">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="data text-brand-600">{exp.slug}</span>
                  <span className="chip chip-warn">{exp.status}</span>
                </div>

                <h2 className="mt-4 !text-[21px]">{exp.title}</h2>

                {/* 假说 */}
                <div className="mt-5 rounded-card border border-line-soft bg-surface-2 p-5">
                  <span className="rail-label">假设</span>
                  <p className="mt-2.5 text-[14px] font-medium leading-relaxed text-ink">
                    {exp.hypothesis}
                  </p>
                </div>

                {/* 做了什么 */}
                <div className="mt-5 grid gap-5 sm:grid-cols-3">
                  <div>
                    <span className="rail-label">做了什么</span>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted">{exp.whatWasBuilt}</p>
                  </div>
                  <div>
                    <span className="rail-label">发生了什么</span>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted">{exp.whatHappened}</p>
                  </div>
                  <div>
                    <span className="rail-label">哪里失败了</span>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted">{exp.whatFailed}</p>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-line-soft pt-5">
                  <span className="data text-faint">{exp.date}</span>
                  <div className="flex flex-wrap items-center gap-5">
                    <a
                      href={exp.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-ink"
                    >
                      <Github className="h-3.5 w-3.5" />
                      源码
                    </a>
                    <Link
                      to={`/lab/${exp.slug}`}
                      className="inline-flex items-center gap-1 text-[13px] font-medium text-ink transition-colors hover:text-brand-600"
                    >
                      完整复盘与踩坑
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* 说明 */}
          <div className="mt-12 card bg-surface-2 p-7">
            <span className="rail-label">为什么只有一项</span>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-ink-soft">
              实验室不为凑数而建条目。一项实验要公开，需要满足三个条件：写下过代码、跑出过结果、
              并且得到了包括失败在内的结论。达不到的我就不放上来。
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/journal" className="btn btn-outline">
                读更多复盘手记
              </Link>
              <a
                href={SITE_SETTINGS.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};