async function dtfndInit003(env) {
  try {
    const response = await fetch('https://the-cocktail-db.p.rapidapi.com/search.php?s=vodka', {
      method: "GET",
      headers: {
        'X-RapidAPI-Key': env.RAPID_API_KEY,
        'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }

  env.callback();
}