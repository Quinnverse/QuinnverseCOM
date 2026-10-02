import { 
  ProductItem, 
  PickItem, 
  LabExperiment, 
  JournalArticle, 
  ResourceItem, 
  ActivityFeedItem,
  ServiceItem,
  SiteSettings 
} from '../types';

export const SITE_SETTINGS: SiteSettings = {
  icpNumber: '浙ICP备2026075936号',
  contactEmail: 'zhangqiyun2000@163.com',
  githubUrl: 'https://github.com/quinnverse',
  status: '个人独立产品工作室',
};

export const PRODUCTS: ProductItem[] = [
  {
    id: 'prod-copilot',
    slug: 'job-application-copilot',
    name: 'Job Application Copilot / Job OS',
    family: 'GLOBAL_PRODUCT',
    stage: 'Beta',
    tagline: '面向海外招聘站点的确定性职位抓取、申请看板与表单填充工作台。',
    summary: '解决海外求职过程中职位信息分散、重复机械填表与申请进度混乱的卡点。通过浏览器插件与云端工作台，提供确定性的捕获与结构化流转。',
    problemSolved: '海量岗位投递时，职位描述散落在不同标签页；每家公司的 ATS 表单（Greenhouse、Lever、Ashby 等）要求机械重复填写大量相同经历；申请状态缺乏集中同步。',
    features: [
      '职位页面一键捕获：精准提取公司、岗位头衔、薪资与完整 JD，一键归集至工作台',
      '跨站点看板流转：Saved → Applied → Interviewing → Offered 全链路可视化跟踪',
      '确定性规则预填 (Deterministic Autofill)：基于用户确认的真实经历进行精准表单匹配，拒绝大模型幻觉',
      '结构化数据存储：申请材料版本受控，随时检索不同公司提交的历史版本',
    ],
    principles: [
      '确定性优先：核心解析与填表走规则匹配与 DOM 解析，绝不把脆弱的 LLM 作为核心骨干链路',
      '不虚构经历：所有填报材料来自求职者核实的真实经历，绝不捏造任何未确认信息',
      '用户主权核准：绝不代用户后台自动盲投，每一次提交动作必须由本人在网页端最后确认',
      '不宣称破解 ATS：专注于大幅削减手工机械填表阻力，不把产品包装成任何招聘算法破解器',
    ],
    workflow: [
      { step: '01', title: 'Extension Capture', desc: '在招聘页面一键提取结构化职位字段，保存至个人工作台' },
      { step: '02', title: 'Status Tracking', desc: '申请进度看板流转，自动记录投递时间与对应简历版本' },
      { step: '03', title: 'Deterministic Autofill', desc: '打开 ATS 申请表，一键高精度预填个人信息与经历字段' },
      { step: '04', title: 'Final Review', desc: '求职者人工检查无误后，手动点击提交，保持 100% 真实' },
    ],
    techStack: ['TypeScript', 'Chrome Extension MV3', 'React', 'Node.js', 'PostgreSQL'],
    previewImage: '',
    independentSiteStatus: '独立出海落地页筹备中 (TBD)',
    relatedJournal: ['ai-workflow-specs'],
  },
  {
    id: 'tool-tingmo',
    slug: 'tingmo',
    name: '听默 (TingMo)',
    family: 'SMALL_TOOL',
    stage: 'Live',
    tagline: '专业课与学习笔记转结构化音频播客，支持单句微循环与录音复述。',
    summary: '为解决边走边复习大段专业概念而设计。将枯燥长文本转为音频流，支持局部卡点循环、倍速切换与本地数据存储。',
    problemSolved: '长时间盯着屏幕阅读长篇笔记容易视觉疲劳，且在户外散步或通勤时无法高效复盘知识点。',
    features: [
      '单句循环与倍速调节：把卡住的概念反复播放直到彻底领会',
      '录音复述对比：从“听过”进阶到真正能自己清晰讲出来',
      '纯本地离线数据：无需复杂登录注册，所有学习进度保存在本地',
    ],
    principles: ['纯粹极简，无广告，打开即用'],
    techStack: ['Web Audio API', 'React', 'Vite', 'Local Storage'],
    externalUrl: 'https://tingmo.quinnverse.tech',
    relatedJournal: ['building-tingmo'],
  },
  {
    id: 'tool-weread',
    slug: 'weread-dashboard',
    name: '微信读书数据看板 (WeRead Dashboard)',
    family: 'SMALL_TOOL',
    stage: 'Live',
    tagline: '基于 Cloudflare Worker 的阅读数据自动化同步与年度认知图景。',
    summary: '自动化同步微信读书阅读时长、划线金句与批注，将散落在移动端的碎片记录汇聚成长期知识地图。',
    problemSolved: '阅读时的划线与批注散落在书本各个章节中，缺乏统一导出的看板，时间一长容易遗忘。',
    features: [
      '专注时长量化：沉淀阅读小时数，看见长期积累的复利',
      '划线金句轨迹：汇聚各书籍的高光想法，方便二次温习',
      '年度图景呈现：把碎片化的阅读习惯拼成一张完整的阅读地图',
    ],
    principles: ['轻量同步，纯粹数据展示，支持私有化部署'],
    techStack: ['Cloudflare Workers', 'Tailwind CSS', 'TypeScript'],
    externalUrl: 'https://weread.quinnverse.tech',
    relatedJournal: ['weread-data-pipeline'],
  },
  {
    id: 'tool-cloze',
    slug: 'cloze-recitation',
    name: '完形填空背诵记忆 (Cloze Recitation)',
    family: 'SMALL_TOOL',
    stage: 'Live',
    tagline: '基于 Active Recall 主动回忆神经提取机制的填空背诵训练器。',
    summary: '自动在文本中制造认知盲区，强迫大脑进行神经检索提取，配合全键盘盲打，强化大段法条与概念的长期记忆。',
    problemSolved: '机械反复阅读并不能形成稳固记忆，传统死记硬背缺乏主动检索刺激，考试时容易卡壳。',
    features: [
      '全键盘盲打交互：Tab / Enter 丝滑切题，契合大脑瞬间提取反射',
      '即时正误比对：色彩高亮即时反馈，支持一键对比原文',
      '认知间隙算法：根据记忆规律动态调节填空掩码密度',
    ],
    principles: ['科学记忆模型驱动，零干扰纯净界面'],
    techStack: ['React', 'TypeScript', 'Web Storage'],
    externalUrl: 'https://clozerecitation.quinnverse.tech',
    relatedJournal: ['active-recall-recitation'],
  },
];

