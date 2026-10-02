import React, { useState, useMemo } from 'react';
import { Search, ArrowRight, ShieldCheck, Filter, ArrowUpRight } from 'lucide-react';
import { Link } from '../utils/router';
import { PICKS } from '../data/database';
import { EvidenceLevel } from '../types';

export const PicksPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const categories = ['all', '编程开发', '效率自动化', '知识与笔记', 'AI Agent', '设计视觉', '基础模型'];
  const levels: { label: string; value: string }[] = [
    { label: '全部证据等级', value: 'all' },
    { label: 'DAILY DRIVER (高频日常主力)', value: 'DAILY DRIVER' },
    { label: 'USED IN PROJECT (真实项目验证)', value: 'USED IN PROJECT' },
    { label: 'TESTED (场景系统测试)', value: 'TESTED' },
    { label: 'NEEDS CONFIRMATION (待复核)', value: 'NEEDS CONFIRMATION' },
  ];

  const filteredPicks = useMemo(() => {
    return PICKS.filter((pick) => {
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        pick.name.toLowerCase().includes(q) ||
        pick.summary.toLowerCase().includes(q) ||
        pick.whatWeFound.toLowerCase().includes(q) ||
        pick.category.toLowerCase().includes(q);

      const matchCategory = selectedCategory === 'all' || pick.category === selectedCategory;
      const matchLevel = selectedLevel === 'all' || pick.evidenceLevel === selectedLevel;

      return matchQuery && matchCategory && matchLevel;
    });
  }, [searchQuery, selectedCategory, selectedLevel]);

  return (
    <div className="py-16 sm:py-20 bg-[#080B12] text-left">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-mono font-semibold text-emerald-400 tracking-wider">
            TESTED & RECOMMENDED
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            Quinnverse Picks
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            真的用过，才会推荐。每一款收录工具都包含我们在真实项目中的使用证据与明确的局限。拒绝五星好评，拒绝付费购买收录席位。
          </p>
        </div>

        {/* Finder Quick Diagnostic Banner */}
        <div className="rounded-2xl border border-cyan-900/50 bg-[#0C1424] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-cyan-300">QUINNVERSE FINDER</span>
            <h3 className="text-base font-bold text-white">面对工具不知如何选？用诊断器做排除法。</h3>
            <p className="text-xs text-slate-400">
              通过 4 道确定性过滤题（任务目标、技术要求、国内直连与预算），精准推荐 2~3 个经过实测的工具。
            </p>
          </div>
          <Link
            to="/finder"
            className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg whitespace-nowrap shadow-sm"
          >
            打开 Finder 需求诊断 →
          </Link>
        </div>

        {/* Controls: Search & Category & Evidence Filter */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索工具名称、实测结论或应用场景..."
                className="w-full rounded-xl border border-slate-700/80 bg-[#0C1220] py-2.5 pl-10 pr-10 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  清空
                </button>
              )}
            </div>

            {/* Evidence Level Select */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="rounded-xl border border-slate-700/80 bg-[#0C1220] px-3.5 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none"
            >
              {levels.map((lvl) => (
                <option key={lvl.value} value={lvl.value}>
                  {lvl.label}
                </option>
              ))}
            </select>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/80 border border-slate-800 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-slate-800 text-cyan-300 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat === 'all' ? '全部领域' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Picks Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-800 pb-3">
            <span>找到 {filteredPicks.length} 款符合实测条件的工具</span>
            <span className="font-mono text-[11px]">证据等级体系驱动 · 0 虚假推荐</span>
          </div>

          {filteredPicks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPicks.map((pick) => {
                const badgeColor =
                  pick.evidenceLevel === 'DAILY DRIVER' ? 'text-emerald-400 bg-emerald-950/60 border-emerald-800/50' :
                  pick.evidenceLevel === 'USED IN PROJECT' ? 'text-cyan-400 bg-cyan-950/60 border-cyan-800/50' :
                  pick.evidenceLevel === 'TESTED' ? 'text-amber-400 bg-amber-950/60 border-amber-800/50' :
                  'text-slate-400 bg-slate-900 border-slate-700';

                return (
                  <Link
                    key={pick.id}
                    to={`/picks/${pick.slug}`}
                    className="group rounded-2xl border border-slate-800 bg-[#0C1220] p-6 hover:border-emerald-500/50 hover:bg-[#0E1626] transition-all flex flex-col justify-between shadow-sm"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">{pick.category}</span>
                        <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${badgeColor}`}>
                          {pick.evidenceLevel}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {pick.name}
                      </h3>

                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                        {pick.summary}
                      </p>

                      <div className="pt-2 border-t border-slate-800/80 text-xs">
                        <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">实测结论：</span>
                        <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                          {pick.whatWeFound}
                        </p>
                      </div>

                      <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between">
                        <span>直连: {pick.pricingAccess.accessFromChina}</span>
                        <span>{pick.pricingAccess.pricingModel.split(' ')[0]}</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-400">
                      <span>查看完整实测与避坑 →</span>
                      <span className="text-slate-500 font-mono text-[10px]">Tested: {pick.lastTested}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center text-xs text-slate-400 rounded-2xl border border-slate-800 bg-[#0C1220] p-8 space-y-2">
              <p className="text-white font-medium text-sm">未找到匹配的实测工具</p>
              <p className="text-xs text-slate-500">
                可尝试清除筛选条件，或使用顶部的 Quinnverse Finder 进行意图诊断。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
