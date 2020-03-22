import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Course } from '../../../../shared/course';
import { HttpExceptionFilter } from '../../filters/http.filter';
import { CoursesRepository } from '../repositories/courses.repository';
import { AuthenticationGuard } from '../../guards/authentication.guard';
import { AdminGuard } from '../../guards/admin.guard';

@Controller('courses')
@UseFilters(new HttpExceptionFilter())
@UseGuards(AuthenticationGuard)
export class CoursesController {
  constructor(private coursesDB: CoursesRepository) {}

  @Post()
  // async createCourse(@Body() course: Partial<Course>): Promise<Course> {
  // in order for ValidationPipe to work on course, it cannot be Partial<Course>
  @UseGuards(AdminGuard)
  async createCourse(@Body() course: Course): Promise<Course> {
    return this.coursesDB.addCourse(course);
  }

  @Get()
  async findAllCourses(): Promise<Course[]> {
    return this.coursesDB.findAll();
  }

  @Get(':courseUrl')
  async findCourseByUrl(@Param('courseUrl') courseUrl: string) {
    const course = await this.coursesDB.findCourseByUrl(courseUrl);
    if (!course) {
      throw new NotFoundException(`course URL not found: ${courseUrl}`);
    }
    return course;
  }

  @Put(':courseId')
  // @UseFilters(new HttpExceptionFilter())
  @UseGuards(AdminGuard)
  async updateCourse(
    @Param('courseId') courseId: string,
    // @Body('seqNo', ToIntegerPipe) seqNo: number,
    // @Body() changes: Partial<Course>,
    @Body() changes: Course,
  ): Promise<Course> {
    // console.log('seqNo value: ' + seqNo + ', type: ' + typeof seqNo);

    if (changes._id) {
      // throw new HttpException("Can't update course id", 400);
      // tslint:disable-next-line: quotemark
      throw new BadRequestException("Can't update course id");
    }

    return this.coursesDB.updateCourse(courseId, changes);
  }

  @Delete(':courseId')
  @UseGuards(AdminGuard)
  async deleteCourse(@Param('courseId') courseId: string) {
    return this.coursesDB.deleteCourse(courseId);
  }
}
