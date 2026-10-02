# Quinnverse 官网版本索引

`Quinnverse/QuinnverseCOM1` 已并入本仓库，保留为独立分支，历史与代码完整未删。
每个版本都是一个分支，在 GitHub 分支下拉框切换即可查看源码。

## 版本分支

| 分支 | 对应版本 | 说明 | 状态 |
|---|---|---|---|
| `main` | v3 亮色重设计 | 当前默认分支，Gemini 生成的亮色版（`b9e1cc4`） | 有已知问题，见下 |
| `v1-initial` | v1 初始 | 仅 README.md，不可运行（`299d515`） | 归档 |
| `v2-dark-initial` | v2 暗色初版 | 首版可运行暗色站（`b4ee12a`） | 归档 |
| `v3-light-redesign` | v3 亮色重设计 | 与 `main` 同 commit，命名固化便于对比 | 归档 |
| `v4-local-refactor` | **v4 改造版** | 设计系统收口 + 合规修复 + 真实截图 | **推荐基线** |
| `version/quinnverse-com1` | **原 QuinnverseCOM1** | 深色版 + express server + Gemini tool-finder + SitemapModal | 已并入，保留 |

## 进行中的功能分支

| 分支 | 说明 |
|---|---|
| `update/website-copy-and-contact-backend` | 站点文案覆盖 + 联系表单后端持久化 |
| `update/full-bilingual-site` / `-final` | 全站双语 |
| `update/i18n-complete-v2` / `i18n-final` | i18n 迭代 |
| `tmp-sanity-check` | 表单持久化验证分支 |

## v4 相对 v3 的修复

- **P0 合规**：备案号 `粤ICP备2024018921号-1` → `浙ICP备2026075936号`；邮箱 `contact@quinnverse.tech` → `zhangqiyun2000@163.com`；Footer 恢复四段合规模板
- **图片**：删除 10 张无关 AI 风景照（8.8MB）→ 3 张真实产品截图（196KB）+ 字母牌
- **编造内容**：删假评分、删「48 小时答复」假 SLA、假表单成功提示改真实 mailto
- **设计系统**：`src/index.css` 重写为 token 层，唯一容器 `.container-site`，两档节奏 `.band`/`.band-sm`
- **依赖**：vite `^8.3` → `^7.1.5`，删除 4 个零使用依赖（genai / express / dotenv / motion）

## 已知未修（COM1 版本）

- `src="/src/assets/images/..."` 硬编码 7 处，`vite build` 后图片不进产物
- 社交链接为占位（github.com / x.com / linkedin.com）
- 纯 `useState` 路由，无 URL 同步，刷新回首页

## 本地预览

```bash
npm install
npm run dev
```
