// 11) Pesquise como criar elementos e adicione o conteúdo de uma caixa de texto em uma lista não ordenada.

function insertOnList() {
  let textAreaContent = document.getElementById("text").value;
  console.log(textAreaContent);
  let item = document.createElement("li");
  item.textContent = textAreaContent;
  let list = document.getElementById("list");
  list.appendChild(item);

  document.getElementById("text").value = "";
}
