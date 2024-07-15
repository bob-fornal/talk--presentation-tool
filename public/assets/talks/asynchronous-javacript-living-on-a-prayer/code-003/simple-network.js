function startSimpleNetwork() {
  const time = 100;
  console.log('The Start');
  networkRequest(time);
  console.log('The End');
}

function networkRequest(time) {
  setTimeout(() => {
    console.log(`Async Code after ${time}ms.`);
  }, time);
}