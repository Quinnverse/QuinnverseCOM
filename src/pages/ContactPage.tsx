import React, { useState, useMemo } from 'react';
import { Mail, Copy, Check, ArrowRight } from 'lucide-react';
import { SITE_SETTINGS } from '../data/database';

const TOPICS = [
  { label: '产品体验反馈 / Bug 报告', tag: 'feedback' },
  { label: '推荐值得实测的工具', tag: 'tool-recommendation' },
  { label: '合作开发咨询', tag: 'collaboration' },
  { label: '技术交流', tag: 'tech-talk' },
];

export const ContactPage: React.FC = () => {
  const [topicIndex, setTopicIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [copied, setCopied] = useState(false);

  const topic = TOPICS[topicIndex];

  const subject = `[Quinnverse][${topic.label}]`;

  const body = useMemo(() => {
    const lines: string[] = [];
    if (email.trim()) lines.push(`我的联系方式：${email.trim()}`);
    lines.push('', content.trim() || '（在此填写内容）');
    lines.push('', '---', '本邮件通过 quinnverse.tech 联系页发送');
    return lines.join('\n');
  }, [email, content]);

  const mailtoHref = useMemo(() => {
    const params = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return `mailto:${SITE_SETTINGS.contactEmail}?${params}`;
  }, [subject, body]);

  const canOpen = content.trim().length > 0;

  const handleCopy = async () => {
    const text = `收件人：${SITE_SETTINGS.contactEmail}\n主题：${subject}\n\n${body}`;
    try {
      await navigator.clipboard.writeText(text);
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
            <span className="rail-label">联系与反馈</span>
            <h1 className="mt-6">说点什么都可以</h1>
            <p className="lead mt-6 max-w-2xl">
              吐槽产品问题、推荐值得实测的工具、或者只是想聊某个技术方案，都欢迎。
              本站没有留言系统，下面的表单会在你自己的邮件客户端里写好一封完整的邮件。
            </p>
          </div>
        </div>
      </section>

      {/* ============ 邮箱 + 表单 ============ */}
      <section className="band-sm">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr]">

            {/* 左：邮箱 */}
            <div>
              <div className="card p-6">
                <span className="rail-label">唯一联系邮箱</span>
                <a
                  href={`mailto:${SITE_SETTINGS.contactEmail}`}
                  className="mt-3 flex items-center gap-2.5 text-[15px] font-semibold text-ink transition-colors hover:text-brand-600"
                >
                  <Mail className="h-4 w-4 shrink-0 text-brand-600" />
                  <span className="data break-all">{SITE_SETTINGS.contactEmail}</span>
                </a>
                <p className="mt-4 text-[13.5px] leading-relaxed text-muted">
                  这是一个人维护的站，邮件我会逐封看。工作日通常 1~2 天内回复；
                  如果超过一周没回，多半是漏了，可以再发一次。
                </p>
              </div>

              <div className="card mt-4 p-6">
                <span className="rail-label">更快的路径</span>
                <ul className="mt-4 space-y-3.5">
                  {[
                    { t: '产品 Bug', d: '描述复现步骤和实际表现，我会先修。' },
                    { t: '工具推荐', d: '说明你在什么场景下用它解决了什么。' },
                    { t: '合作开发', d: '带上你的卡点和已有工具，我们评估值不值得做。' },
                    { t: '评测纠错', d: '如果你发现我写错了，请告诉我，这对我很重要。' },
                  ].map((x) => (
                    <li key={x.t}>
                      <div className="text-[14px] font-medium text-ink">{x.t}</div>
                      <div className="mt-0.5 text-[13px] leading-relaxed text-muted">{x.d}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 右：邮件生成器 */}
            <div className="card p-7">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="!text-[20px]">写一封邮件</h2>
                <span className="chip">在本机邮件客户端打开</span>
              </div>

              <div className="mt-6 space-y-5">
                {/* 意图 */}
                <div>
                  <label htmlFor="topic" className="text-[13px] font-medium text-ink">
                    这是关于
                  </label>
                  <select
                    id="topic"
                    value={topicIndex}
                    onChange={(e) => setTopicIndex(Number(e.target.value))}
                    className="mt-2 w-full cursor-pointer rounded-card border border-line bg-surface px-3.5 py-2.5 text-[14px] text-ink focus:border-ink focus:outline-none"
                  >
                    {TOPICS.map((t, i) => (
                      <option key={t.tag} value={i}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 回信邮箱（可选） */}
                <div>
                  <label htmlFor="email" className="text-[13px] font-medium text-ink">
                    你的邮箱 <span className="font-normal text-muted">（选填，方便回复你）</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-card border border-line bg-surface px-3.5 py-2.5 text-[14px] text-ink placeholder:text-faint focus:border-ink focus:outline-none"
                  />
                </div>

                {/* 内容 */}
                <div>
                  <label htmlFor="content" className="text-[13px] font-medium text-ink">
                    内容
                  </label>
                  <textarea
                    id="content"
                    rows={7}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={
                      topic.tag === 'feedback'
                        ? '哪个工具、什么操作、实际发生了什么、期望是什么…'
                        : topic.tag === 'tool-recommendation'
                        ? '你在什么场景用它、替代了什么、有什么不足…'
                        : '具体卡点、现有工具为什么不行、期望的时间范围…'
                    }
                    className="mt-2 w-full rounded-card border border-line bg-surface p-3.5 text-[14px] leading-relaxed text-ink placeholder:text-faint focus:border-ink focus:outline-none"
                  />
                </div>
              </div>

              {/* 预览 */}
              <div className="mt-6 rounded-card border border-line-soft bg-surface-2 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="rail-label">生成结果预览</span>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 text-[12.5px] text-muted transition-colors hover:text-ink cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-ok-600" />
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
                <pre className="mt-3 max-h-40 overflow-y-auto whitespace-pre-wrap break-words border-t border-line-soft pt-3 text-[12.5px] leading-relaxed text-ink-soft">
                  {body}
                </pre>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {canOpen ? (
                  <a href={mailtoHref} className="btn btn-brand">
                    用邮件客户端打开
                    <ArrowRight className="h-4 w-4" />
                  </a>
                ) : (
                  <button disabled className="btn btn-primary cursor-not-allowed !opacity-40">
                    先写点内容
                  </button>
                )}
                <p className="text-[12.5px] leading-relaxed text-muted">
                  本站没有后台，也不会把你的内容存到任何服务器上。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};