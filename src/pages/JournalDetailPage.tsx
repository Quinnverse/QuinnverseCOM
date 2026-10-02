import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from '../utils/router';
import { JOURNAL_ARTICLES, PICKS, PRODUCTS } from '../data/database';
import { getToolMark } from '../data/visuals';

const CATEGORY_LABEL: Record<string, string> = {
  'BUILD LOG': '构建手记',
  'ENGINEERING': '工程实践',
  'CRITIQUE': '批判思考',
};

export const JournalDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <section className="band">
        <div className="container-site">
          <div className="mx-auto max-w-md py-16 text-center">
            <h1 className="!text-[28px]">没有这篇文章</h1>
            <p className="lead mt-4">可能链接有误，或者文章已经改名。</p>
            <Link to="/journal" className="btn btn-primary mt-8">
              <ArrowLeft className="h-4 w-4" />
              返回手记目录
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const relatedPicks = PICKS.filter((p) => article.relatedPicks?.includes(p.slug));
  const relatedProducts = PRODUCTS.filter((p) => article.relatedProducts?.includes(p.slug));

  // 正文段落拆分：保留空行结构
  const paragraphs = article.content.split('\n');

  return (
    <>
      {/* ============ 文章头 ============ */}
      <section className="band-sm border-b border-line-soft">
        <div className="container-site">
          <div className="mx-auto max-w-2xl">
            <Link
              to="/journal"
              className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              返回手记目录
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="chip chip-brand">{CATEGORY_LABEL[article.category] ?? article.category}</span>
              <span className="data text-faint">{article.date} · {article.readTime}</span>
            </div>

            <h1 className="mt-5">{article.title}</h1>

            <p className="mt-6 border-l-2 border-brand-600 pl-5 text-[16px] leading-relaxed text-ink-soft">
              {article.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* ============ 正文 ============ */}
      <article className="band-sm">
        <div className="container-site">
          <div className="mx-auto max-w-2xl">
            <div className="space-y-5">
              {paragraphs.map((line, i) => {
                if (!line.trim()) return <div key={i} className="h-2" />;
                // 支持「1. xxx」「- xxx」形式的列表项
                const isList = /^(\d+\.|[-*])\s/.test(line.trim());
                if (isList) {
                  const [, marker, ...rest] = line.trim().match(/^(\d+\.|[-*])\s(.*)$/)!;
                  return (
                    <div key={i} className="flex gap-3.5">
                      <span className="data mt-1 shrink-0 text-brand-600">
                        {marker === '-' ? '·' : marker}
                      </span>
                      <p className="text-[15.5px] leading-[1.8] text-ink-soft">{rest.join(' ')}</p>
                    </div>
                  );
                }
                return (
                  <p key={i} className="text-[15.5px] leading-[1.8] text-ink-soft">
                    {line}
                  </p>
                );
              })}
            </div>

            {/* 标签 */}
            <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-line pt-7">
              {article.tags.map((t) => (
                <span key={t} className="chip">#{t}</span>
              ))}
            </div>

            {/* 关联 */}
            {(relatedPicks.length > 0 || relatedProducts.length > 0) && (
              <div className="mt-10">
                <span className="rail-label">本文提到的</span>
                <div className="mt-4 space-y-2">
                  {relatedPicks.map((pick) => {
                    const mark = getToolMark(pick.slug);
                    return (
                      <Link
                        key={pick.id}
                        to={`/picks/${pick.slug}`}
                        className="card card-hover flex items-center gap-4 p-4"
                      >
                        <div
                          className="tool-mark h-9 w-9 shrink-0 text-[13px]"
                          style={{ background: mark.bg, color: mark.fg }}
                        >
                          {mark.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[14px] font-medium text-ink">{pick.name}</div>
                          <div className="mt-0.5 truncate text-[12.5px] text-muted">{pick.summary}</div>
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-faint" />
                      </Link>
                    );
                  })}

                  {relatedProducts.map((prod) => (
                    <Link
                      key={prod.id}
                      to={`/products/${prod.slug}`}
                      className="card card-hover flex items-center gap-4 p-4"
                    >
                      <div className="tool-mark h-9 w-9 shrink-0 bg-surface-2 text-[12px] faint">
                        {prod.family === 'GLOBAL_PRODUCT' ? '系' : '小'}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[14px] font-medium text-ink">{prod.name}</div>
                        <div className="mt-0.5 truncate text-[12.5px] text-muted">{prod.tagline}</div>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-faint" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 底部导航 */}
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <Link to="/journal" className="text-[13.5px] text-muted transition-colors hover:text-ink">
                ← 返回手记目录
              </Link>
              <Link to="/resources" className="text-[13.5px] font-medium text-ink transition-colors hover:text-brand-600">
                查看实用手册 →
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};