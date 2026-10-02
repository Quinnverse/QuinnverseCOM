import React, { useState } from 'react';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { Link } from '../utils/router';
import { RESOURCES } from '../data/database';

const TYPE_LABEL: Record<string, string> = {
  GUIDE: '指南',
  CHECKLIST: '核对清单',
  SKILL: '提示词配方',
};

/** 把 markdown 风格的 content 拆成结构化块 */
function parseContent(raw: string) {
  return raw.split('\n').reduce<
    { type: 'h' | 'li' | 'num' | 'p' | 'gap'; text: string }[]
  >((acc, line) => {
    const t = line.trim();
    if (!t) {
      if (acc.length && acc[acc.length - 1].type !== 'gap') acc.push({ type: 'gap', text: '' });
      return acc;
    }
    if (t.startsWith('### ')) acc.push({ type: 'h', text: t.slice(4) });
    else if (/^\d+\.\s/.test(t)) acc.push({ type: 'num', text: t.replace(/^\d+\.\s/, '') });
    else if (/^[-*]\s/.test(t)) acc.push({ type: 'li', text: t.slice(2) });
    else acc.push({ type: 'p', text: t });
    return acc;
  }, []);
}

export const ResourceDetailPage: React.FC<{ slug: string }> = ({ slug }) => {
  const resource = RESOURCES.find((r) => r.slug === slug);
  const [copied, setCopied] = useState(false);

  if (!resource) {
    return (
      <section className="band">
        <div className="container-site">
          <div className="mx-auto max-w-md py-16 text-center">
            <h1 className="!text-[28px]">没有这份资源</h1>
            <p className="lead mt-4">可能链接有误，或者已经更新地址。</p>
            <Link to="/resources" className="btn btn-primary mt-8">
              <ArrowLeft className="h-4 w-4" />
              返回资源库
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const blocks = parseContent(resource.content);

  const handleCopy = async () => {
    if (!resource.copyableSnippet) return;
    try {
      await navigator.clipboard.writeText(resource.copyableSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      {/* ============ 页头 ============ */}
      <section className="band-sm border-b border-line-soft">
        <div className="container-site">
          <div className="mx-auto max-w-2xl">
            <Link
              to="/resources"
              className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              返回资源库
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="chip chip-brand">{TYPE_LABEL[resource.type] ?? resource.type}</span>
              <span className="data text-faint">免费公开 · 可直接复制</span>
            </div>

            <h1 className="mt-5">{resource.title}</h1>

            <p className="mt-6 border-l-2 border-brand-600 pl-5 text-[16px] font-medium leading-relaxed text-ink-soft">
              {resource.summary}
            </p>
          </div>
        </div>
      </section>

      {/* ============ 正文 ============ */}
      <section className="band-sm">
        <div className="container-site">
          <div className="mx-auto max-w-2xl">
            <p className="text-[14.5px] leading-relaxed text-muted">{resource.description}</p>

            <div className="mt-9 space-y-4">
              {blocks.map((b, i) => {
                if (b.type === 'gap') return <div key={i} className="h-2" />;
                if (b.type === 'h') {
                  return (
                    <h2 key={i} className="!text-[20px] pt-6">
                      {b.text}
                    </h2>
                  );
                }
                if (b.type === 'num' || b.type === 'li') {
                  return (
                    <div key={i} className="flex gap-3.5">
                      <span className="data mt-1 shrink-0 text-brand-600">
                        {b.type === 'num' ? `${blocks.slice(0, i).filter((x) => x.type === 'num').length}.` : '·'}
                      </span>
                      <p className="text-[15px] leading-[1.75] text-ink-soft">{b.text}</p>
                    </div>
                  );
                }
                return (
                  <p key={i} className="text-[15px] leading-[1.75] text-ink-soft">
                    {b.text}
                  </p>
                );
              })}
            </div>

            {/* 配方框 */}
            {resource.copyableSnippet && (
              <div className="mt-12 overflow-hidden rounded-card border border-line">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-surface-2 px-5 py-3.5">
                  <span className="rail-label">
                    {resource.type === 'SKILL' ? '提示词配方' : '核对模板'}
                  </span>
                  <button
                    onClick={handleCopy}
                    className={`btn !py-2 !text-[12.5px] ${copied ? 'btn-outline' : 'btn-primary'}`}
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-ok-600" />
                        已复制
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        一键复制
                      </>
                    )}
                  </button>
                </div>
                <pre className="overflow-x-auto whitespace-pre-wrap break-words bg-surface p-5 font-mono text-[12.5px] leading-relaxed text-ink-soft">
                  {resource.copyableSnippet}
                </pre>
              </div>
            )}

            {/* 底部 */}
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <Link to="/resources" className="text-[13.5px] text-muted transition-colors hover:text-ink">
                ← 返回资源库
              </Link>
              <Link to="/picks" className="text-[13.5px] font-medium text-ink transition-colors hover:text-brand-600">
                去实测库 →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};