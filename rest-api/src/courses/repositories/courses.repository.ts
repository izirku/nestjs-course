import { Injectable } from '@nestjs/common';
import { Course } from '../../../../shared/course';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// interface CourseDocument extends Course, Document {}

@Injectable()
export class CoursesRepository {
  constructor(@InjectModel('Course') private courseModel: Model<Course>) {}

  async addCourse(course: Partial<Course>): Promise<Course> {
    // return this.courseModel.create(course);
    // alternative:

    // 1) Create in memory new document
    const newCourse = this.courseModel(course);

    // here we can do linking, modifications, etc.

    // 2) Persist it to database
    await newCourse.save();

    // 3) Document to a plain object, and strip Mongoose versioning attribute
    return newCourse.toObject({ versionKey: false });
  }

  async findAll(): Promise<Course[]> {
    return this.courseModel.find();
  }

  async findCourseByUrl(courseUrl: string): Promise<Course> {
    return this.courseModel.findOne({ url: courseUrl });
  }

  async updateCourse(
    courseId: string,
    changes: Partial<Course>,
  ): Promise<Course> {
    return this.courseModel.findOneAndUpdate({ _id: courseId }, changes, {
      new: true,
    });
  }

  async deleteCourse(courseId: string) {
    return this.courseModel.findOneAndDelete({ _id: courseId });
  }
}
