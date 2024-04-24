function startComplexPromise() {
  const time = 0;
  
  console.log('The Start');

  triggerTimeout(time);
  triggerPromise1();
  triggerPromise2();

  console.log('The End');
}

function triggerTimeout(time) {
  setTimeout(() => {
    console.log('setTimeout Fired');
  }, time);
}

function triggerPromise1() {
  new Promise((resolve, reject) => {
    resolve('Resolved 1');
  })
  .then(res => console.log(res))
  .catch(err => console.log(err));
}

function triggerPromise2() {
  new Promise((resolve, reject) => {
    resolve('Resolved 2');
  })
  .then(res => {
    console.log(res);
    triggerPromise3();
  })
  .catch(err => console.log(err));
}

function triggerPromise3() {
  new Promise((resolve, reject) => {
    resolve('Resolved 3');
  })
  .then(res => console.log(res))
  .catch(err => console.log(err));
}