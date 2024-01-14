import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class HostnameMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: NextFunction) => void) {
    const { headers } = req;
    if (!headers['hostname']) {
      throw new HttpException(
        {
          url: req.url,
          statusCode: HttpStatus.BAD_REQUEST,
          statusMessage: HttpStatus[HttpStatus.BAD_REQUEST],
          message: `Missing 'hostname' property in the request header`,
          timestamp: new Date().getTime(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    next();
  }
}
