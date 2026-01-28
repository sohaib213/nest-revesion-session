import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

// @Catch(HttpException)
@Catch(HttpException)
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal Server Error';
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const responseData: unknown = exception.getResponse();
      if (typeof responseData === 'string') {
        message = responseData;
      } else if (
        responseData &&
        typeof responseData === 'object' &&
        'message' in responseData
      ) {
        message = responseData.message;
        // console.log('Res Data => ', responseData);
      }
    }

    response.status(statusCode).json({
      success: false,
      statusCode,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      message,
      timestamp: new Date(),
    });
  }
}
