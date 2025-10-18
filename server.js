import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import { createProxyMiddleware } from 'http-proxy-middleware';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8080;
const RADIO_BROWSER_BASE = process.env.RADIO_BROWSER_BASE || 'https://de1.api.radio-browser.info'; // pick a mirror

const app = express();

app.disable('x-powered-by');
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "data:", "https:", "http:"],
      "media-src": ["'self'", "https:", "http:"],
      "connect-src": ["'self'", "https:", "http:"],
    }
  }
}));
app.use(compression());
app.use(morgan('combined'));

// Simple health check
app.get('/healthz', (req, res) => res.json({ ok: true }));

// Proxy Radio Browser API to avoid CORS/preflight quirks and allow a single origin
app.use('/api', createProxyMiddleware({
  target: RADIO_BROWSER_BASE,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/json'
  },
  onProxyReq: (proxyReq) => {
    // Ensure no caching for API
    proxyReq.setHeader('Cache-Control', 'no-cache');
  }
}));

// Serve the built SPA
const staticDir = path.join(__dirname, 'web', 'dist');
app.use(express.static(staticDir));

// SPA fallback
app.get('*', (_req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[radio-collector] listening on ${PORT}`);
});
