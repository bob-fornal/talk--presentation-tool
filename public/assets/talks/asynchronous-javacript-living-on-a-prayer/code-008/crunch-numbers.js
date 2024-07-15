onmessage = function() {
  for (let step = 0, len = 10; step <= len; step++) {
    postMessage(step * 10);
    const start = Date.now();
    while (Date.now() < start + 1000) {};
  }
}
