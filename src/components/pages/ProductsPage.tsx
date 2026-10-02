import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Language, ProductItem } from '../../types';

interface ProductsPageProps {
  onNavigate: (tab: string, productId?: string) => void;
  lang: Language;
  products: ProductItem[];
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onNavigate,
  lang,
  products,
}) => {
  const [filter, setFilter] = useState<'all' | 'flagship' | 'micro' | 'experimental'>('all');
  const isZh = lang === 'zh';

  const productList = products.map((p) => {
    let tags = ['产品'];
    if (p.slug === 'job-application-copilot') tags = ['出海求职', 'ATS优化', '求职信生成'];
    else if (p.slug === 'tool-finder-agent') tags = ['AI工具', '智能推荐', '实测数据库'];
    else if (p.slug === 'dev-quick-ship') tags = ['出海开发', 'Stripe计费', '全栈脚手架'];
    else if (p.slug === 'content-remix-flow') tags = ['自媒体', '小红书', '工作流'];
    else if (p.slug === 'ats-resume-scanner') tags = ['本地隐私', 'ATS检测', '零数据上传'];
    else tags = ['效率工具', '实验产品'];

    return {
      id: p.slug,
      title: isZh ? p.title : p.titleEn || p.title,
      subtitle: isZh ? p.subtitle : p.subtitleEn || p.subtitle,
      tags,
      image: p.coverImage || '/src/assets/images/product_copilot_preview_1790970754120.jpg',
      category: p.category,
    };
  });

  const filtered = productList.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'flagship') return p.category === 'flagship';
    if (filter === 'micro') return p.category === 'micro' || p.category === 'experimental';
    if (filter === 'experimental') return p.category === 'experimental' || p.category === 'micro';
    return true;
  });

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900">
      {/* 1:1 Dark Top Hero matching image.png (2. 产品页 Products) */}
      <section className="relative overflow-hidden bg-[#090d16] text-white pt-24 pb-14 sm:pt-28 sm:pb-16 border-b border-slate-800">
        <div className="mx-auto max-w-5xl px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left text */}
            <div className="md:col-span-6 space-y-3">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                产品
              </h1>
              <p className="text-base sm:text-lg text-slate-300 font-normal">
                从真实问题出发，做有用的产品。
              </p>
            </div>

            {/* Right preview mockup */}
            <div className="md:col-span-6 flex justify-end">
              <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900 shadow-2xl">
                <img
                  src="/src/assets/images/product_copilot_preview_1790970754120.jpg"
                  alt="Products Showcase"
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1:1 White Bottom Content Section matching image.png */}
      <section className="mx-auto max-w-4xl px-6 sm:px-8 py-10">
        {/* Category Tabs */}
        <div className="flex items-center gap-8 border-b border-slate-200 pb-3 text-sm font-medium">
          <button
            onClick={() => setFilter('all')}
            className={`relative pb-3 transition-colors ${
              filter === 'all'
                ? 'text-blue-600 font-bold after:absolute after:bottom-[-13px] after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            全部产品
          </button>
          <button
            onClick={() => setFilter('flagship')}
            className={`relative pb-3 transition-colors ${
              filter === 'flagship'
                ? 'text-blue-600 font-bold after:absolute after:bottom-[-13px] after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            正式产品
          </button>
          <button
            onClick={() => setFilter('micro')}
            className={`relative pb-3 transition-colors ${
              filter === 'micro'
                ? 'text-blue-600 font-bold after:absolute after:bottom-[-13px] after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            小型工具
          </button>
          <button
            onClick={() => setFilter('all')}
            className="text-slate-500 hover:text-slate-800 pb-3"
          >
            实验产品
          </button>
        </div>

        {/* Vertical Product Cards List matching image.png 1:1 */}
        <div className="mt-8 space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate('product-copilot', item.id)}
              className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-300 hover:shadow-md transition-all flex items-center justify-between gap-5"
            >
              <div className="flex items-center gap-5">
                {/* Thumbnail */}
                <div className="h-18 w-18 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-xl bg-slate-900 border border-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-normal">
                    {item.subtitle}
                  </p>
                  <div className="flex items-center gap-2 pt-0.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
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

        {/* Bottom Banner matching image.png 1:1 */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 via-white to-blue-50/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 max-w-md">
            <h4 className="text-lg font-bold text-slate-900">
              有想要的工具或场景？
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              我们也在探索新的产品方向。
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-1.5 pt-2 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              <span>欢迎联系我 →</span>
            </button>
          </div>

          <div className="w-48 h-28 shrink-0 overflow-hidden rounded-xl border border-slate-200">
            <img
              src="/src/assets/images/hero_workspace_cosmic_1790970739935.jpg"
              alt="Contact Studio"
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
