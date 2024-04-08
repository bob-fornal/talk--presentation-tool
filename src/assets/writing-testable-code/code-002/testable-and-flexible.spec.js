import { Employee, getEmployee } from './testable-and-flexible.js';

describe('Employee Class (Testable and Flexible)', () => {
  let employee;

  beforeEach(() => {
    // ...
  });

  it('expects employee to be working', () => {
    const workday = new OneMinuteWorkDay();
    const equipment = null;
    const person = getEmployee(workday, equipment);
    employee = new Employee(person);

    expect(employee.isWorking()).toEqual(true);
  });
});