import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

// @Catch(HttpException)
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Internal Server Error';
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      message = exception.getResponse();
    }

    response.status(statusCode).json({
      success: false,
      statusCode,
      error: message,
      timestamp: new Date(),
    });
  }
}
