import { SalesTaxCalculator } from './hard-to-test.js';

describe('SalesTaxCalculator Class (Hard to Test)', () => {
  let calc;

  beforeEach(() => {
    calc = new SalesTaxCalculator(new TaxTable());
  });

  it('expects "computeSalesTax" to be working', () => {
    const address = new Address('1234 Someplace Close, ...');
    const user = new User(address);
    const invoice = new Invoice(1, new ProductX(95.00));

    expect(calc.computeSalesTax(user, invoice)).toEqual(0.05);
  });
});