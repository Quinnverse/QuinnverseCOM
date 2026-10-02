import React, { useState } from 'react';
import { Mail, Twitter, Linkedin, Box, Sparkles, Layers, Send, CheckCircle2 } from 'lucide-react';
import { Language } from '../../types';

interface ContactPageProps {
  onNavigate: (tab: string, productId?: string) => void;
  lang: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, lang }) => {
  const isZh = lang === 'zh';
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-slate-900">
      {/* 1:1 Top Hero matching image.png (7. 合作页面 Contact) */}
      <section className="relative overflow-hidden bg-[#090d16] text-white pt-24 pb-14 sm:pt-28 sm:pb-16 border-b border-slate-800">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 text-center sm:text-left space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            一起做点东西。
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-normal max-w-xl leading-relaxed">
            如果你有一个产品、一项工具，或者一个值得一起探索的问题，欢迎联系我。
          </p>
        </div>
      </section>

      {/* 1:1 White Bottom Section matching image.png (7. 合作页面 Contact) */}
      <section className="mx-auto max-w-4xl px-6 sm:px-8 py-10 space-y-12">
        {/* 3 Collaboration Cards in a row matching image.png 1:1 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3 hover:border-slate-300 hover:shadow-sm transition-all">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-teal-50 border border-teal-100 text-teal-600">
              <Box className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 pt-1">
              产品 / 技术合作
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              共同开发 / 产品合作探索等。
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3 hover:border-slate-300 hover:shadow-sm transition-all">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 pt-1">
              工具实测 / 收录
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              工具评测 / 收录合作等。
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3 hover:border-slate-300 hover:shadow-sm transition-all">
            <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 pt-1">
              渠道 / 内容合作
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Affiliate / 内容 / 推广等。
            </p>
          </div>
        </div>

        {/* Section: "联系方式" 3 Cards in a row matching image.png 1:1 */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">
            联系方式
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Email Card */}
            <a
              href="mailto:hi@quinnverse.tech"
              className="rounded-2xl border border-slate-200 bg-white p-5 flex items-center gap-4 hover:border-blue-400 hover:shadow-sm transition-all"
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600 shrink-0">
                <Mail className="h-5 w-5" />
              </div>
              <div className="truncate">
                <div className="text-xs text-slate-400 font-medium">邮箱</div>
                <div className="text-sm font-bold text-slate-900 truncate">
                  hi@quinnverse.tech
                </div>
              </div>
            </a>

            {/* Twitter Card */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-slate-200 bg-white p-5 flex items-center gap-4 hover:border-blue-400 hover:shadow-sm transition-all"
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600 shrink-0">
                <Twitter className="h-5 w-5" />
              </div>
              <div className="truncate">
                <div className="text-xs text-slate-400 font-medium">Twitter / X</div>
                <div className="text-sm font-bold text-slate-900 truncate">
                  @Quinnverse
                </div>
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-slate-200 bg-white p-5 flex items-center gap-4 hover:border-blue-400 hover:shadow-sm transition-all"
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-50 border border-blue-100 text-blue-600 shrink-0">
                <Linkedin className="h-5 w-5" />
              </div>
              <div className="truncate">
                <div className="text-xs text-slate-400 font-medium">LinkedIn</div>
                <div className="text-sm font-bold text-slate-900 truncate">
                  Quinnverse
                </div>
              </div>
            </a>
          </div>

          <p className="text-xs text-slate-500 pt-2">
            我会在 1~3 个工作日内回复。
          </p>
        </div>

        {/* Interactive Direct Message Form */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            发送站内留言
          </h3>

          {submitted ? (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>留言已送达，我会尽快与你联系！</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">你的称呼</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="姓名或昵称"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">联系邮箱</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">简述你想交流的事项</label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="项目合作、工具提交、或者任何你想探讨的问题..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-slate-900 focus:bg-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors shadow-sm"
              >
                <Send className="h-3.5 w-3.5" />
                <span>发送消息</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
