import { Module } from '@nestjs/common';
import { GreetingsController } from './greetings.controller';
import { MongoDBConfigService } from './config/mongodb.config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { ResponseTimeInterceptor } from './redis/responseTime.interceptor';
// import { CacheMiddleware } from './redis/cache.middleware';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useClass: MongoDBConfigService,
    }),
    CacheModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          url: `redis://${configService.get('REDIS_HOST')}:${configService.get('REDIS_PORT')}/0`,
          ttl: 3600 * 12,
        }),
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
      }),
      inject: [ConfigService],
      isGlobal: true,
    }),
  ],
  controllers: [GreetingsController],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: ResponseTimeInterceptor,
    },
  ],
})
export class AppModule {}
//  implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     // consumer.apply(CacheMiddleware).forRoutes('*');
//   }
// }
