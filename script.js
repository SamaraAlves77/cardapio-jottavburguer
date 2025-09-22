// A função principal que carrega e exibe os dados do cardápio
async function carregarCardapio() {
  try {
    // A linha mais importante: faz a "amarração" (conexão) entre o JS e o JSON.
    // É fundamental que o arquivo 'cardapio.json' esteja na mesma pasta que 'index.html' e 'script.js'.
    const response = await fetch('./cardapio.json');
    const cardapioData = await response.json();

    // Itera sobre cada categoria no JSON e cria a seção correspondente na página
    for (const categoria in cardapioData) {
      if (cardapioData.hasOwnProperty(categoria)) {
        criarSecaoCardapio(categoria, cardapioData[categoria]);
      }
    }
  } catch (error) {
    console.error('Erro ao carregar o cardápio:', error);
    // Adiciona uma mensagem de erro na página para o usuário
    document.body.innerHTML = `<h1>Erro ao carregar o cardápio. Tente novamente mais tarde.</h1>`;
  }
}

// Função para criar uma seção (título da categoria) no HTML
function criarSecaoCardapio(titulo, itens) {
  const container = document.getElementById('cardapio-container');

  const secao = document.createElement('section');
  secao.className = 'cardapio-section';

  const tituloSecao = document.createElement('h2');
  tituloSecao.textContent = titulo;
  secao.appendChild(tituloSecao);

  const listaItens = document.createElement('div');
  listaItens.className = 'item-list';

  // Chama a função para criar os itens dentro da seção
  itens.forEach(item => {
    const itemElemento = criarItemCardapio(item);
    listaItens.appendChild(itemElemento);
  });

  secao.appendChild(listaItens);
  container.appendChild(secao);
}

// Função para criar cada item individual do cardápio
function criarItemCardapio(item) {
  const divItem = document.createElement('div');
  divItem.className = 'item-card';

  const img = document.createElement('img');
  img.src = `imagens/${item.imagem}`;
  img.alt = item.nome;
  divItem.appendChild(img);

  const h3 = document.createElement('h3');
  h3.textContent = item.nome;
  divItem.appendChild(h3);

  const pDescricao = document.createElement('p');
  pDescricao.textContent = item.descricao;
  divItem.appendChild(pDescricao);

  const pPreco = document.createElement('p');
  pPreco.className = 'price';
  pPreco.textContent = `R$ ${item.preco.toFixed(2).replace('.', ',')}`;
  divItem.appendChild(pPreco);

  return divItem;
}

// Inicia o carregamento do cardápio quando a página é carregada
document.addEventListener('DOMContentLoaded', carregarCardapio);
