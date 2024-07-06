import { TrainSchedules } from './testable-and-flexible.js';

describe('TrainSchedules Class (Testable and Flexible)', () => {
  let schedules;

  beforeEach(() => {
    const wrapper = new MockStatusCheckerWrapper();
    schedules = new TrainSchedules(wrapper);
  });

  it('expects "findNextTrain" to be working', () => {
    expect(schedules.findNextTrain()).not.toBeNull();
  });
});