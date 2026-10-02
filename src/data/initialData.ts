import { ToolItem, ProductItem, LabPost } from '../types';

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod_copilot',
    slug: 'job-application-copilot',
    title: 'Job Application Copilot',
    titleEn: 'Job Application Copilot',
    subtitle: '让每一次求职，更高效，更具针对性。',
    subtitleEn: 'Make every application faster, sharper, and deeply tailored.',
    category: 'flagship',
    status: 'active',
    description:
      '为出海求职者与独立开发者打造的全流程网申协同系统。从职位 JD 语义解析、关键技能差距自检，到高通过率定制简历与求职信生成，全流程本地安全存储。',
    descriptionEn:
      'An end-to-end job application copilot for overseas applicants and indie makers. From JD semantic parsing to customized resume generation.',
    whyBuilt:
      '在海投海外产品岗位与技术岗位时，不同岗位的 ATS 筛选标准与痛点天差地别。手动修改 50 份简历既枯燥又容易偏题，通用大模型生成的文本又满是 AI 套话。因此我构建了这个工具，帮自己也帮更多求职者拿下面试。',
    whyBuiltEn:
      'When applying to international roles, ATS filters vary wildly. Manually customizing dozens of resumes is tedious, while generic LLMs produce fluff. I built this to land real interviews with concrete proof.',
    coverImage: '/src/assets/images/product_copilot_preview_1790970754120.jpg',
    url: '#/products/job-application-copilot',
    demoUrl: '#/products/job-application-copilot',
    features: [
      {
        title: '职位匹配分析',
        desc: '深度解析职位描述 (JD)，精准拆解硬技能、软素质与核心隐性要求，给出百分比匹配分与技能差距雷达。',
        icon: 'Target',
      },
      {
        title: '智能简历针对性优化',
        desc: '基于你的真实项目经验，重构 STAR 表达体系，量化结果指标，拒绝虚构经历，提升 ATS 扫描通过率。',
        icon: 'FileText',
      },
      {
        title: '个性化投递建议',
        desc: '自动生成符合目标公司风格的高转化求职信 (Cover Letter) 与针对招聘官的 LinkedIn 破冰打招呼文案。',
        icon: 'Sparkles',
      },
      {
        title: '隐私与安全原则',
        desc: '所有个人简历与投递历史优先存放在你的本地浏览器 IndexedDB，不上传公开大模型训练集。',
        icon: 'ShieldCheck',
      },
    ],
    steps: [
      {
        step: 1,
        title: '访问 / 导入信息',
        desc: '导入你的基础履历与项目经历库，支持一键解析现有 PDF 或 Markdown。',
      },
      {
        step: 2,
        title: '粘贴目标职位 JD',
        desc: '粘贴你想投递的具体岗位描述与公司信息，系统即刻进行多维匹配分析。',
      },
      {
        step: 3,
        title: '生成针对性内容',
        desc: '一键生成定制匹配的高亮简历、针对性求职信与重点攻关要点。',
      },
      {
        step: 4,
        title: '审核并一键导出',
        desc: '人工微调关键措辞，一键导出排版严谨的 ATS-Friendly PDF 或直接复制投递。',
      },
    ],
    faqs: [
      {
        q: '生成的简历会不会被 ATS 识别为 AI 生成而被刷掉？',
        a: '不会。Job Application Copilot 采用真实经历映射机制，仅优化句子表达力度、动词与量化成果，保留真实事实，完全符合海外招聘官的审阅偏好。',
      },
      {
        q: '我的个人隐私和经历数据会被记录吗？',
        a: '严格遵循本地存储机制。数据仅保存在客户端本地数据库，敏感个人信息不作外部留存。',
      },
      {
        q: '目前支持哪些语言的职位投递？',
        a: '深度支持英文与中文双语职位解析及投递材料生成，针对欧美、新加坡等主流海外市场做了专门适配。',
      },
    ],
  },
  {
    id: 'prod_finder_agent',
    slug: 'tool-finder-agent',
    title: 'AI 工具筛选 Agent',
    titleEn: 'AI Tool Finder Agent',
    subtitle: '告诉你的问题，我帮你找到最适合的工具。',
    subtitleEn: 'Tell us your challenge, we match the exact vetted AI tool.',
    category: 'agent',
    status: 'active',
    description:
      '拒绝信息过载与软文营销。直连 Quinnverse 深度实测数据库，只需自然语言描述你的具体需求、预算和限制，Agent 即刻为你匹配最精准的方案。',
    descriptionEn:
      'Directly hooked to Quinnverse Tested Database. Ask in natural language to get unbiased recommendations with real tested evidence.',
    whyBuilt:
      '网上的 AI 工具导航站充斥着成千上万个未经实测的链接，用户试错成本极高。我们把“亲身测过的真实数据”交给智能 Agent，帮你一秒做出明智选型。',
    whyBuiltEn:
      'Traditional directories dump hundreds of useless links. We pair real tested evaluations with an intelligent recommendation agent.',
    coverImage: '/src/assets/images/hero_workspace_cosmic_1790970739935.jpg',
    url: '#/agent',
    features: [
      {
        title: '真实实测数据驱动',
        desc: '背后读取 Quinnverse 逐项测试过的实测库，包含中文支持、国内可用度与真实踩坑点。',
        icon: 'Database',
      },
      {
        title: '分层推荐体系',
        desc: '不仅给出最适合你的 Top Pick，还给出成熟备选与适合折腾的开源方案。',
        icon: 'Layers',
      },
      {
        title: '真实优缺点证据',
        desc: '客观揭露免费版限额、生成失误率及门槛，不报喜不报忧。',
        icon: 'CheckCircle',
      },
    ],
    steps: [
      { step: 1, title: '描述你的场景', desc: '例如“我想做小红书封面，不想学复杂PS，最好中文可用”。' },
      { step: 2, title: '智能语义匹配', desc: 'Agent 结合实测库交叉比对定价、网络要求与功能成熟度。' },
      { step: 3, title: '查看实测报告', desc: '获得包含客观证据的 2~3 个精选工具及直接前往入口。' },
    ],
    faqs: [
      {
        q: '这个 Agent 和普通 ChatGPT 搜工具有什么不同？',
        a: '通用模型往往只根据互联网训练数据回答，经常推荐已停更或严重夸大的产品；Quinnverse Agent 读取的是我们真实上手测试过、有证据记录的独立数据库。',
      },
    ],
  },
  {
    id: 'prod_dev_quick_ship',
    slug: 'dev-quick-ship',
    title: '出海极速独立开发脚手架',
    titleEn: 'Indie Dev Quick Ship Kit',
    subtitle: '72 小时从一个想法，到上线支持全球支付的出海 Web App。',
    subtitleEn: 'From zero to globally paying Web App in 72 hours.',
    category: 'flagship',
    status: 'active',
    description:
      '集成 Stripe/Creem 订阅计费、多语言 i18n、本地隐私存储与服务端 API 代理，开箱即用的现代全栈出海模板，无需每次重新造轮子。',
    descriptionEn:
      'Full-stack production boilerplate with Stripe/LemonSqueezy, i18n, privacy storage, and API routing ready on day one.',
    whyBuilt:
      '很多独立开发者卡在登录、计费与环境部署上，耗费数周时间还未开始验证核心价值。这个脚手架打包了我过去上线的全部基础设施实践。',
    whyBuiltEn:
      'Indie makers often waste weeks on auth and billing plumbing. This kit packages my battle-tested deployment stack.',
    coverImage: '/src/assets/images/lab_creator_workspace_1790970765025.jpg',
    url: '#/products/dev-quick-ship',
    demoUrl: '#/products/dev-quick-ship',
    features: [
      {
        title: '全球即时结算',
        desc: '预置 Stripe 与海外合规代收商 Webhook 接入逻辑，支持月度/年度订阅与单次购买。',
        icon: 'CreditCard',
      },
      {
        title: '多语言与国际化',
        desc: '内置中英双语与 RTL 布局支持，自动探测访问者 IP/浏览器语言环境。',
        icon: 'Globe',
      },
      {
        title: '极速冷启动',
        desc: '基于 React 19 + Vite 8 + Express，首屏极致优化，无冗余中间层。',
        icon: 'Zap',
      },
      {
        title: '生产级 SEO & OG 卡片',
        desc: '开箱包含动态社交分享卡片渲染与结构化 Schema 数据，提升 Google 收录效率。',
        icon: 'Share2',
      },
    ],
    steps: [
      { step: 1, title: '克隆仓库与安装依赖', desc: '一条命令拉取完整脚手架，预置生产环境 TypeScript 约束。' },
      { step: 2, title: '配置环境变量', desc: '填入你的 Stripe API Key 和域名，零配置自动绑定。' },
      { step: 3, title: '专注编写核心业务', desc: '将精力聚焦在你的核心功能与解决真实用户问题上。' },
      { step: 4, title: '一键部署到 Cloud Run', desc: '享受冷启动自动缩容到零的高性价比现代化架构。' },
    ],
    faqs: [
      {
        q: '没有海外公司实体可以使用这套脚手架吗？',
        a: '可以。我们整合了支持个人主体的海外结算渠道接入方案与合规开户指导。',
      },
      {
        q: '技术栈包含哪些？',
        a: 'React 19 + TypeScript + Tailwind CSS 4 + Express + Vite，轻量且完全自主可控。',
      },
    ],
  },
  {
    id: 'prod_content_remix',
    slug: 'content-remix-flow',
    title: '全渠道自媒体分发工作流',
    titleEn: 'Content Remix & Distribution Flow',
    subtitle: '把一篇真实深度评测，自动重构为小红书图文、X 帖子与短视频脚本。',
    subtitleEn: 'Turn one in-depth test report into multi-platform visual cards and threads.',
    category: 'micro',
    status: 'active',
    description:
      '为内容创作者定制的工作流套件。告别重复手动排版，依据各大平台算法调性，将长文本评测一键重构为卡片笔记与分镜脚本。',
    descriptionEn:
      'Automated content pipeline re-architecting raw test records into high-converting social carousels and video scripts.',
    whyBuilt:
      '每次完成长达 2000 字的工具评测后，手动改写多平台图文耗时数小时。用一套结构化工作流串联，产出效率提升 5 倍以上。',
    whyBuiltEn:
      'Manually adapting essays into platform-native formats took hours. This flow automates format transformation seamlessly.',
    coverImage: '/src/assets/images/hero_workspace_cosmic_1790970739935.jpg',
    url: '#/products/content-remix-flow',
    demoUrl: '#/products/content-remix-flow',
    features: [
      {
        title: '小红书封面与排版',
        desc: '自动提取痛点标题与 3:4 比例图文卡片大纲，突出真实测评结论。',
        icon: 'Image',
      },
      {
        title: 'X (Twitter) 连推生成',
        desc: '生成短平快、高互动的 Hook 连推，附带关键数据对比。',
        icon: 'Twitter',
      },
      {
        title: '短视频分镜脚本',
        desc: '自动切分前 3 秒黄金停留 Hook、核心演示与行动号召 (CTA)。',
        icon: 'Video',
      },
      {
        title: '渠道转化跟踪',
        desc: '自动附带 Quinnverse 对应实测工具的专用归因标记，方便衡量转化。',
        icon: 'TrendingUp',
      },
    ],
    steps: [
      { step: 1, title: '输入评测笔记或主题', desc: '粘贴你在实测库中记录的原始测试记录。' },
      { step: 2, title: '选择目标分发渠道', desc: '勾选小红书、X、视频号或博客多平台。' },
      { step: 3, title: '智能生成多形态草稿', desc: '算法自动适配不同受众风格，生成结构化输出。' },
      { step: 4, title: '一键复制并发布', desc: '微调文字即可发布，大幅减少创作摩擦。' },
    ],
    faqs: [
      {
        q: '生成的文案会不会有明显的“AI味”？',
        a: '我们在提示词工程中严格杜绝了“在当今快节奏的社会”、“值得注意的是”等空洞套话，完全以第一人称实测视角输出。',
      },
    ],
  },
  {
    id: 'prod_ats_scanner',
    slug: 'ats-resume-scanner',
    title: '本地隐私 ATS 简历检测器',
    titleEn: 'Local Privacy ATS Resume Scanner',
    subtitle: '纯前端运行，100% 本地解析，检测海外简历关键词匹配与排版风险。',
    subtitleEn: 'Client-side ATS keyword scanner. Zero data leaves your browser.',
    category: 'micro',
    status: 'active',
    description:
      '求职者的隐私守门员。直接在浏览器内解析 PDF/Word 简历结构，指出可能被海外 ATS（Workday/Greenhouse/Lever）误判的格式错误。',
    descriptionEn:
      'Privacy-first parser running completely in your browser, flagging layout pitfalls and ATS parsing traps.',
    whyBuilt:
      '许多求职者不敢将敏感简历上传到第三方网站。我们坚持纯前端解析，无须上传即可完成全面体检。',
    whyBuiltEn:
      'Applicants fear leaking sensitive resumes to third parties. We made an entirely client-side inspector.',
    coverImage: '/src/assets/images/product_copilot_preview_1790970754120.jpg',
    url: '#/products/ats-resume-scanner',
    demoUrl: '#/products/ats-resume-scanner',
    features: [
      {
        title: '零数据上传',
        desc: '所有解析均在 WebAssembly / 本地 JS 环境完成，断网亦可正常工作。',
        icon: 'ShieldCheck',
      },
      {
        title: '多系统规则库',
        desc: '内置 Workday, Greenhouse, Lever, Taleo 等主流招聘系统的排版解析避坑点。',
        icon: 'CheckCircle2',
      },
      {
        title: '量化动词建议',
        desc: '检测弱动词（如 made, helped），建议替换为高含金量专业动词。',
        icon: 'Zap',
      },
    ],
    steps: [
      { step: 1, title: '拖入简历文件', desc: '支持 PDF 或 Word 格式，立即在本地内存解码。' },
      { step: 2, title: '获取体检报告', desc: '查看格式风险、关键词密度与解析友好度评分。' },
    ],
    faqs: [
      {
        q: '真的是 100% 本地运行吗？',
        a: '是的，你可以在浏览器的网络面板 (Network) 抓包验证，分析过程中不会发出任何数据网络请求。',
      },
    ],
  },
  {
    id: 'prod_indie_starter',
    slug: 'other-products',
    title: '其他正式产品与小型工具',
    titleEn: 'Other Products & Experiments',
    subtitle: '正在构建的小工具与实用实验产品。',
    subtitleEn: 'Utility tools and experiments currently in active craft.',
    category: 'micro',
    status: 'beta',
    description:
      '包括独立开发者海外收款计费沙盒、AI 内容重构与多平台分发工作流引擎，以及轻量级 Markdown 简历生成器。',
    descriptionEn:
      'Including developer billing utilities, multi-platform content remixing pipelines, and markdown resume generators.',
    whyBuilt: '小而美的工具往往能解决高频具体的痛点，是我们实验室持续探索的产品原型。',
    whyBuiltEn: 'Focused micro-tools solve concrete recurring frictions.',
    coverImage: '/src/assets/images/lab_creator_workspace_1790970765025.jpg',
    url: '#/products/other-products',
    demoUrl: '#/products/other-products',
    features: [
      { title: '轻量专注', desc: '不堆砌无用功能，只做好一个特定任务。', icon: 'Zap' },
      { title: '即开即用', desc: '免去繁重配置，开箱即可投入实际生产。', icon: 'Box' },
    ],
    steps: [
      { step: 1, title: '选择对应工具', desc: '根据你当前的开发或运营任务选择小型实用模块。' },
      { step: 2, title: '接入并使用', desc: '直接在 Web 端使用或下载离线脚本运行。' },
    ],
    faqs: [],
  },
];

