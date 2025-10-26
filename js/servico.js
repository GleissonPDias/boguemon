const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

async function pegarPokemons(limite = 30, deslocamento = 0) {
  const resposta = await fetch(
    `${BASE_URL}?limit=${limite}&offset=${deslocamento}`
  );
  const dados = await resposta.json();

  const detalhados = await Promise.all(
    dados.results.map(async (p) => {
      const res = await fetch(p.url);
      const poke = await res.json();
      return new Pokemon(
        poke.id,
        poke.name,
        poke.sprites.front_default,
        poke.types.map((t) => t.type.name),
        poke.stats.map((s) => ({ nome: s.stat.name, valor: s.base_stat }))
      );
    })
  );

  return detalhados;
}

async function buscarPokemonPorNome(nome) {
  const resposta = await fetch(`${BASE_URL}/${nome.toLowerCase()}`);
  if (!resposta.ok) throw new Error("Pokémon não encontrado!");
  const poke = await resposta.json();

  return new Pokemon(
    poke.id,
    poke.name,
    poke.sprites.front_default,
    poke.types.map((t) => t.type.name),
    poke.stats.map((s) => ({ nome: s.stat.name, valor: s.base_stat }))
  );
}
