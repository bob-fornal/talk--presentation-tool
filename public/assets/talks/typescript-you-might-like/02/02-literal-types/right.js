type Theme = 'light' | 'dark' | 'auto';

function setTheme(theme: Theme) {
  document.body.className = theme;
}

setTheme("darkk"); // error
setTheme("dark"); // Autocomplete suggests options
