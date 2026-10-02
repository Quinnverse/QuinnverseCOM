import React, { useState } from 'react';
import { 
  ArrowRight, 
  Search, 
  Wrench,
  ShieldCheck,
  Sparkles,
  Plus,
  Minus,
  Laptop,
  Workflow,
  Boxes,
  MapPin,
  Star
} from 'lucide-react';
import { Link, useRouter } from '../utils/router';
import { PRODUCTS, PICKS, ACTIVITY_FEED } from '../data/database';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const featuredProduct = PRODUCTS.find((p) => p.family === 'GLOBAL_PRODUCT') || PRODUCTS[0];
  const smallTools = PRODUCTS.filter((p) => p.family === 'SMALL_TOOL');
  const [quickGoal, setQuickGoal] = useState('coding');
  const [quickEnv, setQuickEnv] = useState('global');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/finder');
  };

  const topPicks = [
    {
      ...PICKS.find((p) => p.slug === 'cursor')!,
      image: '/src/assets/images/card_code_craft_1790959868969.jpg',
      badge: '日常主力 (Daily Driver)',
      categoryZh: '编程开发 · AI 编辑器',
      rating: '5.0',
      priceZh: '免费试用 / Pro 订阅',
    },
    {
      ...PICKS.find((p) => p.slug === 'n8n')!,
      image: '/src/assets/images/card_sunset_architecture_1790959809823.jpg',
      badge: '项目实战 (Used in Project)',
      categoryZh: '效率自动化 · 自托管中间件',
      rating: '4.9',
      priceZh: '开源免费 / 官方云端',
    },
    {
      ...PICKS.find((p) => p.slug === 'obsidian')!,
      image: '/src/assets/images/card_snow_mountain_1790959826707.jpg',
      badge: '日常主力 (Daily Driver)',
      categoryZh: '知识笔记 · 本地优先',
      rating: '5.0',
      priceZh: '个人完全免费',
    },
  ];

  const faqs = [
    {
      q: 'Quinnverse 是什么主体性质？',
      a: 'Quinnverse 是一个围绕「发现问题 → 找到工具 → 做出工具」不断生长的个人独立产品工作室，主体为个人非经营性网站，已完成工业和信息化部域名信息备案（浙ICP备2026075936号）。'
    },
    {
      q: 'Picks 工具库是否接受付费赞助或排名购买？',
      a: '绝不接受。任何工具都无法通过付费购买收录席位或推荐排名。每一个收录项都必须来自真实业务中的长期依赖或严苛场景实测，且缺点和劝退人群均如实公开。'
    },
    {
      q: '自研产品与轻量小工具的区别是什么？',
      a: '“有些问题值得成为完整产品。有些问题，一个小工具就够了。” 像海外求职助手 (Job Application Copilot) 涉及跨站点 DOM 抓取与申请进度看板流转，需要独立系统支撑；而听墨 (TingMo) 播客或完形填空记忆则专注于用最轻的极简形态解决某个特定的麻烦。'
    },
    {
      q: '如何与 Quinnverse 合作开发原型？',
      a: 'Quinnverse 接受少量高质量的 AI 原型设计、工作流自动化、Web 独立产品与内部小工具定制。你可以通过「合作交流」提交核心痛点，我们在 48 小时内给予明确可行性评估。'
    },
    {
      q: '商业推广返佣（Affiliate）如何处理？',
      a: '部分第三方工具链接可能包含官方合作返佣，收益全部用于支持服务器和自研软件的持续开销。返佣关系与实测结论严格解耦，页面上始终提供纯净官方直达链接供自主选择。'
    }
  ];

  return (
    <div className="bg-[#F8FAFC] text-slate-900 overflow-hidden">
      <section className="relative pt-10 pb-20 md:pt-14 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center text-left">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-800 bg-white border border-slate-200/90 px-4 py-1.5 rounded-full shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>独立产品工作室 · 专注真实业务痛点</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-display text-5xl sm:text-7xl lg:text-7.5xl font-black tracking-tight text-slate-950 leading-[1.08]">
                把真实的问题，做成真正能用的东西。
              </h1>
              <div className="text-xs sm:text-sm font-mono text-slate-400 font-semibold tracking-wide">
                独立产品工作室 · 产品 · AI 工具实测 · 实验
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
              记录工具如何被发现、实测、做出来，再交付到真实场景中。这里只收录深度用过的软件，也只制造真正缺少的工具。
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-blue-600 rounded-full shadow-md hover:shadow-lg transition-all active:scale-98"
              >
                <Wrench className="w-4 h-4 text-slate-200" />
                <span>探索自研产品 →</span>
              </Link>

              <Link
                to="/finder"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-full shadow-xs hover:shadow-sm transition-all"
              >
                <Search className="w-4 h-4 text-slate-600" />
                <span>找适合我的工具 →</span>
              </Link>

              <Link
                to="/lab"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
              >
                <span>进入实验室 →</span>
              </Link>
            </div>

            <div className="pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <div className="font-display text-xl sm:text-2xl font-black text-slate-900">独立构建</div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">从问题出发做产品</div>
              </div>
              <div className="border-l border-slate-200 pl-6">
                <div className="font-display text-xl sm:text-2xl font-black text-slate-900">真实使用</div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">只推荐真正用过的工具</div>
              </div>
              <div className="border-l border-slate-200 pl-6">
                <div className="font-display text-xl sm:text-2xl font-black text-slate-900">持续实验</div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">不断尝试新的可能</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl bg-white border border-slate-200/90 p-3 shadow-xl space-y-4 overflow-hidden">
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden shadow-inner">
                <img
                  src="/src/assets/images/hero_studio_showcase_1790959723676.jpg"
                  alt="Quinnverse Product Studio Workspace"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3.5 left-3.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>正在运行：Job OS</span>
                </div>
                <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-slate-900/85 backdrop-blur-md p-3 rounded-xl text-white text-xs flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-bold text-white">海外求职助手 (Job Application Copilot)</div>
                    <div className="text-[11px] text-slate-300">确定性 DOM 解析 · 零 AI 虚构材料</div>
                  </div>
                  <Link
                    to="/products/job-application-copilot"
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] whitespace-nowrap"
                  >
                    查看详情
                  </Link>
                </div>
              </div>

              <div className="px-2 py-1 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-500">还有自用小工具：</span>
                <div className="flex items-center gap-2">
                  <a href="https://tingmo.quinnverse.tech" target="_blank" rel="noreferrer" className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-colors">听墨</a>
                  <a href="https://weread.quinnverse.tech" target="_blank" rel="noreferrer" className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-colors">微信读书</a>
                  <a href="https://clozerecitation.quinnverse.tech" target="_blank" rel="noreferrer" className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-colors">完形填空</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 sm:mt-20">
          <div className="rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xl text-left">
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-4 mb-4 text-xs font-bold">
              <button className="px-4 py-2 rounded-full bg-slate-900 text-white">需求诊断与推荐</button>
              <Link to="/products" className="px-4 py-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100">自研产品矩阵</Link>
              <Link to="/picks" className="px-4 py-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100">工具实测库 (Picks)</Link>
              <Link to="/resources" className="px-4 py-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100">实用手册与配方</Link>
            </div>

            <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
              <div className="lg:col-span-4 space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">01. 核心任务场景</label>
                <select value={quickGoal} onChange={(e) => setQuickGoal(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-slate-900">
                  <option value="coding">代码重构与全栈开发 (Cursor / Gemini)</option>
                  <option value="job">海外职位捕获与表单自动填写 (Job OS)</option>
                  <option value="automation">跨系统工作流自动化 (n8n)</option>
                  <option value="notes">本地纯文本知识管理 (Obsidian)</option>
                </select>
              </div>

              <div className="lg:col-span-3 space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">02. 网络访问与隐私</label>
                <select value={quickEnv} onChange={(e) => setQuickEnv(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-slate-900">
                  <option value="domestic">必须支持国内直连使用</option>
                  <option value="global">海外网络畅通 (追求国际前沿)</option>
                  <option value="local">数据完全本地化 (零云端出境)</option>
                </select>
              </div>

              <div className="lg:col-span-3 space-y-1">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">03. 筛选逻辑</label>
                <div className="text-xs sm:text-sm font-bold text-slate-700 py-2.5 px-4 bg-slate-50/70 rounded-2xl border border-slate-200 truncate">确定性筛选 · 输出 2-3 个实测解</div>
              </div>

              <div className="lg:col-span-2 pt-1 sm:pt-4">
                <button type="submit" className="w-full inline-flex items-center justify-center gap-1.5 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-blue-600 rounded-full shadow-md transition-all active:scale-98 cursor-pointer">
                  <span>开始匹配工具</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-slate-200/80 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-bold tracking-wider text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full inline-block">关于我们 / 自研初衷</div>
              <h2 className="font-display text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">为真实问题而写的独立软件</h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">有些问题值得成为完整产品。有些问题，一个小工具就够了。Quinnverse 绝不为了融资故事盲目扩张，坚持用朴素、确定性的代码解决具体的现实麻烦。</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="rounded-2xl border border-slate-200/80 p-4.5 bg-slate-50/50 space-y-1.5"><div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 font-bold"><Workflow className="w-4 h-4 text-blue-600" /></div><div className="text-xs font-bold text-slate-900">确定性工程优先</div><p className="text-[11px] text-slate-500 leading-relaxed">核心流程基于 DOM 解析与表单匹配，非大模型不可控黑盒。</p></div>
                <div className="rounded-2xl border border-slate-200/80 p-4.5 bg-slate-50/50 space-y-1.5"><div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 font-bold"><ShieldCheck className="w-4 h-4 text-emerald-600" /></div><div className="text-xs font-bold text-slate-900">拒绝虚构履历</div><p className="text-[11px] text-slate-500 leading-relaxed">填报信息均来自本人核对，杜绝一键代投盲投。</p></div>
                <div className="rounded-2xl border border-slate-200/80 p-4.5 bg-slate-50/50 space-y-1.5"><div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 font-bold"><Boxes className="w-4 h-4 text-amber-600" /></div><div className="text-xs font-bold text-slate-900">真实深度实测</div><p className="text-[11px] text-slate-500 leading-relaxed">每一个收录项均来自高频实战，如实公开缺陷与避坑。</p></div>
                <div className="rounded-2xl border border-slate-200/80 p-4.5 bg-slate-50/50 space-y-1.5"><div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 font-bold"><Laptop className="w-4 h-4 text-purple-600" /></div><div className="text-xs font-bold text-slate-900">极简自用小工具</div><p className="text-[11px] text-slate-500 leading-relaxed">听墨、微信读书看板与完形填空均独立上线，开箱即用。</p></div>
              </div>
              <div className="pt-2"><Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold shadow-sm transition-all"><span>浏览全部自研产品</span><ArrowRight className="w-3.5 h-3.5" /></Link></div>
            </div>
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="relative rounded-3xl overflow-hidden shadow-md group h-80 sm:h-96">
                <img src="/src/assets/images/card_nature_waterfall_1790959793831.jpg" alt="Scenic Forest Waterfall" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs space-y-1"><div className="font-bold text-sm">自研小工具：听墨 (TingMo)</div><div className="text-[11px] text-slate-200">户外行走，也能听课复习</div></div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="relative rounded-3xl overflow-hidden shadow-md group h-38 sm:h-46"><img src="/src/assets/images/card_sunset_architecture_1790959809823.jpg" alt="Warm European Architecture Sunset" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /><div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" /><div className="absolute bottom-3 left-3 text-white text-xs"><span className="font-bold text-xs">微信读书数据看板</span></div></div>
                <div className="relative rounded-3xl overflow-hidden shadow-md group h-38 sm:h-46"><img src="/src/assets/images/card_tropical_beach_1790959840986.jpg" alt="Turquoise Tropical Beach" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /><div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" /><div className="absolute bottom-3 left-3 text-white text-xs"><span className="font-bold text-xs">完形填空主动回忆</span></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="inline-block text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200 px-3.5 py-1 rounded-full">精选深度实测库</div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">真实项目中高频依赖的工具</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">真的用过，才会推荐。每一款收录工具都包含真实项目中的使用证据与明确的局限。</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {topPicks.map((pick) => (
            <div key={pick.id} className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group">
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100"><img src={pick.image} alt={pick.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /><div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-slate-900 shadow-xs">{pick.badge}</div><div className="absolute bottom-3 left-3 text-white text-xs drop-shadow-md font-semibold flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-blue-400" /><span>{pick.categoryZh}</span></div></div>
              <div className="p-6 space-y-3.5 flex-1"><h3 className="font-display text-2xl font-bold text-slate-950">{pick.name}</h3><p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{pick.summary}</p><div className="pt-2 border-t border-slate-100 text-xs text-slate-600"><span className="font-bold text-slate-900">实测结论：</span><p className="mt-1 line-clamp-2 leading-relaxed text-slate-600">{pick.whatWeFound}</p></div></div>
              <div className="p-6 pt-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50"><div><div className="text-xs font-bold text-slate-900 flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /><span>★ {pick.rating} (实战验证)</span></div><div className="text-[11px] text-slate-500 font-medium">{pick.priceZh}</div></div><Link to={`/picks/${pick.slug}`} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-2xs"><span>阅读实测</span><ArrowRight className="w-3 h-3" /></Link></div>
            </div>
          ))}
        </div>
        <div><Link to="/picks" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white border border-slate-300 hover:border-slate-900 text-slate-900 text-xs font-bold transition-colors shadow-2xs"><span>浏览全部实测库 (View All Picks)</span><ArrowRight className="w-3.5 h-3.5" /></Link></div>
      </section>

      <section className="py-20 bg-white border-y border-slate-200/80 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl mx-auto space-y-3"><div className="inline-block text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full">工作室定制服务</div><h2 className="font-display text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">为具体业务卡点量身定制的研发能力</h2><p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">拒绝传统外包的层层堆叠。针对明确具体的业务卡点，快速交付跑通全链路的可运行第一版。</p></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="rounded-3xl border border-slate-200/90 bg-[#FBFBFC] p-6.5 space-y-4 hover:shadow-md transition-shadow"><div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 font-bold shadow-2xs"><Sparkles className="w-5 h-5 text-blue-600" /></div><h3 className="font-bold text-base text-slate-950">AI 产品原型交付</h3><p className="text-xs text-slate-600 leading-relaxed">从模糊的想法出发，梳理出确定性数据流，打造可交互、已跑通数据链路的真实 MVP。</p><div className="pt-2"><Link to="/work-with-us" className="text-xs font-bold text-slate-900 hover:text-blue-600 inline-flex items-center gap-1">了解服务详情 ↗</Link></div></div>
            <div className="rounded-3xl border border-slate-200/90 bg-[#FBFBFC] p-6.5 space-y-4 hover:shadow-md transition-shadow"><div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 font-bold shadow-2xs"><Workflow className="w-5 h-5 text-emerald-600" /></div><h3 className="font-bold text-base text-slate-950">自动化工作流与 Agent</h3><p className="text-xs text-slate-600 leading-relaxed">针对小团队跨系统数据搬运的痛点，搭建轻量、低维护成本的自动化管线与私有 Agent。</p><div className="pt-2"><Link to="/work-with-us" className="text-xs font-bold text-slate-900 hover:text-emerald-600 inline-flex items-center gap-1">了解服务详情 ↗</Link></div></div>
            <div className="rounded-3xl border border-slate-200/90 bg-[#FBFBFC] p-6.5 space-y-4 hover:shadow-md transition-shadow"><div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 font-bold shadow-2xs"><Laptop className="w-5 h-5 text-purple-600" /></div><h3 className="font-bold text-base text-slate-950">现代独立 Web 软件</h3><p className="text-xs text-slate-600 leading-relaxed">现代极客审美的独立 Web 软件与交互前端，高信息密度、克制留白与灵敏流畅响应。</p><div className="pt-2"><Link to="/work-with-us" className="text-xs font-bold text-slate-900 hover:text-purple-600 inline-flex items-center gap-1">了解服务详情 ↗</Link></div></div>
            <div className="rounded-3xl border border-slate-200/90 bg-[#FBFBFC] p-6.5 space-y-4 hover:shadow-md transition-shadow"><div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 font-bold shadow-2xs"><Boxes className="w-5 h-5 text-amber-600" /></div><h3 className="font-bold text-base text-slate-950">团队私有内部小工具</h3><p className="text-xs text-slate-600 leading-relaxed">针对特定业务卡点定制的小型私有软件，单体运行，无外部依赖，用完即走。</p><div className="pt-2"><Link to="/work-with-us" className="text-xs font-bold text-slate-900 hover:text-amber-600 inline-flex items-center gap-1">了解服务详情 ↗</Link></div></div>
          </div>
          <div><Link to="/work-with-us" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold shadow-sm transition-all"><span>开启一次真实交流 (Start a conversation)</span><ArrowRight className="w-3.5 h-3.5" /></Link></div>
        </div>
      </section>

      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="max-w-2xl mx-auto space-y-3"><div className="inline-block text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200 px-3.5 py-1 rounded-full">最新动态与手记</div><h2 className="font-display text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">正在发生的事情</h2><p className="text-xs sm:text-sm text-slate-600 leading-relaxed">按时间顺序记录的产品构建更新、实测补充、公开实验与深度手记。</p></div>
        <div className="max-w-3xl mx-auto space-y-4 text-left">
          {ACTIVITY_FEED.map((item) => {
            const badgeClass = item.type === 'PRODUCT' ? 'text-blue-700 bg-blue-50 border-blue-200' : item.type === 'PICK' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : item.type === 'LAB' ? 'text-amber-700 bg-amber-50 border-amber-200' : item.type === 'JOURNAL' ? 'text-purple-700 bg-purple-50 border-purple-200' : 'text-indigo-700 bg-indigo-50 border-indigo-200';
            const typeZh = item.type === 'PRODUCT' ? '自研产品' : item.type === 'PICK' ? '工具实测' : item.type === 'LAB' ? '前沿实验' : item.type === 'JOURNAL' ? '深度手记' : '实用手册';
            return <Link key={item.id} to={item.link} className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl border border-slate-200/90 bg-white hover:border-slate-400 hover:shadow-md transition-all gap-4 shadow-2xs"><div className="flex items-start sm:items-center gap-3.5"><span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${badgeClass} shrink-0`}>{typeZh}</span><div><h4 className="text-sm font-bold text-slate-950 group-hover:text-blue-600 transition-colors">{item.title}</h4><p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{item.note}</p></div></div><div className="flex items-center gap-3 text-xs text-slate-400 font-mono shrink-0"><span>{item.date}</span><ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 group-hover:text-slate-900 transition-all" /></div></Link>;
          })}
        </div>
      </section>

      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200/90 bg-white shadow-xl overflow-hidden text-left relative"><div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-center"><div className="lg:col-span-7 p-8 sm:p-14 space-y-5"><span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full inline-block">开启一次真实合作</span><h2 className="font-display text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">有真正值得做成软件的想法？</h2><p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">无论是高频卡手的业务流程自动化，还是想在两周内验证一个真实的 AI 原型。Quinnverse 只做确定性、有事实依据的交付。</p><div className="pt-2 flex flex-wrap items-center gap-4"><Link to="/work-with-us" className="px-7 py-3.5 rounded-full bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-98">开始交流 (48小时内答复) →</Link><Link to="/contact" className="px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs sm:text-sm transition-colors">反馈或自荐好工具</Link></div></div><div className="lg:col-span-5 h-72 lg:h-full min-h-[320px] relative overflow-hidden bg-slate-100"><img src="/src/assets/images/cta_creative_sunlight_1790959855015.jpg" alt="Creative Studio Sunlight Table" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 lg:bg-gradient-to-r lg:from-white/30 lg:to-transparent" /><div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-slate-200 text-slate-900 text-center"><div className="text-2xl font-black font-display text-blue-600">48h</div><div className="text-[10px] font-bold text-slate-600">可行性技术答复</div></div></div></div></div>
      </section>

      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
        <div className="space-y-3"><div className="inline-block text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200 px-3.5 py-1 rounded-full">常见问题解答</div><h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">关于工作室定位与选品逻辑的坦诚答复</h2><p className="text-xs sm:text-sm text-slate-600">不玩公关文字游戏，把真实的规则与原则直接写在明处。</p></div>
        <div className="space-y-3 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return <div key={idx} className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden transition-all shadow-2xs"><button type="button" onClick={() => setActiveFaq(isOpen ? null : idx)} className="w-full p-5 sm:p-6 flex items-center justify-between text-left font-bold text-slate-900 text-sm sm:text-base hover:text-blue-600 transition-colors cursor-pointer"><span>{faq.q}</span><span className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 ml-4 text-slate-700">{isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}</span></button>{isOpen && <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">{faq.a}</div>}</div>;
          })}
        </div>
      </section>
    </div>
  );
};
