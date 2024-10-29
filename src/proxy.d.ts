// proxy.d.ts
import { Options } from 'http-proxy-middleware';

declare module 'http-proxy-middleware' {
    export interface Options {
        onProxyRes?: (proxyRes: any, req: any, res: any) => void;
    }
}
