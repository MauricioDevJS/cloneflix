const formPesquisa = document.querySelector('form')
const apiKey = 'd5513d17'
let page = 1 // inicializa a variável 'page' como 1

// adiciona um event listener no botão 'Pesquisar'
formPesquisa.addEventListener('submit', evento => {
  evento.preventDefault()

  const pesquisa = evento.target.pesquisa.value

  if (pesquisa === '') {
    alert('Preencha o campo corretamente!!')
    return
  }

  // atualiza o valor de 'page' para 1, toda vez que uma nova pesquisa é feita
  page = 1

  buscarResultados(pesquisa, page) // chama a função 'buscarResultados' passando a pesquisa e a página como parâmetros
})

// função que busca os resultados na API
const buscarResultados = (pesquisa, page) => {
  // faz a requisição na API com a pesquisa e a página
  fetch(`https://www.omdbapi.com/?s=${pesquisa}&apikey=${apiKey}&page=${page}`)
    .then(result => result.json())
    .then(json => carregaLista(json, page)) // chama a função 'carregaLista' passando o resultado da requisição e a página atual
}

// função que carrega a lista de resultados
const carregaLista = (json, currentPage) => {
  const lista = document.querySelector('.lista')

  // se a resposta da API for 'False', mostra uma mensagem e retorna
  if (json.Response === 'False') {
    alert('Nenhum filme, série ou jogo encontrado!!')
    return
  }

  lista.innerHTML = '' // limpa a lista de resultados

  json.Search.forEach(element => {
    let item = document.createElement('div')
    item.classList.add('item')

    item.innerHTML = `<img src="${element.Poster}"/><h2>${element.Title}</h2>`

    lista.appendChild(item)
  })

  const totalResults = parseInt(json.totalResults)
  const totalPages = Math.ceil(totalResults / 12)

  // seleciona o botão 'Mostrar mais'
  const buttonNext = document.getElementById('btn-next')

  // se a página atual for menor que o total de páginas, mostra o botão 'Mostrar mais'
  if (currentPage < totalPages) {
    buttonNext.style.display = 'block'
    buttonNext.dataset.page = currentPage + 1 // atualiza o valor da próxima página no dataset do botão
  } else {
    buttonNext.style.display = 'none'
  }
}

// adiciona um event listener no botão 'Mostrar mais'
const buttonNext = document.getElementById('btn-next')
buttonNext.addEventListener('click', () => {
  const pesquisa = document.querySelector('input[name="pesquisa"]').value
  page = parseInt(buttonNext.dataset.page) // atualiza o valor da página com o valor do dataset do botão

  buscarResultados(pesquisa, page) // chama a função 'buscarResultados' passando a pesquisa e a página atual
})

const footer = document.querySelector('footer')
const anoAtual = new Date().getFullYear()

footer.innerHTML = `<p>&copy; ${anoAtual}`
