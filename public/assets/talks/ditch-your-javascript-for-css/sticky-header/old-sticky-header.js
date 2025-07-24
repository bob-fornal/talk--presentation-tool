window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  const stickyThreshold = 200; // Adjust as needed

  if (window.scrollY > stickyThreshold) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});