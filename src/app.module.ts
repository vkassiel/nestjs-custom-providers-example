import {
  ConsoleLogger,
  MiddlewareConsumer,
  Module,
  Scope,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as fg from 'fast-glob';
import { REQUEST } from '@nestjs/core';
import { DefaultPriceCaculator } from './services/price-calculator';
import { HostnameMiddleware } from './middlewares/hostname';
import { InMemoryCustomerRepository } from './repositories/customer';
import { ValidateHostnameMiddleware } from './middlewares/validate-hostname';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    ConsoleLogger,
    {
      provide: 'PRICE_CALCULATOR_PROVIDER',
      scope: Scope.REQUEST,
      useFactory: async ({ headers }: Request, logger: ConsoleLogger) => {
        const customerHasOwnPriceCalculator = fg.sync(
          `**/src/custom/customers/${headers['hostname']}/price-calculator-custom.ts`,
        )[0];

        if (!customerHasOwnPriceCalculator) {
          return new DefaultPriceCaculator(logger);
        }

        const PriceCalculatorCustom = await import(
          `./custom/customers/${headers['hostname']}/price-calculator-custom`
        ).then((c) => c.PriceCalculatorCustom);

        return new PriceCalculatorCustom(logger);
      },
      inject: [REQUEST, ConsoleLogger],
    },
    {
      provide: 'CUSTOMER_REPOSITORY',
      useClass: InMemoryCustomerRepository,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HostnameMiddleware).forRoutes('/');
    consumer.apply(ValidateHostnameMiddleware).forRoutes('/');
  }
}
