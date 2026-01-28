const API = "https://pokeapi.co/api/v2/pokemon-form";

async function* pokemon() {
  for (let i = 1; i < 101; i++) {
    yield await fetch(`${API}/${i}`).then((data) => data.json());
  }
}

const t = pokemon();

for await (const pokemon of t) {
  console.log(pokemon.name);
}
