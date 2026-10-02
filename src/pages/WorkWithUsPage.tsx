import React, { useState } from 'react';
import { ArrowLeft, Check, AlertTriangle, Send, CheckCircle2 } from 'lucide-react';
import { Link } from '../utils/router';
import { STUDIO_SERVICES, SITE_SETTINGS } from '../data/database';

export const WorkWithUsPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [direction, setDirection] = useState('AI Product Prototype');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !email.trim()) return;

    // Simulate submission
    setFormSubmitted(true);
  };

  return (
    <div className="py-16 sm:py-20 bg-[#080B12] text-left">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Masthead */}
        <div className="space-y-4 border-b border-slate-800 pb-8">
          <div className="text-xs font-mono font-semibold text-cyan-400 tracking-wider">
            STUDIO COLLABORATION
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
            Work with Quinnverse
          </h1>
          <p className="text-base sm:text-xl font-semibold text-cyan-200 leading-relaxed">
            Have something worth building?
          </p>
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            Quinnverse 保持着对真实问题的敏锐度，同时接受极少数真正关注痛点、追求工程确定性与极简交互的原型定制开发。
          </p>
        </div>

        {/* 1. What Can Be Built */}
        <div className="space-y-6">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            01 / CAPABILITIES 我们可以帮你的场景
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STUDIO_SERVICES.map((serv) => (
              <div
                key={serv.id}
                className="rounded-2xl border border-slate-800 bg-[#0C1220] p-6 space-y-4 shadow-sm"
              >
                <div>
                  <h3 className="text-base font-bold text-white">{serv.title}</h3>
                  <p className="text-xs font-semibold text-cyan-300 mt-1">{serv.tagline}</p>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {serv.description}
                </p>
                <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-300">
                  <div className="font-semibold text-slate-400 text-[11px] uppercase">交付范围包括：</div>
                  {serv.deliverables.map((d, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-cyan-400 font-bold">·</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
                <div className="text-[11px] font-mono text-slate-500 pt-1">
                  典型周期：{serv.typicalTimeline}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Fit vs Not a Fit */}
        <div className="space-y-6">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            02 / FIT ASSESSMENT 匹配准则
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="rounded-xl border border-emerald-950/60 bg-[#091414] p-6 space-y-3">
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>GOOD FIT (适合找 Quinnverse)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>你的问题非常具体，能用几句话说清实际卡点</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>需要一个真正能动手把软件端到端做出来的工程师</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>认可确定性工程逻辑优先于大模型的随机发挥</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>重视界面的信息密度、呼吸感与极简交互</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-rose-950/60 bg-[#160B0E] p-6 space-y-3">
              <div className="text-xs font-mono font-bold text-rose-400 uppercase flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>NOT A FIT (不适合找 Quinnverse)</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>需要数十人驻场的企业级大型 ERP 招投标流程</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>要求不切实际的“全自动万能大模型代管一切”</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>希望在几天内盲目套壳拼凑大量劣质廉价页面</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>只是想要概念 PPT，不想动手验证代码可行性</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Collaboration Process */}
        <div className="space-y-4">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            03 / HOW IT WORKS 合作流程
          </div>
          <div className="rounded-xl border border-slate-800 bg-[#0C1220] p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-300">
            <div className="space-y-1">
              <div className="font-mono text-cyan-400 font-bold">STEP 01</div>
              <div className="font-bold text-white">异步描述痛点</div>
              <p className="text-slate-400">用文字梳理你当前最卡手的问题、现有流程与期望达到的效果形态。</p>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-cyan-400 font-bold">STEP 02</div>
              <div className="font-bold text-white">技术可行性评估</div>
              <p className="text-slate-400">Quinnverse 在 48 小时内完成路径评估，给出是否适合做、难点在哪的坦诚答复。</p>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-cyan-400 font-bold">STEP 03</div>
              <div className="font-bold text-white">最小闭环交付</div>
              <p className="text-slate-400">锁定最核心的真实场景，敏捷打磨出跑通全链路、能上手验证的稳定第一版。</p>
            </div>
          </div>
        </div>

        {/* 4. Inquiry Form */}
        <div className="space-y-4">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            04 / START A CONVERSATION 开始交流
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#0C1220] p-6 sm:p-8 shadow-xl">
            {formSubmitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-cyan-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">合作构想已成功送达 Quinnverse</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  感谢真实具体的反馈。我们将仔细评估技术路径与场景契合度，并在 48 小时内通过邮箱与您联系。
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">称呼 / 团队名</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="如何称呼您"
                      className="w-full rounded-lg border border-slate-700 bg-[#090D17] px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">联系邮箱 *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="方便接收方案答复的邮箱"
                      className="w-full rounded-lg border border-slate-700 bg-[#090D17] px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">合作方向</label>
                  <select
                    value={direction}
                    onChange={(e) => setDirection(e.target.value)}
                    className="w-full rounded-lg border border-slate-700 bg-[#090D17] px-3.5 py-2.5 text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="AI Product Prototype">AI Product Prototype (从想法到可运行第一版)</option>
                    <option value="Agent & Automation">Agent & Automation (自动化流与轻量 Agent 落地)</option>
                    <option value="Web Product">Web Product (现代极客审美独立 Web 应用)</option>
                    <option value="Internal Tool">Internal Tool (针对业务卡点的小型私有软件)</option>
                    <option value="其他定制探索">其他具体场景探索</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">核心卡点与期望形态 *</label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="请用两到三句话描述当前最卡手的问题是什么，现有流程怎么走的，期望工具能帮您省下什么时间..."
                    className="w-full rounded-lg border border-slate-700 bg-[#090D17] p-3.5 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <span className="text-[11px] text-slate-500">
                    亦可通过官方邮箱直接投递：<code className="text-slate-400 font-mono">{SITE_SETTINGS.contactEmail}</code>
                  </span>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-sm transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>发送合作构想</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
