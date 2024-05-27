import { CACHE_MANAGER, Cache, CacheInterceptor } from '@nestjs/cache-manager';
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class CustomCacheInterceptor extends CacheInterceptor {
  constructor(
    @Inject(CACHE_MANAGER) cacheManager: Cache,
    @Inject(Reflector) reflector: Reflector,
  ) {
    super(cacheManager, reflector);
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const response = context.switchToHttp().getResponse();
    const key = this.trackBy(context); // Move this line here to avoid async issues

    // Call super.intercept() to maintain caching behavior

    if (key) {
      const cachedResponse = await this.cacheManager.get(key);
      if (cachedResponse) {
        response.setHeader('x-cache', 'HIT');
      } else {
        response.setHeader('x-cache', 'MISS');
      }
    }

    return super.intercept(context, next);
  }
}
