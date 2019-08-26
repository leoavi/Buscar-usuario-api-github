var inputUsuario = document.querySelector("#pesquisa input");
var buttonPesquisar = document.querySelector("#pesquisa button");
var listElement = document.querySelector("#pesquisa ul");

function pesquisaUsuarioRepositorio(usuario) {
  axios
    .get(`https://api.github.com/users/${usuario}/repos`)

    .then(function(response) {
      console.log(response.data);
      mostraInformacoesUsuario(response.data);
    })
    .catch(function(error) {
      console.warn(error);
      renderError(error);
    });
}

function loading() {
  listElement.innerHTML = "";
  var textElement = document.createTextNode("Carregando..");
  var liElement = document.createElement("li");

  liElement.appendChild(textElement);
  listElement.appendChild(liElement);
}

function mostraInformacoesUsuario(repositorio) {
  listElement.innerHTML = "";
  for (repo of repositorio) {
    var textElement = document.createTextNode(repo.name);
    var liElement = document.createElement("li");

    liElement.appendChild(textElement);
    listElement.appendChild(liElement);
  }
}

function renderError(error) {
  listElement.innerHTML = "";
  var textElement = document.createTextNode("Erro!");
  var errorElement = document.createElement("li");
  errorElement.style.color = "#F00";
  errorElement.appendChild(textElement);
  listElement.appendChild(errorElement);
}

buttonPesquisar.onclick = function() {
  loading();

  inputUsuario.value !== ""
    ? pesquisaUsuarioRepositorio(inputUsuario.value)
    : alert("Informe um usuário");
};
