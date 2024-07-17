// 4) Crie um segundo botão chamado “limpar” que limpe o conteúdo do texto do
// parágrafo

// selecione o botão usando o método getElementById
var botao = document.getElementById("botao");

// adicione um evento de clique ao botão
botao.addEventListener("click", function () {
  // selecione o parágrafo usando o método getElementById
  var paragrafo = document.getElementById("paragrafo");
  // altere o texto do parágrafo
  paragrafo.textContent = "O texto deste parágrafo foi alterado!";
});

let clean = document.getElementById("clean");

clean.addEventListener("click", function () {
  // selecione o parágrafo usando o método getElementById
  var paragrafo = document.getElementById("paragrafo");
  // altere o texto do parágrafo
  paragrafo.textContent = "";
});
