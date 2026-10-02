import React, { useState, useMemo } from 'react';
import { Search, ArrowRight, X, Compass } from 'lucide-react';
import { Link } from '../utils/router';
import { PICKS } from '../data/database';
import { getToolMark } from '../data/visuals';

const EVIDENCE_META: Record<string, { zh: string; cls: string }> = {
  'DAILY DRIVER':       { zh: '日常主力', cls: 'chip-ok' },
  'USED IN PROJECT':    { zh: '项目实战', cls: 'chip-brand' },
  'TESTED':             { zh: '场景实测', cls: '' },
  'NEEDS CONFIRMATION': { zh: '待复核',   cls: 'chip-warn' },
};

export const PicksPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [level, setLevel] = useState('all');

  const categories = useMemo(() => {
    const set = new Set(PICKS.map((p) => p.category));
    return ['all', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return PICKS.filter((p) => {
      const hitQ =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.whatWeFound.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      const hitCat = category === 'all' || p.category === category;
      const hitLevel = level === 'all' || p.evidenceLevel === level;
      return hitQ && hitCat && hitLevel;
    });
  }, [query, category, level]);

  const hasFilter = query || category !== 'all' || level !== 'all';

  return (
    <>
      {/* ============ 页头 ============ */}
      <section className="band-sm border-b border-line-soft">
        <div className="container-site">
          <div className="max-w-3xl">
            <span className="chip chip-ok">精选实测库</span>
            <h1 className="mt-6">真的用过，才会推荐</h1>
            <p className="lead mt-6">
              每条评测都写三件事：哪里好用、哪里不够用、什么人不该买。
              不接受付费收录席位与排名购买。
            </p>
          </div>
        </div>
      </section>

      {/* ============ 诊断器入口 ============ */}
      <section className="band-sm">
        <div className="container-site">
          <div className="card flex flex-col gap-6 p-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-5">
              <Compass className="mt-1 h-6 w-6 shrink-0 text-brand-600" strokeWidth={1.75} />
              <div>
                <span className="rail-label">需求诊断器</span>
                <h2 className="mt-2.5 !text-[20px]">不确定该选哪个？先做排除法。</h2>
                <p className="mt-2.5 max-w-xl text-[14px] leading-relaxed text-muted">
                  通过任务目标、技术要求、访问限制和预算四道确定性过滤，把 {PICKS.length} 个工具缩到 2~3 个真正相关的。
                </p>
              </div>
            </div>
            <Link to="/finder" className="btn btn-primary shrink-0">
              打开诊断器
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ 筛选 + 列表 ============ */}
      <section className="band-sm pt-0">
        <div className="container-site">
          {/* 搜索 */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索工具名称、实测结论或场景…"
              className="w-full rounded-card border border-line bg-surface py-3 pl-11 pr-10 text-[14px] text-ink placeholder:text-faint focus:border-ink focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                aria-label="清空搜索"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* 筛选行 */}
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
            {/* 证据等级 */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setLevel('all')}
                className={`chip cursor-pointer transition-colors ${
                  level === 'all' ? 'chip-brand' : 'hover:border-ink hover:text-ink'
                }`}
              >
                全部等级
              </button>
              {Object.entries(EVIDENCE_META).map(([val, meta]) => (
                <button
                  key={val}
                  onClick={() => setLevel(val)}
                  className={`chip cursor-pointer transition-colors ${
                    level === val ? 'chip-brand' : 'hover:border-ink hover:text-ink'
                  }`}
                >
                  {meta.zh}
                </button>
              ))}
            </div>

            {/* 分类下拉 */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="ml-auto rounded-chip border border-line bg-surface px-3 py-1.5 text-[13px] text-ink focus:border-ink focus:outline-none cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'all' ? '全部领域' : c}
                </option>
              ))}
            </select>
          </div>

          {/* 结果计数 */}
          <div className="mt-8 flex items-baseline justify-between border-b border-line pb-3">
            <span className="text-[13px] text-muted">
              找到 <strong className="font-semibold text-ink">{filtered.length}</strong> 个工具
            </span>
            <span className="data text-faint">按证据等级排序，无付费推荐</span>
          </div>

          {/* 卡片 */}
          {filtered.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((pick) => {
                const mark = getToolMark(pick.slug);
                const meta = EVIDENCE_META[pick.evidenceLevel] ?? { zh: pick.evidenceLevel, cls: '' };
                return (
                  <article key={pick.id} className="card card-hover flex flex-col">
                    <Link to={`/picks/${pick.slug}`} className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-3.5">
                        <div
                          className="tool-mark h-12 w-12 shrink-0 text-[17px]"
                          style={{ background: mark.bg, color: mark.fg }}
                        >
                          {mark.initials}
                        </div>
                        <div className="min-w-0">
                          <h3 className="!text-[18px] truncate">{pick.name}</h3>
                          <span className="mt-0.5 block text-[12.5px] text-muted">{pick.category}</span>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center gap-2">
                        <span className={`chip ${meta.cls}`}>{meta.zh}</span>
                        <span className="data text-faint">测试于 {pick.lastTested}</span>
                      </div>

                      <p className="mt-4 text-[13.5px] leading-relaxed text-muted">{pick.summary}</p>

                      {/* 实测结论 */}
                      <div className="mt-5 border-t border-line-soft pt-4">
                        <span className="rail-label">实测结论</span>
                        <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-ink-soft">
                          {pick.whatWeFound}
                        </p>
                      </div>

                      {/* 劝退 */}
                      {pick.fallsShort.length > 0 && (
                        <div className="mt-4 rounded-chip bg-warn-50 px-3.5 py-3">
                          <span className="text-[11px] font-semibold text-warn-600">不足</span>
                          <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-ink-soft">
                            {pick.fallsShort[0]}
                          </p>
                        </div>
                      )}
                    </Link>

                    <div className="flex items-center justify-between border-t border-line-soft bg-surface-2 px-6 py-3.5">
                      <span className="data truncate text-faint">{pick.pricingAccess.pricingModel}</span>
                      <Link
                        to={`/picks/${pick.slug}`}
                        className="inline-flex shrink-0 items-center gap-1 text-[12.5px] font-medium text-ink transition-colors hover:text-brand-600"
                      >
                        查看避坑
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="card mt-8 p-12 text-center">
              <p className="text-[15px] font-semibold text-ink">没有匹配的工具</p>
              <p className="mx-auto mt-2 max-w-sm text-[13.5px] leading-relaxed text-muted">
                清除筛选条件再试一次，或者用需求诊断器从约束出发重新筛。
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <button
                  onClick={() => { setQuery(''); setCategory('all'); setLevel('all'); }}
                  className="btn btn-outline"
                >
                  清除筛选
                </button>
                <Link to="/finder" className="btn btn-primary">
                  打开诊断器
                </Link>
              </div>
            </div>
          )}

          {hasFilter && filtered.length > 0 && (
            <p className="mt-8 text-[13px] text-muted">
              当前有筛选条件。{' '}
              <button
                onClick={() => { setQuery(''); setCategory('all'); setLevel('all'); }}
                className="font-medium text-ink underline underline-offset-2 hover:text-brand-600 cursor-pointer"
              >
                清除全部
              </button>
            </p>
          )}
        </div>
      </section>
    </>
  );
};