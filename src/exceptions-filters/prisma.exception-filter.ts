import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (exception.code === 'P2025') {
      return response.status(404).json({
        statusCode: 404,
        message: exception.message,
      });
    }
    return response.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }
}
