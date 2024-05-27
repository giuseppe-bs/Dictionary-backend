import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CacheMiddleware implements NestMiddleware {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const cacheKey = req.originalUrl;
    const cachedResponse = await this.cacheManager.get(cacheKey);

    if (cachedResponse) {
      res.setHeader('x-cache', 'HIT');
      res.send(cachedResponse);
    } else {
      res.setHeader('x-cache', 'MISS');

      const originalSend = res.send.bind(res);

      res.send = (body: any) => {
        this.cacheManager.set(cacheKey, body, 60);
        return originalSend(body);
      };

      next();
    }
  }
}
