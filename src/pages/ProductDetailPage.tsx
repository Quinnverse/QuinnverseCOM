import React from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { Link } from '../utils/router';
import { PRODUCTS } from '../data/database';
import { localizePath, type Locale } from '../i18n/locale';

export const ProductDetailPage:React.FC<{slug:string;locale?:Locale}>=({slug,locale='zh'})=>{
 const en=locale==='en'; const product=PRODUCTS.find(p=>p.slug===slug)||PRODUCTS[0];
 return <div className="py-16 sm:py-24 bg-[#F8FAFC] text-left"><div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
 <Link to={localizePath('/products',locale)} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500"><ArrowLeft className="w-3.5 h-3.5"/>{en?'Back to Products':'返回产品矩阵'}</Link>
 <div className="space-y-4 border-b border-slate-200 pb-8"><div className="text-xs font-mono text-blue-700 font-bold">BUILT BY QUINNVERSE · {product.stage}</div><h1 className="font-display text-4xl sm:text-5xl font-black">{product.name}</h1><p className="text-lg sm:text-2xl font-bold text-slate-800">{product.tagline}</p><p className="text-sm text-slate-600 leading-relaxed">{product.summary}</p></div>
 <section className="space-y-4"><h2 className="font-mono text-xs font-bold text-blue-600 uppercase">01 / {en?'THE PROBLEM':'核心痛点'}</h2><div className="rounded-3xl border bg-white p-7 text-sm text-slate-700 leading-relaxed"><p>{product.problemSolved}</p></div></section>
 {product.workflow&&<section className="space-y-4"><h2 className="font-mono text-xs font-bold text-blue-600 uppercase">02 / {en?'WORKFLOW':'确定性处理链路'}</h2><div className="grid sm:grid-cols-2 gap-4">{product.workflow.map(s=><div key={s.step} className="rounded-3xl border bg-white p-6 space-y-2"><div className="font-mono text-blue-600 font-black text-lg">{s.step}</div><div className="text-sm font-bold">{s.title}</div><div className="text-xs text-slate-600">{s.desc}</div></div>)}</div></section>}
 <section className="space-y-4"><h2 className="font-mono text-xs font-bold text-blue-600 uppercase">03 / {en?'ENGINEERING PRINCIPLES':'工程底线与准则'}</h2><div className="rounded-3xl border bg-white p-7"><ul className="space-y-3">{product.principles.map((x,i)=><li key={i} className="flex gap-2.5 text-sm"><Check className="w-4 h-4 text-emerald-600 shrink-0"/>{x}</li>)}</ul></div></section>
 <section className="space-y-4"><h2 className="font-mono text-xs font-bold text-slate-500 uppercase">04 / TECHNICAL SPECS</h2><div className="rounded-2xl border bg-white p-6 text-xs font-mono">{product.techStack.join(' · ')}</div></section>
 <div className="rounded-3xl bg-[#0B132B] p-8 sm:p-10 text-white flex flex-col sm:flex-row justify-between gap-6"><div><h3 className="text-lg font-bold">{en?'Interested in beta access?':'申请加入内部内测'}</h3><p className="mt-1 text-xs text-slate-300">{en?'Tell us about your workflow and what you want to improve.':'欢迎联系我们交流你的使用场景。'}</p></div><Link to={localizePath('/work-with-us',locale)} className="px-6 py-3 text-xs font-bold text-slate-950 bg-white rounded-full">{en?'Get in touch →':'申请内测交流 →'}</Link></div>
 </div></div>;
};
