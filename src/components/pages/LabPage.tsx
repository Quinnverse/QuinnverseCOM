import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { Language, LabPost } from '../../types';

interface LabPageProps {
  onNavigate: (tab: string, productId?: string) => void;
  lang: Language;
  labPosts: LabPost[];
  selectedPostModal: LabPost | null;
  onOpenPostModal: (post: LabPost) => void;
  onClosePostModal: () => void;
}

export const LabPage: React.FC<LabPageProps> = ({
  onNavigate,
  lang,
  labPosts,
  selectedPostModal,
  onOpenPostModal,
  onClosePostModal,
}) => {
  const isZh = lang === 'zh';
  const [selectedPill, setSelectedPill] = useState('全部');

  const pills = ['全部', '构建日志', '产品实验', '方法教程', '手记观点'];

  const posts = [
    {
      id: 'why-built-job-copilot',
      tag: '构建日志',
      title: '我为什么把网申助手从 0 做到现在的版本',
      date: '2024.12.10',
      image: '/src/assets/images/lab_creator_workspace_1790970765025.jpg',
      content:
        '记录我在海外求职海投过程中遇到的真实绝望：ATS 系统的冷酷、大模型生成简历的假大空，以及一个真正能帮求职者拿到面试的工具该长什么样。核心原则：绝不虚构、精准对齐岗位事实、本地隐私加密。',
      relatedProductId: 'job-application-copilot',
    },
    {
      id: 'agent-finds-tools-experiment',
      tag: '产品实验',
      title: '我试着让 Agent 替我找 AI 工具',
      date: '2024.12.05',
      image: '/src/assets/images/quinnverse_home_bg_1790971384808.jpg',
      content:
        '为什么我不再相信传统的 AI 工具导航站？把经过人工深测的数据注入 Agent，它给出的建议到底能不能用？这是我做筛选 Agent 的全过程思考。',
      relatedProductId: 'tool-finder-agent',
    },
    {
      id: 'rapid-mvp-with-ai',
      tag: '方法教程',
      title: '如何用 AI 快速做一个可用的 MVP',
      date: '2024.12.01',
      image: '/src/assets/images/about_mountains_calm_1790970774868.jpg',
      content:
        '脱离玩具 Demo 的陷阱。从架构分层、状态管理到真实交付，独立开发者在 AI 时代的敏捷交付手册。克制是打造生产级产品的第一原则。',
      relatedProductId: 'other-products',
    },
  ];

  const filteredPosts = posts.filter((p) => {
    if (selectedPill === '全部') return true;
    return p.tag === selectedPill;
  });

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900">
      {/* 1:1 Dark Top Hero matching image.png (5. 实验室页面 Lab) */}
      <section className="relative overflow-hidden bg-[#090d16] text-white pt-24 pb-14 sm:pt-28 sm:pb-16 border-b border-slate-800">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left text */}
            <div className="md:col-span-6 space-y-3">
              <span className="inline-block rounded-md bg-blue-950/80 px-2.5 py-1 text-xs font-bold text-blue-400 border border-blue-500/30">
                LAB
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                我又做了个东西。
              </h1>
              <p className="text-base sm:text-lg text-slate-300 font-normal">
                记录一个独立产品工作室的实验、构建和思考。
              </p>
            </div>

            {/* Right preview image */}
            <div className="md:col-span-6 flex justify-end">
              <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900 shadow-2xl">
                <img
                  src="/src/assets/images/lab_creator_workspace_1790970765025.jpg"
                  alt="Lab Workspace"
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1:1 White Bottom Section matching image.png (5. 实验室页面 Lab) */}
      <section className="mx-auto max-w-4xl px-6 sm:px-8 py-10 space-y-8">
        {/* Category Pills Row matching image.png 1:1 */}
        <div className="flex flex-wrap items-center gap-2">
          {pills.map((pill) => (
            <button
              key={pill}
              onClick={() => setSelectedPill(pill)}
              className={`rounded-xl px-4 py-1.5 text-xs font-medium transition-all ${
                selectedPill === pill
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Article Cards List matching image.png 1:1 */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() =>
                onOpenPostModal({
                  id: post.id,
                  slug: post.id,
                  title: post.title,
                  titleEn: post.title,
                  excerpt: post.content,
                  excerptEn: post.content,
                  content: post.content,
                  contentEn: post.content,
                  category: 'build_log',
                  categoryLabelZh: post.tag,
                  categoryLabelEn: post.tag,
                  date: post.date,
                  readTime: '6 分钟',
                  coverImage: post.image,
                  relatedProductId: post.relatedProductId,
                })
              }
              className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 flex items-center justify-between gap-5 hover:border-slate-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4 sm:gap-6">
                {/* Left Thumbnail */}
                <div className="h-20 w-28 sm:h-24 sm:w-36 shrink-0 overflow-hidden rounded-xl bg-slate-900 border border-slate-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Right Content */}
                <div className="space-y-1.5">
                  <span className="inline-block rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                    {post.tag}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <div className="text-xs text-slate-400 font-mono">
                    {post.date}
                  </div>
                </div>
              </div>

              {/* Right Arrow */}
              <div className="text-slate-400 group-hover:text-blue-600 transition-colors pr-2">
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Link matching image.png 1:1 */}
        <div className="text-center pt-4">
          <button
            onClick={() => setSelectedPill('全部')}
            className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-600 inline-flex items-center gap-1.5 transition-colors"
          >
            <span>查看更多文章 →</span>
          </button>
        </div>

        {/* Reader Modal */}
        {selectedPostModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 bg-white p-6 sm:p-8 text-slate-800 shadow-2xl">
              <button
                onClick={onClosePostModal}
                className="absolute right-5 top-5 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-800"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <span className="rounded bg-slate-100 px-2 py-0.5 font-medium text-slate-700">
                  {selectedPostModal.categoryLabelZh}
                </span>
                <span>·</span>
                <span>{selectedPostModal.date}</span>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 leading-snug mb-4">
                {selectedPostModal.title}
              </h2>

              <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">
                {selectedPostModal.content}
              </p>

              {/* Link back to product */}
              {selectedPostModal.relatedProductId && (
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">本手记关联的自研工具：</span>
                  <button
                    onClick={() => {
                      onClosePostModal();
                      onNavigate('product-copilot', selectedPostModal.relatedProductId);
                    }}
                    className="font-semibold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span>查看产品详情 →</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
