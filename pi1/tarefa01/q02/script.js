// 2) Criar um botão de alto contraste que alterne a cor de fundo do body para preto e cor do texto para branco. Adicionalmente, crie um botão para resetar as cores originais.

function resetDefault() {
  document.body.style.color = "";
  document.body.style.backgroundColor = "";
}

function changeBg() {
  //   let color = document.getElementById("color").value;

  document.body.style.color = "white";
  document.body.style.backgroundColor = "black";
}
