// variáveis globais
let contadorId = 0;
let arrayTarefas = [];

// esperando carregamento do DOM
document.addEventListener("DOMContentLoaded", function () {
  // botão criando tarefa
  document
    .getElementById("adicionarBtn")
    .addEventListener("click", adicionarTarefa);
});

const adicionarTarefa = () => {
  const descricao = document.getElementById("descricaoTarefa").value.trim();

  const novaTarefa = criarTarefa(descricao);

  const tarefaTag = gerarLinhaTabela(novaTarefa);

  document
    .getElementById("tabelaTarefas")
    .getElementsByTagName("tbody")[0]
    .appendChild(tarefaTag);

  // limpando o input
  document.getElementById("descricaoTarefa").value = "";
};

// gerando linha para a tabela
const gerarLinhaTabela = (tarefa) => {
  // Cria uma nova linha
  const novaLinha = document.createElement("tr");

  // Adiciona os dados
  novaLinha.innerHTML = `
    <td>${tarefa.id}</td>
    <td>${tarefa.descricao}</td>
    <td>${tarefa.dataInicio}</td>
    <td>${tarefa.dataConclusao}</td>
    <td>
      <button onclick="concluirTarefa(${tarefa.id})">Concluir</button>
      <button onclick="excluirTarefa(${tarefa.id})">Excluir</button>
    </td>
  `;

  // adicionando atributo ID
  novaLinha.setAttribute("data-id", tarefa.id);

  return novaLinha;
};

// concluir Tarefa
const concluirTarefa = (id) => {
  // gerando data atual
  let dataAtual = gerarData();

  // atualizando tarefa para concluida
  document
    .getElementById("tabelaTarefas")
    .querySelector(`[data-id='${id}']`)
    .getElementsByTagName("td")[3].textContent = dataAtual;

  // atualizando tarefa no array
  const tarefaEmArray = arrayTarefas.find((tarefa) => tarefa.id === id);

  if (tarefaEmArray) {
    arrayTarefas = arrayTarefas.map((tarefa) =>
      tarefa.id === id ? { ...tarefa, dataConclusao: dataAtual } : tarefa
    );
  }
};

// excluindo tarefa
const excluirTarefa = (id) => {
  // identificando o nó para remover
  const tarefaParaExcluir = document
    .getElementById("tabelaTarefas")
    .getElementsByTagName("tbody")[0]
    .querySelector(`[data-id='${id}']`);

  // removendo a tarefa
  document
    .getElementById("tabelaTarefas")
    .getElementsByTagName("tbody")[0]
    .removeChild(tarefaParaExcluir);

  // removendo do array
  arrayTarefas = arrayTarefas.filter((tarefa) => tarefa.id !== id);
};

// criando tarefa
const criarTarefa = (descricao) => {
  let data = gerarData();
  let tarefa = {
    id: contadorId++,
    descricao: descricao,
    dataInicio: data,
    dataConclusao: "Pendente",
  };

  // adicionando ao array de tarefas
  arrayTarefas.push(tarefa);
  return tarefa;
};

// gerando data formatada
const gerarData = () => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  return new Date().toLocaleString("pt-BR", options);
};
