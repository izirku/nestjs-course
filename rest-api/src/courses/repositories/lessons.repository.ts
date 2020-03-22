import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson } from '../../../../shared/lesson';
import { Model } from 'mongoose';

@Injectable()
export class LessonsRepository {
  constructor(@InjectModel('Lesson') private lessonsModel: Model<Lesson>) {}

  search(
    courseId: string,
    sortOrder: string,
    pageNumber: number,
    pageSize: number,
  ) {
    return this.lessonsModel.find({ course: courseId }, null, {
      skip: pageSize * pageNumber,
      limit: pageSize,
      sort: {
        seqNo: sortOrder,
      },
    });
  }
}
