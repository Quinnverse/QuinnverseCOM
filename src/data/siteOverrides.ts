import { JOURNAL_ARTICLES, PRODUCTS, SITE_SETTINGS } from './database';

SITE_SETTINGS.icpNumber = '浙ICP备2026075936号';
SITE_SETTINGS.contactEmail = 'zhangqiyun2000@163.com';

for (const product of PRODUCTS) {
  product.name = product.name.replaceAll('听默', '听墨');
  product.tagline = product.tagline.replaceAll('听默', '听墨');
  product.summary = product.summary.replaceAll('听默', '听墨');
  product.problemSolved = product.problemSolved.replaceAll('听默', '听墨');
  product.features = product.features.map((item) => item.replaceAll('听默', '听墨'));
  product.principles = product.principles.map((item) => item.replaceAll('听默', '听墨'));
}

for (const article of JOURNAL_ARTICLES) {
  article.title = article.title.replaceAll('听默', '听墨');
  article.excerpt = article.excerpt.replaceAll('听默', '听墨');
  article.content = article.content.replaceAll('听默', '听墨');
  article.tags = article.tags.map((tag) => tag.replaceAll('听默', '听墨'));
}