export const PICKS: PickItem[] = [
  {
    id: 'pick-cursor',
    slug: 'cursor',
    name: 'Cursor',
    category: '编程开发',
    evidenceLevel: 'DAILY DRIVER',
    lastTested: '2026-09',
    summary: '深度整合大模型的现代代码编辑器，项目级上下文索引和 Tab 补全表现出色。',
    whatItDoes: '基于 VS Code 二次开发的 AI 优先代码编辑器，支持对话式重构与智能跨文件代码生成。',
    whatWeFound: '在日常工程实践中，其对项目全貌的理解和 Tab 自动补全处于行业第一梯队，能显著减少编写样板代码与重构的机械摩擦力。',
    worksWell: [
      '中小型全栈项目的架构调整与跨文件逻辑快速定位',
      '基于当前文件及依赖的精准 Tab 补全预测',
      '根据 Git Diff 自动排查潜在语法与逻辑缺陷',
    ],
    fallsShort: [
      '在百万行级别的超大单体仓库中全库索引较慢',
      '长会话指令复杂时偶尔产生幻觉，修改了无需改动的周边文件',
    ],
    bestFor: ['独立开发者', '全栈工程师', '注重快速验证交付的工程团队'],
    notFor: ['严格禁止代码出境的高密级内网环境', '仅做简单文本编辑的轻度用户'],
    pricingAccess: {
      pricingModel: '免费增值 (Pro 20美元/月)',
      accessFromChina: '需特定网络',
      pricingNote: '免费版有每月快速请求上限，深度主力使用建议 Pro 订阅。',
    },
    alternatives: ['VS Code + Continue', 'Windsurf'],
    officialUrl: 'https://cursor.com',
    affiliateRelationship: false,
    relatedJournal: ['ai-workflow-specs'],
    featured: true,
  },
  {
    id: 'pick-n8n',
    slug: 'n8n',
    name: 'n8n',
    category: '效率自动化',
    evidenceLevel: 'USED IN PROJECT',
    lastTested: '2026-08',
    summary: '可自托管的节点式工作流自动化平台，对敏感数据拥有完整控制权。',
    whatItDoes: '支持跨系统 API 编排、数据异步搬运、Webhook 监听与私有 AI 节点接入的自动化中间件。',
    whatWeFound: '相较昂贵的商业自动化 SaaS，n8n 的开源自托管版本赋予了完全的数据隐私自主权，特别适合自建私有数据管线。',
    worksWell: [
      '多平台数据异步搬运与格式清洗',
      'Webhook 触发的高可定制后台自动化流程',
      '私有 LLM 节点的安全串联，数据完全留在本地',
    ],
    fallsShort: [
      '需要基础的 Docker 部署与 Linux 服务器运维知识',
      '复杂并发流程下的内存管理与日志清理需要手动调优',
    ],
    bestFor: ['具备自建服务器能力的开发者', '注重商业数据隐私的小团队'],
    notFor: ['不希望维护任何服务器、只想通过简单点选的用户'],
    pricingAccess: {
      pricingModel: '开源免费 / 官方云托管付费',
      accessFromChina: '国内直连 (自建部署模式)',
      pricingNote: '社区开源版完全免费；官方提供 Cloud 托管版。',
    },
    alternatives: ['Make', 'Zapier'],
    officialUrl: 'https://n8n.io',
    affiliateRelationship: false,
    relatedJournal: ['weread-data-pipeline'],
    featured: true,
  },
  {
    id: 'pick-obsidian',
    slug: 'obsidian',
    name: 'Obsidian',
    category: '知识与笔记',
    evidenceLevel: 'DAILY DRIVER',
    lastTested: '2026-09',
    summary: '基于本地纯文本 Markdown 的双链知识管理底座，数据主权永久属于用户。',
    whatItDoes: '以本地文件夹和 Markdown 文件为核心的知识图谱软件，支持强大的社区插件与双向链接。',
    whatWeFound: '在笔记软件纷纷转向封闭云端数据库的时代，Obsidian 对本地文本格式的坚持让所有知识资产拥有极高的安全性与跨代寿命。',
    worksWell: [
      '长期思考与实测笔记的无门槛沉淀',
      '概念双向链接图谱，自发构建第二大脑',
      '与本地 Git、自动化脚本无缝集成',
    ],
    fallsShort: [
      '开箱即用度有限，需要花时间调试适合自己的工作流',
      '官方原生多端同步（Obsidian Sync）需额外付费订阅',
    ],
    bestFor: ['注重数字隐私与长期资产保存的终身学习者', '独立创作者'],
    notFor: ['需要多人实时协同编辑的团队办公场景（建议飞书或 Notion）'],
    pricingAccess: {
      pricingModel: '完全免费 (官方云同步等服务付费)',
      accessFromChina: '国内直连',
      pricingNote: '个人日常使用完全免费，无功能阉割。',
    },
    alternatives: ['Logseq', 'Notion'],
    officialUrl: 'https://obsidian.md',
    affiliateRelationship: false,
    featured: true,
  },
  {
    id: 'pick-dify',
    slug: 'dify',
    name: 'Dify',
    category: 'AI Agent',
    evidenceLevel: 'TESTED',
    lastTested: '2026-07',
    summary: '可视化的 LLM 知识库与 Agent 编排框架，RAG 切片测试极具效率。',
    whatItDoes: '提供开箱即用的向量检索、Agent 编排与 API 发布能力，支持快速验证大模型场景。',
    whatWeFound: '在做知识库分段检索准确率调优和 Agent 原型打磨时，可视化画布极大缩减了编写胶水代码的重复劳动。',
    worksWell: [
      '企业知识库 RAG 的快速原型构建与切片召回测试',
      '非程序员参与的提示词编排与业务流程演示',
    ],
    fallsShort: [
      '深度定制极限复杂的动态条件分支时，节点图会变得极其复杂',
    ],
    bestFor: ['需要快速验证 AI 原型的工程师与产品团队'],
    notFor: ['仅需要普通单次聊天对话的终端用户'],
    pricingAccess: {
      pricingModel: '开源自建免费 / 云端免费增值',
      accessFromChina: '国内直连',
      pricingNote: '云端提供免费测试额度，私有化部署完全开源。',
    },
    alternatives: ['FastGPT', 'Coze'],
    officialUrl: 'https://dify.ai',
    affiliateRelationship: false,
  },
  {
    id: 'pick-comfyui',
    slug: 'comfyui',
    name: 'ComfyUI',
    category: '设计视觉',
    evidenceLevel: 'TESTED',
    lastTested: '2026-06',
    summary: '节点式 Diffusion 图像生成运行环境，显存控制与流程复现性一流。',
    whatItDoes: '基于节点网络精准控制扩散模型每一步隐空间变换、ControlNet 与采样器的专业生图工具。',
    whatWeFound: '彻底解构了生图过程中的每一个数学阶段，相比传统 WebUI 重现性极好，显存调度效率显著更高。',
    worksWell: [
      '高保真视觉资产的批量流水线定制',
      '严苛控制主体姿态、结构与光影约束',
    ],
    fallsShort: [
      '学习门槛高，自定义节点生态容易产生 Python 依赖冲突',
    ],
    bestFor: ['具备折腾精神的技术型视觉创作者与设计师'],
    notFor: ['只想简单输入一句话获取现成好看图的普通用户（建议直接使用 Midjourney）'],
    pricingAccess: {
      pricingModel: '开源免费',
      accessFromChina: '国内直连 (需本地显卡运行)',
      pricingNote: '完全开源；需本地配备独立显卡算力。',
    },
    alternatives: ['SD WebUI', 'Midjourney'],
    officialUrl: 'https://github.com/comfyanonymous/ComfyUI',
    affiliateRelationship: false,
  },
  {
    id: 'pick-gemini',
    slug: 'gemini',
    name: 'Google Gemini',
    category: '基础模型',
    evidenceLevel: 'NEEDS CONFIRMATION',
    lastTested: '2026-09',
    summary: '原生超大上下文与高保真多模态识别的基础大语言模型。',
    whatItDoes: '支持百万级 Token 窗口的大模型，擅长长篇工程代码库分析与音频视觉理解。',
    whatWeFound: '百万级别的长窗口在排查整个大型工程目录与长篇学术资料时表现突出，多模态帧定位准确。具体主力等级待主理人复核。',
    worksWell: [
      '全仓库长文本审计与复杂跨文件上下文关联',
      '原生音频与图文多模态特征识别',
    ],
    fallsShort: [
      '某些地道中文复杂推理偶有钝感；需要特定的海外访问环境',
    ],
    bestFor: ['需要一次性处理海量长资料的开发者与研究者'],
    notFor: ['无法配置海外访问网络的用户'],
    pricingAccess: {
      pricingModel: '开发免费增值 / 按 Token 计费',
      accessFromChina: '需特定网络',
      pricingNote: 'AI Studio 提供高频测试免费配额。',
    },
    alternatives: ['Claude 3.5 Sonnet', 'GPT-4o'],
    officialUrl: 'https://ai.google.dev',
    affiliateRelationship: false,
  },
];

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: 'exp-anti-slop-01',
    slug: 'exp-anti-slop-01',
    title: '独立软件界面去油腻文案约束规则集',
    status: 'OPEN SOURCE',
    date: '2026-09',
    hypothesis: '通过显式注入对“赋能、闭环、颠覆、全链路”等 80 余项企业级公关废话的负向采样抑制，能够强制让生成内容回归清晰、有事实根据的工程师语言。',
    whatWasBuilt: '整理了一份面向中英界面文案审查的 Negative Constraints List（负向约束词典），并挂载在日常文本生成流程中。',
    whatHappened: '在 50+ 次页面文案对比中，AI 生成废话的概率降低了 90% 以上，文本密度显著提升。',
    whatFailed: '早期规则过于严苛，曾导致部分正常的行业标准技术名词（如“闭环反馈系统”）被误杀，后续通过语义白名单进行了二次修正。',
    learnings: '高质量的表达首先来自于对空话的主动剪裁。该规则集已固化为 Quinnverse 官网所有文案的底层审查基准。',
    githubUrl: 'https://github.com/quinnverse',
    relatedJournal: ['anti-slop-guide'],
  },
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-ai-workflow',
    slug: 'ai-workflow-specs',
    title: '一份规则文件让 AI 从随缘写代码变成按流程交付',
    category: 'ENGINEERING',
    date: '2026-09',
    readTime: '6 分钟',
    excerpt: '为什么很多时候用 AI 辅助编码越改越乱？核心往往在于没有给它立下不可违背的工程边界。用统一规则文件约束 AI 的输出行为。',
    content: `在日常使用 AI 辅助编码时，很多人最常遇到的痛点就是：一开始看起来很惊艳，但随着项目规模稍稍变大，AI 就开始随意删除现有代码、引入冲突的新包，或者用臆想出来的 API 替换稳定逻辑。

根本原因在于：大语言模型天然倾向于“给出答案”，哪怕这个答案需要破坏现有工程结构。

我们在日常实践中总结出的第一条法则就是：用一份只读的规则约束文件，锁死 AI 的改动边界：
1. 不准擅自引入未在 package.json 中的第三方依赖；
2. 不准重写已经稳定运行的现有数据结构；
3. 任何改动必须保持局部精确，先读后改；
4. 杜绝为了解决一个局部问题而推翻整个模块。

当给大模型套上这层工程规矩后，它才真正从一个随性发挥的玩具，变成一个可以稳定交付生产代码的可靠工具。`,
    tags: ['AI 编码', '工程规范', 'Cursor', '开发实践'],
    relatedPicks: ['cursor'],
  },
  {
    id: 'art-building-tingmo',
    slug: 'building-tingmo',
    title: '把专业课变成播客后，走路也能复习了',
    category: 'BUILD LOG',
    date: '2026-07',
    readTime: '5 分钟',
    excerpt: '为了在户外漫步与散步时也能温习大段专业概念，我们做了听默 TingMo。记录音频断点与单句循环背后的极简工程思考。',
    content: `有些复杂概念光靠眼睛看容易视觉疲劳，尤其是大段的理论逻辑，硬盯着屏幕看十遍依然容易走神。

当时就想：如果能把长篇笔记直接转成音频，在通勤或者在户外散步时边走边听，是不是效率会高得多？

做 TingMo 的初衷非常简单：
第一，必须支持单句微循环。卡住的那一句话，能够一键倒退反复重听，直到听懂为止；
第二，必须支持录音复述。光听会造成“自以为懂了”的错觉，只有自己能讲出来，才算真正吸收；
第三，数据必须完全留在本地浏览器，无需登录注册，不打扰沉浸式的心流。

这就是独立工具最朴实的价值：不求做大而全的平台，只把一个极其具体的麻烦彻底解决。`,
    tags: ['TingMo', '学习工具', '音频复习', '独立构建'],
    relatedProducts: ['tingmo'],
  },
  {
    id: 'art-weread-pipeline',
    slug: 'weread-data-pipeline',
    title: '我把微信读书接进工作流里，散落的划线有了家',
    category: 'BUILD LOG',
    date: '2026-06',
    readTime: '7 分钟',
    excerpt: '微信读书里划了上千条金句，时间一长全部沉没。如何用 Cloudflare Worker 搭建轻量无服务器管道，把碎片知识自动化归集。',
    content: `在手机上读书确实方便，但最头疼的问题就是“划线即遗忘”。在几十本书里划了上千段句子，如果不主动提取，它们就永远只是一堆躺在 App 数据库里的孤立碎片。

为了让这些划线重新活过来，我们通过 Cloudflare Worker 构建了一条自动同步的数据流：
每当微信读书产生新的批注和阅读时长，Worker 自动唤醒并完成清洗，格式化为 Markdown 写入私有看板。

这样一来：
1. 每周末可以一目了然看到本周新增的所有高光思考；
2. 划线不再是一次性的冲动，而是可以直接复用在后续文章与产品设计中的弹药；
3. 无需依赖复杂的重量级第三方同步插件，全链路完全透明、轻量且稳定。`,
    tags: ['微信读书', '数据流', 'Cloudflare Workers', '自动化'],
    relatedPicks: ['n8n', 'obsidian'],
  },
  {
    id: 'art-active-recall',
    slug: 'active-recall-recitation',
    title: '完形填空背诵工具的认知心理学与主动回忆',
    category: 'ENGINEERING',
    date: '2026-05',
    readTime: '8 分钟',
    excerpt: '机械反复阅读并不能形成稳固记忆。通过自动制造认知空白与强迫神经检索，将背诵效率提升到全新维度的逻辑推演。',
    content: `认知心理学领域无数次实验证明过一个基本事实：Repeated Reading（反复重读）是所有学习方法中效率最低的一种。它给学习者带来的仅仅是一种“熟练度幻觉”（Illusion of Competence）——眼睛觉得看懂了，合上书脑袋依然空空如也。

真正能把知识巩固进长期记忆的唯一途径是 Active Recall（主动回忆 / 神经提取）。

完形填空背诵记忆（Cloze Recitation）就是基于这个逻辑制作的小工具：
它在一段完整的概念中，根据语义自动挖空部分关键词，强迫你的大脑在突触之间建立主动检索通路。
配合全键盘盲打的即时反馈，打错即刻标红，打对即刻放行。大脑经历过真实的检索阻力，记忆留存率自然比机械看书高出数倍。`,
    tags: ['认知心理学', '背诵神器', 'Active Recall', '学习工具'],
  },
  {
    id: 'art-anti-slop-guide',
    slug: 'anti-slop-guide',
    title: '独立工具去油腻指南：为什么我们坚持不用 AI 公关套话',
    category: 'CRITIQUE',
    date: '2026-09',
    readTime: '6 分钟',
    excerpt: '当全行业的大模型都在批量生成“赋能、全链路、行业领先”时，个人产品工作室最强大的护城河恰恰是诚实、具体与克制。',
    content: `打开现在的很多软件官网，你几乎能在 3 秒内识别出这是一家大模型批量生成的“虚假公司”：
满屏都是“赋能企业数字化转型”、“全链路一站式智能解决方案”、“重塑行业新未来”。

但如果你问一句：“你这个东西到底帮我省了哪一分钟？到底点了哪个按钮解决了什么卡点？”
绝大多数网站瞬间哑火。

Quinnverse 坚决拒绝这种虚浮的语言：
1. 说了什么功能，代码就必须有对应的实现；
2. 某个工具如果在特定场景下很慢、很难用，就堂堂正正写在“劝退”栏里；
3. 不假装自己有几十人团队，也不编造不存在的客户评价与数据。

在这个充斥着大模型生成的垃圾公关文本的时代，实事求是的工程师语言反而成了最稀缺的品质。`,
    tags: ['文案去油', '独立工作室', '批判思考', '产品设计'],
  },
];

