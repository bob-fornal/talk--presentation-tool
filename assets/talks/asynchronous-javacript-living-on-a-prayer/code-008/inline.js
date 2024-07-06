function startInlineWorker() {
  for (let step = 0, len = 10; step < len; step++) {
    displayPercent((step + 1) * 10);
    const start = Date.now();
    while (Date.now() < start + 1000) {}
  }
}

function displayPercent(percent) {
  const progress = document.getElementById('inline-worker');
  console.log(`inline percent: ${percent}`);
  progress.value = percent;
}