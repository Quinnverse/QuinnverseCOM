import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Plus,
  Edit2,
  Trash2,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Database,
  Layers,
  FileText,
  Search,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Save,
  X,
} from 'lucide-react';
import { Language, ToolItem, ProductItem, LabPost } from '../../types';
import { storageService } from '../../services/storageService';

interface StudioPageProps {
  onNavigate: (tab: string) => void;
  lang: Language;
  tools: ToolItem[];
  products: ProductItem[];
  labPosts: LabPost[];
  onRefreshData: () => void;
}

export const StudioPage: React.FC<StudioPageProps> = ({
  onNavigate,
  lang,
  tools,
  products,
  labPosts,
  onRefreshData,
}) => {
  const isZh = lang === 'zh';
  const [activeTab, setActiveTab] = useState<'overview' | 'tools' | 'posts' | 'cms_guide' | 'backup'>('overview');

  // Tool Editing State
  const [editingTool, setEditingTool] = useState<ToolItem | null>(null);
  const [isToolModalOpen, setIsToolModalOpen] = useState(false);
  const [toolSearch, setToolSearch] = useState('');

  // Post Editing State
  const [editingPost, setEditingPost] = useState<LabPost | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // Status message
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // Tool Form Handlers
  const handleOpenAddTool = () => {
    setEditingTool({
      id: 'tool_' + Date.now(),
      slug: 'new-tool-' + Date.now().toString().slice(-4),
      name: '',
      summary: '',
      summaryEn: '',
      category: 'presentation',
      categoryLabelZh: '做PPT',
      categoryLabelEn: 'Slides',
      type: 'tool',
      features: ['智能排版', '中文支持', '快捷导出'],
      suitableFor: ['需要高效完成日常任务的用户'],
      notSuitableFor: ['极端离线或不愿联网的场景'],
      testExperience: '实测上手体验极快，耗时少，输出排版质量高。',
      testExperienceEn: 'Smooth output with clean layouts.',
      testDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      rating: 4.8,
      pricing: {
        freePlan: '提供免费额度或试用体验',
        pricingModel: 'Freemium',
        cost: '$10 / 月',
      },
      domesticAvailability: 'yes',
      chineseSupport: 'full',
      officialUrl: 'https://example.com',
      affiliateUrl: '',
      status: 'published',
      isFeatured: true,
      tags: ['实测推荐', '效率'],
      internalNotes: {
        source: '自主挖掘',
        affiliateCommission: '待申请',
        testingStatus: 'verified',
        clicks: 0,
        conversions: 0,
      },
    });
    setIsToolModalOpen(true);
  };

  const handleSaveTool = () => {
    if (!editingTool || !editingTool.name.trim()) return;
    storageService.upsertTool(editingTool);
    onRefreshData();
    setIsToolModalOpen(false);
    showStatus(`已成功保存工具：${editingTool.name}`);
  };

  const handleDeleteTool = (id: string, name: string) => {
    if (confirm(`确定要从实测库中删除「${name}」吗？`)) {
      storageService.deleteTool(id);
      onRefreshData();
      showStatus(`已删除工具：${name}`);
    }
  };

  // Post Form Handlers
  const handleOpenAddPost = () => {
    setEditingPost({
      id: 'post_' + Date.now(),
      slug: 'new-post-' + Date.now().toString().slice(-4),
      title: '',
      titleEn: '',
      excerpt: '',
      excerptEn: '',
      content: '## 新文章正文\n\n在此书写你的实际构建日志、踩坑记录与思考...',
      contentEn: '',
      category: 'build_log',
      categoryLabelZh: '构建日志',
      categoryLabelEn: 'Build Log',
      date: new Date().toISOString().split('T')[0],
      readTime: '5 分钟',
      coverImage: '/src/assets/images/lab_creator_workspace_1790970765025.jpg',
      views: 1,
    });
    setIsPostModalOpen(true);
  };

  const handleSavePost = () => {
    if (!editingPost || !editingPost.title.trim()) return;
    storageService.upsertLabPost(editingPost);
    onRefreshData();
    setIsPostModalOpen(false);
    showStatus(`已成功发布手记：${editingPost.title}`);
  };

  const handleDeletePost = (id: string, title: string) => {
    if (confirm(`确定要删除文章「${title}」吗？`)) {
      storageService.deleteLabPost(id);
      onRefreshData();
      showStatus(`已删除文章：${title}`);
    }
  };

  // Backup Handlers
  const handleExportBackup = () => {
    const json = storageService.exportFullBackup();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quinnverse-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showStatus('已导出完整 JSON 备份文件！');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (storageService.importBackup(content)) {
        onRefreshData();
        showStatus('已成功导入备份数据并更新全站！');
      } else {
        alert('导入失败，请检查 JSON 格式是否正确');
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = () => {
    if (confirm('确定要恢复默认预设数据吗？本地修改的内容将被重置。')) {
      storageService.resetAllData();
      onRefreshData();
      showStatus('已恢复默认预设实测数据');
    }
  };

  const filteredTools = tools.filter(
    (t) =>
      t.name.toLowerCase().includes(toolSearch.toLowerCase()) ||
      t.summary.toLowerCase().includes(toolSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen text-slate-100 py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Studio Header Banner */}
        <div className="rounded-2xl border border-slate-700 bg-gradient-to-r from-slate-900 via-slate-900/90 to-indigo-950/30 p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/20">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                <span>QUINNVERSE STUDIO · 独立管理后台</span>
              </div>
              <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-white">
                {isZh ? '工作室内容与数据管理后台' : 'Quinnverse Content & Data Studio'}
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-300">
                {isZh
                  ? '回答“我自己之后怎么手动编辑网页、后台怎么搞”：在此直接维护实测库、自研产品、文章，实时生效或无缝对接 Notion Headless CMS。'
                  : 'Manage tools, products, and build logs with instant local persistence or Notion headless CMS.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('home')}
                className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                返回前台网站
              </button>
            </div>
          </div>

          {/* Status Alert Toast */}
          {statusMessage && (
            <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3 text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 text-xs sm:text-sm font-medium text-slate-400 gap-4 sm:gap-6 mb-8 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 transition-colors whitespace-nowrap ${
              activeTab === 'overview' ? 'text-white border-b-2 border-indigo-500 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            {isZh ? '总览看板 (Overview)' : 'Overview'}
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`pb-3 transition-colors whitespace-nowrap ${
              activeTab === 'tools' ? 'text-white border-b-2 border-indigo-500 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            {isZh ? '实测工具管理 (Tools)' : 'Tools Manager'}
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`pb-3 transition-colors whitespace-nowrap ${
              activeTab === 'posts' ? 'text-white border-b-2 border-indigo-500 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            {isZh ? '实验室文章 (Lab Posts)' : 'Lab Posts'}
          </button>
          <button
            onClick={() => setActiveTab('cms_guide')}
            className={`pb-3 transition-colors whitespace-nowrap ${
              activeTab === 'cms_guide' ? 'text-indigo-400 border-b-2 border-indigo-500 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            {isZh ? '⚡ Notion/CMS 架构对接方案' : 'Notion CMS Guide'}
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`pb-3 transition-colors whitespace-nowrap ${
              activeTab === 'backup' ? 'text-white border-b-2 border-indigo-500 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            {isZh ? '备份与导入导出 (JSON)' : 'Export / Import'}
          </button>
        </div>

        {/* TAB 1: Overview Dashboard */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Metric Cards (matching wireframe 9) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <span className="text-[11px] text-slate-400">已发布实测</span>
                <div className="text-xl font-bold font-mono text-white mt-1">{tools.length}</div>
                <span className="text-[10px] text-emerald-400">公开库已上线</span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <span className="text-[11px] text-slate-400">候选待测试池</span>
                <div className="text-xl font-mono text-slate-300 mt-1 font-bold">27</div>
                <span className="text-[10px] text-amber-400">Research Agent 搜集</span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <span className="text-[11px] text-slate-400">正在人工测试</span>
                <div className="text-xl font-mono text-blue-400 mt-1 font-bold">4</div>
                <span className="text-[10px] text-slate-400">测试指标验证中</span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <span className="text-[11px] text-slate-400">待申请渠道</span>
                <div className="text-xl font-mono text-purple-400 mt-1 font-bold">12</div>
                <span className="text-[10px] text-slate-400">Affiliate 审核</span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <span className="text-[11px] text-slate-400">已生效渠道</span>
                <div className="text-xl font-mono text-emerald-400 mt-1 font-bold">7</div>
                <span className="text-[10px] text-emerald-400">持续带来收益</span>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <span className="text-[11px] text-slate-400">实验室手记</span>
                <div className="text-xl font-mono text-amber-400 mt-1 font-bold">{labPosts.length}</div>
                <span className="text-[10px] text-slate-400">公开日志</span>
              </div>
            </div>

            {/* Flywheel diagram */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
              <h3 className="text-base font-bold text-white mb-2">
                Quinnverse Operating System: 从工具搜集到商业闭环的飞轮
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-3xl mb-6">
                你之前构想的核心不是单纯做导航站，而是建立一套完整的“自动化搜集 → 人工实测 → 沉淀数据库 → Agent 筛选入口 → 内容发布获客 → 渠道转化”的产品资产体系。
              </p>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
                <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
                  <div className="text-indigo-400 font-bold mb-1">1. Research Agent</div>
                  <p className="text-[11px] text-slate-400">全网持续追踪新发布的优质 AI 工具，抓取定价与参数进入候选池。</p>
                </div>
                <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
                  <div className="text-amber-400 font-bold mb-1">2. 人工深度测试</div>
                  <p className="text-[11px] text-slate-400">启云亲自拿真实任务跑 3 次以上，测试中文支持、国内可用度与致命缺点。</p>
                </div>
                <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
                  <div className="text-emerald-400 font-bold mb-1">3. Tested 数据库</div>
                  <p className="text-[11px] text-slate-400">录入实测智库，形成高可信度的数据资产（不可被搬运抄袭的壁垒）。</p>
                </div>
                <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
                  <div className="text-blue-400 font-bold mb-1">4. Finder Agent</div>
                  <p className="text-[11px] text-slate-400">用户用自然语言提需求，Agent 瞬间匹配精准工具并给出实测证据。</p>
                </div>
                <div className="rounded-xl bg-slate-950 p-4 border border-slate-800">
                  <div className="text-rose-400 font-bold mb-1">5. 内容与渠道闭环</div>
                  <p className="text-[11px] text-slate-400">沉淀小红书/推特笔记选题，引导至官网获得高转化率 Affiliate 收益。</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Tools Manager */}
        {activeTab === 'tools' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={toolSearch}
                  onChange={(e) => setToolSearch(e.target.value)}
                  placeholder="在实测库中搜索工具..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 pl-10 pr-4 text-xs text-white placeholder:text-slate-500 focus:outline-none"
                />
              </div>

              <button
                onClick={handleOpenAddTool}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors whitespace-nowrap"
              >
                <Plus className="h-4 w-4" />
                <span>录入新实测工具</span>
              </button>
            </div>

            {/* Tools Table / List */}
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
              <div className="divide-y divide-slate-800">
                {filteredTools.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-800/40 transition-colors"
                  >
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-white text-sm">{t.name}</span>
                        <span className="rounded bg-slate-800 px-2 py-0.5 text-slate-400 text-[10px]">
                          {t.categoryLabelZh}
                        </span>
                        <span className="font-mono text-amber-400 text-xs">★ {t.rating}</span>
                        <span
                          className={`rounded px-1.5 py-0.2 text-[10px] ${
                            t.status === 'published'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-amber-500/10 text-amber-400'
                          }`}
                        >
                          {t.status === 'published' ? '已发布' : '草稿'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-1">{t.summary}</p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400">
                        <span>中文: {t.chineseSupport === 'full' ? '全面' : '部分'}</span>
                        <span>·</span>
                        <span>国内: {t.domesticAvailability === 'yes' ? '直连' : '需环境'}</span>
                        <span>·</span>
                        <span>最后更新: {t.lastUpdated}</span>
                        {t.affiliateUrl && (
                          <>
                            <span>·</span>
                            <span className="text-purple-400">含渠道返佣</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <button
                        onClick={() => {
                          setEditingTool({ ...t });
                          setIsToolModalOpen(true);
                        }}
                        className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-slate-300 hover:text-white"
                      >
                        <Edit2 className="h-3 w-3" />
                        <span>编辑</span>
                      </button>
                      <button
                        onClick={() => handleDeleteTool(t.id, t.name)}
                        className="rounded-lg border border-slate-800 p-1.5 text-slate-400 hover:border-rose-800 hover:text-rose-400"
                        title="删除"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Lab Posts Manager */}
        {activeTab === 'posts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">实验室文章与手记管理</h3>
              <button
                onClick={handleOpenAddPost}
                className="flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-500 transition-colors whitespace-nowrap"
              >
                <Plus className="h-4 w-4" />
                <span>撰写新构建手记</span>
              </button>
            </div>

            <div className="space-y-3">
              {labPosts.map((p) => (
                <div
                  key={p.id}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                      <span className="text-amber-400 font-medium">{p.categoryLabelZh}</span>
                      <span>·</span>
                      <span>{p.date}</span>
                      <span>·</span>
                      <span>{p.readTime}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{p.title}</h4>
                    <p className="mt-1 text-xs text-slate-300 line-clamp-1">{p.excerpt}</p>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <button
                      onClick={() => {
                        setEditingPost({ ...p });
                        setIsPostModalOpen(true);
                      }}
                      className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-slate-300 hover:text-white"
                    >
                      <Edit2 className="h-3 w-3" />
                      <span>编辑正文</span>
                    </button>
                    <button
                      onClick={() => handleDeletePost(p.id, p.title)}
                      className="rounded-lg border border-slate-800 p-1.5 text-slate-400 hover:border-rose-800 hover:text-rose-400"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Notion / Headless CMS Integration Guide */}
        {activeTab === 'cms_guide' && (
          <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-slate-300">
            <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/20 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-white mb-2">
                推荐生产部署方案：基于 Notion 的 Headless CMS 架构
              </h3>
              <p className="text-slate-300">
                你在提问中问到：<em>“我自己之后怎么手动编辑网页。后台怎么搞”</em>。
                对于独立创作者，专门手写一套包含登录鉴权、数据库运维、图片上传的后台系统往往维护成本极高，容易半途而废。
                最省心且专业的方式就是 **Notion CMS + 自动化静态生成 (SSG)**。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                <div className="text-sm font-bold text-white mb-2">1. 在 Notion 中维护内容</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  在你的个人 Notion 里创建「Quinnverse 实测库」Database。每行记录对应一个工具，包含名称、标签、评分、评测体验正文，还可以直接把小红书实测截图拖进去。
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                <div className="text-sm font-bold text-white mb-2">2. 构建时自动拉取 (Fetch)</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  在项目中使用官方 Notion SDK (`@notionhq/client`)，在构建步骤（`npm run build`）中一次性拉取最新的工具和文章数据并生成静态页面，速度极快且完全免费。
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
                <div className="text-sm font-bold text-white mb-2">3. 自动部署与生效</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  当你写完一篇新实测后，只要在手机或电脑 Notion 点勾选“已发布”，通过 GitHub Actions 或 Vercel Deploy Hook，2 分钟内网站自动更新上线，无需写一行代码。
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 font-mono text-xs">
              <div className="text-slate-400 mb-2 font-sans font-bold text-slate-200">
                双层数据隔离模型 (确保内部商业机密绝不上报前端)：
              </div>
              <div className="text-slate-300 space-y-1">
                <div>· 公开字段 (PUBLIC): 名称, 简介, 分类, 评分, 实测证据, 适合人群, 官网</div>
                <div>· 内部字段 (INTERNAL): 发现日期, 渠道返佣比例, 商务联系人, 小红书笔记URL, 转化量</div>
              </div>
              <div className="mt-3 text-[11px] text-emerald-400 font-sans">
                ✓ 本地已封装完善的 storageService 与 JSON 导出结构，随时可一键对接。
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Backup & Export/Import */}
        {activeTab === 'backup' && (
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-base font-bold text-white mb-2">全站数据备份与本地迁移</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                你可以随时将当前浏览器保存的所有自研产品、实测工具以及实验室文章一键导出为标准的 JSON 备份文件，也可以在另一台设备或部署环境下一键导入还原。
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={handleExportBackup}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>导出完整 JSON 备份 (Download Backup)</span>
                </button>

                <label className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer transition-colors">
                  <Upload className="h-4 w-4" />
                  <span>导入 JSON 备份文件</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportBackup}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={handleResetDefaults}
                  className="flex items-center gap-2 rounded-xl border border-slate-800 px-4 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-950/20 hover:border-rose-900 transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>重置回默认预设</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tool Edit Modal */}
        {isToolModalOpen && editingTool && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 bg-[#0d131f] p-6 text-slate-200 shadow-2xl text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white">
                  {editingTool.name ? `编辑实测工具：${editingTool.name}` : '录入新实测工具'}
                </h3>
                <button
                  onClick={() => setIsToolModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">工具名称</label>
                  <input
                    type="text"
                    value={editingTool.name}
                    onChange={(e) => setEditingTool({ ...editingTool, name: e.target.value })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-white focus:outline-none"
                    placeholder="如：Gamma"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">分类场景</label>
                  <select
                    value={editingTool.category}
                    onChange={(e) => {
                      const cat = e.target.value as ToolItem['category'];
                      setEditingTool({
                        ...editingTool,
                        category: cat,
                        categoryLabelZh:
                          cat === 'presentation'
                            ? '做PPT'
                            : cat === 'writing'
                            ? '写文章'
                            : cat === 'image'
                            ? '做图'
                            : cat === 'video'
                            ? '做视频'
                            : cat === 'website'
                            ? '做网站'
                            : '其他',
                      });
                    }}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-white focus:outline-none"
                  >
                    <option value="presentation">做PPT (presentation)</option>
                    <option value="writing">写文章 / 知识库 (writing)</option>
                    <option value="image">做图 (image)</option>
                    <option value="video">做视频 (video)</option>
                    <option value="research">找资料 (research)</option>
                    <option value="website">做网站 / 编程 (website)</option>
                    <option value="automation">自动化工作 (automation)</option>
                    <option value="career">找工作 (career)</option>
                    <option value="content">做内容 (content)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">一句话介绍</label>
                <input
                  type="text"
                  value={editingTool.summary}
                  onChange={(e) => setEditingTool({ ...editingTool, summary: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-white focus:outline-none"
                  placeholder="清晰描述它最核心的亮点..."
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Quinnverse 实测深度结论与踩坑证据</label>
                <textarea
                  rows={3}
                  value={editingTool.testExperience}
                  onChange={(e) => setEditingTool({ ...editingTool, testExperience: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-white focus:outline-none"
                  placeholder="记录真实测试结果、生成质量、中文断句、以及不可回避的缺点..."
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">实测评分 (0~5.0)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1.0"
                    max="5.0"
                    value={editingTool.rating}
                    onChange={(e) => setEditingTool({ ...editingTool, rating: parseFloat(e.target.value) || 4.5 })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">中文本土化</label>
                  <select
                    value={editingTool.chineseSupport}
                    onChange={(e) => setEditingTool({ ...editingTool, chineseSupport: e.target.value as any })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white focus:outline-none"
                  >
                    <option value="full">全面支持</option>
                    <option value="partial">部分支持</option>
                    <option value="none">暂不支持</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">国内可用性</label>
                  <select
                    value={editingTool.domesticAvailability}
                    onChange={(e) => setEditingTool({ ...editingTool, domesticAvailability: e.target.value as any })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white focus:outline-none"
                  >
                    <option value="yes">国内直连秒开</option>
                    <option value="partial">需海外网络环境</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">官网链接 (Official URL)</label>
                  <input
                    type="url"
                    value={editingTool.officialUrl}
                    onChange={(e) => setEditingTool({ ...editingTool, officialUrl: e.target.value })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">渠道推广链接 (Affiliate URL, 可选)</label>
                  <input
                    type="url"
                    value={editingTool.affiliateUrl || ''}
                    onChange={(e) => setEditingTool({ ...editingTool, affiliateUrl: e.target.value })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white focus:outline-none"
                    placeholder="https://.../?ref=quinnverse"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2">
                  <label className="text-slate-400">发布状态：</label>
                  <select
                    value={editingTool.status}
                    onChange={(e) => setEditingTool({ ...editingTool, status: e.target.value as any })}
                    className="rounded border border-slate-700 bg-slate-950 p-1.5 text-white"
                  >
                    <option value="published">已发布 (公开可见)</option>
                    <option value="draft">草稿 (仅后台可见)</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsToolModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-slate-400 hover:text-white"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleSaveTool}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 font-semibold text-white hover:bg-emerald-500"
                  >
                    <Save className="h-4 w-4" />
                    <span>保存并更新网站</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Post Edit Modal */}
        {isPostModalOpen && editingPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 bg-[#0d131f] p-6 text-slate-200 shadow-2xl text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white">编辑实验室手记</h3>
                <button
                  onClick={() => setIsPostModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">文章标题</label>
                <input
                  type="text"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-white focus:outline-none"
                  placeholder="文章标题..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">分类</label>
                  <select
                    value={editingPost.category}
                    onChange={(e) => {
                      const cat = e.target.value as LabPost['category'];
                      setEditingPost({
                        ...editingPost,
                        category: cat,
                        categoryLabelZh:
                          cat === 'build_log'
                            ? '构建日志'
                            : cat === 'experiment'
                            ? '产品实验'
                            : cat === 'methodology'
                            ? '方法 / 教程'
                            : '手记 / 观点',
                      });
                    }}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white focus:outline-none"
                  >
                    <option value="build_log">构建日志 (Build Log)</option>
                    <option value="experiment">产品实验 (Experiment)</option>
                    <option value="methodology">方法 / 教程 (Methodology)</option>
                    <option value="essay">手记 / 观点 (Essay)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">预计阅读时长</label>
                  <input
                    type="text"
                    value={editingPost.readTime}
                    onChange={(e) => setEditingPost({ ...editingPost, readTime: e.target.value })}
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2 text-white focus:outline-none"
                    placeholder="如：6 分钟"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">摘要导语</label>
                <textarea
                  rows={2}
                  value={editingPost.excerpt}
                  onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">正文 (Markdown)</label>
                <textarea
                  rows={8}
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-white font-mono focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setIsPostModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-400 hover:text-white"
                >
                  取消
                </button>
                <button
                  onClick={handleSavePost}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-600 font-semibold text-white hover:bg-amber-500"
                >
                  <Save className="h-4 w-4" />
                  <span>保存发布文章</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
