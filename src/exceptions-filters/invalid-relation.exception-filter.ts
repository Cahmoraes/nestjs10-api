import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { InvalidRelationError } from '../errors/invalid-relation.error';

@Catch(InvalidRelationError)
export class InvalidRelationExceptionFilter implements ExceptionFilter {
  catch(exception: InvalidRelationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response.status(422).json({
      statusCode: 422,
      message: exception.message,
    });
  }
}
