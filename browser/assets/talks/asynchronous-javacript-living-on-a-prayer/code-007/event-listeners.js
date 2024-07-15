function setupEventListeners() {
  const button = document.getElementById('event-listener-link');
  button.addEventListener('click', outputFunction.bind(null, 'Click Handler 1'));
  button.addEventListener('click', outputFunction.bind(null, 'Click Handler 2'));
}

function startEventListeners() {
  const time = 100;
  const button = document.getElementById('event-listener-link');

  setTimeout(() => {
    console.log('The Start');
    button.click();
    console.log('The End');
  }, time, button);
}

function outputFunction (content) {
  console.log(content);
}