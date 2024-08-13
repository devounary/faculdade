document.addEventListener("DOMContentLoaded", function () {
  const imagemSelect = document.getElementById("imagemSelect");
  const imagemExibida = document.getElementById("imagemExibida");

  imagemSelect.addEventListener("change", function () {
    imagemExibida.src = imagemSelect.value;
  });
});
