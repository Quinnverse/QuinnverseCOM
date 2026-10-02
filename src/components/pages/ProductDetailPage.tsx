import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Copy,
  Check,
  Target,
  FileText,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  Cpu,
  Layers,
  Zap,
  Globe,
  CreditCard,
  Share2,
  Video,
  Image as ImageIcon,
  Twitter,
  Database,
  Box,
} from 'lucide-react';
import { Language, ProductItem } from '../../types';

interface ProductDetailPageProps {
  onNavigate: (tab: string, productId?: string) => void;
  lang: Language;
  product: ProductItem;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  onNavigate,
  lang,
  product,
}) => {
  const isZh = lang === 'zh';
  const [activeTab, setActiveTab] = useState<'intro' | 'features' | 'ui' | 'privacy' | 'faq'>('intro');

  // Interactive Demo Sandbox for Copilot
  const [sampleJd, setSampleJd] = useState(
    'Role: Senior Frontend Engineer @ Linear\n- 4+ years of React, TypeScript, high-performance UI\n- Deep care for design systems, keyboard shortcuts\n- Real-time collaborative sync experience'
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [demoOutput, setDemoOutput] = useState<{
    score: number;
    aligned: string[];
    tailoredBullet: string;
    coverLetterDraft: string;
  } | null>({
    score: 94,
    aligned: ['React 19 & Modern TS', 'Micro-interactions & 60fps Animation', 'Design System Architecture'],
    tailoredBullet:
      'Architected keyboard-first React client, reducing input latency to under 8ms and elevating recruiter callback rate to 35%.',
    coverLetterDraft:
      'Dear Linear Team,\nI have followed your product craft closely. Having engineered high-density web frontends with fluid state machines, I would love to bring this dedication to Linear’s core experience.',
  });

  // Interactive Sandbox for Content Remix Flow
  const [remixNote, setRemixNote] = useState('我实测了 7 款 AI PPT 工具，最后只推荐 Gamma，因为中文排版自然，适合周报与商业汇报。');
  const [remixOutput, setRemixOutput] = useState<string | null>(null);

  // Interactive Sandbox for Quick Ship Kit
  const [stackProvider, setStackProvider] = useState('stripe');
  const [copiedCode, setCopiedCode] = useState(false);

  const handleRunDemo = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setDemoOutput({
        score: 96,
        aligned: ['Precision Prototyping', 'Autonomous Execution', 'Zero-Latency UX'],
        tailoredBullet:
          'Streamlined job application tailoring workflows with local-first indexedDB caching, saving 4+ hours per application.',
        coverLetterDraft:
          'Dear Hiring Manager,\nReviewing the requirements, my focus on end-to-end craft and measurable engineering outcomes aligns directly with your goals.',
      });
    }, 700);
  };

  const handleRemix = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setRemixOutput(
        `【小红书图文封面建议】\n标题：别再手动改PPT了！实测 7 款后我只留下它。\n副标：3 分钟生成商务级幻灯片，内附避坑指南。\n\n【X / Twitter 连推 Hook】\n1/7 试过了市面上所有 AI PPT 工具，大多数都是花架子。但 Gamma 真正帮我把做汇报的时间压缩了 80%，这是我的真实测试数据：`
      );
    }, 600);
  };

  // Helper to map icon names or category to Lucide Icons
  const getFeatureIcon = (title: string, iconName?: string) => {
    if (iconName === 'CreditCard' || title.includes('结算')) return <CreditCard className="h-5 w-5 text-emerald-500" />;
    if (iconName === 'Globe' || title.includes('国际')) return <Globe className="h-5 w-5 text-blue-500" />;
    if (iconName === 'Zap' || title.includes('冷启动') || title.includes('轻量')) return <Zap className="h-5 w-5 text-amber-500" />;
    if (iconName === 'Share2' || title.includes('SEO') || title.includes('分发')) return <Share2 className="h-5 w-5 text-indigo-500" />;
    if (iconName === 'Image' || title.includes('做图') || title.includes('封面')) return <ImageIcon className="h-5 w-5 text-pink-500" />;
    if (iconName === 'Twitter') return <Twitter className="h-5 w-5 text-sky-500" />;
    if (iconName === 'Video') return <Video className="h-5 w-5 text-purple-500" />;
    if (iconName === 'Database' || title.includes('数据')) return <Database className="h-5 w-5 text-blue-500" />;
    if (iconName === 'Target' || title.includes('职位') || title.includes('匹配')) return <Target className="h-5 w-5 text-blue-500" />;
    if (iconName === 'FileText' || title.includes('简历')) return <FileText className="h-5 w-5 text-indigo-500" />;
    if (iconName === 'Sparkles' || title.includes('生成')) return <Sparkles className="h-5 w-5 text-emerald-500" />;
    if (iconName === 'ShieldCheck' || title.includes('隐私') || title.includes('安全')) return <ShieldCheck className="h-5 w-5 text-emerald-500" />;
    return <Box className="h-5 w-5 text-blue-500" />;
  };

  // 4 Features mapped dynamically from product data or fallback
  const displayFeatures =
    product.features && product.features.length > 0
      ? product.features.map((f) => ({
          title: f.title,
          desc: f.desc,
          icon: getFeatureIcon(f.title, f.icon),
        }))
      : [
          {
            title: '精益架构',
            desc: '从真实用户痛点切入，不堆砌繁冗功能。',
            icon: <Target className="h-5 w-5 text-blue-500" />,
          },
          {
            title: '本地优先',
            desc: '保护核心数据安全，尊重使用者隐私。',
            icon: <ShieldCheck className="h-5 w-5 text-emerald-500" />,
          },
        ];

  // Workflow steps pipeline linking all products
  const workflowStages = [
    {
      step: 1,
      title: '需求与痛点发现',
      desc: '在实验室中提炼真实摩擦',
      actionTab: 'lab',
      badge: '实验阶段',
      isCurrent: false,
    },
    {
      step: 2,
      title: '工具与方案筛选',
      desc: 'AI 工具筛选 Agent',
      actionTab: 'agent',
      badge: '实测选型',
      isCurrent: product.slug === 'tool-finder-agent',
    },
    {
      step: 3,
      title: '独立出海产品构建',
      desc: 'Job Copilot / 出海脚手架',
      actionTab: 'products',
      badge: '产品落地',
      isCurrent:
        product.slug === 'job-application-copilot' ||
        product.slug === 'dev-quick-ship' ||
        product.slug === 'ats-resume-scanner',
    },
    {
      step: 4,
      title: '多渠道分发与获客',
      desc: '自媒体分发工作流',
      actionTab: 'product-copilot',
      targetId: 'content-remix-flow',
      badge: '流量转化',
      isCurrent: product.slug === 'content-remix-flow',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900">
      {/* 1:1 Dark Hero Banner matching image.png (8. 具体产品页) */}
      <section className="relative overflow-hidden bg-[#090d16] text-white pt-24 pb-14 sm:pt-28 sm:pb-16 border-b border-slate-800">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left text & action buttons */}
            <div className="md:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-blue-950/80 px-2.5 py-1 text-xs font-bold text-blue-400 border border-blue-500/30">
                  {product.category === 'flagship' ? '正式产品' : '小型实用工具'}
                </span>
                <span className="text-xs text-slate-400 font-mono">v1.2 Released</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {product.title}
              </h1>
              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
                {product.subtitle}
              </p>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    if (product.slug === 'tool-finder-agent') {
                      onNavigate('agent');
                    } else {
                      setActiveTab('ui');
                    }
                  }}
                  className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/25"
                >
                  <span>立即使用 →</span>
                </button>
                <button
                  onClick={() => setActiveTab('ui')}
                  className="rounded-xl border border-slate-700 bg-slate-900/90 px-5 py-2.5 text-xs sm:text-sm font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  观看演示
                </button>
              </div>
            </div>

            {/* Right preview screenshot */}
            <div className="md:col-span-6 flex justify-end">
              <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900 shadow-2xl">
                <img
                  src={product.coverImage || '/src/assets/images/product_copilot_preview_1790970754120.jpg'}
                  alt={product.title}
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1:1 White Bottom Area matching image.png (8. 具体产品页) */}
      <section className="mx-auto max-w-4xl px-6 sm:px-8 py-10">
        {/* Navigation Tabs Row */}
        <div className="flex items-center gap-8 border-b border-slate-200 pb-3 text-sm font-medium overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('intro')}
            className={`relative pb-3 transition-colors whitespace-nowrap ${
              activeTab === 'intro'
                ? 'text-blue-600 font-bold after:absolute after:bottom-[-13px] after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            产品介绍
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`relative pb-3 transition-colors whitespace-nowrap ${
              activeTab === 'features'
                ? 'text-blue-600 font-bold after:absolute after:bottom-[-13px] after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            核心功能
          </button>
          <button
            onClick={() => setActiveTab('ui')}
            className={`relative pb-3 transition-colors whitespace-nowrap ${
              activeTab === 'ui'
                ? 'text-blue-600 font-bold after:absolute after:bottom-[-13px] after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            真实界面
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`relative pb-3 transition-colors whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'text-blue-600 font-bold after:absolute after:bottom-[-13px] after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            隐私安全
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`relative pb-3 transition-colors whitespace-nowrap ${
              activeTab === 'faq'
                ? 'text-blue-600 font-bold after:absolute after:bottom-[-13px] after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            常见问题
          </button>
        </div>

        {/* Tab 1: 产品介绍 matching image.png 1:1 */}
        {activeTab === 'intro' && (
          <div className="mt-8 space-y-12">
            {/* "为什么做这个产品？" Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-3">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  为什么做这个产品？
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.whyBuilt}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="md:col-span-5 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <img
                  src="/src/assets/images/quinnverse_home_bg_1790971384808.jpg"
                  alt="Craft Story"
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* "核心功能" Cards in a row matching image.png 1:1 */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
                核心功能
              </h2>

              <div className={`grid grid-cols-1 sm:grid-cols-${Math.min(displayFeatures.length, 4)} gap-4`}>
                {displayFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 hover:border-slate-300 hover:shadow-sm transition-all"
                  >
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-100">
                      {feat.icon}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 pt-1">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Workflow Steps (使用方式与步骤) */}
            {product.steps && product.steps.length > 0 && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
                  使用流程与操作步骤
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {product.steps.map((st) => (
                    <div
                      key={st.step}
                      className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xs">
                          {st.step}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                          STEP {st.step}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 pt-1">{st.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{st.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: 核心功能 */}
        {activeTab === 'features' && (
          <div className="mt-8 space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
              详细架构与功能解析
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {displayFeatures.map((feat, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-100">
                      {feat.icon}
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{feat.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: 真实界面与交互演示 (Product-Specific Interactive Sandbox) */}
        {activeTab === 'ui' && (
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4 text-xs text-blue-900">
              💡 <strong>在线沙盒交互体验</strong>：实时体验系统的核心逻辑与输出重构，无需任何登录配置。
            </div>

            {/* Sandbox Case 1: Job Copilot & ATS Scanner */}
            {(product.slug === 'job-application-copilot' || product.slug === 'ats-resume-scanner') && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 space-y-3">
                  <label className="text-xs font-bold text-slate-700 block">
                    目标职位描述 (JD)
                  </label>
                  <textarea
                    value={sampleJd}
                    onChange={(e) => setSampleJd(e.target.value)}
                    rows={7}
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    onClick={handleRunDemo}
                    disabled={isAnalyzing}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>{isAnalyzing ? '正在计算中...' : '重新执行针对性分析'}</span>
                  </button>
                </div>

                <div className="lg:col-span-7">
                  {demoOutput && (
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 text-xs">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div>
                          <span className="text-[11px] text-slate-400">ATS 匹配分数</span>
                          <div className="text-xl font-bold text-emerald-600 font-mono">
                            {demoOutput.score}%
                          </div>
                        </div>
                        <span className="rounded-md bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[11px] font-medium border border-emerald-200">
                          高匹配通过
                        </span>
                      </div>

                      <div>
                        <span className="font-bold text-slate-700">对齐的核心技能：</span>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          {demoOutput.aligned.map((sk, i) => (
                            <span key={i} className="rounded bg-blue-50 text-blue-700 px-2 py-0.5 text-[11px]">
                              ✓ {sk}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="font-bold text-slate-700">STAR 成果重构建议：</span>
                        <p className="mt-1 rounded-lg bg-slate-50 p-2.5 text-slate-700 leading-relaxed">
                          {demoOutput.tailoredBullet}
                        </p>
                      </div>

                      <div>
                        <span className="font-bold text-slate-700">定制求职信建议：</span>
                        <div className="mt-1 rounded-lg bg-slate-50 p-2.5 font-mono text-[11px] text-slate-700 whitespace-pre-wrap leading-relaxed">
                          {demoOutput.coverLetterDraft}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Sandbox Case 2: Content Remix Flow */}
            {product.slug === 'content-remix-flow' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 space-y-3">
                  <label className="text-xs font-bold text-slate-700 block">
                    输入评测笔记 / 测评结论
                  </label>
                  <textarea
                    value={remixNote}
                    onChange={(e) => setRemixNote(e.target.value)}
                    rows={5}
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    onClick={handleRemix}
                    disabled={isAnalyzing}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>{isAnalyzing ? '正在重构多平台格式...' : '一键重构为图文与连推'}</span>
                  </button>
                </div>

                <div className="lg:col-span-7">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 text-xs">
                    <span className="font-bold text-slate-800 block">重构生成预览：</span>
                    <pre className="rounded-xl bg-slate-50 p-3 font-mono text-slate-700 text-xs whitespace-pre-wrap leading-relaxed border border-slate-100">
                      {remixOutput || '点击左侧按钮，立即体验评测笔记重构为小红书图文与 X 连推脚本。'}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Sandbox Case 3: Quick Ship Kit & Others */}
            {product.slug !== 'job-application-copilot' &&
              product.slug !== 'ats-resume-scanner' &&
              product.slug !== 'content-remix-flow' && (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="font-bold text-sm text-slate-900">脚手架配置生成</span>
                    <span className="text-xs text-emerald-600 font-mono">Ready to Ship</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    运行一条命令快速部署出海模板：
                  </p>
                  <div className="flex items-center justify-between rounded-xl bg-slate-950 p-4 font-mono text-xs text-emerald-400">
                    <code>npx degit quinnverse/quick-ship-kit my-indie-saas</code>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('npx degit quinnverse/quick-ship-kit my-indie-saas');
                        setCopiedCode(true);
                        setTimeout(() => setCopiedCode(false), 2000);
                      }}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      {copiedCode ? '已复制 ✓' : '复制命令'}
                    </button>
                  </div>
                </div>
              )}
          </div>
        )}

        {/* Tab 4: 隐私安全 */}
        {activeTab === 'privacy' && (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">严格的本地优先与数据隐私</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Quinnverse 出品的所有自研工具，严格遵循本地客户端安全原则：
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 pl-4 border-l-2 border-emerald-500">
              <li>· 绝不在云端记录或贩卖真实个人履历与私密创作数据；</li>
              <li>· 不会将你的个人信息投喂给任何公开大模型训练集；</li>
              <li>· 所有生成的草稿与历史记录优先保存在浏览器的本地存储中。</li>
            </ul>
          </div>
        )}

        {/* Tab 5: 常见问题 */}
        {activeTab === 'faq' && (
          <div className="mt-8 space-y-4">
            {product.faqs && product.faqs.length > 0 ? (
              product.faqs.map((f, i) => (
                <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 space-y-1.5">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">{f.q}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{f.a}</p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-xs text-slate-500">
                暂无更多问题，欢迎联系我们直接咨询。
              </div>
            )}
          </div>
        )}

        {/* Workflow Chaining Section (按工作流串联) */}
        <div className="mt-14 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-6 sm:p-7 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                QUINNVERSE WORKFLOW PIPELINE
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                在 Quinnverse 创作者工作流中的位置
              </h3>
            </div>
            <span className="text-xs text-slate-500">从痛点发现到产品落地与分发</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {workflowStages.map((st) => (
              <div
                key={st.step}
                onClick={() => {
                  if (st.targetId) onNavigate(st.actionTab, st.targetId);
                  else onNavigate(st.actionTab);
                }}
                className={`cursor-pointer rounded-xl p-3.5 border transition-all ${
                  st.isCurrent
                    ? 'border-blue-500 bg-blue-50/80 shadow-sm ring-1 ring-blue-500'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    st.isCurrent ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {st.badge}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">0{st.step}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900">{st.title}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Back Button & Next Step */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => onNavigate('products')}
            className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>返回所有产品</span>
          </button>

          <button
            onClick={() => onNavigate('agent')}
            className="text-xs sm:text-sm font-semibold text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>用 Agent 寻找配套工具 →</span>
          </button>
        </div>
      </section>
    </div>
  );
};
