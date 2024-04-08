import { Employee } from './hard-to-test.js';

describe('Employee Class (Hard to Test)', () => {
  let employee;

  beforeEach(() => {
    const person = new Person();
    Employee = new Employee(person);
  });

  it('expects employee to be working', () => {
    // This test and all others will be slow
    // due to the large init block
  });
});