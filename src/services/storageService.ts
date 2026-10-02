import { ToolItem, ProductItem, LabPost } from '../types';
import { INITIAL_TOOLS, INITIAL_PRODUCTS, INITIAL_LAB_POSTS } from '../data/initialData';

const STORAGE_KEYS = {
  TOOLS: 'quinnverse_tools_v1',
  PRODUCTS: 'quinnverse_products_v1',
  LAB_POSTS: 'quinnverse_lab_posts_v1',
  LANGUAGE: 'quinnverse_lang_v1',
};

export const storageService = {
  getTools(): ToolItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TOOLS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.TOOLS, JSON.stringify(INITIAL_TOOLS));
        return INITIAL_TOOLS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_TOOLS;
    }
  },

  saveTools(tools: ToolItem[]): void {
    localStorage.setItem(STORAGE_KEYS.TOOLS, JSON.stringify(tools));
    window.dispatchEvent(new Event('quinnverse-data-updated'));
  },

  upsertTool(tool: ToolItem): void {
    const tools = this.getTools();
    const index = tools.findIndex((t) => t.id === tool.id || t.slug === tool.slug);
    if (index >= 0) {
      tools[index] = { ...tools[index], ...tool, lastUpdated: new Date().toISOString().split('T')[0] };
    } else {
      tools.unshift({
        ...tool,
        testDate: tool.testDate || new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
      });
    }
    this.saveTools(tools);
  },

  deleteTool(id: string): void {
    const tools = this.getTools().filter((t) => t.id !== id);
    this.saveTools(tools);
  },

  getProducts(): ProductItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
        return INITIAL_PRODUCTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_PRODUCTS;
    }
  },

  saveProducts(products: ProductItem[]): void {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    window.dispatchEvent(new Event('quinnverse-data-updated'));
  },

  getLabPosts(): LabPost[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LAB_POSTS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.LAB_POSTS, JSON.stringify(INITIAL_LAB_POSTS));
        return INITIAL_LAB_POSTS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_LAB_POSTS;
    }
  },

  saveLabPosts(posts: LabPost[]): void {
    localStorage.setItem(STORAGE_KEYS.LAB_POSTS, JSON.stringify(posts));
    window.dispatchEvent(new Event('quinnverse-data-updated'));
  },

  upsertLabPost(post: LabPost): void {
    const posts = this.getLabPosts();
    const index = posts.findIndex((p) => p.id === post.id || p.slug === post.slug);
    if (index >= 0) {
      posts[index] = { ...posts[index], ...post };
    } else {
      posts.unshift({
        ...post,
        date: post.date || new Date().toISOString().split('T')[0],
      });
    }
    this.saveLabPosts(posts);
  },

  deleteLabPost(id: string): void {
    const posts = this.getLabPosts().filter((p) => p.id !== id);
    this.saveLabPosts(posts);
  },

  resetAllData(): void {
    localStorage.setItem(STORAGE_KEYS.TOOLS, JSON.stringify(INITIAL_TOOLS));
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    localStorage.setItem(STORAGE_KEYS.LAB_POSTS, JSON.stringify(INITIAL_LAB_POSTS));
    window.dispatchEvent(new Event('quinnverse-data-updated'));
  },

  exportFullBackup(): string {
    const backup = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      tools: this.getTools(),
      products: this.getProducts(),
      labPosts: this.getLabPosts(),
    };
    return JSON.stringify(backup, null, 2);
  },

  importBackup(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.tools && Array.isArray(parsed.tools)) {
        this.saveTools(parsed.tools);
      }
      if (parsed.products && Array.isArray(parsed.products)) {
        this.saveProducts(parsed.products);
      }
      if (parsed.labPosts && Array.isArray(parsed.labPosts)) {
        this.saveLabPosts(parsed.labPosts);
      }
      return true;
    } catch (e) {
      console.error('Failed to import backup:', e);
      return false;
    }
  },
};
