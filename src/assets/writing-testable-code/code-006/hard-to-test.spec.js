import { TrainSchedules } from './hard-to-test.js';

describe('TrainSchedules Class (Hard to Test)', () => {
  let schedules;

  beforeEach(() => {
    schedules = new TrainSchedules();
  });

  it('expects "findNextTrain" to be working', () => {
    expect(schedules.findNextTrain()).not.toBeNull();
  });
});