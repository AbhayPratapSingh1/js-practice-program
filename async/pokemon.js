const getUrlOfPokemonRange = (from, to) => {
  return `https://pokeapi.co/api/v2/pokemon?offset=${from}&limit=${to - from}`;
};

const getUrlByPokemonId = (id) => {
  return `https://pokeapi.co/api/v2/pokemon-form/${id}`;
};

const showDataOfPokemonBetween = async (from, to) => {
  const url = getUrlOfPokemonRange(from, to);
  const data = await fetch(url).then((x) => x.json());
  return data.results;
};

const pokemons = await showDataOfPokemonBetween(100, 151);
console.log(pokemons.map((each) => each.name));
