import React from 'react';
import { ArrowRight, ExternalLink, Check } from 'lucide-react';
import { Link } from '../utils/router';
import { PRODUCTS } from '../data/database';
import { getProductShot, hasRealShot } from '../data/visuals';

export const ProductsPage: React.FC = () => {
  const featured = PRODUCTS.find((p) => p.slug === 'job-application-copilot')!;
  const smallTools = PRODUCTS.filter((p) => p.family === 'SMALL_TOOL');

  return (
    <>
      {/* ============ 页头 ============ */}
      <section className="band-sm border-b border-line-soft">
        <div className="container-site">
          <div className="max-w-3xl">
            <span className="chip chip-brand">自研产品</span>
            <h1 className="mt-6">
              市场上没有好用的，
              <br />
              所以我们自己做了一个。
            </h1>
            <p className="lead mt-6">
              这里的每个软件都是我自己设计、编码和维护的。有些卡点复杂到需要一套完整系统承载，
              有些卡点具体到一个小工具就够了。
            </p>
          </div>
        </div>
      </section>

      {/* ============ 旗舰产品 ============ */}
      <section className="band">
        <div className="container-site">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rail-label">01 / 当前主线</span>
            <span className="chip chip-warn">内测阶段 · {featured.stage}</span>
          </div>

          <div className="card overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-8 sm:p-10">
                <h2>{featured.name}</h2>
                <p className="mt-4 text-[16px] font-semibold leading-snug text-ink-soft">
                  {featured.tagline}
                </p>
                <p className="mt-4 text-[14px] leading-relaxed text-muted">{featured.problemSolved}</p>

                <div className="mt-8 grid gap-8 border-t border-line-soft pt-8 sm:grid-cols-2">
                  <div>
                    <div className="rail-label">核心能力</div>
                    <ul className="mt-4 space-y-2.5">
                      {featured.features.map((f, i) => (
                        <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-soft">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-600" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="rail-label">工程原则</div>
                    <ul className="mt-4 space-y-2.5">
                      {featured.principles.map((p, i) => (
                        <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-soft">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ok-600" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line-soft pt-6">
                  <span className="data text-faint">{featured.techStack.join(' · ')}</span>
                  <Link to={`/products/${featured.slug}`} className="btn btn-primary">
                    查看完整处理链路
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* 视觉位：Beta 不编造截图 */}
              <div className="order-first lg:order-last border-b lg:border-b-0 lg:border-l border-line bg-surface-2">
                {hasRealShot(featured.slug) ? (
                  <img
                    src={getProductShot(featured)!}
                    alt={`${featured.name} 界面`}
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-3 p-10 text-center">
                    <div className="tool-mark h-16 w-16 text-[24px]" style={{ background: '#f4f5f7', color: '#9ca0a6' }}>
                      β
                    </div>
                    <p className="text-[14px] font-medium text-ink-soft">Beta 阶段，暂无公开界面</p>
                    <p className="max-w-xs text-[12.5px] leading-relaxed text-muted">
                      没有真实截图就不放图。等产品能用了我会把线上界面抓下来放这里，不用效果图占位。
                    </p>
                    <span className="chip">Chrome 插件 + 云端看板</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 小工具 ============ */}
      <section className="band band-alt border-t border-line">
        <div className="container-site">
          <div className="sec-head">
            <span className="rail-label">02 / 轻量小工具</span>
            <h2 className="mt-3">有些问题，一个小工具就够了</h2>
            <p className="mt-3.5 max-w-2xl">
              这三个都已上线并稳定运行，各自有独立二级域名，打开即用。
              配图全部是线上真实界面截图。
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {smallTools.map((tool) => {
              const shot = getProductShot(tool);
              return (
                <article key={tool.id} className="card card-hover flex flex-col overflow-hidden">
                  <div className="aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
                    {shot ? (
                      <img
                        src={shot}
                        alt={`${tool.name} 界面截图`}
                        className="h-full w-full object-cover object-top"
                      />
                    ) : (
                      <div className="tool-mark h-full w-full text-[26px] faint">—</div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="!text-[18px]">{tool.name}</h3>
                      <span className="chip chip-ok shrink-0">已上线</span>
                    </div>

                    <p className="mt-3 text-[13.5px] font-medium leading-snug text-ink-soft">{tool.tagline}</p>
                    <p className="mt-3 flex-1 text-[13px] leading-relaxed text-muted">{tool.problemSolved}</p>

                    <ul className="mt-5 space-y-2 border-t border-line-soft pt-4">
                      {tool.features.slice(0, 2).map((f, i) => (
                        <li key={i} className="flex gap-2 text-[12.5px] leading-relaxed text-ink-soft">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ok-600" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between border-t border-line-soft bg-surface-2 px-6 py-3.5">
                    <span className="data truncate text-faint">{tool.techStack.slice(0, 2).join(' · ')}</span>
                    <a
                      href={tool.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex shrink-0 items-center gap-1 text-[12.5px] font-medium text-ink transition-colors hover:text-brand-600"
                    >
                      打开
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 rounded-card border border-line bg-surface p-6">
            <div className="flex-1">
              <h3 className="!text-[16px]">想看每个工具的完整说明与取舍过程？</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                产品详情页里有技术栈、构建过程和明确的劝退场景说明。
              </p>
            </div>
            <Link to="/products" className="btn btn-outline shrink-0">
              逐个查看
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};