export const RESOURCES: ResourceItem[] = [
  {
    id: 'res-diagram-types',
    slug: 'diagram-types-guide',
    title: '需求 → 图表类型速查手册',
    type: 'GUIDE',
    summary: '从流程、系统架构、时序调用、状态机与时间线五大逻辑关系出发选图，配可直接复用的 AI Prompt。',
    description: '图表不是把每一段文字装进圆角框。只有当信息之间存在确定的逻辑关系，图才会比表格或一句话更清楚。',
    content: `### 先问：它真的需要变成一张图吗？
图表不是把每一段文字装进圆角矩形。只有当信息之间存在立体关系，图才会比列表更清楚：
- 并列项目：优先使用列表
- 简单前后对比：优先使用两列对比表格
- 一个核心概念：先用一句话说明

### 再问：你想表达的核心关系是什么？
1. 流程与分叉 → Flowchart (流程图)
2. 系统边界与模块 → Architecture (架构图)
3. 跨系统时序调用 → Sequence Diagram (时序图)
4. 对象生命周期状态 → State Machine (状态机图)
5. 历史演进与里程碑 → Timeline (时间线图)`,
    copyableSnippet: `请阅读以下系统逻辑，根据【先判断关系、再生成图表】原则，将其转换为最契合的 Mermaid 图表代码。杜绝冗余无用节点，保持文字简洁与信息密度：\n\n[在此粘贴你的业务流程描述]`,
    relatedJournal: ['ai-workflow-specs'],
    relatedPicks: ['cursor'],
  },
  {
    id: 'res-diagram-10-questions',
    slug: 'diagram-10-questions',
    title: 'AI 画图前，先过这 10 问',
    type: 'CHECKLIST',
    summary: '信息图表的 3 秒密度测试与留白去噪清单。画图前先写完一句话：“读者看完后应该明白什么？”',
    description: '解决 AI 辅助绘图时常见的节点堆砌、连线杂乱与缺乏重点问题。通过 10 个具体问题完成图表质量审计。',
    content: `### 核心检验 10 问：
1. 先写完这句话：读者看完这张图后，应该立刻明白什么？（写不出来就别急着画图）
2. 这件事真的值得画成图吗？还是三句话就能讲清？
3. 有没有节点可以直接删掉而不影响理解？
4. 有没有两个节点可以合并为一个整体？
5. 每一根连线都在传递确定性的新信息吗？
6. 缩小看图 3 秒内，能知道视觉焦点在哪里吗？
7. 画面中的每一种颜色都有确定的功能含义吗？
8. 标题、节点、注释的排版层级足够清晰吗？
9. 是否把非必要的技术内部细节暴露给了非受众？
10. 整张图还能再多留一点呼吸的空白吗？`,
    copyableSnippet: `审阅以下图表描述：读者看完后应该立刻明白 [填入一句话]。请检查是否有多余节点与无效连线，削减 30% 干扰信息后重新输出：`,
  },
  {
    id: 'res-mermaid-prompts',
    slug: 'mermaid-ai-prompts',
    title: 'Mermaid 图表规范与 AI Prompt 配方',
    type: 'SKILL',
    summary: '解决 Mermaid 默认排版丑陋、连线打结问题的系统级提示词规范。',
    description: '通过严格的节点命名约束与子图（subgraph）包裹规则，让大模型生成的 Mermaid 图表整洁清晰。',
    content: `### Mermaid 生成规范要点：
- 严格声明从上到下 (TD) 或从左到右 (LR) 的明确流动方向；
- 节点文案保持在 12 个字以内，长描述使用外部注释；
- 相关联的模块使用 subgraph 分组，赋予一致的边框背景色；
- 连线必须带有确定性动词说明，不要只有光秃秃的箭头。`,
    copyableSnippet: `你是一位专业的信息架构师。请使用 Mermaid 语法将以下业务流转换为图表。规则要求：\n1. 统一采用 graph TD 方向；\n2. 每一个连接线上必须标注触发动作；\n3. 节点文本绝不超过 10 个字；\n4. 核心成功链路采用高亮样式，异常链路采用虚线标注。\n\n输入逻辑：\n[在此粘贴输入]`,
  },
];

