// Adiciona um evento de clique ao botão
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("adicionarHashtag")
    .addEventListener("click", adicionarHashtagFavorita);
});

function adicionarHashtagFavorita() {
  const text = document.getElementById("hashtag").value.trim();
  // fazendo a validação
  if (validacaoHashtag(text)) {
    const option = document.createElement("option");
    option.value = text;
    option.text = text;
    document.getElementById("hashtagsPopulares").appendChild(option);
    document.getElementById("hashtag").value = "";
  } else {
    configError("mensagemErro", "Ocorreu um erro");
  }
}

// função de validação
function validacaoHashtag(hashtag) {
  if (hashtag.length < 2 || hashtag == "") {
    return false;
  } else {
    let selects = document.getElementById("hashtagsPopulares").options;
    // percorrendo os itens
    for (let item of selects) {
      if (item.value == hashtag) {
        return false;
      }
    }

    if (selects.length < 5) {
      return true;
    } else {
      return false;
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("removerHashtag")
    .addEventListener("click", removerHashtag);
});

function removerHashtag() {
  let selects = document.getElementById("hashtagsPopulares").selectedOptions;
  let hashtagParaRemover = selects[0];
  document.getElementById("hashtagsPopulares").removeChild(hashtagParaRemover);
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
