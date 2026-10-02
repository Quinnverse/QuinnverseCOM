import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [topic, setTopic] = useState('工具体验或反馈');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !email.trim()) return;
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'contact',
          topic,
          email,
          message: content,
        }),
      });

      if (!response.ok) throw new Error('提交失败');
      setSent(true);
    } catch {
      setError('消息暂时没有保存成功，请稍后重试。');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-16 sm:py-24 bg-[#F8FAFC] text-left">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-3 border-b border-slate-200 pb-8">
          <div className="inline-block text-xs font-bold font-mono tracking-wider uppercase text-blue-700 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full">
            CONTACT & FEEDBACK
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black text-slate-950 tracking-tight">
            联系与反馈
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            产品使用体验吐槽、自荐值得实测的工具、或有其他具体问题交流。
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200/90 bg-white p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">练习与反馈</span>
            <div className="text-base font-bold text-slate-950 font-mono">zhangqiyun2000@163.com</div>
            <p className="text-xs text-slate-500">也可以直接发邮件；网页表单提交的消息会保存到后台。</p>
          </div>
          <a
            href="mailto:zhangqiyun2000@163.com"
            className="px-5 py-2.5 rounded-full bg-[#0B132B] hover:bg-black text-xs font-bold text-white transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Mail className="w-3.5 h-3.5 text-slate-300" />
            <span>直接发送邮件</span>
          </a>
        </div>

        <div className="rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-9 shadow-lg">
          {sent ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold text-slate-950">消息已送达 Quinnverse</h3>
              <p className="text-xs text-slate-500">消息已经保存到后台系统。</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-800 font-bold">意图分类</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 focus:border-slate-900 focus:outline-none font-semibold"
                >
                  <option value="工具体验或反馈">产品体验反馈与 Bug 报告</option>
                  <option value="推荐值得测试的工具">推荐值得 Quinnverse 实测的好工具</option>
                  <option value="商务或工具合作咨询">商务与工具官方合作咨询</option>
                  <option value="一般问讯">一般技术探讨与交流</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-800 font-bold">你的联系邮箱 *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="以便收到答复"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-800 font-bold">消息内容 *</label>
                <textarea
                  rows={4}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="请详细描述你的建议、发现的工具亮点或具体反馈..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:outline-none leading-relaxed"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-rose-700 bg-rose-50 border border-rose-200 rounded-2xl px-4 py-3">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-1.5 px-7 py-3 text-xs font-bold text-white bg-[#0B132B] hover:bg-black disabled:opacity-60 rounded-full shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? '保存中…' : '投递消息'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
