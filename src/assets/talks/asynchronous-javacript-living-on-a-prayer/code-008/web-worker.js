function startWebWorker() {
  const worker = new Worker('assets/asynchronous-javacript-living-on-a-prayer/code-008/crunch-numbers.js');
  worker.onmessage = displayPercent;
  worker.postMessage('start');
}

function displayPercent(message) {
  const progress = document.getElementById('web-worker');
  console.log(`web-worker percent: ${message.data}`);
  progress.value = message.data;
}