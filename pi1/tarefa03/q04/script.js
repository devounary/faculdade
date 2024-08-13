const uploadImagem = document.getElementById("uploadImagem");
const resultado = document.getElementById("resultado");

// Adiciona um evento de clique ao botão
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("carregarImagem")
    .addEventListener("click", carregarImg);
});

function carregarImg() {
  var arquivoSelecionado = document.getElementById("uploadImagem").files[0];
  var img = document.createElement("img");
  img.src = URL.createObjectURL(arquivoSelecionado);

  document.getElementById("resultado").appendChild(img);
}
