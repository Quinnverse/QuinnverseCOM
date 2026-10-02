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

async function persistMessage(payload: unknown) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.appendFile(MESSAGE_FILE, `${JSON.stringify(payload)}\n`, 'utf8');
}

app.post('/api/contact-messages', async (req, res) => {
  try {
    const body = req.body ?? {};
    const source = String(body.source || '').trim();
    const email = String(body.email || '').trim();
    const message = String(body.message || body.description || '').trim();

    if (!source || !email || !message) {
      return res.status(400).json({ ok: false, error: 'missing_required_fields' });
    }

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

const distDir = path.join(__dirname, 'dist');
app.use(express.static(distDir));
app.get('*', (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Quinnverse server listening on :${PORT}`);
});
