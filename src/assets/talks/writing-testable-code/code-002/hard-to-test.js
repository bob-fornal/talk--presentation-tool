export class Employee {
  employee;

  constructor(employee) {
    employee.setWorkday(new EightHourWorkday());
    employee.setEquipment(new EquipmentWithLargeInitBlock());
    this.employee = employee;
  }
}