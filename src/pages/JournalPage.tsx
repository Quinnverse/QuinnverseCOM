import React, { useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '../utils/router';
import { JOURNAL_ARTICLES } from '../data/database';

const CATEGORY_LABEL: Record<string, string> = {
  'BUILD LOG': '构建手记',
  'ENGINEERING': '工程实践',
  'CRITIQUE': '批判思考',
};

export const JournalPage: React.FC = () => {
  const [category, setCategory] = useState('ALL');

  const categories = useMemo(() => {
    const set = new Set(JOURNAL_ARTICLES.map((a) => a.category));
    return ['ALL', ...Array.from(set)];
  }, []);

  const articles = useMemo(
    () => (category === 'ALL' ? JOURNAL_ARTICLES : JOURNAL_ARTICLES.filter((a) => a.category === category)),
    [category]
  );

  const [lead, ...rest] = articles;

  return (
    <>
      {/* ============ 页头 ============ */}
      <section className="band-sm border-b border-line-soft">
        <div className="container-site">
          <div className="max-w-3xl">
            <span className="chip">深度手记</span>
            <h1 className="mt-6">写了才记得住的东西</h1>
            <p className="lead mt-6 max-w-2xl">
              关于独立构建、工具实测复盘和工程约定的长文记录。
              不追热点，只写自己真做过、真踩过的东西。
            </p>
          </div>

          {/* 分类 */}
          <div className="mt-10 flex flex-wrap items-center gap-1.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`chip cursor-pointer transition-colors ${
                  category === c ? 'chip-brand' : 'hover:border-ink hover:text-ink'
                }`}
              >
                {c === 'ALL' ? `全部 ${JOURNAL_ARTICLES.length}` : CATEGORY_LABEL[c] ?? c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 头条 + 列表 ============ */}
      <section className="band-sm">
        <div className="container-site">
          {lead && (
            <Link to={`/journal/${lead.slug}`} className="card card-hover group block p-7 sm:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="chip chip-brand">{CATEGORY_LABEL[lead.category] ?? lead.category}</span>
                <span className="data text-faint">{lead.date} · {lead.readTime}</span>
              </div>

              <h2 className="mt-5 max-w-3xl text-[26px] transition-colors group-hover:text-brand-600 sm:text-[30px]">
                {lead.title}
              </h2>
              <p className="lead mt-4 max-w-2xl">{lead.excerpt}</p>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                {lead.tags.map((t) => (
                  <span key={t} className="chip !text-[11px]">#{t}</span>
                ))}
              </div>

              <div className="mt-7 flex items-center gap-1.5 border-t border-line-soft pt-5 text-[13.5px] font-medium text-ink">
                读全文
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          )}

          {rest.length > 0 && (
            <>
              <div className="mt-12 flex items-baseline justify-between border-b border-line pb-3">
                <span className="text-[13px] text-muted">
                  另外 <strong className="font-semibold text-ink">{rest.length}</strong> 篇
                </span>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                {rest.map((a) => (
                  <Link key={a.id} to={`/journal/${a.slug}`} className="card card-hover group flex flex-col p-7">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="chip">{CATEGORY_LABEL[a.category] ?? a.category}</span>
                      <span className="data text-faint">{a.date} · {a.readTime}</span>
                    </div>

                    <h3 className="mt-4 !text-[18px] leading-snug transition-colors group-hover:text-brand-600">
                      {a.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 flex-1 text-[13.5px] leading-relaxed text-muted">
                      {a.excerpt}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-line-soft pt-4">
                      <div className="flex flex-wrap gap-1.5">
                        {a.tags.slice(0, 2).map((t) => (
                          <span key={t} className="text-[11.5px] text-faint">#{t}</span>
                        ))}
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-brand-600" />
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};