// Adiciona um evento de clique ao botão
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("enviarBtn")
    .addEventListener("click", redesFavoritas);
});

function redesFavoritas() {
  let checkBoxes = document.getElementsByName("redesSociais");
  let itensChecked = checkCheckboxes(checkBoxes);
  if (itensChecked.length != 0) {
    const redes = redesFormatadas(itensChecked);
    const message = `Redes selecionadas: ${redes}`;
    configMessage("redesSelecionadas", message);
  } else {
    configMessage("redesSelecionadas", "Nenhum item selecionado");
  }
}

function redesFormatadas(array) {
  let message = "";
  for (let i = 0; i < array.length; i++) {
    if (i != array.length && i != 0) {
      message += " | ";
    }
    message += array[i].value;
  }
  return message;
}

// checa se algum item foi selecionado
function checkCheckboxes(document) {
  let itens = [];
  document.forEach((item) => {
    if (item.checked) {
      itens.push(item);
    }
  });

  return itens;
}

function configMessage(id, message) {
  var errorMessage = document.getElementById(id);
  errorMessage.innerText = message;
  errorMessage.classList.remove("oculto");
  errorMessage.className = "show";
  setTimeout(function () {
    errorMessage.classList.add("oculto");
    errorMessage.className = errorMessage.className.replace("show", "");
  }, 3000);
}
