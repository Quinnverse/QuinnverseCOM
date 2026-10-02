import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = Number(process.env.PORT || 3000);
const DATA_DIR = path.join(__dirname, 'data');
const MESSAGE_FILE = path.join(DATA_DIR, 'contact-messages.jsonl');

app.use(express.json({ limit: '256kb' }));
app.use(express.urlencoded({ extended: false }));

async function persistMessage(payload: unknown) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.appendFile(MESSAGE_FILE, `${JSON.stringify(payload)}\n`, 'utf8');
}

async function readMessages(): Promise<any[]> {
  try {
    const raw = await fs.readFile(MESSAGE_FILE, 'utf8');
    return raw.split('\n').filter(Boolean).map((line) => JSON.parse(line)).reverse();
  } catch (error: any) {
    if (error?.code === 'ENOENT') return [];
    throw error;
  }
}

async function writeMessages(messages: any[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const chronological = [...messages].reverse();
  await fs.writeFile(MESSAGE_FILE, chronological.map((item) => JSON.stringify(item)).join('\n') + (chronological.length ? '\n' : ''), 'utf8');
}

function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;
  if (!expectedUser || !expectedPass) return res.status(503).send('Admin console is not configured.');
  const header = req.get('authorization') || '';
  if (header.startsWith('Basic ')) {
    try {
      const [user, pass] = Buffer.from(header.slice(6), 'base64').toString('utf8').split(':');
      if (user === expectedUser && pass === expectedPass) return next();
    } catch {}
  }
  res.set('WWW-Authenticate', 'Basic realm="Quinnverse Private Admin"');
  return res.status(401).send('Authentication required.');
}

function escapeHtml(value: unknown) {
  return String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char] || char));
}

app.post('/api/contact-messages', async (req, res) => {
  try {
    const body = req.body ?? {};
    const source = String(body.source || '').trim();
    const email = String(body.email || '').trim();
    const message = String(body.message || body.description || '').trim();
    if (!source || !email || !message) return res.status(400).json({ ok: false, error: 'missing_required_fields' });

    const record = {
      id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      source,
      status: 'unread',
      name: String(body.name || '').trim(),
      email,
      topic: String(body.topic || body.direction || '').trim(),
      message,
      userAgent: String(req.get('user-agent') || ''),
      ip: req.ip,
    };
    await persistMessage(record);
    return res.json({ ok: true, id: record.id });
  } catch (error) {
    console.error('contact message persistence failed', error);
    return res.status(500).json({ ok: false, error: 'persist_failed' });
  }
});

app.get('/admin/messages', requireAdmin, async (_req, res) => {
  const messages = await readMessages();
  const rows = messages.map((m) => `<article class="card ${escapeHtml(m.status)}"><div class="meta"><strong>${escapeHtml(m.name || '未留称呼')}</strong><span>${escapeHtml(m.email)}</span><span>${escapeHtml(m.createdAt)}</span><span>${escapeHtml(m.source)}</span></div><h3>${escapeHtml(m.topic || '无主题')}</h3><p>${escapeHtml(m.message)}</p><form method="post" action="/admin/messages/${encodeURIComponent(m.id)}/status"><select name="status"><option value="unread" ${m.status === 'unread' ? 'selected' : ''}>未读</option><option value="read" ${m.status === 'read' ? 'selected' : ''}>已读</option><option value="replied" ${m.status === 'replied' ? 'selected' : ''}>已回复</option><option value="archived" ${m.status === 'archived' ? 'selected' : ''}>归档</option></select><button>更新状态</button></form></article>`).join('');
  res.set('Cache-Control', 'no-store');
  res.type('html').send(`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Quinnverse 私有消息后台</title><style>body{font-family:system-ui,sans-serif;background:#f8fafc;color:#0f172a;margin:0}.wrap{max-width:1000px;margin:auto;padding:40px 20px}h1{font-size:28px}.hint{color:#64748b}.card{background:white;border:1px solid #e2e8f0;border-radius:18px;padding:20px;margin:14px 0}.card.unread{border-left:4px solid #2563eb}.meta{display:flex;gap:12px;flex-wrap:wrap;font-size:12px;color:#64748b}.card p{white-space:pre-wrap;line-height:1.7}form{display:flex;gap:8px;margin-top:16px}select,button{padding:8px 12px;border:1px solid #cbd5e1;border-radius:10px;background:white}button{background:#0f172a;color:white;cursor:pointer}</style></head><body><main class="wrap"><h1>Quinnverse 私有消息后台</h1><p class="hint">共 ${messages.length} 条消息。此地址不出现在公开导航中，并由服务端账号密码保护。</p>${rows || '<p>暂无消息。</p>'}</main></body></html>`);
});

app.post('/admin/messages/:id/status', requireAdmin, async (req, res) => {
  const allowed = new Set(['unread', 'read', 'replied', 'archived']);
  const status = String(req.body.status || '');
  if (!allowed.has(status)) return res.status(400).send('Invalid status');
  const messages = await readMessages();
  const target = messages.find((m) => m.id === req.params.id);
  if (!target) return res.status(404).send('Message not found');
  target.status = status;
  target.updatedAt = new Date().toISOString();
  await writeMessages(messages);
  return res.redirect(303, '/admin/messages');
});

const distDir = path.join(__dirname, 'dist');
app.use(express.static(distDir));
app.get('*', (_req, res) => res.sendFile(path.join(distDir, 'index.html')));
app.listen(PORT, '0.0.0.0', () => console.log(`Quinnverse server listening on :${PORT}`));
