function startComplexNetwork() {
  const time = 0;
  console.log('1');
  first(time);
  console.log('5');
}

function first(time) {
  setTimeout(() => {
    console.log('2')
    second(time);
    console.log('4');
  }, time);
}

function second(time) {
  setTimeout(() => {
    console.log('3');
  }, time);
}