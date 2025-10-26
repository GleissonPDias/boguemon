function criarElemento(tag, classe, conteudo) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (conteudo) el.textContent = conteudo;
  return el;
}

function criarCardPokemon(pokemon) {
  const card = criarElemento("div", "card-pokemon");

  const imagem = criarElemento("img", "pokemon-imagem");
  imagem.src = pokemon.imagem;

  // 🆔 Mostra o ID
  const id = criarElemento("span", "pokemon-id", `#${pokemon.id}`);

  const nome = criarElemento("span", "pokemon-nome", pokemon.nome);
  const tipos = criarElemento("div", "pokemon-tipos", pokemon.tipos.join(", "));

  card.appendChild(imagem);
  card.appendChild(id);
  card.appendChild(nome);
  card.appendChild(tipos);

  // 🖱 Evento de clique para exibir detalhes
  card.addEventListener("click", () => {
    mostrarDetalhesPokemon(pokemon);
  });

  return card;
}

function mostrarListaPokemons(pokemons) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const lista = criarElemento("div", "lista-pokemons");

  pokemons.forEach((p) => lista.appendChild(criarCardPokemon(p)));
  app.appendChild(lista);
}

function mostrarErro(mensagem) {
  const app = document.getElementById("app");
  app.innerHTML = `<p style="color:red;">${mensagem}</p>`;
}

// 🪟 Modal de detalhes do Pokémon
function mostrarDetalhesPokemon(pokemon) {
  // Cria fundo escuro
  const fundo = criarElemento("div", "modal-fundo");

  // Cria modal
  const modal = criarElemento("div", "modal-pokemon");

  const titulo = criarElemento("h2", null, `#${pokemon.id} - ${pokemon.nome}`);
  const imagem = criarElemento("img", "pokemon-imagem-grande");
  imagem.src = pokemon.imagem;

  const tipos = criarElemento("p", null, "Tipos: " + pokemon.tipos.join(", "));

  // Cria lista de atributos (stats)
  const listaStats = criarElemento("ul", "lista-stats");
  pokemon.atributos.forEach((attr) => {
    const item = criarElemento("li", null, `${attr.nome}: ${attr.valor}`);
    listaStats.appendChild(item);
  });

  const botaoFechar = criarElemento("button", "botao-fechar", "Fechar");
  botaoFechar.addEventListener("click", () => fundo.remove());

  modal.appendChild(titulo);
  modal.appendChild(imagem);
  modal.appendChild(tipos);
  modal.appendChild(criarElemento("h3", null, "Atributos:"));
  modal.appendChild(listaStats);
  modal.appendChild(botaoFechar);

  fundo.appendChild(modal);
  document.body.appendChild(fundo);
}
