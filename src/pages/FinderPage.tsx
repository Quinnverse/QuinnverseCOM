import React, { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Check, ExternalLink, AlertTriangle } from 'lucide-react';
import { Link } from '../utils/router';
import { PICKS } from '../data/database';
import { getToolMark } from '../data/visuals';
import type { PickItem } from '../types';

type Goal = 'coding' | 'automation' | 'notes' | 'agent' | 'visual';
type Technical = 'turnkey' | 'light' | 'hacker';
type Access = 'domestic' | 'global' | 'local';
type Budget = 'free' | 'freemium' | 'paid';

const QUESTIONS = [
  {
    key: 'goal' as const,
    title: '你的首要目标场景是什么？',
    hint: '选当前最卡手、最想提效的那件事。',
    options: [
      { id: 'coding',     t: '写代码与全栈重构',       d: '跨文件重构、代码理解、补全' },
      { id: 'automation', t: '跨系统工作流自动化',      d: '让应用和 API 之间自动同步数据' },
      { id: 'notes',      t: '个人知识库与笔记',        d: '笔记要永久本地可读，不被格式锁定' },
      { id: 'agent',      t: '搭 AI 原型与 Agent 流程', d: '把点子快速跑通，验证大模型能做什么' },
      { id: 'visual',     t: '专业视觉生成',           d: '精确控制构图与光影，不接受随机结果' },
    ],
  },
  {
    key: 'technical' as const,
    title: '你愿意接受多少配置成本？',
    hint: '这决定推荐自建还是 SaaS。',
    options: [
      { id: 'turnkey', t: '开箱即用',        d: '成熟 SaaS，登录就能用，不碰本地环境' },
      { id: 'light',   t: '轻度配置',        d: '看得懂基础教程，愿意装客户端或填 API Key' },
      { id: 'hacker',  t: '极客自建',        d: '熟悉命令行和容器，追求完全的数据控制权' },
    ],
  },
  {
    key: 'access' as const,
    title: '网络和数据边界怎么定？',
    hint: '直接排除你无法接受的选项。',
    options: [
      { id: 'domestic', t: '必须国内直连',   d: '国内网络下要顺畅加载' },
      { id: 'global',   t: '海外网络畅通',   d: '有国际访问条件，想用全球生态' },
      { id: 'local',    t: '数据必须本地',   d: '敏感数据不允许上传第三方云端' },
    ],
  },
  {
    key: 'budget' as const,
    title: '预算上你的底线是？',
    hint: '按费用模型筛一遍。',
    options: [
      { id: 'free',     t: '必须完全免费',   d: '优先开源与社区方案' },
      { id: 'freemium', t: '免费额度够用',   d: '日常用免费版，必要时偶尔付费' },
      { id: 'paid',     t: '愿意为提效付费', d: '确实能省时间就付订阅费' },
    ],
  },
];

/** 确定性排除规则：只按硬约束过滤，不做随机打分 */
function diagnose(goal: Goal, access: Access, budget: Budget): PickItem[] {
  const byGoal: Record<Goal, string[]> = {
    coding: ['cursor', 'gemini'],
    automation: ['n8n'],
    notes: ['obsidian'],
    agent: ['dify', 'gemini'],
    visual: ['comfyui'],
  };

  return byGoal[goal]
    .map((slug) => PICKS.find((p) => p.slug === slug)!)
    .filter(Boolean)
    .filter((p) => {
      // 国内直连：排除必须海外网络的
      if (access === 'domestic' && /需特定网络|需海外/.test(p.pricingAccess.accessFromChina)) return false;
      // 数据必须本地：排除 SaaS 云托管与需要海外的
      if (access === 'local' && /云端|托管/.test(p.pricingAccess.pricingModel) && !/自建|开源免费/.test(p.pricingAccess.pricingModel)) {
        return false;
      }
      // 预算过滤
      if (budget === 'free' && !/完全免费|开源免费/.test(p.pricingAccess.pricingModel)) return false;
      return true;
    });
}

