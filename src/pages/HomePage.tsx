import React from 'react';
import { 
  ArrowRight, 
  ArrowUpRight, 
  Search, 
  Wrench, 
  FlaskConical, 
  BookOpen, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { Link, useRouter } from '../utils/router';
import { PRODUCTS, PICKS, ACTIVITY_FEED } from '../data/database';

export const HomePage: React.FC = () => {
  const { navigate } = useRouter();
  const featuredProduct = PRODUCTS.find((p) => p.family === 'GLOBAL_PRODUCT') || PRODUCTS[0];
  const smallTools = PRODUCTS.filter((p) => p.family === 'SMALL_TOOL');
  const samplePicks = PICKS.filter((p) => p.featured).slice(0, 3);

  return (
    <div className="space-y-0">
      {/* ========================================================================= */}
      {/* 01 HERO: Full-Bleed Cinematic Studio Backdrop                             */}
      {/* ========================================================================= */}
      <section className="relative min-h-[92vh] sm:min-h-[94vh] flex flex-col justify-between overflow-hidden border-b border-slate-800 bg-[#080B12]">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_quinnverse_studio_1790953227180.jpg"
            alt="Quinnverse Product Studio Workspace"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center scale-105 transform filter brightness-80 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-[#080B12]/65 to-[#080B12]/75" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#080B12]/40 to-[#080B12]/90" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 pt-24 pb-16 sm:pt-36 sm:pb-20 my-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-cyan-300 bg-cyan-950/70 border border-cyan-500/30 px-4 py-1.5 rounded-full backdrop-blur-md shadow-lg shadow-cyan-950/40 mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>QUINNVERSE / INDEPENDENT PRODUCT STUDIO</span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white leading-[1.05] drop-shadow-md">
              Find better tools.
              <br />
              Build what’s missing.
            </h1>
            <p className="text-xl sm:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-cyan-100 to-sky-300 pt-2">
              发现真正好用的工具。找不到合适的，就自己做一个。
            </p>
          </div>

          <p className="mt-6 text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-2xl text-balance drop-shadow-sm">
            从具体痛点到独立产品——记录工具如何被发现、实测、做出来，再交付到真实场景中。这里只收录深度用过的东西，也只制造真正缺少的软件。
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-xl shadow-cyan-950/60 transition-all active:scale-98"
            >
              <Wrench className="w-4 h-4 text-slate-950" />
              <span>Explore Products</span>
            </Link>

            <Link
              to="/picks"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-500/50 rounded-xl backdrop-blur-md transition-all shadow-lg"
            >
              <Search className="w-4 h-4 text-cyan-400" />
              <span>Explore Picks</span>
            </Link>

            <Link
              to="/work-with-us"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-3.5 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
            >
              <span>Work with Quinnverse</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="relative z-10 border-t border-slate-800/80 bg-slate-950/60 backdrop-blur-md py-4">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-6">
              <span>01 / DISCOVER 发现</span>
              <span className="hidden sm:inline">02 / TEST 实测</span>
              <span className="hidden sm:inline">03 / BUILD 制造</span>
              <span className="hidden sm:inline">04 / SHARE 沉淀</span>
            </div>
            <a
              href="#start-here"
              className="inline-flex items-center gap-1 text-slate-300 hover:text-cyan-300 transition-colors"
            >
              <span>向下探索</span>
              <ChevronDown className="w-4 h-4 text-cyan-400 animate-bounce" />
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 02 START HERE: Four Core Navigation Portals                              */}
      {/* ========================================================================= */}
      <section id="start-here" className="py-20 border-b border-slate-800/80 bg-[#0A0E18]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-left space-y-2 mb-10">
            <div className="text-xs font-mono font-semibold text-cyan-400 tracking-wider">
              START HERE
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              从这里开始了解 Quinnverse 的工作
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <Link
              to="/products"
              className="group rounded-2xl border border-slate-800/90 bg-[#0C1220] p-6 hover:border-cyan-500/50 hover:bg-[#0F1626] transition-all flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/70 border border-cyan-800/50 flex items-center justify-center text-cyan-400">
                  <Wrench className="w-4 h-4" />
                </div>
                <div className="text-xs font-mono text-cyan-400 font-semibold">BUILT BY QUINNVERSE</div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  自己做的。
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  从一个真实痛点出发，最终打磨成可以稳定交付给别人使用的独立软件。
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center text-xs font-semibold text-cyan-400">
                <span>Explore Products →</span>
              </div>
            </Link>

            <Link
              to="/picks"
              className="group rounded-2xl border border-slate-800/90 bg-[#0C1220] p-6 hover:border-cyan-500/50 hover:bg-[#0F1626] transition-all flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-950/70 border border-emerald-800/50 flex items-center justify-center text-emerald-400">
                  <Search className="w-4 h-4" />
                </div>
                <div className="text-xs font-mono text-emerald-400 font-semibold">TESTED & RECOMMENDED</div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  真的用过，才会推荐。
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  不是海量采集的导航站。每一个收录项都有实际使用证据、适用边界与明确劝退。
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center text-xs font-semibold text-emerald-400">
                <span>Explore Picks →</span>
              </div>
            </Link>

            <Link
              to="/lab"
              className="group rounded-2xl border border-slate-800/90 bg-[#0C1220] p-6 hover:border-cyan-500/50 hover:bg-[#0F1626] transition-all flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-lg bg-amber-950/70 border border-amber-800/50 flex items-center justify-center text-amber-400">
                  <FlaskConical className="w-4 h-4" />
                </div>
                <div className="text-xs font-mono text-amber-400 font-semibold">EXPERIMENTS IN PROGRESS</div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  正在进行的实验。
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  不一定都能成为正式产品，但每一个实验都真实跑过代码与流程，记录失败与收获。
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center text-xs font-semibold text-amber-400">
                <span>Enter the Lab →</span>
              </div>
            </Link>

            <Link
              to="/journal"
              className="group rounded-2xl border border-slate-800/90 bg-[#0C1220] p-6 hover:border-cyan-500/50 hover:bg-[#0F1626] transition-all flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-lg bg-sky-950/70 border border-sky-800/50 flex items-center justify-center text-sky-400">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="text-xs font-mono text-sky-400 font-semibold">FIELD NOTES & RESOURCES</div>
                <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                  把过程写下来。
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  工具深度实测复盘、Build Log 与拿走就能直接使用的图表方法速查手册。
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center text-xs font-semibold text-sky-400">
                <span>Read Journal →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 03 FEATURED PRODUCT: Job Application Copilot / Job OS                     */}
      {/* ========================================================================= */}
      <section className="py-20 border-b border-slate-800/80 bg-[#080B12]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 text-left">
            <div>
              <div className="text-xs font-mono font-semibold text-cyan-400 tracking-wider">
                FEATURED PRODUCT
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                {featuredProduct.name}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-400 font-mono font-semibold bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-1 rounded">
                Stage: {featuredProduct.stage}
              </span>
              <span className="text-xs text-slate-400 font-mono">Chrome Extension + Web Workspace</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#0C1220] p-6 sm:p-10 shadow-2xl text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6">
                <p className="text-base sm:text-lg font-semibold text-cyan-200">
                  {featuredProduct.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {featuredProduct.summary}
                </p>

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    确定性工程原则 (Deterministic Principles)
                  </div>
                  <ul className="space-y-2">
                    {featuredProduct.principles.map((pri, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                        <span className="text-cyan-400 font-bold">✓</span>
                        <span>{pri}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-4">
                  <Link
                    to={`/products/${featuredProduct.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm transition-colors"
                  >
                    <span>查看架构与内测申请</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <span className="text-xs text-slate-500 font-mono">
                    {featuredProduct.independentSiteStatus}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#080B12] rounded-xl border border-slate-800 p-5 space-y-4">
                <div className="text-xs font-mono font-semibold text-slate-400 uppercase">
                  核心处理流程 (The Workflow)
                </div>
                <div className="space-y-3">
                  {featuredProduct.workflow?.map((step) => (
                    <div key={step.step} className="flex items-start gap-3 p-3 rounded-lg bg-[#0C1220] border border-slate-800/80">
                      <span className="font-mono text-xs font-bold text-cyan-400 mt-0.5">{step.step}</span>
                      <div>
                        <div className="text-xs font-bold text-white">{step.title}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-slate-800/80 bg-[#090D17] p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left">
            <div>
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Also from Quinnverse</span>
              <div className="text-xs text-slate-300 font-medium mt-1">
                有些问题值得成为完整产品。有些问题，一个小工具就够了。
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs">
              {smallTools.map((t) => (
                <a
                  key={t.id}
                  href={t.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>{t.name}</span>
                  <ExternalLink className="w-3 h-3 text-cyan-400" />
                </a>
              ))}
              <Link to="/products" className="text-cyan-400 hover:text-cyan-300 font-semibold px-2 py-1.5">
                浏览全部产品 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 04 PICKS + FINDER: Core Discovery Engine                                  */}
      {/* ========================================================================= */}
      <section className="py-20 border-b border-slate-800/80 bg-[#0A0E18]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-left space-y-3 mb-10">
            <div className="text-xs font-mono font-semibold text-emerald-400 tracking-wider">
              TESTED & RECOMMENDED
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              真的用过，才会放在这里。
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Quinnverse Picks 不是采集数千个 AI 外链的导航站，不按广告返佣调整排名，也不使用廉价的五星好评。这里只有在真实开发与业务流程中长期使用、或经过系统性测试的工具。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {samplePicks.map((pick) => (
              <Link
                key={pick.id}
                to={`/picks/${pick.slug}`}
                className="group rounded-2xl border border-slate-800 bg-[#0C1220] p-6 hover:border-emerald-500/50 hover:bg-[#0E1626] transition-all flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">{pick.category}</span>
                    <span className="font-mono text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
                      {pick.evidenceLevel}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {pick.name}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {pick.summary}
                  </p>

                  <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                    <span className="text-slate-300 font-semibold">实测发现：</span>
                    <p className="mt-0.5 line-clamp-2">{pick.whatWeFound}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-400">
                  <span>查看实测结论与避坑 →</span>
                  <span className="text-slate-500 font-mono text-[10px]">Tested: {pick.lastTested}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-cyan-900/50 bg-gradient-to-r from-cyan-950/40 via-slate-900/80 to-slate-900/40 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left">
            <div className="space-y-1">
              <div className="text-xs font-mono font-bold text-cyan-300">
                QUINNVERSE FINDER · 确定性需求诊断
              </div>
              <h3 className="text-base font-bold text-white">
                面对海量工具不知如何选？告诉 Quinnverse 你想解决什么。
              </h3>
              <p className="text-xs text-slate-400">
                通过 4 道确定性判断题（任务类型、技术偏好、网络与预算），从实测库中诊断出最适合你的 2~3 个选项。
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/finder"
                className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm whitespace-nowrap"
              >
                打开 Quinnverse Finder →
              </Link>
              <Link
                to="/picks"
                className="px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/90 rounded-lg whitespace-nowrap"
              >
                浏览全部 Picks
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 05 FROM QUINNVERSE: Dynamic Editorial Feed                                */}
      {/* ========================================================================= */}
      <section className="py-20 border-b border-slate-800/80 bg-[#080B12]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-left space-y-2 mb-10">
            <div className="text-xs font-mono font-semibold text-cyan-400 tracking-wider">
              FROM QUINNVERSE
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              正在发生的事情
            </h2>
            <p className="text-xs text-slate-400">
              按时间顺序记录的产品构建更新、实测补充、公开实验与深度手记。
            </p>
          </div>

          <div className="space-y-3 text-left">
            {ACTIVITY_FEED.map((item) => {
              const badgeStyle = 
                item.type === 'PRODUCT' ? 'text-cyan-400 bg-cyan-950/60 border-cyan-800/50' :
                item.type === 'PICK' ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800/50' :
                item.type === 'LAB' ? 'text-amber-400 bg-amber-950/60 border-amber-800/50' :
                item.type === 'JOURNAL' ? 'text-sky-400 bg-sky-950/60 border-sky-800/50' :
                'text-indigo-400 bg-indigo-950/60 border-indigo-800/50';

              return (
                <Link
                  key={item.id}
                  to={item.link}
                  className="group rounded-xl border border-slate-800 bg-[#0C1220] p-4 hover:border-slate-700 hover:bg-[#0E1526] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${badgeStyle} shrink-0`}>
                      {item.type}
                    </span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {item.note}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 shrink-0 font-mono">
                    <span>{item.date}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-1 group-hover:text-cyan-400 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 06 WORK WITH QUINNVERSE: Studio Collaboration Channel                     */}
      {/* ========================================================================= */}
      <section className="py-20 border-b border-slate-800/80 bg-[#0A0E18]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-left space-y-3 mb-10">
            <div className="text-xs font-mono font-semibold text-cyan-400 tracking-wider">
              STUDIO COLLABORATION
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Have something worth building?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Quinnverse 保持着对真实问题的敏锐度，同时接受少量高质量的产品与自动化原型开发合作。如果你面对一个痛点明确但市面上缺乏合适工具的场景，可以一起把它做成一个稳定运行的第一版。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left mb-10">
            <div className="rounded-xl border border-slate-800 bg-[#0C1220] p-5 space-y-2">
              <div className="text-xs font-bold text-white">AI Product Prototype</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                从模糊业务构想，梳理出确定性数据流，打造可交互、已跑通数据链路的真实 MVP。
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-[#0C1220] p-5 space-y-2">
              <div className="text-xs font-bold text-white">Agent & Automation</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                面向团队卡点的工作流自动化管道与自托管轻量 Agent，消除繁琐的手工搬运。
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-[#0C1220] p-5 space-y-2">
              <div className="text-xs font-bold text-white">Web Product</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                现代极客审美的独立 Web 软件与交互前端，高信息密度、克制留白与流畅响应。
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-[#0C1220] p-5 space-y-2">
              <div className="text-xs font-bold text-white">Internal Tool</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                针对小团队特定业务卡点定制的小型私有软件，单体运行，无外部依赖。
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl border border-slate-800 bg-[#0C1220] text-left">
            <div>
              <div className="text-sm font-bold text-white">准备好聊聊你的具体痛点了吗？</div>
              <div className="text-xs text-slate-400 mt-0.5">告诉我们你面对的业务卡点与期望形态，48 小时内给予明确可行性反馈。</div>
            </div>
            <Link
              to="/work-with-us"
              className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm whitespace-nowrap transition-colors"
            >
              Start a conversation (开始交流) →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