export const INITIAL_TOOLS: ToolItem[] = [
  {
    id: 'tool_gamma',
    slug: 'gamma',
    name: 'Gamma',
    summary: '新一代 AI 演示与交互式网页生成工具，排版高级且上手零门槛。',
    summaryEn: 'Next-gen AI presentation and interactive doc generator with clean typography.',
    category: 'presentation',
    categoryLabelZh: '做PPT',
    categoryLabelEn: 'Presentation',
    type: 'tool',
    features: ['一键大纲生成 PPT', '自适应卡片排版', '可交互式网页展示', '支持中文字体美化'],
    suitableFor: ['需要快速做周报/商业提案的打工人', '创业团队 Demo 演讲', '不愿花时间在排版上的内容创作者'],
    notSuitableFor: ['需要严苛逐像素精确动画的大型发布会', '必须使用指定集团 PPT 模板的企业员工'],
    testExperience:
      '实测拿 800 字商业计划草案输入，20 秒内生成 10 页结构分明的幻灯片。中文断句自然，默认的配色与卡片阴影非常克制，几乎可以直接拿去汇报。免费版给的基础 400 积分够做 8 套，导出 PDF 质量高。',
    testExperienceEn:
      'Tested with an 800-word business memo; produced 10 well-structured slides within 20s. Excellent typography.',
    testDate: '2026-09-15',
    lastUpdated: '2026-10-01',
    rating: 4.7,
    reviewCount: 42,
    pricing: {
      freePlan: '注册即送 400 AI 积分，普通导出免费',
      pricingModel: 'Freemium',
      cost: '$10 / 月 (Plus 版无限量)',
    },
    domesticAvailability: 'yes',
    chineseSupport: 'full',
    officialUrl: 'https://gamma.app',
    affiliateUrl: 'https://gamma.app?ref=quinnverse',
    isAffiliateActive: true,
    coverImage: '/src/assets/images/hero_workspace_cosmic_1790970739935.jpg',
    status: 'published',
    isFeatured: true,
    tags: ['做PPT', '演示文稿', '中文友好', '排版出色'],
    internalNotes: {
      source: '官方 Affiliate Program',
      affiliateCommission: '20% Recurring',
      testingStatus: 'verified',
      clicks: 340,
      conversions: 28,
    },
  },
  {
    id: 'tool_notion_ai',
    slug: 'notion-ai',
    name: 'Notion AI',
    summary: '无缝嵌入知识库的写作、总结与智能信息检索助理。',
    summaryEn: 'Deeply integrated workspace writing, summarizing, and Q&A engine.',
    category: 'writing',
    categoryLabelZh: '写文章 / 知识库',
    categoryLabelEn: 'Writing / Wiki',
    type: 'tool',
    features: ['文档就地扩写与润色', '跨页面智能 Q&A', '自动提取会议纪要与 Action Items', '双语实时翻译'],
    suitableFor: ['已经深度使用 Notion 的团队或个人', '做知识库构建与知识沉淀的创作者', '需要一键将笔记转成文章的人'],
    notSuitableFor: ['纯粹想找免费离线工具的用户', '对海外网络延迟较敏感的纯国内网络环境'],
    testExperience:
      '在处理万字产品手记与测试记录时，Notion AI 的跨文档问答极其高效。能够精准定位两周前某次测试提到的具体报错和解决思路。写作润色风格自然，没有过度浮夸的套话。',
    testExperienceEn:
      'Superb Q&A retrieval across our internal engineering documents. Clean formatting.',
    testDate: '2026-08-20',
    lastUpdated: '2026-09-28',
    rating: 4.7,
    reviewCount: 68,
    pricing: {
      freePlan: '每个工作区含少量试用响应',
      pricingModel: 'Subscription Add-on',
      cost: '$8~10 / 人 / 月',
    },
    domesticAvailability: 'partial',
    chineseSupport: 'full',
    officialUrl: 'https://notion.so',
    status: 'published',
    isFeatured: true,
    tags: ['知识管理', '写文章', '生产力', '工作流'],
  },
  {
    id: 'tool_midjourney',
    slug: 'midjourney',
    name: 'Midjourney v6.1',
    summary: '顶尖的商业级创意图像与概念视觉生成工具，艺术质感与构图极其出众。',
    summaryEn: 'State-of-the-art visual generation engine for editorial art and commercial designs.',
    category: 'image',
    categoryLabelZh: '做图',
    categoryLabelEn: 'Image Gen',
    type: 'tool',
    features: ['超写实光影与摄影镜头质感', 'Web 界面生图现已全面开放', '高保真角色一致性', '复杂微距与材质渲染'],
    suitableFor: ['需要商业级视觉海报、封面与概念插画的设计师', '独立产品主视觉与氛围营造', '对出图美感有极高要求的创作者'],
    notSuitableFor: ['完全不想付月费的用户', '需要高精度多行中文矢量排版排文字的设计'],
    testExperience:
      '实测制作 Quinnverse 的多组深空工作室与极简工业风场景，Midjourney 依然是同等 Prompt 下质感最自然、毫无塑料感的工具。现在网页版直接支持作图，免去了 Discord 操作繁琐。但图片内生成精细中文字体仍需结合排版软件二次处理。',
    testExperienceEn:
      'Still unmatched in visual depth and textural nuance. Web interface now live.',
    testDate: '2026-09-02',
    lastUpdated: '2026-10-02',
    rating: 4.8,
    reviewCount: 95,
    pricing: {
      freePlan: '目前暂无永久免费计划，需订阅',
      pricingModel: 'Paid Only',
      cost: '基础版 $10/月，标准版 $30/月',
    },
    domesticAvailability: 'partial',
    chineseSupport: 'partial',
    officialUrl: 'https://midjourney.com',
    status: 'published',
    isFeatured: true,
    tags: ['做图', '视觉资产', '商业插画', '顶级审美'],
  },
  {
    id: 'tool_cursor',
    slug: 'cursor',
    name: 'Cursor',
    summary: '为工程师与独立开发者定制的 AI 智能 IDE，全代码库理解与多文件实时改写。',
    summaryEn: 'AI-first code editor with whole-repo indexing and agentic multi-file refactoring.',
    category: 'website',
    categoryLabelZh: '做网站 / 编程',
    categoryLabelEn: 'Code & Web',
    type: 'tool',
    features: ['全仓库代码上下文语义索引 (@codebase)', 'Composer 模式跨文件多处联动改写', 'Tab 键多行预测与极速补全', '终端命令自动报错修复'],
    suitableFor: ['独立开发者、全栈工程师', '想用 AI 辅助从零搭建网站或 SaaS 的产品经理', '追求极致开发效率的极客'],
    notSuitableFor: ['完全没有任何编程基础、连 Git 和终端都不会配置的纯小白（建议用纯无代码建站）'],
    testExperience:
      '整个 Quinnverse 官网及 Job Application Copilot 的构建核心均在 Cursor 下完成。它的 Composer 跨文件改写体验远超普通的浏览器代码生成器，平均开发速度提升 3~4 倍。月费 $20 是独立开发者回报率最高的投资之一。',
    testExperienceEn:
      'The entire Quinnverse codebase was built using Cursor. The multi-file composer is incredible.',
    testDate: '2026-09-10',
    lastUpdated: '2026-10-01',
    rating: 4.9,
    reviewCount: 120,
    pricing: {
      freePlan: '免费版每月含 2000 次代码补全与 50 次快速慢速请求',
      pricingModel: 'Freemium',
      cost: '$20 / 月 Pro 版',
    },
    domesticAvailability: 'partial',
    chineseSupport: 'full',
    officialUrl: 'https://cursor.com',
    status: 'published',
    isFeatured: true,
    tags: ['做网站', '独立开发', '效率神器', '编程'],
  },
  {
    id: 'tool_claude',
    slug: 'claude',
    name: 'Claude 3.5 Sonnet',
    summary: '逻辑最严密、中文文笔最细腻、具备 Artifacts 交互能力的顶级综合大模型。',
    summaryEn: 'Elite reasoning and nuance, with exceptional Chinese writing and Artifact preview.',
    category: 'writing',
    categoryLabelZh: '写文章 / 深度分析',
    categoryLabelEn: 'Writing & Analysis',
    type: 'tool',
    features: ['超长 200k 上下文窗口', '原生 Artifacts 即时预览前端与图表', '代码生成逻辑严谨少 Bug', '中文文风脱离机械套话'],
    suitableFor: ['长篇文章构思、深度研报分析', '前端组件原型即时预览', '复杂系统架构推演'],
    notSuitableFor: ['账号风控极其严格，国内直接注册门槛较高'],
    testExperience:
      '在测试长篇技术手记润色时，Claude 能够准确理解作者的口吻并保留克制的情绪，几乎不会出现通用模型泛滥的“在当今快节奏的数字化时代”等垃圾开篇。Artifacts 更是大大提升了原型验证速度。',
    testExperienceEn:
      'Unrivaled prose cadence and rigorous reasoning. Artifacts mode transforms prototyping.',
    testDate: '2026-08-15',
    lastUpdated: '2026-09-30',
    rating: 4.9,
    reviewCount: 88,
    pricing: {
      freePlan: '免费版限频使用',
      pricingModel: 'Freemium / API',
      cost: 'Pro 版 $20 / 月',
    },
    domesticAvailability: 'partial',
    chineseSupport: 'full',
    officialUrl: 'https://claude.ai',
    status: 'published',
    isFeatured: true,
    tags: ['深度分析', '写文章', '顶级文笔', 'Artifacts'],
  },
  {
    id: 'tool_canva',
    slug: 'canva',
    name: 'Canva 视觉设计套件',
    summary: '模板丰富、零基础可用的自媒体图文、小红书封面与排版神器。',
    summaryEn: 'Abundant templates and zero-threshold layout tool for social media covers.',
    category: 'image',
    categoryLabelZh: '做图 / 自媒体',
    categoryLabelEn: 'Image & Social',
    type: 'tool',
    features: ['海量小红书/公众号/B站中文模板', 'AI 一键抠图与魔术扩图', '丰富的中文正版字库', '团队协同与快捷导出'],
    suitableFor: ['自媒体博主、运营、不想花时间学专业设计的创作者', '做电商头图与社群分享海报'],
    notSuitableFor: ['追求极致独创画风与电影级概念场景的专业美术设计'],
    testExperience:
      '实测做 3:4 比例的小红书干货图，搭配其现成版式与 AI 抠图功能，制作一张高点击率封面只需 3 分钟。中文本土化支持最好，国内网络直接秒开，对于初学者是最不容易劝退的工具。',
    testExperienceEn:
      'Best suited for non-designers needing fast social graphics. Native Chinese support.',
    testDate: '2026-07-12',
    lastUpdated: '2026-09-20',
    rating: 4.5,
    reviewCount: 52,
    pricing: {
      freePlan: '免费版功能基本够用',
      pricingModel: 'Freemium',
      cost: 'Pro 版约 ¥300 / 年',
    },
    domesticAvailability: 'yes',
    chineseSupport: 'full',
    officialUrl: 'https://canva.cn',
    status: 'published',
    isFeatured: true,
    tags: ['做图', '小红书封面', '自媒体', '零门槛'],
  },
  {
    id: 'tool_perplexity',
    slug: 'perplexity',
    name: 'Perplexity AI',
    summary: '带实时引文来源与结构化总结的新一代对话式搜索引擎。',
    summaryEn: 'Conversational answer engine with direct citations and structured synthesis.',
    category: 'research',
    categoryLabelZh: '找资料',
    categoryLabelEn: 'Research',
    type: 'tool',
    features: ['实时全网搜索并标注权威引用角标', '学术搜索 Focus 学术论文库', '支持长文档上传提问', 'Pro 模式多步深度搜索挖掘'],
    suitableFor: ['行业研究员、咨询顾问、写研报与毕业论文的学生', '需要快速核实具体事实与产品定价的用户'],
    notSuitableFor: ['需要无拘无束天马行空创作小说的纯文学写作'],
    testExperience:
      '在做 Quinnverse 实测库的竞品参数调研时，Perplexity 大幅减少了在百度/谷歌翻页看广告的时间。每个论点直接附带官方链接，查验真实性极快。',
    testExperienceEn:
      'Replaced 80% of our ad-heavy search queries when conducting SaaS competitor diligence.',
    testDate: '2026-09-08',
    lastUpdated: '2026-09-29',
    rating: 4.8,
    reviewCount: 74,
    pricing: {
      freePlan: '免费版基础搜索无限制，Pro 搜索每日少量',
      pricingModel: 'Freemium',
      cost: '$20 / 月',
    },
    domesticAvailability: 'partial',
    chineseSupport: 'full',
    officialUrl: 'https://perplexity.ai',
    status: 'published',
    isFeatured: true,
    tags: ['找资料', '事实查验', '文献调研', '高效检索'],
  },
  {
    id: 'tool_elevenlabs',
    slug: 'elevenlabs',
    name: 'ElevenLabs',
    summary: '行业顶尖的声音克隆、情感化语音合成 (TTS) 与多语言配音平台。',
    summaryEn: 'Industry gold standard for voice cloning, emotive TTS, and multi-language dubbing.',
    category: 'video',
    categoryLabelZh: '做视频 / 音频',
    categoryLabelEn: 'Audio & Video',
    type: 'tool',
    features: ['高保真情感语调与停顿呼吸感', '极速克隆自己的音色', '多语言自动口型同步与翻译配音', '丰富音效生成'],
    suitableFor: ['做出海 TikTok/YouTube Shorts 的视频创作者', '播客剪辑与有声书制作', '想要用自己声音录英文视频的人'],
    notSuitableFor: ['预算极其紧张且不在乎机械电音质感的极简需求'],
    testExperience:
      '拿一段 60 秒的个人中文录音克隆，生成的英文配音不仅发音地道，而且连我本人的语气停顿与微表情声音细节都精准保留，完全摆脱了传统“Siri 播音腔”。',
    testExperienceEn:
      'Flawless voice fidelity and emotional inflection. Essential for bilingual video creators.',
    testDate: '2026-08-30',
    lastUpdated: '2026-09-25',
    rating: 4.8,
    reviewCount: 39,
    pricing: {
      freePlan: '每月免费 10,000 字符额度',
      pricingModel: 'Freemium',
      cost: '入门版 $5/月，创作者版 $22/月',
    },
    domesticAvailability: 'partial',
    chineseSupport: 'full',
    officialUrl: 'https://elevenlabs.io',
    status: 'published',
    isFeatured: true,
    tags: ['做视频', '声音克隆', 'AI配音', '出海'],
  },
];

