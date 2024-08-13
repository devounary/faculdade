document.addEventListener("DOMContentLoaded", function () {
  // Seleciona os elementos dos selects e dos botões
  let ativosDisponiveis = document.getElementById("ativosDisponiveis");
  let ativosCarteira = document.getElementById("carteiraInvestimentos");
  let moverParaDireitaBtn = document.getElementById("moverParaDireitaBtn");
  let moverParaEsquerdaBtn = document.getElementById("moverParaEsquerdaBtn");

  // Adiciona os event listeners para os botões
  moverParaDireitaBtn.addEventListener("click", moverParaDireita);
  moverParaEsquerdaBtn.addEventListener("click", moverParaEsquerda);

  // Atualiza o estado dos botões inicialmente
  atualizarEstadoBotoes();

  // Função para mover itens para a direita
  function moverParaDireita() {
    if (temSelecionados(ativosDisponiveis)) {
      const ativosSelecionados = Array.from(ativosDisponiveis.selectedOptions);
      ativosSelecionados.forEach((ativo) => {
        ativosDisponiveis.removeChild(ativo);
        ativosCarteira.appendChild(ativo);
      });
      atualizarEstadoBotoes();
    } else {
      configError("mensagemErro", "Nenhum item foi selecionado");
    }
  }

  // Função para mover itens para a esquerda
  function moverParaEsquerda() {
    if (temSelecionados(ativosCarteira)) {
      const ativosSelecionados = Array.from(ativosCarteira.selectedOptions);
      ativosSelecionados.forEach((ativo) => {
        ativosCarteira.removeChild(ativo);
        ativosDisponiveis.appendChild(ativo);
      });
      atualizarEstadoBotoes();
    } else {
      configError("mensagemErro", "Nenhum item foi selecionado");
    }
  }

  // Função para verificar se há itens selecionados
  function temSelecionados(select) {
    return select.selectedOptions.length > 0;
  }

  // Função para verificar se o select está vazio
  function estaVazio(select) {
    return select.options.length === 0;
  }

  // Função para atualizar o estado dos botões
  function atualizarEstadoBotoes() {
    moverParaDireitaBtn.disabled = estaVazio(ativosDisponiveis);
    moverParaEsquerdaBtn.disabled = estaVazio(ativosCarteira);
  }

  // Função para configurar a mensagem de erro
  function configError(id, message) {
    var errorMessage = document.getElementById(id);
    errorMessage.innerText = message;
    errorMessage.classList.remove("oculto");
    errorMessage.classList.add("show");
    setTimeout(function () {
      errorMessage.classList.add("oculto");
      errorMessage.classList.remove("show");
    }, 3000);
  }
});
