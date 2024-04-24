function startInteraction() {
  const drag = document.getElementById('drag');
  drag.ondragstart = dragStart;

  const drops = document.getElementsByClassName('drop');
  for (let i = 0, len = drops.length; i < len; i++) {
    drops[i].ondrop = dropEvent;
    drops[i].ondragover = dragOver;
  }
}

dragStart = (event) => {
  event.dataTransfer.setData('text/plain', event.target.id);
  console.log('drag start', event);
};

dragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
  console.log({ x: event.pageX, y: event.pageY });
};

dropEvent = (event) => {
  const id = event.dataTransfer.getData('text');
  console.log('drop', id);
  const element = document.getElementById('drag');
  event.target.appendChild(element);
};