import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string | string[] = 'internel server error';
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const response = exception.getResponse();
      if (typeof response == 'string') message = response;
      else if (typeof response === 'object' && 'message' in response)
        message = response.message as string;
    }

    const responseBody = {
      success: false,
      statusCode,
      message,
      timestamp: new Date().toISOString(),
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
