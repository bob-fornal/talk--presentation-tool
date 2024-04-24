function startSimplePromise() {
  const time = 0;
  
  console.log('The Start');

  triggerTimeout(time);
  triggerPromise();

  console.log('The End');
}

function triggerTimeout(time) {
  setTimeout(() => {
    console.log('setTimeout Fired');
  }, time);
}

function triggerPromise() {
  new Promise((resolve, reject) => {
    resolve('Resolved');
  })
  .then(res => console.log(res))
  .catch(err => console.log(err));
}