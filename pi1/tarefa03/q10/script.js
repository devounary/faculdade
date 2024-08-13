// mover para a direita
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("moverParaDireitaBtn")
    .addEventListener("click", moverParaDireita);
});

function moverParaDireita() {
  let ativos = document.getElementById("ativosDisponiveis");
  const ativosSelecionados = ativos.selectedOptions;
  for (let ativo of ativosSelecionados) {
    document.getElementById("ativosDisponiveis").removeChild(ativo);
    document.getElementById("carteiraInvestimentos").appendChild(ativo);
  }
}

// mover para a esquerda
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("moverParaEsquerdaBtn")
    .addEventListener("click", moverParaEsquerda);
});

function moverParaEsquerda() {
  let ativos = document.getElementById("carteiraInvestimentos");
  const ativosSelecionados = ativos.selectedOptions;
  for (let ativo of ativosSelecionados) {
    document.getElementById("carteiraInvestimentos").removeChild(ativo);
    document.getElementById("ativosDisponiveis").appendChild(ativo);
  }
}
