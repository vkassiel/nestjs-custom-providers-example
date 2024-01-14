import { ConsoleLogger } from '@nestjs/common';

export interface PriceCalculator {
  name: string;
  execute(): Promise<number>;
  calculate(): Promise<number>;
}

export class DefaultPriceCaculator implements PriceCalculator {
  constructor(protected readonly logger: ConsoleLogger) {}

  name = `DefaultPriceCalculator`;
  private readonly DEFAULT_PRICE = 20;

  async execute(): Promise<number> {
    this.logger.setContext(this.name);
    this.logger.log(`[execute]`);
    return this.calculate();
  }

  async calculate(): Promise<number> {
    this.logger.log(`[calculate]`);
    return this.isBlackFriday()
      ? (this.DEFAULT_PRICE * 2) / 2
      : this.DEFAULT_PRICE;
  }

  private isBlackFriday(): boolean {
    this.logger.log(`[isBlackFriday]`);
    return false;
  }
}
