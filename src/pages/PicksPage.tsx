import React, { useState, useMemo } from 'react';
import { Search, ArrowRight, Star, MapPin } from 'lucide-react';
import { Link } from '../utils/router';
import { PICKS } from '../data/database';

export const PicksPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const categories = ['all', '编程开发', '效率自动化', '知识与笔记', 'AI Agent', '设计视觉', '基础模型'];
  const levels: { label: string; value: string }[] = [
    { label: '全部证据等级', value: 'all' },
    { label: '日常主力 (Daily Driver)', value: 'DAILY DRIVER' },
    { label: '项目实战 (Used in Project)', value: 'USED IN PROJECT' },
    { label: '场景实测 (Tested)', value: 'TESTED' },
    { label: '待复核 (Needs Confirmation)', value: 'NEEDS CONFIRMATION' },
  ];

  // Map each pick to a rich high-res image
  const pickImages: Record<string, string> = {
    cursor: '/src/assets/images/card_code_craft_1790959868969.jpg',
    n8n: '/src/assets/images/card_sunset_architecture_1790959809823.jpg',
    obsidian: '/src/assets/images/card_snow_mountain_1790959826707.jpg',
    dify: '/src/assets/images/card_nature_waterfall_1790959793831.jpg',
    comfyui: '/src/assets/images/card_tropical_beach_1790959840986.jpg',
    gemini: '/src/assets/images/hero_studio_showcase_1790959723676.jpg',
  };

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
    <div className="py-16 sm:py-24 bg-[#F8FAFC] text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-block text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full">
            精选深度实测库
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black text-slate-950 tracking-tight">
            Quinnverse Picks
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            真的用过，才会推荐。每一款收录工具都包含我们在真实项目中的使用证据与明确的局限。拒绝五星好评，拒绝付费购买收录席位。
          </p>
        </div>

        {/* Finder Quick Diagnostic Banner */}
        <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md">
          <div className="space-y-1.5">
            <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider">需求诊断筛选器</span>
            <h3 className="text-xl font-bold text-slate-950">面对工具不知如何选？用诊断器做排除法。</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              通过 4 道确定性过滤题（任务目标、技术要求、国内直连与预算），精准推荐 2~3 个经过实测的工具。
            </p>
          </div>
          <Link
            to="/finder"
            className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-blue-600 rounded-full whitespace-nowrap shadow-sm transition-all"
          >
            打开需求诊断器 →
          </Link>
        </div>

        {/* Controls: Search & Category & Evidence Filter */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索工具名称、实测结论或应用场景..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-10 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none shadow-2xs font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-800"
                >
                  清空
                </button>
              )}
            </div>

            {/* Evidence Level Select */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-sm font-bold text-slate-800 focus:border-slate-900 focus:outline-none shadow-2xs"
            >
              {levels.map((lvl) => (
                <option key={lvl.value} value={lvl.value}>
                  {lvl.label}
                </option>
              ))}
            </select>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-2xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {cat === 'all' ? '全部领域' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Picks Grid with High-Res Image Header for Every Card */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-200 pb-3">
            <span className="font-bold text-slate-900">找到 {filteredPicks.length} 款符合条件的实测工具</span>
            <span className="font-mono text-[11px]">证据等级体系驱动 · 零虚假推荐</span>
          </div>

          {filteredPicks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPicks.map((pick) => {
                const imgUrl = pickImages[pick.slug] || '/src/assets/images/card_code_craft_1790959868969.jpg';
                const badgeText =
                  pick.evidenceLevel === 'DAILY DRIVER' ? '日常主力' :
                  pick.evidenceLevel === 'USED IN PROJECT' ? '项目实操' :
                  pick.evidenceLevel === 'TESTED' ? '场景实测' : '待复核';

                return (
                  <div
                    key={pick.id}
                    className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-2xs hover:shadow-xl transition-all flex flex-col justify-between group"
                  >
                    {/* Top high-res image */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                      <img
                        src={imgUrl}
                        alt={pick.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-slate-900 shadow-xs">
                        {badgeText} ({pick.evidenceLevel})
                      </div>
                      <div className="absolute bottom-3 left-3 text-white text-xs drop-shadow-md font-semibold flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-400" />
                        <span>{pick.category}</span>
                      </div>
                    </div>

                    <div className="p-6 space-y-3.5 flex-1">
                      <h3 className="font-display text-2xl font-bold text-slate-950">
                        {pick.name}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {pick.summary}
                      </p>

                      <div className="pt-2 border-t border-slate-100 text-xs">
                        <span className="text-slate-900 font-bold text-[11px] uppercase tracking-wider">实测结论：</span>
                        <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                          {pick.whatWeFound}
                        </p>
                      </div>

                      <div className="pt-2 text-[11px] text-slate-500 font-medium flex items-center justify-between">
                        <span>直连: {pick.pricingAccess.accessFromChina}</span>
                        <span>{pick.pricingAccess.pricingModel.split(' ')[0]}</span>
                      </div>
                    </div>

                    <div className="p-6 pt-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>★ 5.0 (实测已验)</span>
                      </div>

                      <Link
                        to={`/picks/${pick.slug}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-2xs"
                      >
                        <span>查看实测与避坑</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center text-slate-500 rounded-3xl border border-slate-200 bg-white p-8 space-y-2">
              <p className="text-slate-900 font-bold text-base">未找到匹配的实测工具</p>
              <p className="text-xs text-slate-500">
                可尝试清除筛选条件，或使用顶部的需求诊断器进行意图排查。
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
