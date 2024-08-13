// 1) Refatore o código de forma que seja possível passar uma mensagem de erro
// específica e que possa ser passado o id do componente HTML que irá receber a
// mensagem de erro.

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("botaoErro").addEventListener("click", function () {
    configError("mensagemErro", "Erro afdfsdfdfdfsdf");
  });
});

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
