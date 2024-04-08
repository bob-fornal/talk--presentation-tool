export class SalexTaxCalculator {
  taxTable;

  constructor(taxTable) {
    this.taxTable = taxTable;
  }

  computeSalesTax(user, invoice) {
    const address = user.getAddress();
    const amount = invoice.getSubtotal();
    return amount * this.taxTable.getTaxRate(address);
  }
}