// 7) 7) Criar um código que copie o conteúdo de uma caixa de texto para outra só que em
// caixa alta.

const changeBox = () => {
  let contentCx1 = document.getElementById("cx1").value;
  let contentCx2 = document.getElementById("cx2");
  contentCx2.value = contentCx1.toUpperCase();
};
