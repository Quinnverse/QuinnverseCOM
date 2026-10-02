import React, { useState } from 'react';
import { ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';
import { Language } from '../../types';

interface AboutPageProps {
  onNavigate: (tab: string, productId?: string) => void;
  lang: Language;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, lang }) => {
  const isZh = lang === 'zh';
  const [activeTab, setActiveTab] = useState<'what' | 'why' | 'doing' | 'principles'>('what');

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900">
      {/* 1:1 Top Hero Banner matching image.png (6. 关于页面 About) */}
      <section className="relative overflow-hidden bg-[#090d16] text-white pt-24 pb-14 sm:pt-28 sm:pb-16 border-b border-slate-800">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="/src/assets/images/about_mountains_calm_1790970774868.jpg"
            alt="Mountain Skyline"
            className="h-full w-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/60 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-8 text-center sm:text-left space-y-2">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            关于 Quinnverse
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-normal">
            一个独立产品工作室，做产品，也记录产品是怎么做出来的。
          </p>
        </div>
      </section>

      {/* 1:1 White Bottom Section 1 matching image.png (6. 关于页面 About) */}
      <section className="mx-auto max-w-4xl px-6 sm:px-8 py-10">
        {/* Tabs Row */}
        <div className="flex items-center gap-8 border-b border-slate-200 pb-3 text-sm font-medium overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('what')}
            className={`relative pb-3 transition-colors whitespace-nowrap ${
              activeTab === 'what'
                ? 'text-blue-600 font-bold after:absolute after:bottom-[-13px] after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Quinnverse 是什么
          </button>
          <button
            onClick={() => setActiveTab('why')}
            className={`relative pb-3 transition-colors whitespace-nowrap ${
              activeTab === 'why'
                ? 'text-blue-600 font-bold after:absolute after:bottom-[-13px] after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            为什么建立
          </button>
          <button
            onClick={() => setActiveTab('doing')}
            className={`relative pb-3 transition-colors whitespace-nowrap ${
              activeTab === 'doing'
                ? 'text-blue-600 font-bold after:absolute after:bottom-[-13px] after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            在做什么
          </button>
          <button
            onClick={() => setActiveTab('principles')}
            className={`relative pb-3 transition-colors whitespace-nowrap ${
              activeTab === 'principles'
                ? 'text-blue-600 font-bold after:absolute after:bottom-[-13px] after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            我的原则
          </button>
        </div>

        {/* Tab Content matching image.png 1:1 */}
        <div className="mt-8 space-y-4 max-w-3xl">
          {activeTab === 'what' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">
                Quinnverse 是什么？
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Quinnverse 是由启云创建并持续维护的独立产品工作室。
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                我专注于用 AI 和新技术，解决真实的问题，并通过产品、工具实测和实验记录，探索更多可能。
              </p>
            </div>
          )}

          {activeTab === 'why' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">
                为什么建立？
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                在充斥着噪音和软文的 AI 工具时代，许多人不知道什么工具真正能解决问题。我希望通过亲自深度测试并构建可信的真实产品，把真正好用的工具沉淀下来。
              </p>
            </div>
          )}

          {activeTab === 'doing' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">
                在做什么？
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                持续迭代 Job Application Copilot 与自研效率工具；打造筛选 Agent 与经过实际检验的 Tested 实测智库；并通过实验室公开全部思考与构建日志。
              </p>
            </div>
          )}

          {activeTab === 'principles' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">
                我的原则
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                真实使用、客观记录踩坑证据、不夸大功能、尊重用户隐私。长期主义与信誉资产永远高于短期噱头。
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 1:1 Dark Section 2: "关于我" matching image.png (6. 关于页面 About) */}
      <section className="bg-[#090d16] text-white py-14 border-t border-slate-800">
        <div className="mx-auto max-w-4xl px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Image of desk with open laptop */}
            <div className="md:col-span-6 overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-950">
              <img
                src="/src/assets/images/quinnverse_home_bg_1790971384808.jpg"
                alt="Maker Studio"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right text */}
            <div className="md:col-span-6 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                关于我
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                你好，我是启云。
              </p>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                一个喜欢做东西、喜欢尝试新工具，也喜欢记录过程的独立开发者。
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('contact')}
                  className="rounded-xl border border-slate-600 bg-slate-900/80 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-slate-800 hover:border-slate-500 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>了解更多 →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
