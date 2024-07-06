import { SalexTaxCalculator } from './testable-and-flexible.js';

describe('SalexTaxCalculator Class (Testable and Flexible)', () => {
  let calc;

  beforeEach(() => {
    calc = new SalesTaxCalculator(new TaxTable());
  });

  it('expects "computeSalesTax" to be working', () => {
    const address = new Address('1234 Someplace Close, ...');

    expect(calc.computeSalesTax(address, 0.95)).toEqual(0.05);
  });
});