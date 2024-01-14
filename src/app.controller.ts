import { Controller, Get, Inject, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { PriceCalculator } from './services/price-calculator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('PRICE_CALCULATOR_PROVIDER')
    private readonly priceCalculatorService: PriceCalculator,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('price')
  async getPrice(@Res() response): Promise<number> {
    const price = await this.priceCalculatorService.execute();
    return response.json({ price });
  }
}
