// Altere o código anterior validando se o campo foi preenchido:
// a) Retire os espaços usando a função trim() das strings e faça um if testando se a
// string resultante é nula/vazia;

// b) Sinalize que o conteúdo do campo não pode ser vazio usando a função de
// exibir mensagens de erro da questão anterior

document.addEventListener("DOMContentLoaded", function () {
  var botaoExibir = document.getElementById("calcularEngajamento");
  botaoExibir.addEventListener("click", exibirEngajamento);
});

function exibirEngajamento() {
  var numeroInteracoes = Number(document.getElementById("interacoes").value);
  var numeroVisualizacoes = Number(
    document.getElementById("visualizaoes").value
  );

  // checando se são valores validos
  if (isValid(numeroInteracoes) && isValid(numeroVisualizacoes)) {
    // calculando Engajamento
    var valorEngajamento = calculoEngajamento(
      numeroInteracoes,
      numeroVisualizacoes
    );
    document.getElementById(
      "resultado"
    ).innerHTML = `<b>Taxa de Engajamento:</b> ${(
      valorEngajamento / 100
    ).toFixed(1)}%`;

    document.getElementById("interacoes").value = "";
    document.getElementById("visualizaoes").value = "";
  } else {
    var mensagemError = "Os valores digitados são inválidos";
    configError("mensagemErro", mensagemError);
  }
}

function isValid(value) {
  if (value >= 1 && !isNaN(value)) {
    return true;
  }
  return false;
}

function calculoEngajamento(interacoes, visualizacoes) {
  return (interacoes / visualizacoes) * 100;
}

function configError(id, message) {
  var errorMessage = document.getElementById(id);
  errorMessage.innerText = message;
  errorMessage.classList.remove("oculto");
  errorMessage.className = "show";
  setTimeout(function () {
    errorMessage.classList.add("oculto");
    errorMessage.className = errorMessage.className.replace("show", "");
  }, 3000);
}
