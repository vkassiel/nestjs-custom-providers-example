import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { CustomerRepository } from 'src/repositories/customer-repository';

@Injectable()
export class ValidateHostnameMiddleware implements NestMiddleware {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private readonly customerRepository: CustomerRepository,
  ) {}

  async use(req: Request, res: Response, next: (error?: NextFunction) => void) {
    const { headers } = req;
    const hostname = headers['hostname'];
    const customer =
      await this.customerRepository.getCustomerByHostname(hostname);
    if (!customer) {
      throw new HttpException(
        {
          url: req.url,
          statusCode: HttpStatus.BAD_REQUEST,
          statusMessage: HttpStatus[HttpStatus.BAD_REQUEST],
          message: `An invalid 'hostname' property was provided in the request header`,
          timestamp: new Date().getTime(),
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    next();
  }
}
