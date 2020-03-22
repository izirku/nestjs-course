import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { Lesson } from '../../../../shared/lesson';
import { LessonsRepository } from '../repositories/lessons.repository';

@Controller('lessons')
export class LessonsController {
  constructor(private lessonsDB: LessonsRepository) {}

  @Get()
  searchLessons(
    @Query('courseId') courseId: string,
    @Query('sortOrder') sortOrder = 'asc',
    @Query('pageNumber', ParseIntPipe) pageNumber = 0,
    @Query('pageSize', ParseIntPipe) pageSize = 3,
  ): Promise<Lesson> {
    if (!courseId) {
      throw new BadRequestException('courseId must be defined');
    }
    if (sortOrder !== 'asc' && sortOrder !== 'desc') {
      throw new BadRequestException('sortOrder must be asc or desc');
    }
    return this.lessonsDB.search(courseId, sortOrder, pageNumber, pageSize);
  }
}
