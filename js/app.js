document.addEventListener("DOMContentLoaded", function () {
  carregarPokemonsIniciais();

  const form = document.getElementById("form-busca");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const nome = document.getElementById("input-busca").value.trim();
    if (nome) buscarPokemon(nome);
  });
});
