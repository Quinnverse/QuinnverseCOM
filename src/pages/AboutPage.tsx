import React from 'react';
import { ShieldCheck, Wrench, Search, FlaskConical, BookOpen } from 'lucide-react';
import { Link } from '../utils/router';
import { SITE_SETTINGS } from '../data/database';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-16 sm:py-20 bg-[#080B12] text-left">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="text-xs font-mono font-semibold text-cyan-400 tracking-wider">
            INDEPENDENT PRODUCT STUDIO
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            About Quinnverse
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-semibold">
            Find better tools. Build what’s missing.
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            发现真正好用的工具。找不到合适的，就自己做一个。
          </p>
        </div>

        {/* 1. What is Quinnverse? */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            01 / WHAT IS QUINNVERSE?
          </h2>
          <div className="rounded-2xl border border-slate-800 bg-[#0C1220] p-6 sm:p-8 text-sm text-slate-300 leading-relaxed space-y-3">
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
          <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            02 / THE CORE PHILOSOPHY 核心理念
          </h2>
          <div className="rounded-2xl border border-slate-800 bg-[#0C1220] p-6 sm:p-8 space-y-4">
            <div className="font-display text-xl font-bold text-white">
              “Find better tools. Build what's missing.”
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              在这个数字工具严重过载的时代，找到真正趁手的工具极其耗费心力。Quinnverse 的第一步是客观测试并筛选出真正能提升效率的软件；如果经过深度探索后发现市面上确实没有满意的方案，Quinnverse 就会亲自下场把它做成可以稳定交付的产品。
            </p>
          </div>
        </div>

        {/* 3. The Four-Step Flywheel */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            03 / THE ENGINE 运转机制
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-800 bg-[#0C1220] p-5 space-y-2">
              <div className="text-xs font-mono font-bold text-cyan-400">DISCOVER (发现)</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                直面真实开发、办公与生活里真实卡住人的痛点，寻找市面上现有的可能解法。
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-[#0C1220] p-5 space-y-2">
              <div className="text-xs font-mono font-bold text-emerald-400">TEST (实测)</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                不用官方公关文案充数，亲自放到高频生产流中检验，记录下真实的优点、局限与避坑。
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-[#0C1220] p-5 space-y-2">
              <div className="text-xs font-mono font-bold text-amber-400">BUILD (自研)</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                对于现有工具无法妥善解决的卡点，基于确定性工程原则构建轻量而纯净的独立软件。
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-[#0C1220] p-5 space-y-2">
              <div className="text-xs font-mono font-bold text-sky-400">SHARE (沉淀)</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                把踩过的坑、沉淀的方法、速查手册与打磨成熟的工具公开交付给需要的用户。
              </p>
            </div>
          </div>
        </div>

        {/* 4. Commercial Transparency & Affiliate Policy */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            04 / COMMERCIAL TRANSPARENCY 商业中立性准则
          </h2>
          <div className="rounded-2xl border border-slate-800 bg-[#0C1220] p-6 sm:p-8 text-sm text-slate-300 leading-relaxed space-y-3">
            <p>
              Quinnverse 绝不出售 Picks 工具库的收录席位与推荐排名。
            </p>
            <p>
              部分第三方工具链接可能包含推广返佣（Affiliate / Referral），这些微薄收益将全部用于支持本站服务器与下一代自研产品的研发。无论是否存在商业返佣，该工具在实测中暴露出的一切缺陷、费用与网络限制，均会如实披露在页面上。
            </p>
            <div className="pt-2">
              <Link to="/disclosure" className="text-xs font-semibold text-cyan-400 hover:text-cyan-300">
                阅读完整商业透明度政策 →
              </Link>
            </div>
          </div>
        </div>

        {/* 5. Legal & Identity */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
            05 / LEGAL & FOOTPRINT 主体说明
          </h2>
          <div className="rounded-2xl border border-slate-800 bg-[#090D17] p-6 text-xs text-slate-400 space-y-2">
            <p>本站主体性质为个人非经营性网站与独立产品工作室。</p>
            <p>
              工业和信息化部域名信息备案号：
              <span className="font-mono text-slate-300 font-semibold ml-1">{SITE_SETTINGS.icpNumber}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
