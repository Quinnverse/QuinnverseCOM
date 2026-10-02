export type EvidenceLevel = 
  | 'DAILY DRIVER' 
  | 'USED IN PROJECT' 
  | 'TESTED' 
  | 'FIRST LOOK' 
  | 'NEEDS CONFIRMATION';

export interface PickItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  evidenceLevel: EvidenceLevel;
  lastTested: string;
  summary: string;
  whatItDoes: string;
  whatWeFound: string;
  worksWell: string[];
  fallsShort: string[];
  bestFor: string[];
  notFor: string[];
  pricingAccess: {
    pricingModel: string;
    accessFromChina: string;
    pricingNote: string;
  };
  alternatives: string[];
  officialUrl: string;
  affiliateUrl?: string;
  affiliateRelationship: boolean;
  affiliateDisclosure?: string;
  relatedJournal?: string[];
  featured?: boolean;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  family: 'GLOBAL_PRODUCT' | 'SMALL_TOOL';
  stage: 'Beta' | 'Live' | 'Prototype';
  tagline: string;
  summary: string;
  problemSolved: string;
  features: string[];
  principles: string[];
  workflow?: {
    step: string;
    title: string;
    desc: string;
  }[];
  techStack: string[];
  previewImage?: string;
  externalUrl?: string;
  independentSiteStatus?: string;
  relatedJournal?: string[];
}

export interface LabExperiment {
  id: string;
  slug: string;
  title: string;
  status: 'PROTOTYPE' | 'EXPERIMENT' | 'OPEN SOURCE' | 'GRADUATED';
  date: string;
  hypothesis: string;
  whatWasBuilt: string;
  whatHappened: string;
  whatFailed: string;
  learnings: string;
  graduatedProduct?: string;
  githubUrl?: string;
  relatedJournal?: string[];
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  category: 'BUILD LOG' | 'Q-REVIEW' | 'ENGINEERING' | 'CRITIQUE';
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  tags: string[];
  relatedProducts?: string[];
  relatedPicks?: string[];
  relatedResources?: string[];
}

export interface ResourceItem {
  id: string;
  slug: string;
  title: string;
  type: 'GUIDE' | 'SKILL' | 'CHECKLIST' | 'CHEATSHEET' | 'TEMPLATE' | 'TOPIC MAP';
  summary: string;
  description: string;
  content: string;
  copyableSnippet?: string;
  downloadUrl?: string;
  relatedJournal?: string[];
  relatedPicks?: string[];
}

export interface ActivityFeedItem {
  id: string;
  date: string;
  type: 'PRODUCT' | 'PICK' | 'LAB' | 'JOURNAL' | 'RESOURCE';
  title: string;
  note: string;
  link: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  typicalTimeline: string;
}

export interface SiteSettings {
  icpNumber: string;
  contactEmail: string;
  githubUrl: string;
  status: string;
}
