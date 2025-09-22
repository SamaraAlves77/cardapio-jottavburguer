// Array para armazenar os itens do carrinho
let carrinho = [];

// Funções para o modal do carrinho
const modal = document.getElementById('carrinho-modal');
const btnCarrinho = document.getElementById('carrinho-btn');
const spanFechar = document.getElementsByClassName('fechar-modal')[0];

btnCarrinho.onclick = function() {
    modal.style.display = 'block';
    exibirItensCarrinho();
}

spanFechar.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Funcionalidade do menu hambúrguer
document.getElementById('hamburger-menu-btn').addEventListener('click', function() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
});


// A função principal que carrega e exibe os dados do cardápio
async function carregarCardapio() {
  try {
    const response = await fetch('./cardapio.json');
    
    if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
    }
    
    const cardapioData = await response.json();

    for (const categoria in cardapioData) {
      if (cardapioData.hasOwnProperty(categoria)) {
        criarSecaoCardapio(categoria, cardapioData[categoria]);
      }
    }
  } catch (error) {
    console.error('Erro ao carregar o cardápio:', error);
    document.body.innerHTML = `<h1>Erro ao carregar o cardápio. Tente novamente mais tarde.</h1>`;
  }
}

function criarSecaoCardapio(titulo, itens) {
  let containerId = '';
  switch(titulo) {
      case 'Hambúrgueres Artesanais':
          containerId = 'hamburgueres-artesanais-grid';
          break;
      case 'Combos e Família':
          containerId = 'combos-e-familia-grid';
          break;
      case 'Acompanhamentos':
          containerId = 'acompanhamentos-grid';
          break;
      case 'Bebidas':
          containerId = 'bebidas-grid';
          break;
      case 'Adicionais':
          containerId = 'adicionais-grid';
          break;
      default:
          console.warn(`Categoria desconhecida: ${titulo}`);
          return;
  }
  
  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Contêiner não encontrado para a categoria: ${titulo}`);
    return;
  }

  itens.forEach(item => {
    const itemElemento = criarItemCardapio(item);
    container.appendChild(itemElemento);
  });
}

function criarItemCardapio(item) {
  const divItem = document.createElement('div');
  divItem.className = 'item-card';

  const img = document.createElement('img');
  img.src = `imagem_cardapio/${item.imagem}`;
  img.alt = item.nome;
  divItem.appendChild(img);

  const h3 = document.createElement('h3');
  h3.textContent = item.nome;
  divItem.appendChild(h3);

  if (item.descricao) {
      const pDescricao = document.createElement('p');
      pDescricao.textContent = item.descricao;
      divItem.appendChild(pDescricao);
  }

  const pPreco = document.createElement('p');
  pPreco.className = 'price';
  pPreco.textContent = `R$ ${item.preco.toFixed(2).replace('.', ',')}`;
  divItem.appendChild(pPreco);

  const btnAdicionar = document.createElement('button');
  btnAdicionar.className = 'btn-add';
  btnAdicionar.textContent = 'Adicionar';
  
  btnAdicionar.addEventListener('click', () => {
    adicionarAoCarrinho(item);
  });
  
  divItem.appendChild(btnAdicionar);

  return divItem;
}

function adicionarAoCarrinho(item) {
  carrinho.push(item);
  console.log('Item adicionado ao carrinho:', item);
  atualizarContadorCarrinho();
  exibirNotificacao();
}

function atualizarContadorCarrinho() {
  const contadorElemento = document.getElementById('cart-count');
  if (contadorElemento) {
    contadorElemento.textContent = carrinho.length;
  }
}

function exibirItensCarrinho() {
    const containerItens = document.getElementById('carrinho-itens');
    containerItens.innerHTML = '';
    let total = 0;

    if (carrinho.length === 0) {
        containerItens.innerHTML = '<p>O seu carrinho está vazio.</p>';
        document.getElementById('carrinho-total').textContent = '0,00';
        return;
    }

    carrinho.forEach((item, index) => {
        const itemElemento = document.createElement('div');
        itemElemento.className = 'carrinho-item';
        itemElemento.innerHTML = `
            <p>${item.nome}</p>
            <p>R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
            <button class="remover-item" data-index="${index}">&times;</button>
        `;
        containerItens.appendChild(itemElemento);
        total += item.preco;
    });

    document.getElementById('carrinho-total').textContent = total.toFixed(2).replace('.', ',');

    document.querySelectorAll('.remover-item').forEach(botao => {
        botao.addEventListener('click', removerItemCarrinho);
    });
}

function removerItemCarrinho(event) {
    const index = event.target.getAttribute('data-index');
    carrinho.splice(index, 1);
    atualizarContadorCarrinho();
    exibirItensCarrinho();
}

function exibirNotificacao() {
    const notificacao = document.getElementById('notificacao');
    notificacao.classList.add('mostrar');
    setTimeout(() => {
        notificacao.classList.remove('mostrar');
    }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
  carregarCardapio();
  atualizarContadorCarrinho();
});
