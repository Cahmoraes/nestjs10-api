import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class CatchAllErrorsExceptionFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // logs de arquivo
    // enviar erro para uma plataforma externa
    return super.catch(exception, host);
  }
}
