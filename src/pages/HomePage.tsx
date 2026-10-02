import React from 'react';
import { ArrowRight, ArrowUpRight, ExternalLink, Wrench, Compass, Layers } from 'lucide-react';
import { Link } from '../utils/router';
import { PRODUCTS, PICKS, ACTIVITY_FEED, SITE_SETTINGS } from '../data/database';
import { getProductShot, hasRealShot, getToolMark } from '../data/visuals';

const FAMILY_LABEL: Record<string, string> = {
  GLOBAL_PRODUCT: '完整系统',
  SMALL_TOOL: '轻量小工具',
};

export const HomePage: React.FC = () => {
  const featured = PRODUCTS.find((p) => p.slug === 'job-application-copilot')!;
  const smallTools = PRODUCTS.filter((p) => p.family === 'SMALL_TOOL');
  const featuredShot = getProductShot(featured);
  const topPicks = PICKS.filter((p) => p.featured).slice(0, 3);
  const liveTools = PICKS.filter((p) => p.evidenceLevel === 'DAILY DRIVER' || p.evidenceLevel === 'USED IN PROJECT');

  return (
    <>
      {/* ============ Hero ============ */}
      <section className="band border-b border-line-soft">
        <div className="container-site">
          <div className="max-w-3xl">
            <span className="chip chip-brand">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
              {SITE_SETTINGS.status}
            </span>

            <h1 className="mt-6">
              找到真正好用的工具。
              <br />
              找不到合适的，就自己做一个。
            </h1>

            <p className="lead mt-6 max-w-2xl">
              这里有两件事：把你实测过的工具如实写清楚（包括缺点和劝退人群），
              以及把市场上没人做的那些具体卡点，做成能跑起来的小软件。
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link to="/picks" className="btn btn-primary">
                看实测工具库
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/products" className="btn btn-outline">
                看自研产品
              </Link>
            </div>

            {/* 事实数据条 */}
            <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
              {[
                { k: '自研产品', v: `${PRODUCTS.length} 个`, note: '3 个已上线' },
                { k: '收录工具', v: `${PICKS.length} 个`, note: '全部实测' },
                { k: '手记', v: '5 篇', note: '工程与复盘' },
                { k: '收费', v: '0 元', note: '不卖收录位' },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="rail-label">{s.k}</dt>
                  <dd className="mt-2 text-[22px] font-bold tracking-[-0.02em] text-ink">{s.v}</dd>
                  <dd className="mt-0.5 text-[12.5px] text-muted">{s.note}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ============ 三条路径 ============ */}
      <section className="band-sm">
        <div className="container-site">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Compass,
                title: '我不确定该用什么',
                desc: '描述你的约束和预算，让需求诊断器帮你排除掉不适用的选项。',
                to: '/finder',
                cta: '打开需求诊断器',
              },
              {
                icon: Layers,
                title: '我想看别人踩过哪些坑',
                desc: `${PICKS.length} 个工具的真实评测，每条都写清了不适用的人群和局限。`,
                to: '/picks',
                cta: '浏览实测库',
              },
              {
                icon: Wrench,
                title: '我要自己做一个小工具',
                desc: '聊聊你的具体卡点，一到三周交付一个能真跑起来的版本，不是 PPT。',
                to: '/work-with-us',
                cta: '聊具体需求',
              },
            ].map((c) => (
              <Link key={c.title} to={c.to} className="card card-hover group flex flex-col p-6">
                <c.icon className="h-5 w-5 text-brand-600" strokeWidth={1.75} />
                <h3 className="mt-5">{c.title}</h3>
                <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-muted">{c.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-[13px] font-medium text-ink transition-colors group-hover:text-brand-600">
                  {c.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 重点产品 ============ */}
      <section className="band band-alt border-y border-line">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <div>
              <span className="rail-label">重点产品 · {FAMILY_LABEL[featured.family]}</span>
              <h2 className="mt-4">{featured.name}</h2>
              <p className="lead mt-4">{featured.tagline}</p>

              <ul className="mt-7 space-y-3">
                {featured.features.slice(0, 3).map((f) => (
                  <li key={f} className="flex gap-3 text-[14px] leading-relaxed text-ink-soft">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-600" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to={`/products/${featured.slug}`} className="btn btn-primary">
                  查看产品详情
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <span className="chip chip-warn">Beta · 无公开界面，暂不放截图</span>
              </div>
            </div>

            {/* 视觉位：Beta 产品不编造截图，用明确的占位说明 */}
            <div className="card overflow-hidden">
              {featuredShot ? (
                <img src={featuredShot} alt={`${featured.name} 界面`} className="w-full" />
              ) : (
                <div className="flex aspect-[16/10] flex-col items-center justify-center gap-3 bg-surface-2 p-8 text-center">
                  <div className="tool-mark h-14 w-14 text-[20px]" style={{ background: '#f4f5f7', color: '#9ca0a6' }}>
                    β
                  </div>
                  <p className="text-[13.5px] font-medium text-ink-soft">该产品仍在 Beta，暂无公开界面</p>
                  <p className="max-w-xs text-[12.5px] leading-relaxed text-muted">
                    没有真实截图就不放图。等它能用了我会把线上界面抓下来放这里。
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============ 小工具（真实截图） ============ */}
      <section className="band">
        <div className="container-site">
          <div className="sec-head">
            <span className="rail-label">轻量小工具</span>
            <h2 className="mt-3">三个已经能用的小东西</h2>
            <p className="max-w-2xl">
              全部已上线，界面是线上真实截图，不是效果图。每一个都只解决一个具体的麻烦。
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {smallTools.map((p) => {
              const shot = getProductShot(p);
              return (
                <article key={p.id} className="card card-hover overflow-hidden">
                  <Link to={`/products/${p.slug}`} className="block">
                    <div className="aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
                      {shot ? (
                        <img
                          src={shot}
                          alt={`${p.name} 界面截图`}
                          className="h-full w-full object-cover object-top"
                        />
                      ) : (
                        <div className="tool-mark h-full w-full text-[28px] faint">—</div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="!text-[17px]">{p.name}</h3>
                        <span className="chip chip-ok shrink-0">已上线</span>
                      </div>
                      <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{p.tagline}</p>
                    </div>
                  </Link>
                  <div className="flex items-center justify-between border-t border-line-soft px-5 py-3">
                    <span className="data text-faint">{p.techStack.slice(0, 2).join(' · ')}</span>
                    <a
                      href={p.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[12.5px] font-medium text-ink hover:text-brand-600 transition-colors"
                    >
                      打开
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ Picks 精选 ============ */}
      <section className="band band-alt border-y border-line">
        <div className="container-site">
          <div className="sec-head flex-row items-end justify-between gap-6 max-w-none">
            <div className="max-w-xl">
              <span className="rail-label">精选实测 · Picks</span>
              <h2 className="mt-3">在真实项目里用过的工具</h2>
              <p className="mt-3.5">
                每条评测都写了三件事：哪里好用、哪里不够用、什么人不该买。不接受付费收录与排名购买。
              </p>
            </div>
            <Link to="/picks" className="btn btn-outline shrink-0">
              全部 {PICKS.length} 个
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {topPicks.map((p) => {
              const mark = getToolMark(p.slug);
              return (
                <Link key={p.id} to={`/picks/${p.slug}`} className="card card-hover group p-6">
                  <div className="flex items-center gap-3.5">
                    <div
                      className="tool-mark h-12 w-12 shrink-0 text-[17px]"
                      style={{ background: mark.bg, color: mark.fg }}
                    >
                      {mark.initials}
                    </div>
                    <div className="min-w-0">
                      <h3 className="!text-[17px] truncate">{p.name}</h3>
                      <span className="mt-1 block text-[12px] text-muted">{p.category}</span>
                    </div>
                  </div>

                  <p className="mt-5 line-clamp-3 text-[13.5px] leading-relaxed text-muted">{p.summary}</p>

                  <div className="mt-5 space-y-2 border-t border-line-soft pt-4">
                    {p.fallsShort.slice(0, 2).map((s) => (
                      <div key={s} className="flex gap-2 text-[12.5px] leading-relaxed text-ink-soft">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-warn-600" />
                        {s}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="chip">{p.evidenceLevel}</span>
                    <span className="data text-faint">测试于 {p.lastTested}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ 动态 ============ */}
      <section className="band">
        <div className="container-site">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="sec-head" style={{ marginBottom: '32px' }}>
                <span className="rail-label">最近在做什么</span>
                <h2 className="mt-3">工作室动态</h2>
              </div>

              <ul className="card divide-y divide-line-soft">
                {ACTIVITY_FEED.map((a) => (
                  <li key={a.id}>
                    <Link to={a.link} className="group flex gap-5 p-5 transition-colors hover:bg-surface-2">
                      <span className="data shrink-0 pt-1 text-faint">{a.date}</span>
                      <div className="min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="!text-[15px] leading-snug transition-colors group-hover:text-brand-600">
                            {a.title}
                          </h3>
                          <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-brand-600" />
                        </div>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{a.note}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 侧栏：常驻工具 + 主张 */}
            <div className="space-y-4">
              <div className="card p-6">
                <span className="rail-label">日常主力</span>
                <div className="mt-5 space-y-4">
                  {liveTools.map((p) => {
                    const mark = getToolMark(p.slug);
                    return (
                      <Link key={p.id} to={`/picks/${p.slug}`} className="group flex items-center gap-3.5">
                        <div
                          className="tool-mark h-9 w-9 shrink-0 text-[13px]"
                          style={{ background: mark.bg, color: mark.fg }}
                        >
                          {mark.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[14px] font-medium text-ink transition-colors group-hover:text-brand-600">
                            {p.name}
                          </div>
                          <div className="text-[12px] text-muted">{p.category}</div>
                        </div>
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-faint" />
                      </Link>
                    );
                  })}
                </div>
                <Link to="/picks" className="btn btn-outline mt-6 w-full">
                  查看全部评测
                </Link>
              </div>

              <div className="card bg-ink p-6 text-white">
                <span className="rail-label !text-white/45">一条底线</span>
                <p className="mt-4 text-[15px] font-semibold leading-snug">
                  说了什么功能，代码里就得有对应实现。
                </p>
                <p className="mt-3 text-[13.5px] leading-relaxed text-white/65">
                  工具不好用就写进劝退栏，不假装有几十人团队，不编造客户评价和产品数据。
                </p>
                <Link
                  to="/journal/anti-slop-guide"
                  className="mt-5 inline-flex items-center gap-1 text-[13px] font-medium text-white transition-opacity hover:opacity-75"
                >
                  读《去油腻指南》
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="band-sm border-t border-line bg-surface">
        <div className="container-site">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <h2 className="!text-[26px]">有具体卡点？说来听听</h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
                如果市面上没有现成方案，或者现成方案太重，我可以用一到三周做一个能真跑起来的版本给你。
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/work-with-us" className="btn btn-brand">
                聊具体需求
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a href={`mailto:${SITE_SETTINGS.contactEmail}`} className="btn btn-outline">
                直接发邮件
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};