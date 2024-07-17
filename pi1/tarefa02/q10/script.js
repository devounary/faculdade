// 10) Crie uma pequena calculadora com as 4 operações. A operação deve ser
// selecionada de botões de radio. Para isso, teste a propriedade checked para
// descobrir qual operação está selecionada.

function realizarOperacao() {
  let n1 = Number(document.getElementById("n1").value);
  let n2 = Number(document.getElementById("n2").value);

  const buttons = document.querySelectorAll("input[type='radio']");
  let selectedButton = null;
  buttons.forEach((button) => {
    if (button.checked) {
      selectedButton = button;
    }
  });

  let result = 0;
  switch (selectedButton.value) {
    case "soma":
      result = n1 + n2;
      break;
    case "subtracao":
      result = n1 - n2;
      break;
    case "multiplicacao":
      result = n1 * n2;
      break;
    case "divisao":
      result = n1 / n2;
      break;
  }

  let resultTag = document.getElementById("result");
  resultTag.value = result;
}
