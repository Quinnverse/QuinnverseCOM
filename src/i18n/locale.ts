export type Locale = 'zh' | 'en';

export const localeFromPath = (path: string): Locale =>
  path === '/en' || path.startsWith('/en/') ? 'en' : 'zh';

export const stripLocale = (path: string) => {
  if (path === '/en') return '/';
  if (path.startsWith('/en/')) return path.slice(3) || '/';
  return path || '/';
};

export const localizePath = (path: string, locale: Locale) => {
  const clean = stripLocale(path);
  return locale === 'en' ? (clean === '/' ? '/en' : `/en${clean}`) : clean;
};
