async function carregarPokemonsIniciais() {
  const pokemons = await pegarPokemons();
  mostrarListaPokemons(pokemons);
}

async function buscarPokemon(nome) {
  try {
    const pokemon = await buscarPokemonPorNome(nome);
    mostrarListaPokemons([pokemon]);
  } catch (erro) {
    mostrarErro(erro.message);
  }
}