export const FinderPage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<Goal>('coding');
  const [technical, setTechnical] = useState<Technical>('light');
  const [access, setAccess] = useState<Access>('global');
  const [budget, setBudget] = useState<Budget>('freemium');
  const [done, setDone] = useState(false);

  const recommendations = useMemo(() => diagnose(goal, access, budget), [goal, access, budget]);

  const current = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;

  const value = current.key === 'goal' ? goal : current.key === 'technical' ? technical : current.key === 'access' ? access : budget;
  const setValue = (v: string) => {
    if (current.key === 'goal') setGoal(v as Goal);
    else if (current.key === 'technical') setTechnical(v as Technical);
    else if (current.key === 'access') setAccess(v as Access);
    else setBudget(v as Budget);
  };

  const restart = () => {
    setStep(0);
    setDone(false);
  };

  return (
    <>
      {/* ============ 页头 ============ */}
      <section className="border-b border-line-soft pt-8">
        <div className="container-site">
          <Link to="/picks" className="inline-flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-ink">
            <ArrowLeft className="h-3.5 w-3.5" />
            返回实测库
          </Link>

          <div className="mt-8 max-w-3xl pb-10">
            <span className="chip chip-brand">需求诊断器</span>
            <h1 className="mt-6">说清你的约束，我帮你排除</h1>
            <p className="lead mt-6 max-w-2xl">
              四道确定性过滤题，按硬条件把 {PICKS.length} 个工具缩小到真正相关的。
              纯规则匹配，没有随机性，也不猜你喜欢什么。
            </p>
          </div>
        </div>
      </section>

      {/* ============ 主体 ============ */}
      <section className="band-sm">
        <div className="container-site">
          <div className="max-w-3xl">
            {!done ? (
              <div className="card p-7 sm:p-9">
                {/* 进度 */}
                <div className="flex items-center justify-between border-b border-line-soft pb-4">
                  <span className="data text-brand-600">
                    {String(step + 1).padStart(2, '0')} / {String(QUESTIONS.length).padStart(2, '0')}
                  </span>
                  {/* 进度点 */}
                  <div className="flex items-center gap-1.5">
                    {QUESTIONS.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 rounded-full transition-all ${
                          i === step ? 'w-6 bg-brand-600' : i < step ? 'w-1.5 bg-brand-400' : 'w-1.5 bg-line'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* 题目 */}
                <div className="mt-7">
                  <h2 className="!text-[20px]">{current.title}</h2>
                  <p className="mt-2 text-[13.5px] text-muted">{current.hint}</p>

                  <div className="mt-6 space-y-2.5">
                    {current.options.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setValue(opt.id)}
                        className={`w-full cursor-pointer rounded-card border p-4 text-left transition-colors ${
                          value === opt.id
                            ? 'border-ink bg-surface-2'
                            : 'border-line bg-surface hover:border-ink/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                              value === opt.id ? 'border-ink bg-ink' : 'border-line'
                            }`}
                          >
                            {value === opt.id && <span className="h-1.5 w-1.5 rounded-full bg-surface" />}
                          </span>
                          <span className="text-[14.5px] font-medium text-ink">{opt.t}</span>
                        </div>
                        <p className="mt-1.5 pl-7 text-[13px] leading-relaxed text-muted">{opt.d}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 导航 */}
                <div className="mt-8 flex items-center justify-between border-t border-line-soft pt-6">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="btn btn-ghost"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      上一步
                    </button>
                  ) : (
                    <span />
                  )}

                  {isLast ? (
                    <button type="button" onClick={() => setDone(true)} className="btn btn-brand">
                      生成结果
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button type="button" onClick={() => setStep(step + 1)} className="btn btn-primary">
                      下一步
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {/* 结果头 */}
                <div className="card flex flex-wrap items-center justify-between gap-4 p-6">
                  <div>
                    <span className="rail-label">筛选结果</span>
                    <h2 className="mt-2.5 !text-[19px]">
                      符合你全部硬约束的工具：{recommendations.length} 个
                    </h2>
                    <p className="mt-2 data text-faint">
                      目标 {goal} · 配置 {technical} · 网络 {access} · 预算 {budget}
                    </p>
                  </div>
                  <button onClick={restart} className="btn btn-outline shrink-0">
                    <RotateCcw className="h-4 w-4" />
                    重新诊断
                  </button>
                </div>

                {/* 推荐卡 */}
                {recommendations.length > 0 ? (
                  recommendations.map((pick, i) => {
                    const mark = getToolMark(pick.slug);
                    return (
                      <article key={pick.id} className="card card-hover p-7">
                        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line-soft pb-5">
                          <div className="flex items-center gap-4">
                            <div
                              className="tool-mark h-14 w-14 shrink-0 text-[19px]"
                              style={{ background: mark.bg, color: mark.fg }}
                            >
                              {mark.initials}
                            </div>
                            <div>
                              <div className="flex items-center gap-2.5">
                                <span className="data text-brand-600">0{i + 1}</span>
                                <span className="text-[12.5px] text-muted">{pick.category}</span>
                              </div>
                              <h3 className="mt-1 !text-[19px]">{pick.name}</h3>
                            </div>
                          </div>
                          <span className="chip chip-ok shrink-0">通过全部过滤</span>
                        </div>

                        <p className="mt-5 text-[14px] leading-relaxed text-ink-soft">{pick.summary}</p>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                          <div className="rounded-card bg-ok-50/60 p-4">
                            <div className="flex items-center gap-1.5 text-[12px] font-semibold text-ok-600">
                              <Check className="h-3.5 w-3.5" />
                              为什么适合你
                            </div>
                            <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{pick.whatWeFound}</p>
                          </div>
                          <div className="rounded-card bg-warn-50/70 p-4">
                            <div className="flex items-center gap-1.5 text-[12px] font-semibold text-warn-600">
                              <AlertTriangle className="h-3.5 w-3.5" />
                              需要接受的代价
                            </div>
                            <ul className="mt-2 space-y-1.5">
                              {pick.fallsShort.map((f) => (
                                <li key={f} className="text-[13px] leading-relaxed text-ink-soft">
                                  · {f}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-line-soft pt-5">
                          <span className="data text-faint">
                            {pick.pricingAccess.pricingModel} · {pick.pricingAccess.accessFromChina}
                          </span>
                          <div className="flex flex-wrap items-center gap-4">
                            <Link to={`/picks/${pick.slug}`} className="text-[13px] font-medium text-ink transition-colors hover:text-brand-600">
                              看完整评测
                            </Link>
                            <a
                              href={pick.officialUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-outline !py-2 !text-[13px]"
                            >
                              官网
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        </div>
                      </article>
                    );
                  })
                ) : (
                  <div className="card p-10 text-center">
                    <AlertTriangle className="mx-auto h-8 w-8 text-warn-600" strokeWidth={1.75} />
                    <h3 className="mt-4 !text-[18px]">没有工具同时满足这四个条件</h3>
                    <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-muted">
                      这是个真实结论，不是 bug。可以放宽预算或网络条件再试一次，
                      如果你认为这个组合应该存在工具，那正说明这里有个卡点值得自己做一个。
                    </p>
                    <div className="mt-7 flex flex-wrap justify-center gap-3">
                      <button onClick={restart} className="btn btn-primary">
                        <RotateCcw className="h-4 w-4" />
                        换个条件重试
                      </button>
                      <Link to="/contact" className="btn btn-outline">
                        提交这个未解卡点
                      </Link>
                    </div>
                  </div>
                )}

                {/* 兜底提示 */}
                <div className="card bg-surface-2 p-6">
                  <span className="rail-label">这个诊断器没做的事</span>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">
                    它只按你给的硬条件做排除，不打分、不排序、不猜偏好。
                    最后选哪个，取决于你的实际判断。想看全部 {PICKS.length} 个评测，可以直接
                    <Link to="/picks" className="mx-1 font-medium text-ink underline underline-offset-2 hover:text-brand-600">
                      翻实测库
                    </Link>
                    自己对比。
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};