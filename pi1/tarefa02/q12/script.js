// 12) Repita o exercício anterior adicionando o conteúdo da caixa de texto em um
// elemento de um select.
function insertOnSelect() {
  let textAreaContent = document.getElementById("text").value;
  let item = document.createElement("option");
  item.textContent = textAreaContent;
  item.value = textAreaContent;
  let list = document.getElementById("list");
  list.appendChild(item);
  document.getElementById("text").value = "";
}
