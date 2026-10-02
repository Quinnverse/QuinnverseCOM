import React from 'react';
import { ShieldCheck, Wrench, Search, FlaskConical, BookOpen } from 'lucide-react';
import { Link } from '../utils/router';
import { SITE_SETTINGS } from '../data/database';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-16 sm:py-24 bg-[#F8FAFC] text-left">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-200 pb-8">
          <div className="inline-block text-xs font-bold font-mono tracking-wider uppercase text-blue-700 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full">
            INDEPENDENT PRODUCT STUDIO
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black text-slate-950 tracking-tight">
            About Quinnverse
          </h1>
          <p className="text-xl sm:text-2xl text-slate-800 leading-relaxed font-bold">
            Find better tools. Build what’s missing.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            发现真正好用的工具。找不到合适的，就自己做一个。
          </p>
        </div>

        {/* 1. What is Quinnverse? */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
            01 / WHAT IS QUINNVERSE?
          </h2>
          <div className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-9 text-sm text-slate-700 leading-relaxed space-y-3 shadow-xs">
            <p>
              Quinnverse 是一个围绕「发现问题 → 找到工具 → 做出工具」自然生长的个人产品工作室。
            </p>
            <p>
              它不是一家追求包装融资故事或团队规模扩张的传统外包公司，而是一个由长期从事技术构建的独立创作者运营的软件工坊。这里没有层层汇报的官僚流程，只关注软件是否能在真实世界中解决具体麻烦。
            </p>
          </div>
        </div>

        {/* 2. The Core Philosophy */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
            02 / THE CORE PHILOSOPHY 核心理念
          </h2>
          <div className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-9 space-y-4 shadow-xs">
            <div className="font-display text-2xl font-extrabold text-slate-950">
              “Find better tools. Build what's missing.”
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              在这个数字工具严重过载的时代，找到真正趁手的工具极其耗费心力。Quinnverse 的第一步是客观测试并筛选出真正能提升效率的软件；如果经过深度探索后发现市面上确实没有满意的方案，Quinnverse 就会亲自下场把它做成可以稳定交付的产品。
            </p>
          </div>
        </div>

        {/* 3. The Four-Step Flywheel */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
            03 / THE ENGINE 运转机制
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 space-y-2 shadow-2xs">
              <div className="text-xs font-mono font-bold text-blue-700 uppercase">DISCOVER (发现)</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                直面真实开发、办公与生活里真实卡住人的痛点，寻找市面上现有的可能解法。
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 space-y-2 shadow-2xs">
              <div className="text-xs font-mono font-bold text-emerald-700 uppercase">TEST (实测)</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                不用官方公关文案充数，亲自放到高频生产流中检验，记录下真实的优点、局限与避坑。
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 space-y-2 shadow-2xs">
              <div className="text-xs font-mono font-bold text-amber-700 uppercase">BUILD (自研)</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                对于现有工具无法妥善解决的卡点，基于确定性工程原则构建轻量而纯净的独立软件。
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/90 bg-white p-6 space-y-2 shadow-2xs">
              <div className="text-xs font-mono font-bold text-purple-700 uppercase">SHARE (沉淀)</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                把踩过的坑、沉淀的方法、速查手册与打磨成熟的工具公开交付给需要的用户。
              </p>
            </div>
          </div>
        </div>

        {/* 4. Commercial Transparency & Affiliate Policy */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">
            04 / COMMERCIAL TRANSPARENCY 商业中立性准则
          </h2>
          <div className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-9 text-sm text-slate-700 leading-relaxed space-y-3 shadow-xs">
            <p>
              Quinnverse 绝不出售 Picks 工具库的收录席位与推荐排名。
            </p>
            <p>
              部分第三方工具链接可能包含推广返佣（Affiliate / Referral），这些微薄收益将全部用于支持本站服务器与下一代自研产品的研发。无论是否存在商业返佣，该工具在实测中暴露出的一切缺陷、费用与网络限制，均会如实披露在页面上。
            </p>
            <div className="pt-2">
              <Link to="/disclosure" className="text-xs font-bold text-slate-900 hover:text-blue-600 underline">
                阅读完整商业透明度政策 →
              </Link>
            </div>
          </div>
        </div>

        {/* 5. Legal & Identity */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            05 / LEGAL & FOOTPRINT 主体说明
          </h2>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-xs text-slate-600 space-y-2 shadow-2xs">
            <p>本站主体性质为个人非经营性网站与独立产品工作室。</p>
            <p>
              工业和信息化部域名信息备案号：
              <span className="font-mono text-slate-900 font-bold ml-1">{SITE_SETTINGS.icpNumber}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
