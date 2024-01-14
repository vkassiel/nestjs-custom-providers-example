import { DefaultPriceCaculator } from 'src/services/price-calculator';

export class PriceCalculatorCustom extends DefaultPriceCaculator {
  name = `PriceCalculatorCustom`;
  private readonly PRICE = 5;

  async execute(): Promise<number> {
    this.logger.setContext(`<skynet> ${this.name}`);
    this.logger.log(`[execute]`);
    return this.calculate();
  }

  async calculate(): Promise<number> {
    return this.terminatorIsInThePast() ? this.PRICE * 800 : this.PRICE;
  }

  private terminatorIsInThePast() {
    return true;
  }
}
