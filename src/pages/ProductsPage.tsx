import React from 'react';
import { ArrowRight, ExternalLink, Wrench, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { Link } from '../utils/router';
import { PRODUCTS } from '../data/database';

export const ProductsPage: React.FC = () => {
  const featured = PRODUCTS.find((p) => p.family === 'GLOBAL_PRODUCT') || PRODUCTS[0];
  const smallTools = PRODUCTS.filter((p) => p.family === 'SMALL_TOOL');

  const toolImages: Record<string, string> = {
    tingmo: '/src/assets/images/card_nature_waterfall_1790959793831.jpg',
    'weread-dashboard': '/src/assets/images/card_sunset_architecture_1790959809823.jpg',
    'cloze-recitation': '/src/assets/images/card_tropical_beach_1790959840986.jpg',
  };

  return (
    <div className="py-16 sm:py-24 bg-[#F8FAFC] text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-block text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full">
            自研软件矩阵
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-tight">
            因为缺少好用的工具，所以我们自己做了一个。
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            这里是 Quinnverse 亲自设计、编码与维护的软件产品。有些卡点足够复杂，需要一套完整的系统去承载；有些卡点足够具体，一个小工具就已经足够好。
          </p>
        </div>

        {/* Level 1: Featured Global Product */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-xs">
            <span className="font-mono text-slate-900 font-bold uppercase tracking-wider">01 / 当前主线旗舰产品</span>
            <span className="text-slate-300">———</span>
            <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full">
              内测阶段：{featured.stage}
            </span>
          </div>

          <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 p-7 sm:p-12 space-y-8">
                <div className="space-y-3">
                  <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-950">
                    {featured.name}
                  </h2>
                  <p className="text-base sm:text-xl font-bold text-slate-800">
                    {featured.tagline}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {featured.problemSolved}
                  </p>
                </div>

                {/* Core Features & Principles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      核心能力矩阵
                    </div>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                      {featured.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="text-blue-600 font-bold">·</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      确定性工程原则
                    </div>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                      {featured.principles.map((pri, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{pri}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions & Status */}
                <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 font-mono">
                    {featured.techStack.join(' · ')}
                  </div>
                  <Link
                    to={`/products/${featured.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-slate-900 hover:bg-blue-600 rounded-full shadow-sm transition-all"
                  >
                    <span>查看详细处理链路与内测申请</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* 右侧大图预览 */}
              <div className="lg:col-span-5 relative min-h-[320px] bg-slate-100 overflow-hidden">
                <img
                  src="/src/assets/images/hero_studio_showcase_1790959723676.jpg"
                  alt="Job Application Copilot Workspace"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-xs space-y-1">
                  <div className="font-bold text-base">确定性职位捕获与表单填充工作台</div>
                  <div className="text-slate-200 text-xs">Chrome 插件 + 云端私有申请看板</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Level 2: Small Tools Matrix with Colorful Photos */}
        <div className="space-y-6 pt-6">
          <div className="space-y-2">
            <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              02 / 轻量自用小工具矩阵
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-950">
              有些问题值得成为完整产品。有些问题，一个小工具就够了。
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              这些小工具均有独立的二级域名运行，无冗余商业干扰，打开即用。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {smallTools.map((tool) => {
              const toolImg = toolImages[tool.slug] || '/src/assets/images/card_nature_waterfall_1790959793831.jpg';
              return (
                <div
                  key={tool.id}
                  className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <img
                      src={toolImg}
                      alt={tool.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-slate-900 shadow-xs">
                      在线稳定运行
                    </div>
                  </div>

                  <div className="p-6 space-y-3.5 flex-1">
                    <h3 className="text-xl font-bold text-slate-950">{tool.name}</h3>

                    <p className="text-xs font-semibold text-slate-800 leading-snug">
                      {tool.tagline}
                    </p>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {tool.problemSolved}
                    </p>

                    <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600 font-medium">
                      {tool.features.slice(0, 2).map((f, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">✓</span>
                          <span className="line-clamp-1">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 pt-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <span className="text-[11px] text-slate-400 font-mono">quinnverse.tech 子域</span>
                    <a
                      href={tool.externalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-blue-600 text-xs font-bold text-white transition-colors"
                    >
                      <span>打开工具</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