export const ACTIVITY_FEED: ActivityFeedItem[] = [
  {
    id: 'act-1',
    date: '2026-09',
    type: 'PRODUCT',
    title: 'Job Application Copilot 完成 Lever 表单确定性解析链路测试',
    note: '针对海外主流招聘系统 Lever 完成了非大模型 DOM 结构化解析器验证。',
    link: '/products/job-application-copilot',
  },
  {
    id: 'act-2',
    date: '2026-09',
    type: 'PICK',
    title: 'Cursor 实测记录更新：确认在百万上下文索引下的边缘限制',
    note: '在超大单体仓库重构中发现索引卡顿现象，评测结论已同步补充。',
    link: '/picks/cursor',
  },
  {
    id: 'act-3',
    date: '2026-09',
    type: 'JOURNAL',
    title: '手记发布：《独立工具去油腻指南》',
    note: '探讨为什么个人产品工作室最应该警惕 AI 生成的虚假公关套话。',
    link: '/journal/anti-slop-guide',
  },
  {
    id: 'act-4',
    date: '2026-08',
    type: 'LAB',
    title: 'EXP-ANTI-SLOP-01 规则集通过阶段性验证',
    note: '完成 80 余项界面公关套话负向约束词典测试，并固化为全站审查标准。',
    link: '/lab/exp-anti-slop-01',
  },
  {
    id: 'act-5',
    date: '2026-07',
    type: 'RESOURCE',
    title: '《需求 → 图表类型速查手册》更新',
    note: '新增 Mermaid 状态机图选型配方与一键复制提示词。',
    link: '/resources/diagram-types-guide',
  },
];

