// Buttons “janky” on mobile
button.addEventListener('mouseenter', () => {
  button.style.transform = 'scale(1.1)';
  button.style.backgroundColor = '#0055bb';
});

button.addEventListener('mouseleave', () => {
  button.style.transform = 'scale(1)';
  button.style.backgroundColor = '#0077ff';
});
