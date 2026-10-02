import React, { useState, useMemo } from 'react';
import { Check, X, ArrowRight, Copy, CheckCircle2 } from 'lucide-react';
import { Link } from '../utils/router';
import { STUDIO_SERVICES, SITE_SETTINGS } from '../data/database';

const GOOD_FIT = [
  '问题很具体，几句话能说清现在卡在哪',
  '需要一个人真正端到端把东西做出来，而不是要方案文档',
  '接受确定性工程优先，不指望大模型一次生成就对',
  '在意信息密度、留白和响应速度',
  '愿意自己先试一个能跑的版本，再决定要不要继续',
];

const NOT_FIT = [
  '需要几十人驻场、要走招投标的大型 ERP 项目',
  '要求「全能 AI 自动接管一切」',
  '想在几天内堆出一堆套壳页面',
  '只需要一份概念 PPT，不想验证代码能不能跑',
  '需求三个月内变五次',
];

const STEPS = [
  { n: '01', t: '异步描述问题', d: '你把当前流程和最卡手的地方写清楚，不需要整理文档，说人话就行。' },
  { n: '02', t: '可行性评估', d: '我会评估技术路径和实现难度，如实告诉你能不能做、代价是什么。' },
  { n: '03', t: '最小闭环交付', d: '锁定最核心的那个场景，先交付一版能跑通全链路的东西给你试。' },
  { n: '04', t: '按反馈迭代', d: '拿到你的实际使用反馈后决定是继续打磨、砍功能，还是停掉。' },
];

