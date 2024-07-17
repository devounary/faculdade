/* 6) Crie um exemplo em que uma propriedade CSS de um elemento HTML é alterada 
via DOM baseada na documentação da página: */

// mudando a cor do texto de uma tag <h1>
function changeColorH1() {
  let h1 = document.getElementById("h1");
  h1.style.color = "red";
}
