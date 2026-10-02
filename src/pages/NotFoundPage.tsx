import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from '../utils/router';

export const NotFoundPage: React.FC = () => {
  return (
    <section className="band">
      <div className="container-site">
        <div className="mx-auto max-w-lg py-12 text-center">
          <span className="data text-brand-600">404</span>
          <h1 className="mt-5">页面不存在</h1>
          <p className="lead mt-5">
            这个地址可能已经迁移，或者本来就没存在过。
            下面的入口应该能帮你找到要看的东西。
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn btn-primary">
              回到首页
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/picks" className="btn btn-outline">
              浏览实测库
            </Link>
          </div>

          <div className="mt-12 border-t border-line pt-8 text-left">
            <span className="rail-label">或者试试这些</span>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {[
                { to: '/products', t: '自研产品' },
                { to: '/journal', t: '深度手记' },
                { to: '/resources', t: '实用手册' },
                { to: '/contact', t: '联系与反馈' },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="flex items-center justify-between rounded-chip border border-line px-4 py-3 text-[13.5px] text-ink-soft transition-colors hover:border-ink hover:text-ink"
                >
                  {l.t}
                  <ArrowRight className="h-3.5 w-3.5 text-faint" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};