async function dtfndInit004() {
  const files = [
    './assets/developer-tools-for-non-developers/code-003/small.json',
    './assets/developer-tools-for-non-developers/code-003/medium.json',
    './assets/developer-tools-for-non-developers/code-003/small.json',
    './assets/developer-tools-for-non-developers/code-003/large.json',
    './assets/developer-tools-for-non-developers/code-003/small.json',
    './assets/developer-tools-for-non-developers/code-003/small.json',
  ]
  try {
    for (let i = 0, len = files.length; i < len; i++) {
      const response = await fetch(files[i], {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const data = await response.json();
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
}