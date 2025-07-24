function equalHeight() {
  const cards = document.querySelectorAll('.card');
  let maxHeight = 0;
  cards.forEach(card => {
    card.style.height = 'auto';
    maxHeight = Math.max(maxHeight, card.offsetHeight);
  });
}

window.addEventListener('resize', debounce(equalHeights, 205));
