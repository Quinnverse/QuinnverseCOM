import React from 'react';
import { ArrowLeft, Home, Wrench } from 'lucide-react';
import { Link } from '../utils/router';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-24 sm:py-36 bg-[#F8FAFC] text-center">
      <div className="mx-auto max-w-md px-4 space-y-6">
        <div className="font-mono text-slate-900 font-black text-6xl">404</div>
        <h1 className="text-2xl font-bold text-slate-950">页面未找到</h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          你访问的路径不存在或已被迁移。Quinnverse 仅保留真实有效的公开资产。
        </p>
        <div className="pt-4 flex items-center justify-center gap-3 text-xs font-bold">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#0B132B] text-white hover:bg-black transition-colors shadow-xs"
          >
            <Home className="w-3.5 h-3.5" />
            <span>返回首页</span>
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors"
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>浏览自研产品</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
