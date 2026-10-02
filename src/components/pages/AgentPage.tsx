import React, { useState } from 'react';
import {
  ArrowRight,
  Target,
  FileCheck,
  Star,
  ShieldCheck,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { Language, ToolItem, AgentRecommendation } from '../../types';
import { askToolFinderAgent } from '../../services/geminiService';

interface AgentPageProps {
  onNavigate: (tab: string, productId?: string) => void;
  lang: Language;
  tools: ToolItem[];
  onSelectTool: (tool: ToolItem) => void;
}

export const AgentPage: React.FC<AgentPageProps> = ({
  onNavigate,
  lang,
  tools,
  onSelectTool,
}) => {
  const isZh = lang === 'zh';
  const [query, setQuery] = useState('');
  const [selectedScenario, setSelectedScenario] = useState('做图');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<AgentRecommendation | null>({
    topPick: {
      toolId: 'tool_canva',
      name: 'Canva 视觉设计套件',
      why: '针对小红书 3:4 比例自媒体封面，Canva 内置海量现成中文模板与免抠图 AI，零基础 3 分钟即可出图，完全不需要碰复杂 PS 图层。',
      verdict: '上手最快、中文支持最完善，自媒体创作者首选。',
    },
    alternatives: [
      {
        toolId: 'tool_midjourney',
        name: 'Midjourney v6.1',
        why: '追求独一无二的电影级概念插画，可用 MJ 出底图，再配合简单排版加字。',
      },
    ],
    hackerOrOpenSourceOption: {
      name: 'Fooocus / SD WebUI (本地开源)',
      why: '如果电脑有 8G 显存且不愿付任何月费，可离线运行开源模型。',
    },
    testedEvidence: {
      chineseSupport: '完全支持 (内置海量思源、正版商业中文字体)',
      exportOrFreeTier: '免费版可高保真导出 PNG/JPG，无强制水印',
      domesticAccess: '国内网络直连极速秒开',
      tradeoffs: '艺术风格偏商业版式，无法像 Midjourney 一样生成完全不可预测的魔幻写实插画',
    },
    clarifications: [
      '你更在意免费还是效果？',
      '需要 AI 自动排版文字吗？',
      '接受海外需要网络环境的产品吗？',
    ],
  });

  const scenarioChips = [
    '写文章',
    '做图',
    '做视频',
    '做PPT',
    '找资料',
    '做网站',
    '自动化工作',
    '找工作',
    '做内容',
    '其他',
  ];

  const sampleQuestions = [
    '我想做小红书封面',
    '我想做一个网站',
    '我想做PPT演示',
    '我想找一个AI写作工具',
    '我想找适合学生的AI工具',
  ];

  const handleAsk = async (text?: string) => {
    const q = text || query;
    if (!q.trim()) return;
    setLoading(true);
    try {
      const res = await askToolFinderAgent(q, selectedScenario, tools);
      setRecommendation(res);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900">
      {/* 1:1 Dark Top Hero matching image.png (3. 工具筛选 Agent) */}
      <section className="relative overflow-hidden bg-[#090d16] text-white pt-24 pb-14 sm:pt-28 sm:pb-16 border-b border-slate-800">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-2">
            AI 工具筛选 Agent
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-normal mb-8">
            告诉我你的问题，我帮你找到最适合的工具。
          </p>

          {/* White Input Search Box matching image.png 1:1 */}
          <div className="relative rounded-2xl bg-white p-2 sm:p-2.5 shadow-2xl flex items-center gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAsk();
              }}
              placeholder="例如：我想做小红书封面，不想学PS，最好中文能用。"
              className="w-full bg-transparent px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              onClick={() => handleAsk()}
              disabled={loading}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-md"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* Scenario Pills Row matching image.png 1:1 */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {scenarioChips.map((chip) => (
              <button
                key={chip}
                onClick={() => setSelectedScenario(chip)}
                className={`rounded-xl px-4 py-2 text-xs font-medium transition-all ${
                  selectedScenario === chip
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-[#151e2e]/90 text-slate-300 hover:bg-[#1a2538] hover:text-white border border-slate-700/60'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 1:1 White Bottom Section matching image.png (3. 工具筛选 Agent) */}
      <section className="mx-auto max-w-4xl px-6 sm:px-8 py-10 space-y-12">
        {/* Section 1: "它是如何工作的？" 4 Steps Timeline matching image.png 1:1 */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            它是如何工作的？
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center flex flex-col items-center justify-center space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">理解你的问题</h3>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center flex flex-col items-center justify-center space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                <FileCheck className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">匹配实测数据库</h3>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center flex flex-col items-center justify-center space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500 border border-amber-100">
                <Star className="h-5 w-5 fill-amber-500" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">给出排序方案</h3>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center flex flex-col items-center justify-center space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">提供真实证据</h3>
            </div>
          </div>
        </div>

        {/* Section 2: "示例问题" Clickable Rows matching image.png 1:1 */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            示例问题
          </h2>

          <div className="space-y-3">
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(q);
                  handleAsk(q);
                }}
                className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3.5 flex items-center justify-between text-left hover:border-blue-400 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-blue-500 text-sm">◇</span>
                  <span className="text-xs sm:text-sm font-medium text-slate-800 group-hover:text-blue-600">
                    {q}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </div>

        {/* Section 3: Recommendation Result Display */}
        {recommendation && (
          <div className="pt-4 space-y-6">
            <h2 className="text-xl font-bold text-slate-900">
              Agent 匹配结果
            </h2>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-emerald-600 text-white px-2.5 py-1 text-xs font-bold">
                  ★ 最适合你
                </span>
                <span className="text-xs text-slate-500 font-mono">已校验实测证据</span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                {recommendation.topPick.name}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {recommendation.topPick.why}
              </p>

              <div className="rounded-xl bg-white p-4 text-xs text-emerald-800 border border-emerald-100">
                <strong>实测定论：</strong> {recommendation.topPick.verdict}
              </div>

              {/* Tested Evidence */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="rounded-xl bg-white p-3.5 border border-slate-200">
                  <span className="text-slate-500 block mb-0.5">中文支持：</span>
                  <span className="font-semibold text-slate-900">{recommendation.testedEvidence.chineseSupport}</span>
                </div>
                <div className="rounded-xl bg-white p-3.5 border border-slate-200">
                  <span className="text-slate-500 block mb-0.5">免费版额度：</span>
                  <span className="font-semibold text-slate-900">{recommendation.testedEvidence.exportOrFreeTier}</span>
                </div>
                <div className="rounded-xl bg-white p-3.5 border border-slate-200">
                  <span className="text-slate-500 block mb-0.5">国内可用性：</span>
                  <span className="font-semibold text-slate-900">{recommendation.testedEvidence.domesticAccess}</span>
                </div>
                <div className="rounded-xl bg-white p-3.5 border border-slate-200">
                  <span className="text-amber-600 block mb-0.5">△ 局限与缺点：</span>
                  <span className="text-slate-700">{recommendation.testedEvidence.tradeoffs}</span>
                </div>
              </div>

              {/* Action buttons linking to workflow */}
              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    const matched = tools.find((t) =>
                      t.name.toLowerCase().includes(recommendation.topPick.name.split(' ')[0].toLowerCase())
                    );
                    if (matched) onSelectTool(matched);
                    else onNavigate('tested');
                  }}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors"
                >
                  查看完整实测报告 →
                </button>
                <button
                  onClick={() => onNavigate('tested')}
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  浏览全部实测库
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
