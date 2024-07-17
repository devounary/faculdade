// Crie um código que conte o número de parágrafos dentro de uma div e exiba o
// resultado em uma outra div

function CountAllP() {
  // count all <p> on Div
  let div1 = document.getElementById("div1");
  let allPOnDiv1 = div1.getElementsByTagName("p");
  let count = 0;
  for (let i = 0; i < allPOnDiv1.length; i++) {
    count++;
  }

  // put result in <div> "result"
  let div2 = document.getElementById("result");
  div2.innerText = " > Contagem da Tag: " + count;
}
