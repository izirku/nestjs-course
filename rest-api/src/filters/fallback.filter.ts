import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';

@Catch()
export class FallbackExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    return response.status(500).json({
      statusCode: 500,
      createdBy: 'FallbackExceptionFilter',
      errorMessage: exception.message
        ? exception.message.message
        : 'Unexpected error occured',
    });
  }
}
