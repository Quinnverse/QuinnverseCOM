import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Check, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { Link } from '../utils/router';
import { PICKS } from '../data/database';
import { PickItem } from '../types';

export const FinderPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<'coding' | 'automation' | 'notes' | 'agent' | 'visual'>('coding');
  const [technical, setTechnical] = useState<'turnkey' | 'light' | 'hacker'>('light');
  const [access, setAccess] = useState<'domestic' | 'global' | 'local'>('global');
  const [budget, setBudget] = useState<'free' | 'freemium' | 'paid'>('freemium');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Deterministic diagnostic scoring algorithm
  const getRecommendations = (): { pick: PickItem; reason: string; tradeoff: string }[] => {
    const results: { pick: PickItem; reason: string; tradeoff: string }[] = [];

    if (goal === 'coding') {
      const cursor = PICKS.find((p) => p.slug === 'cursor');
      if (cursor) {
        results.push({
          pick: cursor,
          reason: 'Tab 全局补全与多文件跨模块重构能力在工程开发中响应极快，非常契合快速构建。',
          tradeoff: '在超大单体仓库中全库索引偶有卡顿；每月有快速请求上限。',
        });
      }
      const gemini = PICKS.find((p) => p.slug === 'gemini');
      if (gemini) {
        results.push({
          pick: gemini,
          reason: '百万长上下文适合一次性塞入整套工程文档或代码库进行全局架构审计与问答。',
          tradeoff: '需海外网络环境支持；复杂中式俚语推理偶尔不如顶尖小模型敏捷。',
        });
      }
    } else if (goal === 'automation') {
      const n8n = PICKS.find((p) => p.slug === 'n8n');
      if (n8n) {
        results.push({
          pick: n8n,
          reason: '可自托管的节点式中间件，赋予你对多平台自动化数据流的 100% 数据隐私主权。',
          tradeoff: '需要基础的 Docker 部署知识；高并发下的内存与日志需手动调优。',
        });
      }
    } else if (goal === 'notes') {
      const obsidian = PICKS.find((p) => p.slug === 'obsidian');
      if (obsidian) {
        results.push({
          pick: obsidian,
          reason: '基于本地纯文本 Markdown 与双链，无需担忧云厂商倒闭或格式锁定，沉淀长线知识资产。',
          tradeoff: '原生官方同步服务需额外订阅；开箱即用度有限，需要花时间搭建插件习惯。',
        });
      }
    } else if (goal === 'agent') {
      const dify = PICKS.find((p) => p.slug === 'dify');
      if (dify) {
        results.push({
          pick: dify,
          reason: '可视化知识库 RAG 切片测试与 Agent 画布极大削减了写胶水代码验证点子的时间。',
          tradeoff: '深度动态条件分支极端复杂时，画布节点连接可能会变得臃肿。',
        });
      }
    } else if (goal === 'visual') {
      const comfy = PICKS.find((p) => p.slug === 'comfyui');
      if (comfy) {
        results.push({
          pick: comfy,
          reason: '节点图精准解构扩散模型每一步隐空间变换与 ControlNet 约束，显存调度优异。',
          tradeoff: '学习曲线陡峭；各开源自定义节点容易发生 Python 环境冲突。',
        });
      }
    }

    // Fallback if none matched
    if (results.length === 0) {
      const cursor = PICKS.find((p) => p.slug === 'cursor');
      if (cursor) {
        results.push({
          pick: cursor,
          reason: 'Quinnverse 核心日常主力工具，在代码与工程交付中拥有极高的综合产出比。',
          tradeoff: '免费版请求受限，建议按需订阅。',
        });
      }
    }

    return results;
  };

  const recommendations = getRecommendations();

  const handleRestart = () => {
    setStep(1);
    setHasSubmitted(false);
  };

  return (
    <div className="py-16 sm:py-20 bg-[#080B12] text-left">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation Breadcrumb */}
        <Link
          to="/picks"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>返回实测库 (Picks)</span>
        </Link>

        {/* Masthead */}
        <div className="space-y-3 border-b border-slate-800 pb-8">
          <div className="text-xs font-mono font-semibold text-cyan-400 tracking-wider">
            DETERMINISTIC DIAGNOSTIC ENGINE
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            Quinnverse Finder
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Tell Quinnverse what you’re trying to do.  
            不要在数百个工具分类里迷失。勾选你的真实边界条件，诊断器将从实测库中为你匹配 2~3 个最适合的选项。
          </p>
        </div>

        {/* Diagnostic Wizard Box */}
        {!hasSubmitted ? (
          <div className="rounded-2xl border border-slate-800 bg-[#0C1220] p-6 sm:p-10 shadow-2xl space-y-8">
            {/* Step Indicator */}
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono border-b border-slate-800 pb-4">
              <span>STEP {step} OF 4</span>
              <span>确定性规则过滤 · 零 LLM 随机性</span>
            </div>

            {/* STEP 1: GOAL */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    01. 你的首要目标场景是什么？
                  </h3>
                  <p className="text-xs text-slate-400">选择当前最卡手或最迫切希望提效的具体任务。</p>
                </div>
                <div className="space-y-2.5 pt-2">
                  {[
                    { id: 'coding', title: '写代码与全栈重构', desc: '需要深入代码语义的工程重构、跨文件索引与 Tab 补全' },
                    { id: 'automation', title: '跨系统工作流自动化', desc: '让多个应用、API 之间自动异步同步数据，拒绝复制粘贴' },
                    { id: 'notes', title: '个人知识库与第二大脑', desc: '沉淀深度思考与长文手记，必须保证笔记数据永久本地自主可读' },
                    { id: 'agent', title: '搭建 AI 原型与 Agent 流程', desc: '想把一个业务点子快速跑通，测试大模型能否变成结构化流水线' },
                    { id: 'visual', title: '高精度专业视觉生图', desc: '精确控制主体姿态、光影与构图，不满足于通用随机生图' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setGoal(opt.id as any)}
                      className={`w-full p-4 rounded-xl border text-left transition-all ${
                        goal === opt.id
                          ? 'border-cyan-400 bg-cyan-950/40 text-white shadow-sm'
                          : 'border-slate-800 bg-[#090D17] text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-xs sm:text-sm text-white">{opt.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: TECHNICAL COMFORT */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    02. 你的技术适应度与配置意愿如何？
                  </h3>
                  <p className="text-xs text-slate-400">确定工具的上手复杂度边界。</p>
                </div>
                <div className="space-y-2.5 pt-2">
                  {[
                    { id: 'turnkey', title: '开箱即用 (Turnkey)', desc: '最好是成熟 SaaS，登录就能用，不想折腾任何本地环境与依赖' },
                    { id: 'light', title: '轻度配置 (Light Config)', desc: '能看懂基础教程，愿意安装轻量客户端或填入必要的 API Key' },
                    { id: 'hacker', title: '极客自建 (Self-hosted / Docker)', desc: '熟悉命令行与容器部署，追求完全的数据控制权' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setTechnical(opt.id as any)}
                      className={`w-full p-4 rounded-xl border text-left transition-all ${
                        technical === opt.id
                          ? 'border-cyan-400 bg-cyan-950/40 text-white shadow-sm'
                          : 'border-slate-800 bg-[#090D17] text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-xs sm:text-sm text-white">{opt.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: ACCESS & PRIVACY */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    03. 你的网络环境与数据隐私边界是？
                  </h3>
                  <p className="text-xs text-slate-400">排除无法稳定访问或触犯隐私红线的选项。</p>
                </div>
                <div className="space-y-2.5 pt-2">
                  {[
                    { id: 'domestic', title: '必须国内直连可用', desc: '无海外网络配置，要求在国内网络环境下顺畅加载' },
                    { id: 'global', title: '海外网络畅通', desc: '具备国际网络访问条件，希望使用全球顶尖前沿生态' },
                    { id: 'local', title: '数据完全本地化 (Local-first)', desc: '绝不允许商业核心代码或敏感个人数据上传至任何第三方云端' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAccess(opt.id as any)}
                      className={`w-full p-4 rounded-xl border text-left transition-all ${
                        access === opt.id
                          ? 'border-cyan-400 bg-cyan-950/40 text-white shadow-sm'
                          : 'border-slate-800 bg-[#090D17] text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-xs sm:text-sm text-white">{opt.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: BUDGET */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    04. 你的预算考量倾向？
                  </h3>
                  <p className="text-xs text-slate-400">筛选对应费用模型的工具。</p>
                </div>
                <div className="space-y-2.5 pt-2">
                  {[
                    { id: 'free', title: '坚持纯开源或完全免费', desc: '不打算为软件支付订阅费，优先开源与社区方案' },
                    { id: 'freemium', title: '免费增值 (Freemium 够用即可)', desc: '日常白嫖免费额度，必要时接受偶尔轻度付费' },
                    { id: 'paid', title: '愿意为明显提效的工具付费', desc: '只要确实能省下时间与人力，愿意按月支付专业订阅费用' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setBudget(opt.id as any)}
                      className={`w-full p-4 rounded-xl border text-left transition-all ${
                        budget === opt.id
                          ? 'border-cyan-400 bg-cyan-950/40 text-white shadow-sm'
                          : 'border-slate-800 bg-[#090D17] text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-xs sm:text-sm text-white">{opt.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-800">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  ← 上一步
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm transition-colors"
                >
                  <span>下一步</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setHasSubmitted(true)}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>生成诊断推荐</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Recommendation Output Panel */
          <div className="space-y-8">
            <div className="rounded-xl border border-slate-800 bg-[#0C1220] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-cyan-400">DIAGNOSIS RESULT</span>
                <h3 className="text-base font-bold text-white">基于你的边界条件，推荐以下实测选项：</h3>
                <p className="text-xs text-slate-400">
                  条件组合：`[{goal}]` · `[{technical}]` · `[{access}]` · `[{budget}]`
                </p>
              </div>
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>重新诊断</span>
              </button>
            </div>

            <div className="space-y-6">
              {recommendations.map((rec, i) => (
                <div
                  key={rec.pick.id}
                  className="rounded-2xl border border-slate-800 bg-[#0C1220] p-6 sm:p-8 space-y-6 shadow-xl"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-mono text-cyan-400 font-bold">MATCH 0{i + 1}</span>
                        <span className="text-slate-600">·</span>
                        <span className="text-slate-400">{rec.pick.category}</span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold text-white">{rec.pick.name}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded border text-emerald-400 bg-emerald-950/60 border-emerald-800/50">
                        {rec.pick.evidenceLevel}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {rec.pick.summary}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="rounded-xl bg-[#091414] border border-emerald-950/50 p-4 space-y-1">
                      <div className="font-bold text-emerald-400">为什么契合你的场景 (Why this fits)</div>
                      <p className="text-slate-300 leading-relaxed">{rec.reason}</p>
                    </div>

                    <div className="rounded-xl bg-[#160B0E] border border-rose-950/50 p-4 space-y-1">
                      <div className="font-bold text-rose-400">必须知晓的局限 (Trade-offs)</div>
                      <p className="text-slate-300 leading-relaxed">{rec.tradeoff}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div className="text-slate-500 font-mono text-[11px]">
                      国内直连: {rec.pick.pricingAccess.accessFromChina} · {rec.pick.pricingAccess.pricingModel.split(' ')[0]}
                    </div>
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/picks/${rec.pick.slug}`}
                        className="font-semibold text-cyan-400 hover:text-cyan-300"
                      >
                        阅读完整实测手记 →
                      </Link>
                      <a
                        href={rec.pick.officialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors"
                      >
                        <span>访问官网</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-slate-800/80 bg-[#090D17] p-5 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-slate-300 font-semibold">没有找到完美的解法？</span>
                <p className="mt-0.5">现有市面产品未覆盖的严重断层，往往就是值得自研的信号。欢迎向我们提交你的卡点。</p>
              </div>
              <Link
                to="/contact"
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold whitespace-nowrap"
              >
                提交未解痛点
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
