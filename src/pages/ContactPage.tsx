import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { SITE_SETTINGS } from '../data/database';

export const ContactPage: React.FC = () => {
  const [topic, setTopic] = useState('工具体验或反馈');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !email.trim()) return;
    setSent(true);
  };

  return (
    <div className="py-16 sm:py-20 bg-[#080B12] text-left">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-3 border-b border-slate-800 pb-8">
          <div className="text-xs font-mono font-semibold text-cyan-400 tracking-wider">
            CONTACT & FEEDBACK
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            联系与反馈
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            产品使用体验吐槽、自荐值得实测的工具、或有其他具体问题交流。
          </p>
        </div>

        {/* Direct Email Card */}
        <div className="rounded-2xl border border-slate-800 bg-[#0C1220] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-slate-400">OFFICIAL EMAIL</span>
            <div className="text-sm font-bold text-white font-mono">{SITE_SETTINGS.contactEmail}</div>
            <p className="text-xs text-slate-400">所有邮件通常在 48 小时内完成阅读与回复。</p>
          </div>
          <a
            href={`mailto:${SITE_SETTINGS.contactEmail}`}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>直接发送邮件</span>
          </a>
        </div>

        {/* Structured Form */}
        <div className="rounded-2xl border border-slate-800 bg-[#0C1220] p-6 sm:p-8 shadow-xl">
          {sent ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-cyan-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">消息已送达 Quinnverse</h3>
              <p className="text-xs text-slate-300">
                感谢真实反馈，我们将根据内容认真处理。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">意图分类</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-[#090D17] px-3.5 py-2.5 text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option value="工具体验或反馈">产品体验反馈与 Bug 报告</option>
                  <option value="推荐值得测试的工具">推荐值得 Quinnverse 实测的好工具</option>
                  <option value="商务或工具合作咨询">商务与工具官方合作咨询</option>
                  <option value="一般问讯">一般技术探讨与交流</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">你的联系邮箱 *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="以便收到答复"
                  className="w-full rounded-lg border border-slate-700 bg-[#090D17] px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">消息内容 *</label>
                <textarea
                  rows={4}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="请详细描述你的建议、发现的工具亮点或具体反馈..."
                  className="w-full rounded-lg border border-slate-700 bg-[#090D17] p-3.5 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none leading-relaxed"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>投递消息</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
