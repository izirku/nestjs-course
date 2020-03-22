import { Module } from '@nestjs/common';
import { CoursesController } from './controllers/courses.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema } from './schemas/courses.schema';
import { CoursesRepository } from './repositories/courses.repository';
import { LessonsSchema } from './schemas/lessons.schema';
import { LessonsController } from './controllers/lessons.controller';
import { LessonsRepository } from './repositories/lessons.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      // model is implicitly created by these
      {
        name: 'Course',
        schema: CourseSchema,
      },
      {
        name: 'Lesson',
        schema: LessonsSchema,
      },
    ]),
  ],
  controllers: [CoursesController, LessonsController],
  providers: [CoursesRepository, LessonsRepository],
})
export class CoursesModule {}
