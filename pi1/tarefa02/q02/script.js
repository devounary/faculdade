// 2) Crie dois exemplos usando os métodos do objeto document:
// a. getElementById();
// b. getElementsByTagName();

// coloca um texto em todas as tags <p> da pagina apos apertar um botao
function insertTextInAllP() {
  let content = document.getElementById("content").value;
  let allP = document.body.getElementsByTagName("p");
  for (let i = 0; i < allP.length; i++) {
    allP[i].textContent = content; // Substitui o conteúdo atual por content
  }
}

// muda a cor de fundo de uma div para vermelho
function changeDivBg() {
  let div = document.getElementById("div");
  div.style.backgroundColor = "red";
}
