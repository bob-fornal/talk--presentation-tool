export class House {
  kitchen = new Kitchen();
  bedroom;

  constructor() {
    this.bedroom = new Bedroom();
  }
}