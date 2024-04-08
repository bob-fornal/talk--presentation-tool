import { House } from './testable-and-flexible.js';

describe('House Class (Testable and Flexible)', () => {
  let house;

  const mockKitchen = new MockKitchen();
  const mockBedroom = new MockBedroom();

  beforeEach(() => {
    house = new House(mockKitchen, mockBedroom);
  });

  it('expects kitchen and bedroom to be defined', () => {
    expect(house.kitchen).toEqual(mockKitchen);
    expect(house.bedroom).toEqual(mockBedroom);
  });
});