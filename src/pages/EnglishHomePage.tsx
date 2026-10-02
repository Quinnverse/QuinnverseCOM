import React from 'react';
import { ArrowRight, FlaskConical, Search, Wrench } from 'lucide-react';
import { Link } from '../utils/router';

export const EnglishHomePage: React.FC = () => (
  <div className="bg-[#F8FAFC] text-slate-900">
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <div className="max-w-4xl space-y-7">
        <div className="inline-flex text-xs font-bold px-3.5 py-1 rounded-full bg-white border border-slate-200">INDEPENDENT PRODUCT STUDIO</div>
        <h1 className="font-display text-5xl sm:text-7xl font-black tracking-tight leading-[1.05]">Turn real problems into things that actually work.</h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">Quinnverse is an independent product studio for discovering useful tools, building what is missing, and documenting the experiments, methods and lessons behind the work.</p>
        <div className="flex flex-wrap gap-3">
          <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white text-sm font-bold"><Wrench className="w-4 h-4"/>Explore Products</Link>
          <Link to="/picks" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 text-sm font-bold"><Search className="w-4 h-4"/>Tested Picks</Link>
          <Link to="/lab" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 text-sm font-bold"><FlaskConical className="w-4 h-4"/>Open Lab</Link>
        </div>
      </div>
    </section>

    <section className="bg-white border-y border-slate-200"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-3 gap-6">
      {[['Independent by design','Small, focused products built around concrete problems rather than feature bloat.'],['Used before recommended','Picks come from real use, with limitations and trade-offs documented alongside strengths.'],['Experiments stay visible','Build logs, product experiments, reusable methods and field notes remain part of the public record.']].map(([title,body]) => <div key={title} className="rounded-3xl border border-slate-200 p-7"><h2 className="font-display text-xl font-bold">{title}</h2><p className="text-sm text-slate-600 mt-3 leading-relaxed">{body}</p></div>)}
    </div></section>

    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-8">
      <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-10"><div className="text-xs font-bold text-slate-300">PRODUCTS</div><h2 className="font-display text-3xl font-black mt-3">Software built for specific friction.</h2><p className="text-sm text-slate-300 mt-4 leading-relaxed">From Job Application Copilot to lightweight learning tools, each product starts with a problem we actually encountered.</p><Link to="/products" className="inline-flex items-center gap-2 mt-6 text-sm font-bold">View products <ArrowRight className="w-4 h-4"/></Link></div>
      <div className="rounded-3xl bg-white border border-slate-200 p-8 sm:p-10"><div className="text-xs font-bold text-amber-700">LAB</div><h2 className="font-display text-3xl font-black mt-3">The work behind the finished thing.</h2><p className="text-sm text-slate-600 mt-4 leading-relaxed">Build logs, product experiments, methods and field notes live together in Quinnverse Lab without erasing the original detail pages.</p><Link to="/lab" className="inline-flex items-center gap-2 mt-6 text-sm font-bold">Enter the Lab <ArrowRight className="w-4 h-4"/></Link></div>
    </section>

    <section className="bg-white border-t border-slate-200"><div className="max-w-4xl mx-auto px-4 py-20 text-center"><h2 className="font-display text-3xl sm:text-4xl font-black">Have something worth building?</h2><p className="text-sm text-slate-600 mt-3">Send the concrete problem, current workflow and desired outcome. Collaboration inquiries are reviewed directly.</p><Link to="/work-with-us" className="inline-flex items-center gap-2 mt-6 px-7 py-3 rounded-full bg-slate-900 text-white text-sm font-bold">Work with Quinnverse <ArrowRight className="w-4 h-4"/></Link></div></section>
  </div>
);