export const WorkWithUsPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [direction, setDirection] = useState(STUDIO_SERVICES[0].title);
  const [brief, setBrief] = useState('');
  const [copied, setCopied] = useState(false);

  const subject = `[合作咨询][${direction}]`;

  const body = useMemo(() => {
    const lines: string[] = [];
    if (name.trim()) lines.push(`称呼：${name.trim()}`);
    if (email.trim()) lines.push(`联系方式：${email.trim()}`);
    lines.push(`合作方向：${direction}`, '', brief.trim() || '（在此描述你的具体卡点）');
    lines.push('', '---', '本邮件通过 quinnverse.tech 合作页发送');
    return lines.join('\n');
  }, [name, email, direction, brief]);

  const mailtoHref = `mailto:${SITE_SETTINGS.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const canSend = brief.trim().length > 0;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`收件人：${SITE_SETTINGS.contactEmail}\n主题：${subject}\n\n${body}`);
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
          <div className="max-w-3xl">
            <span className="chip chip-brand">合作开发</span>
            <h1 className="mt-6">有值得做的东西吗</h1>
            <p className="lead mt-6 max-w-2xl">
              我只接少数几类需求：问题足够具体、能真的跑起来、不需要堆人手填坑。
              下面会写清楚我接什么、不接什么，以及合作怎么走。
            </p>
          </div>
        </div>
      </section>

      {/* ============ 能做什么 ============ */}
      <section className="band-sm">
        <div className="container-site">
          <div className="sec-head">
            <span className="rail-label">01 / 能做什么</span>
            <h2 className="mt-3">四类常见的合作方向</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {STUDIO_SERVICES.map((s) => (
              <div key={s.id} className="card card-hover p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="!text-[17px]">{s.title}</h3>
                  <span className="chip">{s.typicalTimeline}</span>
                </div>
                <p className="mt-3 text-[14px] font-medium leading-snug text-ink-soft">{s.tagline}</p>
                <p className="mt-3 text-[13.5px] leading-relaxed text-muted">{s.description}</p>

                <div className="mt-5 border-t border-line-soft pt-4">
                  <span className="rail-label">交付内容</span>
                  <ul className="mt-3 space-y-2">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex gap-2.5 text-[13px] leading-relaxed text-ink-soft">
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ok-600" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 适合 / 不适合 ============ */}
      <section className="band-sm pt-0">
        <div className="container-site">
          <div className="sec-head">
            <span className="rail-label">02 / 判断标准</span>
            <h2 className="mt-3">先说清楚不接什么</h2>
            <p className="mt-3.5">
              提前把话说在前面，比聊了十轮才发现不合适省时间。
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="card border-ok-600/25 bg-ok-50/40 p-7">
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ok-600 text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <h3 className="!text-[16px]">适合找我的情况</h3>
              </div>
              <ul className="mt-5 space-y-3">
                {GOOD_FIT.map((x) => (
                  <li key={x} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-soft">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ok-600" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card border-warn-600/25 bg-warn-50/40 p-7">
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-warn-600 text-white">
                  <X className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <h3 className="!text-[16px]">不适合的情况</h3>
              </div>
              <ul className="mt-5 space-y-3">
                {NOT_FIT.map((x) => (
                  <li key={x} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-soft">
                    <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warn-600" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 流程 ============ */}
      <section className="band-sm pt-0">
        <div className="container-site">
          <div className="sec-head">
            <span className="rail-label">03 / 怎么走</span>
            <h2 className="mt-3">四步，不绕弯</h2>
          </div>

          <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div key={s.n} className="bg-surface p-6">
                <span className="data text-brand-600">{s.n}</span>
                <h3 className="mt-3 !text-[16px]">{s.t}</h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-muted">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 联系 ============ */}
      <section className="band-sm pt-0">
        <div className="container-site">
          <div className="card p-7 sm:p-9">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <span className="rail-label">04 / 开始聊</span>
                <h2 className="mt-3 !text-[22px]">写封邮件说说你的问题</h2>
              </div>
              <span className="chip chip-ok">没有后台，内容直接进你的邮件客户端</span>
            </div>

            <div className="mt-7 grid gap-6 lg:grid-cols-2">
              {/* 表单 */}
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="w-name" className="text-[13px] font-medium text-ink">称呼</label>
                    <input
                      id="w-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="怎么称呼你"
                      className="mt-2 w-full rounded-card border border-line bg-surface px-3.5 py-2.5 text-[14px] placeholder:text-faint focus:border-ink focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="w-email" className="text-[13px] font-medium text-ink">
                      邮箱 <span className="font-normal text-muted">（选填）</span>
                    </label>
                    <input
                      id="w-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="方便回复你"
                      className="mt-2 w-full rounded-card border border-line bg-surface px-3.5 py-2.5 text-[14px] placeholder:text-faint focus:border-ink focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="w-dir" className="text-[13px] font-medium text-ink">合作方向</label>
                  <select
                    id="w-dir"
                    value={direction}
                    onChange={(e) => setDirection(e.target.value)}
                    className="mt-2 w-full cursor-pointer rounded-card border border-line bg-surface px-3.5 py-2.5 text-[14px] focus:border-ink focus:outline-none"
                  >
                    {STUDIO_SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                    <option value="其他具体场景">其他具体场景</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="w-brief" className="text-[13px] font-medium text-ink">具体卡点</label>
                  <textarea
                    id="w-brief"
                    rows={6}
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    placeholder="现在怎么做的、卡在哪一步、希望能省下什么。两三句就够，不用整理成需求文档。"
                    className="mt-2 w-full rounded-card border border-line bg-surface p-3.5 text-[14px] leading-relaxed placeholder:text-faint focus:border-ink focus:outline-none"
                  />
                </div>
              </div>

              {/* 预览 */}
              <div className="flex flex-col">
                <div className="rounded-card border border-line bg-surface-2 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rail-label">邮件预览</span>
                    <button
                      onClick={handleCopy}
                      className="inline-flex cursor-pointer items-center gap-1.5 text-[12.5px] text-muted transition-colors hover:text-ink"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-ok-600" />
                          已复制
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          复制全文
                        </>
                      )}
                    </button>
                  </div>
                  <div className="mt-3 space-y-1.5">
                    <div className="flex gap-2 text-[12.5px]">
                      <span className="shrink-0 text-faint">收件人</span>
                      <span className="data break-all text-ink">{SITE_SETTINGS.contactEmail}</span>
                    </div>
                    <div className="flex gap-2 text-[12.5px]">
                      <span className="shrink-0 text-faint">主题</span>
                      <span className="text-ink">{subject}</span>
                    </div>
                  </div>
                  <pre className="mt-3 max-h-48 overflow-y-auto whitespace-pre-wrap break-words border-t border-line-soft pt-3 text-[12.5px] leading-relaxed text-ink-soft">
                    {body}
                  </pre>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {canSend ? (
                    <a href={mailtoHref} className="btn btn-brand">
                      用邮件客户端打开
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <button disabled className="btn btn-primary cursor-not-allowed !opacity-40">
                      先写点内容
                    </button>
                  )}
                  <Link to="/contact" className="text-[13px] text-muted underline underline-offset-2 transition-colors hover:text-ink">
                    或去联系页
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};