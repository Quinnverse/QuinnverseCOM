import React from 'react';
import { Link } from '../utils/router';
import { PICKS } from '../data/database';

const CLAUSES = [
  {
    title: 'Picks 不出售收录席位与排名',
    paras: [
      '任何软件服务商都无法通过付费、赞助或商务互换购买进入 Quinnverse Picks 的资格。收录的唯一硬性准则是：该工具在实际开发或日常生产流中被真实使用过，并且确实解决了明确的问题。',
      '如果某个工具只有营销页面而没进过我的项目，它就不在库里。如果它曾经好用后来变差，我会把它降级甚至移出去，而不是收钱留着。',
    ],
  },
  {
    title: '返佣链接会被标注，且收益只用于维持运营',
    paras: [
      '本站部分第三方工具链接可能包含官方推广返佣标识（Affiliate / Referral）。当你通过这类链接访问或订阅时，Quinnverse 可能从服务商处获得一笔佣金。',
      '这笔收益全部用于覆盖服务器租用、域名续费和自研产品的开发成本，不会变成利润。',
      '凡含有返佣的链接，页面都会显式标注，并且始终提供官方直达链接供你自己选。',
    ],
  },
  {
    title: '缺点披露与商业关系绝对独立',
    paras: [
      '即使某个工具与本站存在推广合作，它在实际使用中暴露出的缺陷——索引慢、定价贵、配置繁琐、国内访问受阻——依然会清楚写在评测页的「不足」一栏里。',
      '同样，不与我合作的工具也不会因为关系差而被贬低。评测结论只取决于实际使用结果。',
    ],
  },
  {
    title: '证据等级会动态调整',
    paras: [
      '每个收录项都有一个证据等级：日常主力、项目实战、场景实测、待复核。等级反映的是我实际使用的深度，不是产品好坏评分。',
      '如果某个工具后续版本出现严重体验退步、恶意涨价或隐私违规，它的证据等级会被下调，直至从库里移除。',
    ],
  },
];

const AFFILIATE_PICKS = PICKS.filter((p) => p.affiliateRelationship);

export const DisclosurePage: React.FC = () => {
  return (
    <>
      {/* ============ 页头 ============ */}
      <section className="band-sm border-b border-line-soft">
        <div className="container-site">
          <div className="max-w-3xl">
            <span className="rail-label">商业透明度</span>
            <h1 className="mt-6">商业透明度与返佣政策</h1>
            <p className="lead mt-6 max-w-2xl">
              关于选品中立性、返佣标注、缺点披露和动态淘汰机制的完整说明。
              这一页写得越具体，评测越可信。
            </p>
          </div>
        </div>
      </section>

      {/* ============ 条款 ============ */}
      <section className="band-sm">
        <div className="container-site">
          <div className="max-w-3xl">
            <div className="card divide-y divide-line-soft">
              {CLAUSES.map((c, i) => (
                <section key={c.title} className="p-7 sm:p-9">
                  <div className="flex gap-4">
                    <span className="data shrink-0 pt-1.5 text-brand-600">0{i + 1}</span>
                    <div>
                      <h2 className="!text-[19px] leading-snug">{c.title}</h2>
                      <div className="mt-4 space-y-3.5">
                        {c.paras.map((p, j) => (
                          <p key={j} className="text-[14px] leading-relaxed text-ink-soft">
                            {p}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              ))}
            </div>

            {/* 现状表 */}
            <div className="card mt-6 p-7">
              <span className="rail-label">当前返佣状态</span>
              {AFFILIATE_PICKS.length === 0 ? (
                <>
                  <p className="mt-3 text-[15px] font-semibold text-ink">
                    目前没有任何返佣链接。
                  </p>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                    库里 {PICKS.length} 个工具，全部走官方直达入口，没有一个带推广标记。
                    如果将来加了，我会在这里列出来，并且不会因为收了钱就改动评测结论。
                  </p>
                </>
              ) : (
                <ul className="mt-4 space-y-2.5">
                  {AFFILIATE_PICKS.map((p) => (
                    <li key={p.id} className="flex items-center justify-between gap-4 text-[14px]">
                      <span className="font-medium text-ink">{p.name}</span>
                      <span className="chip chip-warn">含返佣链接</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-6 border-t border-line-soft pt-5">
                <p className="text-[13px] leading-relaxed text-muted">
                  发现本页与实际情况不符？
                  <Link to="/contact" className="ml-1 font-medium text-ink underline underline-offset-2 hover:text-brand-600">
                    请告诉我
                  </Link>
                  ，核实后会立即修正。
                </p>
              </div>
            </div>

            {/* 导航 */}
            <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
              <Link to="/" className="text-[13.5px] text-muted transition-colors hover:text-ink">
                ← 返回首页
              </Link>
              <Link to="/picks" className="text-[13.5px] font-medium text-ink transition-colors hover:text-brand-600">
                去 Picks 实测库 →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};