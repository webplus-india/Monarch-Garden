import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_SITE_ORIGIN = 'https://themonarchgarden.com';

function getRequestOrigin(req: express.Request): string {
  const forwardedProto = req.get('x-forwarded-proto')?.split(',')[0]?.trim();
  const forwardedHost = req.get('x-forwarded-host')?.split(',')[0]?.trim();
  const host = forwardedHost || req.get('host') || '';
  const isLocalHost = !host || host.startsWith('localhost') || host.startsWith('127.0.0.1');

  if (!isLocalHost) {
    const proto = forwardedProto || 'https';
    return `${proto}://${host}`;
  }

  const envUrl = process.env.APP_URL?.trim();
  if (envUrl) {
    return envUrl.replace(/\/$/, '');
  }

  return host ? `http://${host}` : DEFAULT_SITE_ORIGIN;
}

function injectOriginIntoMeta(html: string, req: express.Request): string {
  const origin = getRequestOrigin(req);
  const pageUrl = `${origin}${req.path === '/' ? '/' : req.path}`;
  const ogImageUrl = `${origin}/og-image.jpg`;
  return html
    .replaceAll(`${DEFAULT_SITE_ORIGIN}/og-image.jpg`, ogImageUrl)
    .replace(
      /(<meta\s+property=["']og:url["']\s+content=["'])[^"']*(["']\s*\/?>)/i,
      `$1${pageUrl}$2`
    );
}

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Serve static assets from public folder with caching headers
app.use(express.static(path.resolve(__dirname, 'public'), {
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg') || filePath.endsWith('.webp') || filePath.endsWith('.png')) {
      res.setHeader('Cache-Control', 'public, max-age=86400, immutable');
    }
  }
}));

if (process.env.NODE_ENV === 'production') {
  const distPath = path.resolve(__dirname, 'dist');
  app.use(express.static(distPath, { index: false }));
  app.get('*', async (req, res, next) => {
    try {
      let html = await fs.readFile(path.join(distPath, 'index.html'), 'utf-8');
      html = injectOriginIntoMeta(html, req);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      next(e);
    }
  });
} else {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { 
      middlewareMode: true,
      hmr: process.env.DISABLE_HMR !== 'true'
    },
    appType: 'spa',
  });

  // Intercept HTML page requests before Vite middleware so social crawlers (WhatsApp, etc.)
  // receive the live request origin in og:image and og:url.
  app.get('*', async (req, res, next) => {
    const reqPath = req.path;
    if (
      reqPath.startsWith('/@') ||
      reqPath.startsWith('/src/') ||
      reqPath.startsWith('/node_modules/') ||
      reqPath.startsWith('/assets/') ||
      reqPath.includes('.')
    ) {
      return next();
    }
    try {
      const url = req.originalUrl;
      let template = await fs.readFile(path.resolve(__dirname, 'index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      template = injectOriginIntoMeta(template, req);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

  app.use(vite.middlewares);
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
