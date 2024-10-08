import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { PredictionGrpcService } from './grpc/prediction.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { ConversationModule } from './conversation/conversation.module';
import { SocketGateway } from './conversation/conversation.gateway';
import { RedisModule } from './redis/redis.module';
import { RedisRepository } from './redis/redis.repository';
import { ArticleModule } from './article/article.module';
import { PreferenceService } from './preference/preference.service';
import { PreferenceController } from './preference/preference.controller';
import { PreferenceModule } from './preference/preference.module';
import { ApiKeyMiddleware } from './user/middleware/api-key.middleware';
import { ApiKeyService } from './user/api-key.service';
import { UserService } from './user/user.service';
import { QuestionNodeModule } from './question-node/question-node.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
    AuthModule,
    ConversationModule,
    RedisModule,
    ArticleModule,
    PreferenceModule,
    QuestionNodeModule,
  ],
  controllers: [AppController, PreferenceController],
  providers: [
    AppService,
    PrismaService,
    SocketGateway,
    RedisRepository,
    PreferenceService,
    ApiKeyService,
    UserService,
    PredictionGrpcService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyMiddleware)
      .forRoutes(
        { path: 'widget/generate', method: RequestMethod.ALL },
        { path: 'widget/customize', method: RequestMethod.ALL },
      );
  }
}
