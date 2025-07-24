let lastScroll = 0;
let sticking = false;
window.addEventListener('scroll', () => {
  if (!sticking) {
    window.requestAnimationFrame(() => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 50) {
        header.classList.add('navigation-hidden');
      } else {
        header.classList.remove('navigation–hidden');
      }

      lastScroll = currentScroll;
      sticking = false;
    });
    sticking = true;
  }
}, { passive: true });
