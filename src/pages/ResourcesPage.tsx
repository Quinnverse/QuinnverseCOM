import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '../utils/router';
import { RESOURCES } from '../data/database';

const TYPE_LABEL: Record<string, { zh: string; cls: string }> = {
  GUIDE:     { zh: '指南', cls: 'chip-brand' },
  CHECKLIST: { zh: '核对清单', cls: 'chip-ok' },
  SKILL:     { zh: '提示词配方', cls: 'chip-warn' },
};

export const ResourcesPage: React.FC = () => {
  return (
    <>
      {/* ============ 页头 ============ */}
      <section className="band-sm border-b border-line-soft">
        <div className="container-site">
          <div className="max-w-3xl">
            <span className="chip">资源库</span>
            <h1 className="mt-6">拿走就能用的东西</h1>
            <p className="lead mt-6 max-w-2xl">
              选型速查表、质量核对清单和结构化提示词配方，全部可以直接复制进你自己的工作流。
            </p>
          </div>
        </div>
      </section>

      {/* ============ 列表 ============ */}
      <section className="band-sm">
        <div className="container-site">
          <div className="flex items-baseline justify-between border-b border-line pb-3">
            <span className="text-[13px] text-muted">
              共 <strong className="font-semibold text-ink">{RESOURCES.length}</strong> 份
            </span>
            <span className="data text-faint">均为免费公开，无门槛下载</span>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {RESOURCES.map((res) => {
              const meta = TYPE_LABEL[res.type] ?? { zh: res.type, cls: '' };
              return (
                <Link key={res.id} to={`/resources/${res.slug}`} className="card card-hover group flex flex-col p-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className={`chip ${meta.cls}`}>{meta.zh}</span>
                    <span className="data text-faint">{res.type}</span>
                  </div>

                  <h2 className="mt-5 !text-[18px] leading-snug transition-colors group-hover:text-brand-600">
                    {res.title}
                  </h2>

                  <p className="mt-3 flex-1 text-[13.5px] font-medium leading-relaxed text-ink-soft">
                    {res.summary}
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted">{res.description}</p>

                  <div className="mt-6 flex items-center justify-between border-t border-line-soft pt-4">
                    <span className="text-[12.5px] text-muted">含可复制提示词</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-brand-600" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 card bg-surface-2 p-7">
            <span className="rail-label">使用说明</span>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-ink-soft">
              每份资源都由实际项目里遇到的问题倒推出来，配方部分可以直接复制到对话框使用。
              如果发现内容已经过时，请在
              <Link to="/contact" className="mx-1 font-medium text-ink underline underline-offset-2 hover:text-brand-600">
                联系页
              </Link>
              告诉我，我会更新并注明修订时间。
            </p>
          </div>
        </div>
      </section>
    </>
  );
};