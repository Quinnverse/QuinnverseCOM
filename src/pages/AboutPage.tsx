import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '../utils/router';
import { SITE_SETTINGS, PRODUCTS, PICKS } from '../data/database';

const FLYWHEEL = [
  {
    zh: '发现',
    en: 'Discover',
    desc: '直面真实开发与生活里那些具体到能复述的卡点，先去找市面上的现有解法。',
  },
  {
    zh: '实测',
    en: 'Test',
    desc: '不抄官方公关文案。放进高频生产流里用，记下真实的优点、局限和劝退人群。',
  },
  {
    zh: '自研',
    en: 'Build',
    desc: '现有工具确实解决不了的，用最小可用的形态把它做成能稳定跑起来的软件。',
  },
  {
    zh: '沉淀',
    en: 'Share',
    desc: '把踩过的坑、可复用的方法和工具公开交付出去，不留私藏。',
  },
];

const FACTS = [
  { k: '自研产品', v: `${PRODUCTS.length} 个`, note: '其中 3 个已上线' },
  { k: '收录评测', v: `${PICKS.length} 个`, note: '全部真实使用过' },
  { k: '团队规模', v: '1 人', note: '没有融资，没有员工' },
  { k: 'Picks 收费', v: '0 元', note: '不出售收录与排名' },
];

export const AboutPage: React.FC = () => {
  return (
    <>
      {/* ============ 页头 ============ */}
      <section className="band-sm border-b border-line-soft">
        <div className="container-site">
          <span className="rail-label">关于</span>
          <h1 className="mt-6 max-w-3xl">
            发现真正好用的工具。
            <br />
            找不到合适的，就自己做一个。
          </h1>
          <p className="lead mt-6 max-w-2xl">
            Quinnverse 是一个个人独立产品工作室。不是外包公司，也没有融资故事，
            只有一件事：把具体卡点解决掉。
          </p>

          <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
            {FACTS.map((f) => (
              <div key={f.k}>
                <dt className="rail-label">{f.k}</dt>
                <dd className="mt-2 text-[22px] font-bold tracking-[-0.02em] text-ink">{f.v}</dd>
                <dd className="mt-0.5 text-[12.5px] text-muted">{f.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ============ 四步循环 ============ */}
      <section className="band">
        <div className="container-site">
          <div className="sec-head">
            <span className="rail-label">运转方式</span>
            <h2 className="mt-3">四个步骤，一个闭环</h2>
            <p className="mt-3.5">
              不是先做产品再想营销，而是先解决一个真实卡点，再决定是推荐现成工具还是自己做。
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {FLYWHEEL.map((step, i) => (
              <div key={step.en} className="bg-surface p-7">
                <div className="flex items-baseline gap-2.5">
                  <span className="data text-faint">0{i + 1}</span>
                  <h3 className="!text-[18px]">{step.zh}</h3>
                </div>
                <span className="mt-1.5 block data text-brand-600">{step.en}</span>
                <p className="mt-4 text-[13.5px] leading-relaxed text-muted">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 三条不 ============ */}
      <section className="band band-alt border-y border-line">
        <div className="container-site">
          <div className="sec-head">
            <span className="rail-label">底线</span>
            <h2 className="mt-3">三件不会做的事</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                t: '不出售收录与排名',
                d: 'Picks 里的每个位置都是自己实测后放进去的。任何工具都无法通过付费进入列表或提升顺序。',
              },
              {
                t: '不编造数据与评价',
                d: '没有假五星评分，没有假客户 Logo，没有假「服务 1000+ 企业」。页面上的每个数字都能在代码里找到对应。',
              },
              {
                t: '不用假界面充数',
                d: '产品没上线就不放截图，不用效果图假装能跑。评测页宁可只有文字，也不配一张无关的风景照。',
              },
            ].map((x) => (
              <div key={x.t} className="card p-6">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-brand-200 bg-brand-50 text-[11px] font-bold text-brand-700">
                    ✕
                  </span>
                  <h3 className="!text-[16px]">{x.t}</h3>
                </div>
                <p className="mt-4 text-[13.5px] leading-relaxed text-muted">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 主体说明 ============ */}
      <section className="band">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <span className="rail-label">主体说明</span>
              <h2 className="mt-3">谁在维护这个站</h2>
              <div className="mt-6 space-y-4 text-[14.5px] leading-relaxed text-ink-soft">
                <p>
                  Quinnverse 由我一个人运营。日常工作是做产品、写代码，也做长期的技术调研。
                  这里没有内容团队和 SEO 团队，所以文章更新不快，但每一篇都是自己写过、跑通过的。
                </p>
                <p>
                  产品的判断标准很简单：一个具体卡点值不值得做一个软件。如果现有工具改配置就能解决，
                  我会推荐现有工具；如果确实没有方案，我会说明为什么值得做一个新的。
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/picks" className="btn btn-primary">
                  看实测库
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/journal/anti-slop-guide" className="btn btn-outline">
                  读去油腻指南
                </Link>
              </div>
            </div>

            {/* 合规卡片 */}
            <div className="card h-fit p-6">
              <span className="rail-label">合规信息</span>
              <dl className="mt-5 space-y-4">
                <div className="border-b border-line-soft pb-4">
                  <dt className="text-[12.5px] text-muted">主体性质</dt>
                  <dd className="mt-1 text-[14px] font-medium text-ink">
                    个人非经营性网站 / 独立产品工作室
                  </dd>
                </div>
                <div className="border-b border-line-soft pb-4">
                  <dt className="text-[12.5px] text-muted">工信部备案号</dt>
                  <dd className="mt-1">
                    <a
                      href="https://beian.miit.gov.cn/"
                      target="_blank"
                      rel="noreferrer"
                      className="data text-ink underline underline-offset-2 hover:text-brand-600"
                    >
                      {SITE_SETTINGS.icpNumber}
                    </a>
                  </dd>
                </div>
                <div className="border-b border-line-soft pb-4">
                  <dt className="text-[12.5px] text-muted">联系邮箱</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${SITE_SETTINGS.contactEmail}`}
                      className="data text-ink underline underline-offset-2 hover:text-brand-600"
                    >
                      {SITE_SETTINGS.contactEmail}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-[12.5px] text-muted">商业合作披露</dt>
                  <dd className="mt-1">
                    <Link to="/disclosure" className="text-[14px] text-ink underline underline-offset-2 hover:text-brand-600">
                      查看完整政策
                    </Link>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};