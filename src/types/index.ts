export type Language = 'zh' | 'en';

export type ToolCategory =
  | 'writing'
  | 'image'
  | 'video'
  | 'presentation'
  | 'research'
  | 'website'
  | 'automation'
  | 'career'
  | 'content'
  | 'other';

export type ToolType = 'tool' | 'skill' | 'workflow' | 'solution';

export interface ToolItem {
  id: string;
  slug: string;
  name: string;
  nameEn?: string;
  summary: string;
  summaryEn: string;
  category: ToolCategory;
  categoryLabelZh: string;
  categoryLabelEn: string;
  type: ToolType;
  features: string[];
  suitableFor: string[];
  notSuitableFor: string[];
  testExperience: string;
  testExperienceEn: string;
  testDate: string;
  lastUpdated: string;
  rating: number; // 0.0 - 5.0
  reviewCount?: number;
  pricing: {
    freePlan: string;
    pricingModel: string;
    cost: string;
  };
  domesticAvailability: 'yes' | 'no' | 'partial';
  chineseSupport: 'full' | 'partial' | 'none';
  officialUrl: string;
  affiliateUrl?: string;
  isAffiliateActive?: boolean;
  coverImage?: string;
  status: 'published' | 'draft' | 'archived';
  isFeatured?: boolean;
  tags: string[];
  // Internal OS / Affiliate fields (only visible in Studio)
  internalNotes?: {
    source?: string;
    affiliateCommission?: string;
    contactPerson?: string;
    rednotePostUrl?: string;
    clicks?: number;
    conversions?: number;
    testingStatus?: 'pending' | 'in_progress' | 'verified' | 'rejected';
  };
}

export interface ProductItem {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  category: 'flagship' | 'agent' | 'micro' | 'experimental';
  status: 'active' | 'beta' | 'in_development';
  description: string;
  descriptionEn: string;
  whyBuilt: string;
  whyBuiltEn: string;
  coverImage?: string;
  url?: string;
  demoUrl?: string;
  features: {
    title: string;
    desc: string;
    icon: string;
  }[];
  steps: {
    step: number;
    title: string;
    desc: string;
  }[];
  faqs: {
    q: string;
    a: string;
  }[];
}

export type LabCategory = 'build_log' | 'experiment' | 'methodology' | 'essay';

export interface LabPost {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  content: string;
  contentEn: string;
  category: LabCategory;
  categoryLabelZh: string;
  categoryLabelEn: string;
  date: string;
  readTime: string;
  coverImage?: string;
  relatedProductId?: string;
  relatedToolId?: string;
  views?: number;
}

export interface AgentRecommendation {
  topPick: {
    toolId?: string;
    name: string;
    why: string;
    verdict: string;
  };
  alternatives: {
    toolId?: string;
    name: string;
    why: string;
  }[];
  hackerOrOpenSourceOption?: {
    name: string;
    why: string;
  };
  testedEvidence: {
    chineseSupport: string;
    exportOrFreeTier: string;
    domesticAccess: string;
    tradeoffs: string;
  };
  clarifications?: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  type: 'product' | 'tool_testing' | 'affiliate_channel' | 'general';
  message: string;
  createdAt: string;
}
