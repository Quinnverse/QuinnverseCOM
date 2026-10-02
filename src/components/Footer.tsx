import React from 'react';
import { Mail, ArrowUpRight } from 'lucide-react';
import { SITE_SETTINGS } from '../data/database';
import { Link } from '../utils/router';

const COLUMNS = [
  {
    title: '自研产品',
    links: [
      { label: '海外求职助手 Job OS', to: '/products/job-application-copilot', note: 'Beta' },
      { label: '听默 TingMo', href: 'https://tingmo.quinnverse.tech' },
      { label: '微信读书看板', href: 'https://weread.quinnverse.tech' },
      { label: '完形填空记忆', href: 'https://clozerecitation.quinnverse.tech' },
      { label: '全部产品', to: '/products' },
    ],
  },
  {
    title: '工具与评测',
    links: [
      { label: '精选实测库', to: '/picks' },
      { label: '需求诊断器', to: '/finder' },
      { label: '实用手册与配方', to: '/resources' },
      { label: '商业透明与返佣政策', to: '/disclosure' },
    ],
  },
  {
    title: '内容与实验',
    links: [
      { label: '工程与复盘手记', to: '/journal' },
      { label: '实验室', to: '/lab' },
      { label: '最近动态', to: '/journal' },
    ],
  },
  {
    title: '工作室',
    links: [
      { label: '关于 Quinnverse', to: '/about' },
      { label: '合作开发', to: '/work-with-us' },
      { label: '联系与反馈', to: '/contact' },
      { label: 'GitHub', href: SITE_SETTINGS.githubUrl },
    ],
  },
] as const;

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-line bg-surface">
      {/* 主体 */}
      <div className="container-site band-sm">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          {/* 品牌区 */}
          <div className="max-w-sm">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="text-[19px] font-extrabold tracking-[-0.03em] text-ink">QUINNVERSE</span>
              <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
            </Link>
            <p className="mt-4 text-[14px] leading-relaxed text-ink-soft">
              发现真正好用的工具。找不到合适的，就自己做一个。
            </p>
            <p className="mt-1 data text-faint">Find better tools. Build what's missing.</p>
            <p className="mt-4 text-[13px] leading-relaxed text-muted">
              {SITE_SETTINGS.status}，做解决具体卡点的独立软件，也提供经过真实使用检验的工具实测。
            </p>

            <a
              href={`mailto:${SITE_SETTINGS.contactEmail}`}
              className="btn btn-outline mt-6 !px-3.5 !py-2.5 !text-[13px]"
            >
              <Mail className="h-3.5 w-3.5" />
              <span className="data">{SITE_SETTINGS.contactEmail}</span>
            </a>
          </div>

          {/* 导航列 */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <div className="rail-label">{col.title}</div>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l: any) => (
                    <li key={l.label}>
                      {l.href ? (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[13px] text-muted transition-colors hover:text-ink"
                        >
                          {l.label}
                          <ArrowUpRight className="h-3 w-3 text-faint" />
                        </a>
                      ) : (
                        <Link
                          to={l.to}
                          className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-ink"
                        >
                          {l.label}
                          {'note' in l && l.note && <span className="chip chip-warn !py-0.5 !text-[10px]">{l.note}</span>}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 返佣披露 */}
      <div className="border-t border-line-soft">
        <div className="container-site py-8">
          <div className="card card-hover p-5">
            <div className="rail-label">中立评测与商业返佣声明</div>
            <p className="mt-2.5 text-[13px] leading-relaxed text-muted">
              Quinnverse Picks 绝不出售收录席位与排名。本站部分第三方工具链接可能包含推广返佣
              (Affiliate / Referral)，该收益用于支持工作室独立服务器开销。无论是否存在商业合作，页面均如实披露
              该工具的缺点、局限与网络限制，并始终提供官方纯净入口供自主选择。
            </p>
          </div>
        </div>
      </div>

      {/* 合规底栏 */}
      <div className="border-t border-line-soft">
        <div className="container-site flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-[12.5px] text-muted">
            © 2026 Quinnverse · {SITE_SETTINGS.status}
          </span>
          <div className="flex flex-wrap items-center gap-3 text-[12.5px] text-muted">
            <span>主体性质：个人非经营性网站</span>
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noreferrer"
              className="data text-ink hover:text-brand-600 underline underline-offset-2 transition-colors"
            >
              {SITE_SETTINGS.icpNumber}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};