// 3) Crie uma pequena calculadora de soma.

function soma() {
  let n1 = document.getElementById("n1").value;
  let n2 = document.getElementById("n2").value;
  let sum = Number(n1) + Number(n2);
  document.getElementById("result").value = sum
}
