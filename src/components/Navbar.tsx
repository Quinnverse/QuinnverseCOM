import React, { useState, useEffect } from 'react';
import { Search, Menu, X, ArrowUpRight } from 'lucide-react';
import { useRouter, Link } from '../utils/router';
interface NavbarProps { onOpenSearch: () => void; }
export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { path } = useRouter();
  const english = path === '/en';
  useEffect(() => { const f=(e:KeyboardEvent)=>{if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();onOpenSearch();}};window.addEventListener('keydown',f);return()=>window.removeEventListener('keydown',f);},[onOpenSearch]);
  const navLinks = english ? [
    {label:'Home',href:'/en'},{label:'Products',href:'/products'},{label:'Tested Picks',href:'/picks'},{label:'Lab',href:'/lab'},{label:'Journal',href:'/journal'},{label:'About',href:'/about'}
  ] : [
    {label:'首页',href:'/'},{label:'自研产品',href:'/products'},{label:'精选实测',href:'/picks'},{label:'前沿实验室',href:'/lab'},{label:'深度手记',href:'/journal'},{label:'关于我们',href:'/about'}
  ];
  return <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-2xs"><div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
    <Link to={english?'/en':'/'} className="font-display text-xl sm:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2"><span>QUINNVERSE</span><span className="w-1.5 h-1.5 rounded-full bg-blue-600"/></Link>
    <nav className="hidden lg:flex items-center gap-7 text-sm font-bold text-slate-600">{navLinks.map(l=><Link key={l.href} to={l.href} className={(path===l.href||(!english&&l.href!=='/'&&path.startsWith(l.href)))?'text-slate-950':'hover:text-slate-900'}>{l.label}</Link>)}</nav>
    <div className="flex items-center gap-2"><Link to={english?'/':'/en'} className="px-3 py-2 text-[11px] font-bold rounded-full border border-slate-200 bg-white hover:bg-slate-50" aria-label="切换中英文">{english?'中文':'EN'}</Link><button onClick={onOpenSearch} className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full"><Search className="w-3.5 h-3.5"/><span className="hidden sm:inline font-mono text-[11px]">⌘K</span></button><Link to="/work-with-us" className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-blue-600 rounded-full"><span>{english?'Work with us':'合作交流'}</span><ArrowUpRight className="w-3.5 h-3.5"/></Link><button onClick={()=>setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl" aria-label="Menu">{mobileMenuOpen?<X className="w-5 h-5"/>:<Menu className="w-5 h-5"/>}</button></div>
  </div>{mobileMenuOpen&&<div className="lg:hidden border-b border-slate-200 bg-white px-4 py-5 space-y-3 shadow-lg"><div className="grid grid-cols-2 gap-2 text-sm font-bold">{navLinks.map(l=><Link key={l.href} to={l.href} onClick={()=>setMobileMenuOpen(false)} className="px-3.5 py-2.5 rounded-xl text-slate-700 hover:bg-slate-50">{l.label}</Link>)}</div><Link to="/work-with-us" onClick={()=>setMobileMenuOpen(false)} className="w-full flex justify-center px-5 py-3 text-xs font-bold text-white bg-slate-900 rounded-full">{english?'Work with Quinnverse':'与工作室交流'}</Link></div>}</header>;
};
