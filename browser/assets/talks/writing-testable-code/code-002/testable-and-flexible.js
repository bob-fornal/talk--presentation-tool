export class Employee {
  employee;

  constructor(employee) {
    this.employee = employee;
  }
}

export function getEmployee(workday, equipment) {
  const employee = new Person();
  employee.setWorkday(workday);
  employee.setEquipment(equipment);
  return employee;
}