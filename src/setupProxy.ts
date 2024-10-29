import express, { Request, Response } from 'express';
import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware';
import { IncomingMessage, ServerResponse } from 'http';

const app = express();

app.use('/api', createProxyMiddleware({
    target: 'https://koifarmshop.online',
    changeOrigin: true,
    pathRewrite: { '^/api': '/api' },
    onProxyRes: (proxyRes: IncomingMessage, req: Request, res: Response) => {
        proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
    }
}));

app.listen(3000, () => console.log('Proxy server running on port 3000'));
