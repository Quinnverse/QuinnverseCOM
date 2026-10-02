import React from 'react';
import { ArrowLeft, ExternalLink, Check, ArrowRight, FileText } from 'lucide-react';
import { Link } from '../utils/router';
import { PRODUCTS, JOURNAL_ARTICLES, SITE_SETTINGS } from '../data/database';
import { getProductShot, hasRealShot } from '../data/visuals';

export const ProductDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) {
    return (
      <section className="band">
        <div className="container-site">
          <div className="mx-auto max-w-md py-16 text-center">
            <h1 className="!text-[28px]">没有这个产品</h1>
            <p className="lead mt-4">可能链接有误，或者已经改版。</p>
            <Link to="/products" className="btn btn-primary mt-8">
              <ArrowLeft className="h-4 w-4" />
              返回产品列表
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const relatedJournal = JOURNAL_ARTICLES.filter((j) => product.relatedJournal?.includes(j.slug));
  const shot = getProductShot(product);
  const isBeta = product.stage !== 'Live';

  return (
    <>
      {/* ============ 页头 ============ */}
      <section className="band-sm border-b border-line-soft">
        <div className="container-site">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            返回自研产品
          </Link>

          <div className="mt-8 grid max-w-5xl gap-10 lg:grid-cols-[1.1fr_0.95fr] lg:items-start">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="chip chip-brand">Quinnverse 自研</span>
                {isBeta ? (
                  <span className="chip chip-warn">Beta · {product.stage}</span>
                ) : (
                  <span className="chip chip-ok">已上线</span>
                )}
              </div>

              <h1 className="mt-6">{product.name}</h1>
              <p className="mt-5 text-[17px] font-semibold leading-snug text-ink-soft">{product.tagline}</p>
              <p className="lead mt-4">{product.summary}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {product.externalUrl && (
                  <a href={product.externalUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                    打开产品
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                {isBeta && (
                  <a href={`mailto:${SITE_SETTINGS.contactEmail}`} className="btn btn-outline">
                    申请内测
                  </a>
                )}
              </div>
            </div>

            {/* 视觉位 */}
            <div className="card overflow-hidden">
              {hasRealShot(product.slug) ? (
                <img src={shot!} alt={`${product.name} 界面截图`} className="w-full" />
              ) : (
                <div className="flex aspect-[16/10] flex-col items-center justify-center gap-3 bg-surface-2 p-8 text-center">
                  <div className="tool-mark h-14 w-14 text-[20px]" style={{ background: '#f4f5f7', color: '#9ca0a6' }}>
                    β
                  </div>
                  <p className="text-[13.5px] font-medium text-ink-soft">Beta 阶段，暂无公开界面</p>
                  <p className="max-w-xs text-[12.5px] leading-relaxed text-muted">
                    没有真实截图就不放图。等产品能用了我会把线上界面抓下来放这里。
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 问题 ============ */}
      <section className="band-sm">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <span className="rail-label">01 / 解决的问题</span>
            <h2 className="mt-3.5">为什么要做这个</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">{product.problemSolved}</p>

            <div className="mt-8 grid gap-x-10 gap-y-7 border-t border-line-soft pt-8 sm:grid-cols-2">
              <div>
                <div className="rail-label">核心能力</div>
                <ul className="mt-4 space-y-3">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-soft">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-600" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="rail-label">工程底线</div>
                <ul className="mt-4 space-y-3">
                  {product.principles.map((p, i) => (
                    <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-soft">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ok-600" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 处理链路 ============ */}
      {product.workflow && product.workflow.length > 0 && (
        <section className="band-sm band-alt border-y border-line">
          <div className="container-site">
            <div className="sec-head" style={{ marginBottom: '36px' }}>
              <span className="rail-label">02 / 工作链路</span>
              <h2 className="mt-3.5">它是怎么跑起来的</h2>
              <p className="mt-3.5 max-w-2xl">
                每一步都是确定的，不把关键判断交给大模型。
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {product.workflow.map((step, i) => (
                <div key={step.step} className="card p-6">
                  <div className="flex items-center gap-2.5">
                    <span className="data text-brand-600">{step.step}</span>
                    {i < product.workflow!.length - 1 && (
                      <ArrowRight className="h-3.5 w-3.5 text-line" />
                    )}
                  </div>
                  <h3 className="mt-3.5 !text-[16px]">{step.title}</h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-muted">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ 技术栈 ============ */}
      <section className="band-sm">
        <div className="container-site">
          <div className="mx-auto max-w-3xl">
            <div className="card flex flex-wrap items-center justify-between gap-5 p-6">
              <div>
                <span className="rail-label">技术栈</span>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {product.techStack.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <span className="rail-label">独立站点</span>
                <p className="mt-2.5 text-[13.5px] text-muted">{product.independentSiteStatus}</p>
              </div>
            </div>

            {/* 相关手记 */}
            {relatedJournal.length > 0 && (
              <div className="mt-8">
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

            {/* CTA */}
            {isBeta && (
              <div className="card mt-8 flex flex-col gap-6 bg-ink p-8 text-white sm:flex-row sm:items-center sm:justify-between sm:p-9">
                <div>
                  <h3 className="!text-[20px] !text-white">想在内测阶段试一下？</h3>
                  <p className="mt-2.5 max-w-lg text-[13.5px] leading-relaxed text-white/65">
                    如果你正在高频投递海外岗位、被机械填表困住，写邮件说说你的情况，我会告诉你适不适合。
                  </p>
                </div>
                <a href={`mailto:${SITE_SETTINGS.contactEmail}`} className="btn bg-white !text-ink shrink-0 hover:bg-white/90">
                  申请内测
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};