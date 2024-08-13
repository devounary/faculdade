// Altere o código anterior validando se o campo foi preenchido:
// a) Retire os espaços usando a função trim() das strings e faça um if testando se a
// string resultante é nula/vazia;

// b) Sinalize que o conteúdo do campo não pode ser vazio usando a função de
// exibir mensagens de erro da questão anterior

document.addEventListener("DOMContentLoaded", function () {
  var botaoExibir = document.getElementById("botaoExibir");
  botaoExibir.addEventListener("click", exibirConteudo);
});

function exibirConteudo() {
  var conteudo = document.getElementById("caixaDeTexto").value;
  var conteudoSemEspaco = conteudo.trim();
  if (conteudoSemEspaco == "") {
    var mensagemError = "O campo de texto não pode ser vazio";
    configError("mensagemErro", mensagemError);
  } else {
    document.getElementById("conteudo").innerText = conteudo;
  }
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
