export class SalexTaxCalculator {
  taxTable;

  constructor(taxTable) {
    this.taxTable = taxTable;
  }

  computeSalesTax(address, amount) {
    return amount * this.taxTable.getTaxRate(address);
  }
}