import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // catch(exception: HttpException, host: import("@nestjs/common").ArgumentsHost) {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('HTTP exception handler triggered', JSON.stringify(exception));

    const ctx = host.switchToHttp();

    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const statusCode = exception.getStatus();

    return response.status(statusCode).json({
      status: statusCode,
      createdBy: 'HttpExceptionFilter',
      errorMessage: exception.message.message,
    });
  }
}
