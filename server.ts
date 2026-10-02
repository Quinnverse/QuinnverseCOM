import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Initialize Gemini if API key is present
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey
    ? new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      })
    : null;

  // Tool Finder Agent API endpoint
  app.post('/api/tool-finder', async (req, res) => {
    try {
      const { query, scenario, toolsContext } = req.body;
      if (!query && !scenario) {
        return res.status(400).json({ error: 'Query or scenario is required' });
      }

      if (!ai) {
        // Return 503 so client gracefully uses verified vetted local rule engine
        return res.status(503).json({
          status: 'no_key',
          message: 'Gemini API key not configured, fallback engine active',
        });
      }

      const prompt = `
You are the Quinnverse Tool Intelligence & Tool Finder Agent.
Quinnverse is an independent product studio that personally tests, verifies, and rates AI tools to protect creators from fake hype and low-value affiliate clutter.

User query: "${query || ''}"
Selected scenario: "${scenario || 'General'}"

Here is the Quinnverse Verified Tested Database Context:
${JSON.stringify(toolsContext || [])}

Analyze the user's specific friction point. Do not generate generic sales talk.
Select the single best matching tool as topPick, provide 1-2 realistic alternatives, and if possible an open-source or hacker DIY option.
Provide concrete tested evidence: Chinese language support, free tier limits, domestic accessibility, and real trade-offs (where it fails or falls short).
Also provide 2-3 genuine clarifying questions to help narrow down if needed.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction:
            'You are a rigorous, objective tech curator at Quinnverse. You output structured JSON matching the recommendation schema without markdown code blocks.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              topPick: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  why: { type: Type.STRING },
                  verdict: { type: Type.STRING },
                },
                required: ['name', 'why', 'verdict'],
              },
              alternatives: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    why: { type: Type.STRING },
                  },
                  required: ['name', 'why'],
                },
              },
              hackerOrOpenSourceOption: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  why: { type: Type.STRING },
                },
              },
              testedEvidence: {
                type: Type.OBJECT,
                properties: {
                  chineseSupport: { type: Type.STRING },
                  exportOrFreeTier: { type: Type.STRING },
                  domesticAccess: { type: Type.STRING },
                  tradeoffs: { type: Type.STRING },
                },
                required: ['chineseSupport', 'exportOrFreeTier', 'domesticAccess', 'tradeoffs'],
              },
              clarifications: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
            required: ['topPick', 'alternatives', 'testedEvidence'],
          },
        },
      });

      const text = response.text;
      if (text) {
        const parsed = JSON.parse(text);
        return res.json({ recommendation: parsed });
      }

      res.status(500).json({ error: 'No response from model' });
    } catch (err: any) {
      console.error('Gemini Tool Finder error:', err);
      res.status(500).json({ error: err.message || 'Internal server error' });
    }
  });

  // Health / Studio system status
  app.get('/api/studio/status', (req, res) => {
    res.json({
      status: 'online',
      studio: 'Quinnverse OS v4',
      geminiActive: !!ai,
      time: new Date().toISOString(),
    });
  });

  // Dev vs Prod Vite mounting
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Quinnverse studio server running on port ${PORT}`);
  });
}

startServer();
