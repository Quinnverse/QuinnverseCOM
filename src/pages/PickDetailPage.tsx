import React from 'react';
import { ArrowLeft, ExternalLink, Check, X, FileText, Info } from 'lucide-react';
import { Link } from '../utils/router';
import { PICKS, JOURNAL_ARTICLES } from '../data/database';
import { getToolMark } from '../data/visuals';

const EVIDENCE_META: Record<string, { zh: string; cls: string }> = {
  'DAILY DRIVER':       { zh: '日常主力', cls: 'chip-ok' },
  'USED IN PROJECT':    { zh: '项目实战', cls: 'chip-brand' },
  'TESTED':             { zh: '场景实测', cls: '' },
  'NEEDS CONFIRMATION': { zh: '待复核',   cls: 'chip-warn' },
};

export const PickDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const pick = PICKS.find((p) => p.slug === slug);

  if (!pick) {
    return (
      <section className="band">
        <div className="container-site">
          <div className="mx-auto max-w-md py-16 text-center">
            <h1 className="!text-[28px]">没有这个评测</h1>
            <p className="lead mt-4">可能链接有误，或者已经移出实测库。</p>
            <Link to="/picks" className="btn btn-primary mt-8">
              <ArrowLeft className="h-4 w-4" />
              返回实测库
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const mark = getToolMark(pick.slug);
  const meta = EVIDENCE_META[pick.evidenceLevel] ?? { zh: pick.evidenceLevel, cls: '' };
  const relatedJournal = JOURNAL_ARTICLES.filter((j) => pick.relatedJournal?.includes(j.slug));

  return (
    <>
      {/* ============ 页头 ============ */}
      <section className="band-sm border-b border-line-soft">
        <div className="container-site">
          <Link
            to="/picks"
            className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            返回实测库
          </Link>

          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start">
            <div
              className="tool-mark h-16 w-16 shrink-0 text-[22px]"
              style={{ background: mark.bg, color: mark.fg }}
            >
              {mark.initials}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="chip">{pick.category}</span>
                <span className={`chip ${meta.cls}`}>{meta.zh}</span>
                <span className="data text-faint">测试于 {pick.lastTested}</span>
              </div>

              <h1 className="mt-4">{pick.name}</h1>
              <p className="mt-4 text-[16.5px] font-semibold leading-snug text-ink-soft">{pick.summary}</p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{pick.whatItDoes}</p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a href={pick.officialUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                  访问官网
                  <ExternalLink className="h-4 w-4" />
                </a>
                <Link to="/contact" className="btn btn-outline">
                  报告错误或纠错
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 实测结论 ============ */}
      <section className="band-sm">
        <div className="container-site">
          <div className="max-w-3xl">
            <span className="rail-label">实测结论</span>
            <p className="mt-4 text-[17px] font-medium leading-relaxed text-ink">{pick.whatWeFound}</p>
          </div>
        </div>
      </section>

      {/* ============ 亮点 / 局限 ============ */}
      <section className="band-sm pt-0">
        <div className="container-site">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-card border border-ok-600/25 bg-ok-50/50 p-7">
              <div className="flex items-center gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ok-600 text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <h2 className="!text-[17px]">哪里好用</h2>
              </div>
              <ul className="mt-5 space-y-3">
                {pick.worksWell.map((w, i) => (
                  <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-soft">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ok-600" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-card border border-warn-600/25 bg-warn-50/60 p-7">
              <div className="flex items-center gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-warn-600 text-white">
                  <X className="h-3 w-3" strokeWidth={3} />
                </span>
                <h2 className="!text-[17px]">哪里不够用</h2>
              </div>
              <ul className="mt-5 space-y-3">
                {pick.fallsShort.map((f, i) => (
                  <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-soft">
                    <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warn-600" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 适合谁 / 不适合谁 ============ */}
      <section className="band-sm pt-0">
        <div className="container-site">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="card p-7">
              <span className="rail-label">适合谁</span>
              <ul className="mt-4 space-y-2.5">
                {pick.bestFor.map((b, i) => (
                  <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-soft">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ok-600" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card p-7">
              <span className="rail-label">不适合谁</span>
              <ul className="mt-4 space-y-2.5">
                {pick.notFor.map((n, i) => (
                  <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-soft">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-warn-600" />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 费用 / 网络 / 替代 ============ */}
      <section className="band-sm band-alt border-y border-line pt-0">
        <div className="container-site">
          <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3">
            <div className="bg-surface p-6">
              <span className="rail-label">费用模式</span>
              <p className="mt-3 text-[14.5px] font-medium text-ink">{pick.pricingAccess.pricingModel}</p>
            </div>
            <div className="bg-surface p-6">
              <span className="rail-label">国内访问</span>
              <p className="mt-3 text-[14.5px] font-medium text-ink">{pick.pricingAccess.accessFromChina}</p>
            </div>
            <div className="bg-surface p-6">
              <span className="rail-label">定价说明</span>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted">{pick.pricingAccess.pricingNote}</p>
            </div>
          </div>

          {pick.alternatives.length > 0 && (
            <div className="card mt-5 flex flex-wrap items-center gap-3 p-6">
              <span className="text-[13.5px] text-muted">如果不选它，可以考虑</span>
              {pick.alternatives.map((alt) => (
                <span key={alt} className="chip">{alt}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ 相关手记 + 返佣声明 ============ */}
      <section className="band-sm pt-0">
        <div className="container-site">
          <div className="max-w-3xl">
            {relatedJournal.length > 0 && (
              <div>
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

            {/* 返佣声明 */}
            <div className="card mt-6 flex gap-4 bg-surface-2 p-6">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
              <div>
                <span className="text-[13.5px] font-medium text-ink">商业关系披露</span>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  {pick.affiliateRelationship
                    ? '本条目含官方推广链接。通过该链接使用服务时 Quinnverse 可能获得收益，用于支付服务器开销。是否收录与排名不受此关系影响，上面的缺点与劝退结论也不因返佣而修改。'
                    : '本条目为独立自用实测收录，Quinnverse 与该服务商没有任何商业合作或返佣关系。'}
                </p>
              </div>
            </div>

            {/* 底部导航 */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <Link to="/picks" className="text-[13.5px] text-muted transition-colors hover:text-ink">
                ← 返回实测库
              </Link>
              <a
                href={pick.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline !py-2 !text-[13px]"
              >
                {pick.name} 官网
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};