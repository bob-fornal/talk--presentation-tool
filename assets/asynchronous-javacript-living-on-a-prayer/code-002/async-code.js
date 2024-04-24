function runAsync() {
  const numbers = [1, 2, 3];
  console.log('The Start');
  forEachAsync(numbers, (number) => {
    console.log(number * 2);
  });
  console.log('The End');
}

function forEachAsync(items, callback) {
  for (const item of items) {
    setTimeout(() => {
      callback(item);
    }, 0, item);
  }
}