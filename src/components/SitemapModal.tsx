import React, { useState } from 'react';
import { X, Network, Workflow, Database, ArrowRight, ExternalLink, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
  lang: Language;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  lang,
}) => {
  const [activeView, setActiveView] = useState<'sitemap' | 'flows' | 'datamodel'>('sitemap');
  const isZh = lang === 'zh';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 bg-[#0d131f] p-6 text-slate-200 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Network className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {isZh ? 'Quinnverse 架构全景与走查' : 'Quinnverse Architecture & Flow Inspector'}
              </h3>
              <p className="text-xs text-slate-400">
                {isZh
                  ? '对应产品架构设计图：信息架构 (Sitemap) · 3大核心用户路径 · CMS 数据模型'
                  : 'Derived from product specification: Sitemap, User Flows & Data Model'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Switcher */}
            <div className="flex items-center gap-1 rounded-lg bg-slate-900/80 p-1 border border-slate-800 text-xs font-medium">
              <button
                onClick={() => setActiveView('sitemap')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                  activeView === 'sitemap' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Network className="h-3.5 w-3.5" />
                <span>1. {isZh ? '信息架构 (Sitemap)' : 'Sitemap'}</span>
              </button>
              <button
                onClick={() => setActiveView('flows')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                  activeView === 'flows' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Workflow className="h-3.5 w-3.5" />
                <span>2. {isZh ? '主要用户路径 (Flows)' : 'User Flows'}</span>
              </button>
              <button
                onClick={() => setActiveView('datamodel')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                  activeView === 'datamodel' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Database className="h-3.5 w-3.5" />
                <span>3. {isZh ? '内容管理 (CMS)' : 'Data Model'}</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* View 1: Sitemap */}
        {activeView === 'sitemap' && (
          <div className="mt-6 space-y-6">
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
              <div className="text-center font-bold text-white mb-6">
                <span className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-950/40 text-blue-300 text-sm">
                  Quinnverse 独立产品工作室
                </span>
              </div>

              {/* Tree Columns */}
              <div className="grid grid-cols-1 md:grid-cols-6 gap-3 text-xs">
                {/* 1. 首页 */}
                <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3 hover:border-slate-700 transition-colors">
                  <div className="font-semibold text-blue-400 mb-2 flex items-center justify-between">
                    <span>首页</span>
                    <button
                      onClick={() => {
                        onNavigate('home');
                        onClose();
                      }}
                      className="text-slate-400 hover:text-white"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <ul className="space-y-1 text-slate-400">
                    <li>· 中文 (/zh)</li>
                    <li>· English (/en)</li>
                    <li>· 品牌与使命</li>
                    <li>· 三大入口卡片</li>
                    <li>· 信任指标</li>
                  </ul>
                </div>

                {/* 2. 产品 */}
                <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3 hover:border-slate-700 transition-colors">
                  <div className="font-semibold text-indigo-400 mb-2 flex items-center justify-between">
                    <span>产品 (Products)</span>
                    <button
                      onClick={() => {
                        onNavigate('products');
                        onClose();
                      }}
                      className="text-slate-400 hover:text-white"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <ul className="space-y-1 text-slate-400">
                    <li
                      onClick={() => {
                        onNavigate('product-copilot');
                        onClose();
                      }}
                      className="hover:text-blue-300 cursor-pointer font-medium text-slate-300"
                    >
                      → Job Application Copilot
                    </li>
                    <li
                      onClick={() => {
                        onNavigate('agent');
                        onClose();
                      }}
                      className="hover:text-blue-300 cursor-pointer text-slate-300"
                    >
                      → 工具筛选 Agent
                    </li>
                    <li>· 其他正式产品</li>
                    <li>· 小型工具 / 实验产品</li>
                  </ul>
                </div>

                {/* 3. 实测 */}
                <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3 hover:border-slate-700 transition-colors">
                  <div className="font-semibold text-emerald-400 mb-2 flex items-center justify-between">
                    <span>实测 (Tested)</span>
                    <button
                      onClick={() => {
                        onNavigate('tested');
                        onClose();
                      }}
                      className="text-slate-400 hover:text-white"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <ul className="space-y-1 text-slate-400">
                    <li>· 工具库 (9大分类)</li>
                    <li>· 技能 / Skills</li>
                    <li>· 工作流 / Workflows</li>
                    <li>· 场景方案</li>
                    <li>· Quinnverse 精选</li>
                  </ul>
                </div>

                {/* 4. 实验室 */}
                <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3 hover:border-slate-700 transition-colors">
                  <div className="font-semibold text-amber-400 mb-2 flex items-center justify-between">
                    <span>实验室 (Lab)</span>
                    <button
                      onClick={() => {
                        onNavigate('lab');
                        onClose();
                      }}
                      className="text-slate-400 hover:text-white"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <ul className="space-y-1 text-slate-400">
                    <li>· 我又做了个东西</li>
                    <li>· 构建日志 (Build Log)</li>
                    <li>· 实验项目</li>
                    <li>· 方法 / 教程</li>
                    <li>· 手记 / 观点</li>
                  </ul>
                </div>

                {/* 5. 关于 */}
                <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3 hover:border-slate-700 transition-colors">
                  <div className="font-semibold text-cyan-400 mb-2 flex items-center justify-between">
                    <span>关于 (About)</span>
                    <button
                      onClick={() => {
                        onNavigate('about');
                        onClose();
                      }}
                      className="text-slate-400 hover:text-white"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <ul className="space-y-1 text-slate-400">
                    <li>· Quinnverse 是什么</li>
                    <li>· 为什么建立</li>
                    <li>· 关于我 (启云)</li>
                    <li>· 我的作品 / 经历</li>
                    <li>· 核心设计原则</li>
                  </ul>
                </div>

                {/* 6. 合作 */}
                <div className="rounded-lg border border-slate-800 bg-slate-900/80 p-3 hover:border-slate-700 transition-colors">
                  <div className="font-semibold text-rose-400 mb-2 flex items-center justify-between">
                    <span>合作 (Contact)</span>
                    <button
                      onClick={() => {
                        onNavigate('contact');
                        onClose();
                      }}
                      className="text-slate-400 hover:text-white"
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <ul className="space-y-1 text-slate-400">
                    <li>· 产品 / 技术合作</li>
                    <li>· 工具实测 / 收录</li>
                    <li>· 渠道 / 内容合作</li>
                    <li>· 在线留言 & 联系方式</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View 2: User Flows */}
        {activeView === 'flows' && (
          <div className="mt-6 space-y-4">
            {/* Flow A */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-400 mb-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500/20 text-xs">A</span>
                <span>了解并使用自研产品 (Path A)</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200">进入首页</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
                <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200">浏览产品页</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
                <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200">查看产品详情 (Copilot)</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
                <span className="px-3 py-1.5 rounded-lg bg-blue-600/30 border border-blue-500/40 text-blue-300 font-medium">使用 / 下载 / 交互体验</span>
              </div>
            </div>

            {/* Flow B */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400 mb-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-xs">B</span>
                <span>找到合适工具 (Path B: Agent × 实测智库)</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200">进入首页</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
                <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200">工具筛选 Agent (描述问题)</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
                <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200">获得推荐结果 (匹配实测库)</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
                <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200">查看实测报告 / 证据</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
                <span className="px-3 py-1.5 rounded-lg bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-medium">前往使用 (官网 / 渠道链接)</span>
              </div>
            </div>

            {/* Flow C */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-amber-400 mb-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-xs">C</span>
                <span>阅读内容，了解 Quinnverse 独立开发逻辑 (Path C)</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200">进入首页</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
                <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200">实验室 (Lab 文章 / 构建日志)</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
                <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200">深度阅读 (反思、踩坑、实验)</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-500" />
                <span className="px-3 py-1.5 rounded-lg bg-amber-600/30 border border-amber-500/40 text-amber-300 font-medium">进一步了解我 / 开启合作</span>
              </div>
            </div>
          </div>
        )}

        {/* View 3: Data Model & CMS */}
        {activeView === 'datamodel' && (
          <div className="mt-6 space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                <h4 className="font-semibold text-slate-200 mb-2 flex items-center gap-2">
                  <Database className="h-4 w-4 text-blue-400" />
                  <span>主要内容模型 (Content Collections)</span>
                </h4>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    <strong>产品 (Products)</strong>: Job Application Copilot, Agent, 小型工具
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <strong>工具 (Tools)</strong>: Gamma, Notion AI, Midjourney, Cursor, Claude...
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <strong>文章 (Posts)</strong>: 构建日志、产品实验、方法教程、手记
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                    <strong>合作与消息 (Inquiries)</strong>: 外部合作与实测收录意向
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-4">
                <h4 className="font-semibold text-slate-200 mb-2">每项工具 (Tools) 的核心实测字段</h4>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                  <div>· 名称 (中/英)</div>
                  <div>· 简介 (中/英)</div>
                  <div>· 分类 / 场景标签</div>
                  <div>· 功能核心特点 (4项)</div>
                  <div>· 适合人群 / 不适合人群</div>
                  <div>· 实测深度体验 (踩坑证据)</div>
                  <div>· 评分 (0~5.0)</div>
                  <div>· 价格 / 免费版额度</div>
                  <div>· 国内可用性 (是/否/部分)</div>
                  <div>· 中文支持 (全面/部分/无)</div>
                  <div>· 官网链接 / 渠道链接</div>
                  <div>· 状态 (已发布/草稿/待测)</div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-blue-500/20 bg-blue-950/20 p-3 text-blue-300 flex items-center justify-between">
              <span>
                💡 想要自己手动添加或编辑工具、产品、文章？点击右上角的「工作室后台」即可直接体验！
              </span>
              <button
                onClick={() => {
                  onNavigate('studio');
                  onClose();
                }}
                className="px-3 py-1 rounded bg-blue-600 text-white font-medium hover:bg-blue-500 text-xs whitespace-nowrap"
              >
                前往后台 (Studio)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
