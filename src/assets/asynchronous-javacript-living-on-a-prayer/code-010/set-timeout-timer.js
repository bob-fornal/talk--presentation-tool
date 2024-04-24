let repetitions = 0;
let totalActualDelay = 0;
const totalRepetitions = 1000;
let _delay = 0;

function startSetTimeoutTimerZero() {
  startSetTimeoutTimer(0);
}
function startSetTimeoutTimerTen() {
  startSetTimeoutTimer(10);
}

function startSetTimeoutTimer(delay = 0) {
  repetitions = 0;
  totalActualDelay = 0;
  _delay = delay;
  testDelay();
}

function testDelay() {
  if (repetitions++ > totalRepetitions) {
    console.log(`Requested Delay: ${_delay.toString()}, Actual Average Delay: ${getActualDelay()}`);
    return;
  }
  iterate();
}

function getActualDelay() {
  return totalActualDelay / totalRepetitions;
}

function iterate() {
  let start = new Date();
  setTimeout(() => {
    totalActualDelay += new Date() - start;
    testDelay();
  }, _delay);
}
