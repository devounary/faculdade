// Adiciona um evento de clique ao botão
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("adicionarHashtag")
    .addEventListener("click", adicionarHashtagFavorita);
});

function adicionarHashtagFavorita() {
  const text = document.getElementById("hashtag").value;
  const option = document.createElement("option");
  option.value = text;
  option.text = text;

  document.getElementById("hashtagsPopulares").appendChild(option);
  console.log(text);
}
