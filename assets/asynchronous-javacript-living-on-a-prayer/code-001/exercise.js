function triggerEvent() {
  const time = 2000;
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
  const wrapper = document.getElementById('thought-wrapper');
  wrapper.classList.remove('hide');

  const button = document.querySelector('#thought-button');
  button.addEventListener('click', triggerEvent);
}

function dtfndDemo01End() {
  const wrapper = document.getElementById('thought-wrapper');
  const button = document.getElementById('thought-button');

  button.classList.add('hide');
  button.removeEventListener('click', triggerEvent);

  wrapper.style.backgroundColor = '';

  const p = document.getElementById('thought-run');
  if (p) {
    p.parentNode.removeChild(p);
  }
}