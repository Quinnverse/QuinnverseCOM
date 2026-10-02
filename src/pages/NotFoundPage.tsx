import React from 'react';
import { ArrowLeft, Home, Wrench } from 'lucide-react';
import { Link } from '../utils/router';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-24 sm:py-32 bg-[#080B12] text-center">
      <div className="mx-auto max-w-md px-4 space-y-6">
        <div className="font-mono text-cyan-400 font-bold text-4xl">404</div>
        <h1 className="text-2xl font-bold text-white">页面未找到</h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          你访问的路径不存在或已被迁移。Quinnverse 仅保留真实有效的公开资产。
        </p>
        <div className="pt-4 flex items-center justify-center gap-3 text-xs font-semibold">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>返回首页</span>
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>浏览自研产品</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
