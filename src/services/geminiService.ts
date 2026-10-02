import { AgentRecommendation, ToolItem } from '../types';
import { INITIAL_TOOLS } from '../data/initialData';

export async function askToolFinderAgent(
  userQuery: string,
  scenario: string,
  testedTools: ToolItem[]
): Promise<AgentRecommendation> {
  try {
    const response = await fetch('/api/tool-finder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: userQuery,
        scenario,
        toolsContext: testedTools.map((t) => ({
          name: t.name,
          category: t.category,
          features: t.features,
          suitableFor: t.suitableFor,
          notSuitableFor: t.notSuitableFor,
          rating: t.rating,
          pricing: t.pricing,
          domesticAvailability: t.domesticAvailability,
          chineseSupport: t.chineseSupport,
          testExperience: t.testExperience,
        })),
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.recommendation) {
        return data.recommendation;
      }
    }
  } catch (err) {
    console.warn('Backend tool finder call failed, falling back to local vetted matching engine:', err);
  }

  // Fallback Rule-Based Semantic Matching Engine using the vetted database
  return generateLocalVettedRecommendation(userQuery, scenario, testedTools);
}

function generateLocalVettedRecommendation(
  query: string,
  scenario: string,
  tools: ToolItem[]
): AgentRecommendation {
  const q = (query + ' ' + scenario).toLowerCase();

  // Pattern matchers
  if (q.includes('小红书') || q.includes('封面') || q.includes('海报') || q.includes('不做ps') || q.includes('自媒体图')) {
    const canva = tools.find((t) => t.slug === 'canva') || tools[0];
    const midjourney = tools.find((t) => t.slug === 'midjourney');
    return {
      topPick: {
        toolId: canva?.id,
        name: canva?.name || 'Canva 视觉设计套件',
        why: '针对小红书 3:4 比例自媒体封面，Canva 内置了上千套成熟的爆款中文排版模板与免抠图 AI，零基础 3 分钟即可出图，完全不需要碰复杂 PS。',
        verdict: '上手最快、中文支持最完善，自媒体创作者首选。',
      },
      alternatives: [
        {
          toolId: midjourney?.id,
          name: 'Midjourney v6.1',
          why: '如果你追求独一无二的电影级概念摄影背景，可用 MJ 出底图，再放到排版工具里加文字标题。',
        },
      ],
      hackerOrOpenSourceOption: {
        name: 'Fooocus / SD WebUI (本地开源)',
        why: '如果电脑配置较高（N卡 8G+ 显存）且不想付任何软件订阅费，可用开源本地模型一键换背景。',
      },
      testedEvidence: {
        chineseSupport: '完全支持 (内置海量思源黑体、正版艺术中文字体)',
        exportOrFreeTier: '免费版可高保真导出 PNG/JPG，无强制水印',
        domesticAccess: '国内网络直连极速秒开',
        tradeoffs: '艺术风格偏商业版式，无法像 Midjourney 一样生成完全不可预测的魔幻写实插画',
      },
      clarifications: [
        '你更在意免费还是效果？',
        '需要自动 AI 排版文字吗？',
        '接受海外需要网络环境的产品吗？',
      ],
    };
  }

  if (q.includes('ppt') || q.includes('演示') || q.includes('汇报') || q.includes('幻灯片') || q.includes('slides')) {
    const gamma = tools.find((t) => t.slug === 'gamma') || tools[0];
    return {
      topPick: {
        toolId: gamma?.id,
        name: gamma?.name || 'Gamma',
        why: '只要贴入一段 500 字草稿或产品要点，Gamma 能够在 20 秒内自动规划目录、卡片式排版与配色，中文断句自然克制，摆脱传统套模板的塑料感。',
        verdict: '做商业提案与周报效率提升 10 倍以上，实测综合得分 4.7。',
      },
      alternatives: [
        {
          toolId: 'tool_notion_ai',
          name: 'Notion Slides / Markdown 演示插件',
          why: '适合技术人员直接基于知识库大纲生成纯文本演示。',
        },
      ],
      hackerOrOpenSourceOption: {
        name: 'Marp (Markdown to Presentation CLI)',
        why: '程序员专属纯代码排版，本地免费且支持 Git 版本控制。',
      },
      testedEvidence: {
        chineseSupport: '全面支持中文输入与排版',
        exportOrFreeTier: '注册送 400 积分（足够生成 8 份），支持导出清晰 PDF/PPTX',
        domesticAccess: '国内主流网络直连顺畅',
        tradeoffs: '无法支持过于复杂的逐字飞入自定义逐帧动画',
      },
      clarifications: ['你的受众是外部投资人汇报，还是内部敏捷周报？', '是否要求导出为微软 .pptx 格式？'],
    };
  }

  if (q.includes('网站') || q.includes('代码') || q.includes('编程') || q.includes('前端') || q.includes('开发') || q.includes('cursor')) {
    const cursor = tools.find((t) => t.slug === 'cursor') || tools[0];
    return {
      topPick: {
        toolId: cursor?.id,
        name: cursor?.name || 'Cursor IDE',
        why: '这是目前独立开发者公认效率最高的智能代码编辑器。它的 Composer 能够一次性通读全仓库架构，并协调改写多个文件，排查 Bug 极快。',
        verdict: '全栈构建和日常重构的最强生产力，实测体验 4.9 分。',
      },
      alternatives: [
        {
          toolId: 'tool_v0',
          name: 'v0 by Vercel',
          why: '如果你是产品经理、想直接靠文字描述生成现成 React + Tailwind UI 组件，v0 是最快出原型的沙盒。',
        },
      ],
      hackerOrOpenSourceOption: {
        name: 'Aider (终端开源 AI 编程命令行)',
        why: '直接在命令行调用你自己的 API Key 进行 Git 自动提交。',
      },
      testedEvidence: {
        chineseSupport: '支持中文对话与代码注释生成',
        exportOrFreeTier: '免费版每月提供 2000 次代码补全',
        domesticAccess: '需要稳定海外网络访问核心大模型',
        tradeoffs: '需要具备基础的 Git 与工程目录理解，纯零基础小白可能需要 1~2 天上手配置',
      },
      clarifications: ['你是想开发一个完整前后端 Web App，还是只是想做单页展示？', '平时主力语言是 React/Vue 还是 Python？'],
    };
  }

  if (q.includes('写') || q.includes('文章') || q.includes('公众号') || q.includes('文案') || q.includes('长文') || q.includes('分析')) {
    const claude = tools.find((t) => t.slug === 'claude') || tools[0];
    const notion = tools.find((t) => t.slug === 'notion-ai');
    return {
      topPick: {
        toolId: claude?.id,
        name: claude?.name || 'Claude 3.5 Sonnet',
        why: '文笔最自然的大语言模型，绝无浮夸的 AI 套话，在长篇深度论述、技术手记与逻辑分析中表现最均衡稳定。',
        verdict: '深度创作者与思想输出者首选，实测评分 4.9。',
      },
      alternatives: [
        {
          toolId: notion?.id,
          name: 'Notion AI',
          why: '如果你的所有素材本来就在 Notion 中，它的就地总结和跨文档 Q&A 能节省大量复制粘贴时间。',
        },
      ],
      hackerOrOpenSourceOption: {
        name: 'Ollama + Qwen 2.5 32B (本地离线私有化)',
        why: '如果涉及极度机密的企业内部数据，可完全在本地电脑离线运行。',
      },
      testedEvidence: {
        chineseSupport: '顶级中文语义理解与地道成语行文',
        exportOrFreeTier: '免费版有对话频次限制，网页端 Pro 为 $20/月',
        domesticAccess: '风控较严，建议使用正规 API 接口或海外正规账号',
        tradeoffs: '官方网页版对 IP 切换敏感，需保持稳定网络环境',
      },
      clarifications: ['你的写作方向是学术研报、技术博客还是社交短文？', '是否有私有知识库需要结合？'],
    };
  }

  // Default smart recommendation for other inquiries
  const featured = tools[0] || INITIAL_TOOLS[0];
  return {
    topPick: {
      toolId: featured.id,
      name: featured.name,
      why: `针对你提到的需求，${featured.name} 在 Quinnverse 实测库中获得了 ${featured.rating} 的高评分。${featured.summary}`,
      verdict: '经过实测验证，功能稳定且输出符合高水准预期。',
    },
    alternatives: tools.slice(1, 3).map((t) => ({
      toolId: t.id,
      name: t.name,
      why: `${t.summary}（适合预算适中且注重易用性的场景）`,
    })),
    hackerOrOpenSourceOption: {
      name: '开源社区工作流方案',
      why: '可配合开源生态与 GitHub Action 脚本实现低成本自动化。',
    },
    testedEvidence: {
      chineseSupport: `${featured.chineseSupport === 'full' ? '完全支持中文' : '部分支持中文'}`,
      exportOrFreeTier: featured.pricing.freePlan,
      domesticAccess: featured.domesticAvailability === 'yes' ? '国内网络正常访问' : '海外节点访问更佳',
      tradeoffs: featured.notSuitableFor[0] || '需要一定的磨合配置周期',
    },
    clarifications: ['你对每月的软件订阅预算有明确限制吗？', '主要使用场景是个人还是小团队协同？'],
  };
}
