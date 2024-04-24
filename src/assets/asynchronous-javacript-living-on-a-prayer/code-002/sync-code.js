function runSync() {
  const numbers = [1, 2, 3];
  console.log('The Start');
  forEachSync(numbers, (number) => {
    console.log(number * 2);
  });
  console.log('The End');
}

function forEachSync(items, callback) {
  for (const item of items) {
    callback(item);
  }
}
