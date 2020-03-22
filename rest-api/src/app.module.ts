import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { DB_CONN_STR } from './constants';
import { CoursesModule } from './courses/courses.module';
import { GetUserMiddleware } from './middleware/get-user.middleware';
import { CoursesController } from './courses/controllers/courses.controller';
import { LessonsController } from './courses/controllers/lessons.controller';

@Module({
  imports: [
    CoursesModule,
    AuthModule,
    MongooseModule.forRoot(DB_CONN_STR, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void | MiddlewareConsumer {
    consumer
      .apply(GetUserMiddleware)
      .forRoutes(CoursesController, LessonsController);
  }
}
