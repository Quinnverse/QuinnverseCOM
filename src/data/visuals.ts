/**
 * 产品视觉资产 — 唯一来源
 *
 * 原则：不再用 AI 风景照充当产品截图。
 *  - 自研产品：用无头浏览器抓的真实线上界面（src/assets/shots/*.png）
 *  - 收录工具：用字母牌（tool-mark），不配无关摄影图
 */

import type { ProductItem, PickItem } from '../types';

/** 自研产品真实截图（线上界面，非效果图） */
export const PRODUCT_SHOTS: Record<string, string> = {
  'tingmo':           new URL('../assets/shots/tingmo.png', import.meta.url).href,
  'weread-dashboard': new URL('../assets/shots/weread.png', import.meta.url).href,
  'cloze-recitation': new URL('../assets/shots/cloze.png', import.meta.url).href,
};

/** 收录工具字母牌：低饱和底色 + 同色系深字 */
const MARKS: Record<string, { initials: string; bg: string; fg: string }> = {
  cursor:   { initials: 'Cu', bg: '#eef2ff', fg: '#3730a3' },
  n8n:      { initials: 'n8', bg: '#fdf2f8', fg: '#9d174d' },
  obsidian: { initials: 'Ob', bg: '#f5f3ff', fg: '#4c1d95' },
  dify:     { initials: 'Di', bg: '#ecfeff', fg: '#155e75' },
  comfyui:  { initials: 'Co', bg: '#f0fdf4', fg: '#14532d' },
  gemini:   { initials: 'Ge', bg: '#eff6ff', fg: '#1e3a8a' },
};

export function getToolMark(slug: string) {
  return MARKS[slug] ?? { initials: slug.slice(0, 2).toUpperCase(), bg: '#f4f5f7', fg: '#3f4145' };
}

export function getProductShot(product: ProductItem): string | null {
  return PRODUCT_SHOTS[product.slug] ?? null;
}

/** Beta 产品（Job OS）无公开线上界面，不编造截图 */
export function hasRealShot(slug: string): boolean {
  return slug in PRODUCT_SHOTS;
}

export function getPickShot(_pick: PickItem): null {
  return null;
}
