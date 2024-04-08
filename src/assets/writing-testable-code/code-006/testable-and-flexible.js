export class TrackStatusCheckerWrapper {

  isClosed(track) {
    return TrackStatusChecker.isClosed(track);
  }
}

export class TrainSchedules {
  wrappedLibrary;

  constructor(wrappedLibrary) {
    this.wrappedLibrary = wrappedLibrary;
  }

  findNextTrain() {
    if (this.wrappedLibrary.isClosed(track)) {
      // ...
    }
    // ... return a schedule
  }
}