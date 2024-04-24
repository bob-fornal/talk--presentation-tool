function triggerEvent() {
  const time = 5000;
  const wrapper = document.getElementById('thought-wrapper');

  wrapper.style.backgroundColor = 'red';

  const p = document.createElement('p');
  p.setAttribute('id', 'thought-run');
  p.innerText = 'Thought Exercise ...';
  wrapper.appendChild(p);

  const start = Date.now();
  while (Date.now() < start + time);
}

function dtfndDemo01Start() {
  const button = document.querySelector('#thought-button');
  button.addEventListener('click', triggerEvent);
}

function dtfndDemo01End() {
  const wrapper = document.getElementById('thought-wrapper');
  const button = document.getElementById('thought-button');

  button.removeEventListener('click', triggerEvent);
  wrapper.style.backgroundColor = '';

  const p = document.getElementById('thought-run');
  if (p) {
    p.parentNode.removeChild(p);
  }
}