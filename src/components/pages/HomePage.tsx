import React from 'react';
import {
  TrendingUp,
  Scan,
  Share2,
  Compass,
  Sparkles,
  FlaskConical,
  Github,
  Twitter,
  Linkedin,
} from 'lucide-react';
import { Language, ToolItem, ProductItem, LabPost } from '../../types';

interface HomePageProps {
  onNavigate: (tab: string) => void;
  lang: Language;
  tools: ToolItem[];
  products: ProductItem[];
  labPosts: LabPost[];
  onSelectTool: (tool: ToolItem) => void;
  onSelectPost: (post: LabPost) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  lang,
}) => {
  const isZh = lang === 'zh';

  return (
    <div className="relative min-h-screen w-full bg-[#070b13] text-white flex flex-col justify-between overflow-hidden">
      {/* Background Hero Image matching image.png 1:1 */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/quinnverse_home_bg_1790971384808.jpg"
          alt="Quinnverse Studio Mountain View"
          className="h-full w-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        {/* Subtle cinematic gradient overlays for perfect text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-[at_50%_35%] from-transparent via-transparent to-black/70 pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-16 flex flex-col items-center text-center">
        {/* Giant Title */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4 [text-wrap:balance] drop-shadow-md">
          Quinnverse
        </h1>

        {/* Subtitle Headline */}
        <p className="text-xl sm:text-2xl md:text-3xl font-medium text-white mb-3 tracking-wide [text-wrap:balance] drop-shadow-sm">
          {isZh ? '把真实的问题，做成真正能用的东西。' : 'Turn real problems into tools that actually work.'}
        </p>

        {/* Muted Kicker */}
        <p className="text-xs sm:text-sm md:text-base font-normal tracking-wide text-slate-300/90 mb-12 sm:mb-16">
          {isZh
            ? '独立产品工作室 · 产品 · AI 工具实测 · 实验'
            : 'Indie Product Studio · Products · Tested AI Database · Experiments'}
        </p>

        {/* 3 Glassmorphic Cards (Strictly aligned with 3 pillars below via identical grid) */}
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 sm:mb-16">
          {/* Card 1: 探索自研产品 */}
          <button
            onClick={() => onNavigate('products')}
            className="group relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#0d1624]/75 p-6 sm:p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-[#111c2e]/90 hover:shadow-2xl hover:shadow-black/50 focus-visible:outline-none"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-200 mb-4 transition-transform group-hover:scale-110">
              <Compass className="h-6 w-6 stroke-[1.75]" />
            </div>
            <div className="flex items-center gap-1.5 text-sm sm:text-base font-semibold text-white tracking-wide group-hover:text-blue-200 transition-colors">
              <span>{isZh ? '探索自研产品' : 'Explore Products'}</span>
              <span className="text-xs transition-transform group-hover:translate-x-1">→</span>
            </div>
          </button>

          {/* Card 2: 找适合我的工具 */}
          <button
            onClick={() => onNavigate('agent')}
            className="group relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#0d1624]/75 p-6 sm:p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-[#111c2e]/90 hover:shadow-2xl hover:shadow-blue-500/10 focus-visible:outline-none"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-950/80 border border-blue-500/40 text-blue-400 mb-4 transition-transform group-hover:scale-110">
              <Sparkles className="h-6 w-6 stroke-[1.75]" />
            </div>
            <div className="flex items-center gap-1.5 text-sm sm:text-base font-semibold text-white tracking-wide group-hover:text-blue-300 transition-colors">
              <span>{isZh ? '找适合我的工具' : 'Find My AI Tool'}</span>
              <span className="text-xs transition-transform group-hover:translate-x-1">→</span>
            </div>
          </button>

          {/* Card 3: 进入实验室 */}
          <button
            onClick={() => onNavigate('lab')}
            className="group relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#0d1624]/75 p-6 sm:p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-[#111c2e]/90 hover:shadow-2xl hover:shadow-black/50 focus-visible:outline-none"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-200 mb-4 transition-transform group-hover:scale-110">
              <FlaskConical className="h-6 w-6 stroke-[1.75]" />
            </div>
            <div className="flex items-center gap-1.5 text-sm sm:text-base font-semibold text-white tracking-wide group-hover:text-amber-200 transition-colors">
              <span>{isZh ? '进入实验室' : 'Enter The Lab'}</span>
              <span className="text-xs transition-transform group-hover:translate-x-1">→</span>
            </div>
          </button>
        </div>

        {/* Divider matching exact max-w-4xl container */}
        <div className="w-full max-w-4xl border-t border-white/10 mb-8 sm:mb-10" />

        {/* Bottom 3 Pillars (Strictly aligned under the 3 cards on the exact same vertical center axis) */}
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {/* Pillar 1 - Aligned under Card 1 */}
          <div className="flex flex-col items-center justify-center text-center px-4">
            <div className="flex h-10 w-10 items-center justify-center text-white mb-2.5 mx-auto">
              <TrendingUp className="h-6 w-6 stroke-[2]" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-1 tracking-wide text-center">
              {isZh ? '独立构建' : 'Independent Craft'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed text-center">
              {isZh ? '从问题出发做产品' : 'Starting from concrete frictions'}
            </p>
          </div>

          {/* Pillar 2 - Aligned under Card 2 */}
          <div className="flex flex-col items-center justify-center text-center px-4">
            <div className="flex h-10 w-10 items-center justify-center text-white mb-2.5 mx-auto">
              <Scan className="h-6 w-6 stroke-[2]" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-1 tracking-wide text-center">
              {isZh ? '真实使用' : 'Real-World Testing'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed text-center">
              {isZh ? '只推荐真正用过的工具' : 'Only tools surviving continuous use'}
            </p>
          </div>

          {/* Pillar 3 - Aligned under Card 3 */}
          <div className="flex flex-col items-center justify-center text-center px-4">
            <div className="flex h-10 w-10 items-center justify-center text-white mb-2.5 mx-auto">
              <Share2 className="h-6 w-6 stroke-[2]" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-1 tracking-wide text-center">
              {isZh ? '持续实验' : 'Open Experiments'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed text-center">
              {isZh ? '不断尝试新的可能' : 'Iterating and learning in public'}
            </p>
          </div>
        </div>
      </div>

      {/* Clean Bottom Footer Bar matching image.png 1:1 */}
      <div className="relative z-10 w-full border-t border-white/5 bg-black/60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl flex-col sm:flex-row items-center justify-between px-6 py-6 gap-4 text-xs text-slate-400">
          <div>
            <div className="font-bold text-white text-sm">Quinnverse</div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {isZh ? '把真实的问题做成真正能用的工具。' : 'Turn real problems into tools that actually work.'}
            </div>
            <div className="text-[10px] text-slate-600 mt-0.5">
              © 2026 Quinnverse. All rights reserved.
            </div>
          </div>

          <div className="flex items-center gap-5 text-slate-400">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
              aria-label="Twitter / X"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