export const STUDIO_SERVICES: ServiceItem[] = [
  {
    id: 'serv-prototype',
    title: 'AI Product Prototype',
    tagline: '从模糊的痛点想法，到可交互、已跑通数据链路的真实 MVP。',
    description: '不做ppt，直接把技术可行性做成一个真正能点击、能调通 API、能给真实用户测试的第一版可运行软件。',
    deliverables: ['可交互高保真前端界面', '跑通的后端/API管线', '最小可行性数据闭环', '部署指引与源码交付'],
    typicalTimeline: '1 ~ 3 周快速验证',
  },
  {
    id: 'serv-automation',
    title: 'Agent & Automation',
    tagline: '自动化工作流与轻量 Agent 落地，消除繁琐的跨系统机械搬运。',
    description: '针对小团队或具体业务流中重复手工搬运数据的低效环节，搭建确定性、低维护成本的自动化管线与辅助 Agent。',
    deliverables: ['n8n / 脚本自托管工作流', 'Webhook 自动化触发机制', '异常告警与日志记录', '私有安全运行环境'],
    typicalTimeline: '3 ~ 7 天交付',
  },
  {
    id: 'serv-web',
    title: 'Web Product',
    tagline: '现代极客审美的独立 Web 软件与高质量交互前端。',
    description: '告别廉价的传统外包模板感。打造高信息密度、克制留白、响应灵敏且具备独特气质的现代化独立产品。',
    deliverables: ['React / Vite 现代化前端', '极佳的响应式移动端支持', '清晰的数据层解耦', '生产级构建包'],
    typicalTimeline: '1 ~ 2 周设计与交付',
  },
  {
    id: 'serv-internal',
    title: 'Internal Tool Development',
    tagline: '针对特定业务卡点定制的小型私有内部软件。',
    description: '有些需求太小不值得买动辄数十万的重型系统，但又确实每天卡手。我们为你的特定流程定制轻便趁手的工具。',
    deliverables: ['专用数据处理小工具', '私有管理控制台', '轻量跨平台小软件', '无外部依赖单体运行'],
    typicalTimeline: '按具体卡点敏捷交付',
  },
];