export const INITIAL_LAB_POSTS: LabPost[] = [
  {
    id: 'post_copilot_v1',
    slug: 'why-built-job-copilot',
    title: '我为什么把网申助手从 0 做到现在的版本',
    titleEn: 'Why I Built Job Application Copilot from 0 to 1',
    excerpt:
      '记录我在海外求职海投过程中遇到的真实绝望：ATS 系统的冷酷、大模型生成简历的假大空，以及一个真正能帮求职者拿到面试的工具该长什么样。',
    excerptEn:
      'A candid postmortem on overseas job hunting, cold ATS realities, and why generic AI resume tools fail.',
    content: `## 真实痛点往往不是“不会写”，而是“改得心力交瘁”

2026 年初，我开始密集准备海外独立产品与远程工程师岗位的求职。

最开始，我和大部分人一样，用 ChatGPT 扔一句：“帮我把这份简历润色得更专业”。结果它吐出来一堆看似华丽却充满套话的词汇：*“Synergized cross-functional stakeholders to pioneer disruptive paradigms...”*。

当招聘官或者 ATS 系统扫过时，这种千篇一律的 AI 腔调甚至会触发负面打分。

## 核心思考：求职不是虚构，而是“真实经历的针对性映射”

于是我决定自己动手做 **Job Application Copilot**。

它的核心原则只有三条：
1. **绝不胡编经历**：它只能从求职者原本的项目库中提取事实；
2. **精准语义对齐**：把职位描述（JD）里的隐性要求拆解成动词和量化指标；
3. **本地隐私优先**：求职记录和敏感经历数据绝不放在任何公共数据库。

经过 3 个月的打磨，这个工具帮我在数十个海外岗位中拿到了超过 35% 的面试转化率。现在我把它作为 Quinnverse 的正式自研产品公开。`,
    contentEn:
      'Full article detailing the architecture, privacy constraints, and conversion results of Job Application Copilot.',
    category: 'build_log',
    categoryLabelZh: '构建日志',
    categoryLabelEn: 'Build Log',
    date: '2026-10-01',
    readTime: '6 分钟',
    coverImage: '/src/assets/images/lab_creator_workspace_1790970765025.jpg',
    relatedProductId: 'prod_copilot',
    views: 1420,
  },
  {
    id: 'post_agent_experiment',
    slug: 'agent-finds-tools-experiment',
    title: '我试着让 Agent 替我找 AI 工具：实测 50 个场景后的真实体会',
    titleEn: 'Testing a Tool-Finder Agent across 50 Scenarios',
    excerpt:
      '为什么我不再相信传统的 AI 工具导航站？把经过人工深测的数据注入 Agent，它给出的建议到底能不能用？这是我做筛选 Agent 的全过程思考。',
    excerptEn:
      'Why conventional tool directories are broken, and how an agent backed by tested truth performs.',
    content: `## 导航站的黄昏：500 个工具，等于没有工具

过去两年，市面上冒出几千个名为“AI 聚合导航”的网站。它们通过爬虫抓取 ProductHunt，塞满成百上千个工具链接，靠收录费和广告过日子。

但对真正要解决问题的用户来说：
- “这个工具中文能用吗？”——不知道。
- “要不要梯子？免费版能用几次？”——没人测过。
- “我是自媒体做封面的，这工具适合我吗？”——只有一句从官网扒下来的机翻宣传语。

## 筛选 Agent + 实测智库：真正的飞轮

我们做的不是搜索引擎，而是：
**用我的时间，替你先踩坑。**

把真实的国内可用性、免费额度、优点、致命缺点录入 Quinnverse Tested Database，再由 Tool Finder Agent 倾听你的具体问题并针对性推荐。

实测下来，用户的满意度从传统盲目翻页的 12% 跃升至 84%。`,
    contentEn:
      'Reflections on why curated tested databases coupled with contextual agents outperform static directory clutter.',
    category: 'experiment',
    categoryLabelZh: '产品实验',
    categoryLabelEn: 'Experiment',
    date: '2026-09-24',
    readTime: '8 分钟',
    coverImage: '/src/assets/images/hero_workspace_cosmic_1790970739935.jpg',
    views: 980,
  },
  {
    id: 'post_rapid_mvp',
    slug: 'rapid-mvp-with-ai',
    title: '如何用 AI 快速做一个真正可用的 MVP',
    titleEn: 'Shipping a Viable MVP with AI in 48 Hours',
    excerpt:
      '脱离玩具 Demo 的陷阱。从架构分层、状态管理到真实交付，独立开发者在 AI 时代的敏捷交付手册。',
    excerptEn:
      'Escaping the toy demo trap. An indie hacker guide to shipping solid, robust web apps.',
    content: `很多人用 AI 写代码，三天写了 10 个 Demo，却没有一个能上线运营。

根本原因在于：**没有把控边界。**

一个能真正上线的 MVP 必须包含：
1. **单一明确的闭环价值**（不要第一天就想做 All-in-one）；
2. **极简但鲁棒的数据层**（客户端本地持久化 + 易同步的 JSON/REST）；
3. **真实的用户证据呈现**；
4. **克制现代的 UI 排版系统**。

在 Quinnverse，我们遵循“先跑通一个真实需求，再沉淀成产品”的极简纪律。`,
    contentEn: 'Core principles for shipping usable software with AI.',
    category: 'methodology',
    categoryLabelZh: '方法 / 教程',
    categoryLabelEn: 'Methodology',
    date: '2026-09-12',
    readTime: '5 分钟',
    coverImage: '/src/assets/images/about_mountains_calm_1790970774868.jpg',
    views: 1250,
  },
  {
    id: 'post_why_hate_navs',
    slug: 'why-i-dislike-ai-nav-sites',
    title: '为什么我越来越不喜欢传统的 AI 工具导航站',
    titleEn: 'Why I Grow Weary of Generic AI Directories',
    excerpt:
      '商业利益与用户价值的脱节：当导航站沦为流量中介和刷榜战场，谁还在乎工具到底能不能解决普通人的真实麻烦？',
    excerptEn: 'When directories become mere affiliate farms, who actually tests the tools?',
    content: `很多朋友问我：启云，你既然花了那么多精力去测各种 AI 工具，为什么不干脆做个一万个工具的超级导航站收广告费？

我的回答是：**那样会毁掉信任。**

一个独立开发者的立身之本是“可信度”。如果你推荐一个连自己都不会打开第二遍的工具，只是为了赚那点五美金的返佣，那你在互联网上的信誉资产就归零了。

Quinnverse 只收录真正经过实操验证的工具，好就是好，缺点就是缺点。`,
    contentEn: 'Trust is the only currency that compounds for indie creators.',
    category: 'essay',
    categoryLabelZh: '手记 / 观点',
    categoryLabelEn: 'Essay',
    date: '2026-09-01',
    readTime: '4 分钟',
    coverImage: '/src/assets/images/hero_workspace_cosmic_1790970739935.jpg',
    views: 1680,
  },
];

export const CATEGORY_INFO: Record<string, { nameZh: string; nameEn: string; count: number; icon: string }> = {
  writing: { nameZh: '写文章', nameEn: 'Writing', count: 32, icon: 'PenTool' },
  image: { nameZh: '做图', nameEn: 'Image', count: 26, icon: 'Image' },
  video: { nameZh: '做视频', nameEn: 'Video', count: 26, icon: 'Video' },
  presentation: { nameZh: '做PPT', nameEn: 'Slides', count: 18, icon: 'FileSpreadsheet' },
  research: { nameZh: '找资料', nameEn: 'Research', count: 24, icon: 'Search' },
  website: { nameZh: '做网站', nameEn: 'Websites', count: 20, icon: 'Globe' },
  automation: { nameZh: '自动化工作', nameEn: 'Automation', count: 22, icon: 'Cpu' },
  career: { nameZh: '找工作', nameEn: 'Career', count: 16, icon: 'Briefcase' },
  content: { nameZh: '做内容', nameEn: 'Content', count: 30, icon: 'Layers' },
};
