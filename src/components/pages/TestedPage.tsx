import React, { useState } from 'react';
import {
  ArrowRight,
  Target,
  FileCheck,
  Star,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  PenTool,
  Image as ImageIcon,
  Video,
  FileSpreadsheet,
  Globe,
  Cpu,
  Briefcase,
  Layers,
  X,
  CheckCircle2,
  XCircle,
  Search,
} from 'lucide-react';
import { Language, ToolItem, AgentRecommendation } from '../../types';
import { askToolFinderAgent } from '../../services/geminiService';

interface TestedPageProps {
  onNavigate: (tab: string, productId?: string) => void;
  lang: Language;
  tools: ToolItem[];
  selectedToolModal: ToolItem | null;
  onOpenToolModal: (tool: ToolItem) => void;
  onCloseToolModal: () => void;
}

export const TestedPage: React.FC<TestedPageProps> = ({
  onNavigate,
  lang,
  tools,
  selectedToolModal,
  onOpenToolModal,
  onCloseToolModal,
}) => {
  const isZh = lang === 'zh';

  // Agent State (Top Section from Left View)
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

  // Tested Database State (Bottom Section from Right View)
  const [selectedPill, setSelectedPill] = useState('全部');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');

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
    '更多场景',
  ];

  const testedPills = ['全部', 'AI 工具', 'Skills', '工作流', '场景方案', '精选推荐'];

  const categories = [
    { key: 'writing', name: '写文章', count: 32, icon: <PenTool className="h-5 w-5 text-emerald-500" /> },
    { key: 'image', name: '做图', count: 26, icon: <ImageIcon className="h-5 w-5 text-amber-500" /> },
    { key: 'video', name: '做视频', count: 26, icon: <Video className="h-5 w-5 text-indigo-500" /> },
    { key: 'presentation', name: '做PPT', count: 18, icon: <FileSpreadsheet className="h-5 w-5 text-amber-500" /> },
    { key: 'research', name: '找资料', count: 24, icon: <Globe className="h-5 w-5 text-blue-500" /> },
    { key: 'website', name: '做网站', count: 20, icon: <Globe className="h-5 w-5 text-blue-600" /> },
    { key: 'automation', name: '自动化工作', count: 22, icon: <Cpu className="h-5 w-5 text-purple-500" /> },
    { key: 'career', name: '找工作', count: 16, icon: <Briefcase className="h-5 w-5 text-rose-500" /> },
    { key: 'content', name: '做内容', count: 30, icon: <Layers className="h-5 w-5 text-blue-500" /> },
  ];

  const featuredRecommendations = [
    {
      id: 'tool_notion_ai',
      name: 'Notion AI',
      subtitle: '生产力写作',
      rating: 4.7,
      tool: tools.find((t) => t.slug === 'notion-ai') || tools[0],
    },
    {
      id: 'tool_midjourney',
      name: 'Midjourney',
      subtitle: 'AI 图像生成',
      rating: 4.5,
      tool: tools.find((t) => t.slug === 'midjourney') || tools[1] || tools[0],
    },
    {
      id: 'tool_gamma',
      name: 'Gamma',
      subtitle: 'AI 演示/PPT',
      rating: 4.6,
      tool: tools.find((t) => t.slug === 'gamma') || tools[2] || tools[0],
    },
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

  // Filtered tools based on selectedCategory, pill, or searchFilter
  const displayTools = tools.filter((t) => {
    if (searchFilter.trim()) {
      const s = searchFilter.toLowerCase();
      const match =
        t.name.toLowerCase().includes(s) ||
        t.summary.toLowerCase().includes(s) ||
        t.categoryLabelZh.toLowerCase().includes(s) ||
        t.tags.some((tag) => tag.toLowerCase().includes(s));
      if (!match) return false;
    }

    if (selectedCategory) {
      return t.category === selectedCategory;
    }

    if (selectedPill === 'AI 工具') return t.type === 'tool';
    if (selectedPill === 'Skills') return t.type === 'skill';
    if (selectedPill === '工作流') return t.type === 'workflow';
    if (selectedPill === '精选推荐') return t.isFeatured;

    return true;
  });

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900">
      {/* 1. TOP SECTION (From Left View 1:1): Dark Hero with AI Agent Finder */}
      <section className="relative overflow-hidden bg-[#090d16] text-white pt-24 pb-14 sm:pt-28 sm:pb-16 border-b border-slate-800">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 text-center sm:text-left">
          {/* AI AGENT Badge */}
          <span className="inline-block rounded-md bg-blue-950/80 px-2.5 py-1 text-xs font-bold text-blue-400 border border-blue-500/30 mb-4">
            AI AGENT
          </span>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3 leading-tight">
            告诉我你的问题，<br />
            我帮你找到最适合的工具。
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-slate-300 font-normal mb-8 max-w-xl leading-relaxed">
            结合真实实测数据，为你的场景推荐合适的 AI 工具和工作流方案，不再盲目试错。
          </p>

          {/* White Input Search Box matching Left View 1:1 */}
          <div className="relative rounded-2xl bg-white p-2 sm:p-2.5 shadow-2xl flex items-center gap-2 mb-6">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAsk();
              }}
              placeholder="例如：我想做小红书封面，不想学PS，最好中文能用..."
              className="w-full bg-transparent px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              onClick={() => handleAsk()}
              disabled={loading}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-md disabled:opacity-50"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* "或者从场景开始" Label & Scenario Chips Row */}
          <div>
            <div className="text-xs font-bold text-slate-300 mb-3 tracking-wide">
              或者从场景开始
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {scenarioChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => {
                    setSelectedScenario(chip);
                    if (chip !== '更多场景') {
                      setQuery(`我想找适合做${chip}的工具`);
                      handleAsk(`我想找适合做${chip}的工具`);
                    }
                  }}
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
        </div>
      </section>

      {/* 2. MIDDLE SECTION (From Left View 1:1): "它是如何工作的？" 4 Steps Timeline & Agent Result */}
      <section className="mx-auto max-w-4xl px-6 sm:px-8 pt-10 pb-6">
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
              <p className="text-[11px] text-slate-400">细化真实场景与限制</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center flex flex-col items-center justify-center space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                <FileCheck className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">匹配实测数据库</h3>
              <p className="text-[11px] text-slate-400">交叉检验各项实测指标</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center flex flex-col items-center justify-center space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500 border border-amber-100">
                <Star className="h-5 w-5 fill-amber-500" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">给出推荐方案</h3>
              <p className="text-[11px] text-slate-400">最适合方案与优质备选</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center flex flex-col items-center justify-center space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">提供真实证据</h3>
              <p className="text-[11px] text-slate-400">中文支持与客观避坑</p>
            </div>
          </div>
        </div>

        {/* Dynamic Recommendation Result Card if available */}
        {recommendation && (
          <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-emerald-600 text-white px-2.5 py-1 text-xs font-bold">
                ★ Agent 为你推荐的方案
              </span>
              <span className="text-xs text-slate-500 font-mono">已校验实测证据</span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900">
              {recommendation.topPick.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {recommendation.topPick.why}
            </p>

            <div className="rounded-xl bg-white p-3.5 text-xs text-emerald-800 border border-emerald-100">
              <strong>实测定论：</strong> {recommendation.topPick.verdict}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div className="rounded-xl bg-white p-3 border border-slate-200">
                <span className="text-slate-500 block mb-0.5">中文支持：</span>
                <span className="font-semibold text-slate-900">{recommendation.testedEvidence.chineseSupport}</span>
              </div>
              <div className="rounded-xl bg-white p-3 border border-slate-200">
                <span className="text-slate-500 block mb-0.5">免费版额度：</span>
                <span className="font-semibold text-slate-900">{recommendation.testedEvidence.exportOrFreeTier}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  const matched = tools.find((t) =>
                    t.name.toLowerCase().includes(recommendation.topPick.name.split(' ')[0].toLowerCase())
                  );
                  if (matched) onOpenToolModal(matched);
                  else if (tools[0]) onOpenToolModal(tools[0]);
                }}
                className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors"
              >
                查看完整评测报告 →
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 3. BOTTOM SECTION (From Right View 1:1, omitting "我替你先试" head): Tested Database Pills, 9-Category Grid & Full Vetted Tools */}
      <section className="mx-auto max-w-4xl px-6 sm:px-8 pt-4 pb-14 space-y-8">
        {/* Filter Pills Row matching Right View 1:1 */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-8">
          <div className="flex flex-wrap items-center gap-2">
            {testedPills.map((pill) => (
              <button
                key={pill}
                onClick={() => {
                  setSelectedPill(pill);
                  setSelectedCategory(null);
                }}
                className={`rounded-xl px-4 py-2 text-xs font-medium transition-all ${
                  selectedPill === pill && !selectedCategory
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Quick Search inside database */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="搜索实测工具库..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* 9 Scenario Cards Grid (3x3) matching Right View 1:1 */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
              场景分类实测
            </h3>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-xs text-blue-600 hover:underline"
              >
                清除分类筛选 (显示全部)
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key === selectedCategory ? null : cat.key)}
                className={`cursor-pointer rounded-2xl border p-4 sm:p-5 flex items-center gap-4 transition-all ${
                  selectedCategory === cat.key
                    ? 'border-blue-500 bg-blue-50/70 shadow-sm ring-1 ring-blue-500'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-100 shrink-0">
                  {cat.icon}
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">
                    {cat.count} 个工具
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: "精选推荐" (When no category filter is active) */}
        {!selectedCategory && !searchFilter && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-slate-900">
                精选推荐
              </h2>
              <button
                onClick={() => setSelectedCategory('image')}
                className="text-xs sm:text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>按分类浏览工具 →</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {featuredRecommendations.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between space-y-4 hover:border-slate-300 hover:shadow-sm transition-all"
                >
                  <div>
                    <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-100 mb-3 font-bold text-slate-800 text-lg">
                      {item.name.charAt(0)}
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {item.subtitle}
                    </p>
                    <div className="flex items-center gap-1.5 mt-3 text-xs text-amber-500 font-semibold font-mono">
                      <span>★ {item.rating}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        if (item.tool) onOpenToolModal(item.tool);
                      }}
                      className="text-xs font-semibold text-slate-600 hover:text-blue-600 flex items-center gap-1 transition-colors"
                    >
                      <span>查看评测 →</span>
                    </button>

                    <button
                      onClick={() => {
                        setQuery(`我想对比 ${item.name} 和其他同类工具`);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-xs text-slate-400 hover:text-blue-600"
                    >
                      让 Agent 比较
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section: Full Tested Tools Grid */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              {selectedCategory
                ? `${categories.find((c) => c.key === selectedCategory)?.name || '分类'} 实测库`
                : searchFilter
                ? `搜索结果 (${displayTools.length})`
                : '全部实测工具'}
            </h2>
            <span className="text-xs text-slate-400 font-mono">共 {displayTools.length} 款已记录证据</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {displayTools.map((tool) => (
              <div
                key={tool.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col justify-between space-y-4 hover:border-slate-300 hover:shadow-sm transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {tool.categoryLabelZh}
                    </span>
                    <span className="font-mono text-xs font-semibold text-amber-500">
                      ★ {tool.rating}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {tool.summary}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {tool.tags.slice(0, 2).map((tg, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                        #{tg}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onOpenToolModal(tool)}
                    className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span>查看评测 →</span>
                  </button>

                  <button
                    onClick={() => {
                      setQuery(`评估 ${tool.name} 是否适合我的需求`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-[11px] text-slate-400 hover:text-blue-600"
                  >
                    让 Agent 评估
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Modal when tool review is clicked */}
        {selectedToolModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 bg-white p-6 sm:p-8 text-slate-800 shadow-2xl">
              <button
                onClick={onCloseToolModal}
                className="absolute right-5 top-5 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center justify-between pr-8">
                <h3 className="text-2xl font-bold text-slate-900">
                  {selectedToolModal.name}
                </h3>
                <span className="font-mono text-amber-500 font-bold">
                  ★ {selectedToolModal.rating}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">{selectedToolModal.summary}</p>

              <div className="mt-5 rounded-xl bg-slate-50 p-4 text-xs leading-relaxed text-slate-700 border border-slate-100">
                <strong className="text-slate-900 block mb-1">实测记录与结论：</strong>
                {selectedToolModal.testExperience}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-slate-100 p-3 bg-white">
                  <span className="text-emerald-600 font-bold block mb-1">适合人群 (✓)</span>
                  <ul className="text-slate-600 space-y-1">
                    {selectedToolModal.suitableFor.map((s, i) => (
                      <li key={i}>· {s}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-slate-100 p-3 bg-white">
                  <span className="text-rose-600 font-bold block mb-1">不适合人群 (×)</span>
                  <ul className="text-slate-600 space-y-1">
                    {selectedToolModal.notSuitableFor.map((s, i) => (
                      <li key={i}>· {s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    onCloseToolModal();
                    setQuery(`我想评估 ${selectedToolModal.name} 是否适合我的场景`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  让 Agent 深度比较 →
                </button>
                <a
                  href={selectedToolModal.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors"
                >
                  去使用工具
                </a>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
