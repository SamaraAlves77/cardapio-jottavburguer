document.addEventListener('DOMContentLoaded', () => {
    // Carrega os dados do JSON e renderiza o cardápio
    carregarItens();

    // Adiciona evento de clique para os botões "Adicionar"
    document.querySelector('main').addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add')) {
            const card = e.target.closest('.item-card');
            if (card) {
                const itemId = card.dataset.id;
                adicionarAoCarrinho(itemId);
            }
        }
    });

    // Adiciona evento de clique para o botão "Finalizar Pedido" no modal
    document.getElementById('btn-finalizar-pedido').addEventListener('click', finalizarPedido);
});

// Função para buscar e renderizar os itens do JSON
async function carregarItens() {
    try {
        const response = await fetch('itens.json');
        
        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro ao carregar o arquivo JSON: ${response.statusText}`);
        }
        
        const data = await response.json();
        const mainContent = document.querySelector('main');
        
        // Limpa o conteúdo principal antes de adicionar os itens
        mainContent.innerHTML = '';

        // Percorre todas as chaves (categorias) do JSON
        for (const categoriaNome in data) {
            if (Object.hasOwnProperty.call(data, categoriaNome)) {
                const itensDaCategoria = data[categoriaNome];

                // Cria a seção para a categoria
                const section = document.createElement('section');
                section.className = 'menu-section';

                // Cria o título da seção com o nome da chave
                const title = document.createElement('h2');
                title.textContent = categoriaNome;
                section.appendChild(title);

                // Cria o contêiner da grade para os cards
                const gridContainer = document.createElement('div');
                gridContainer.className = 'item-grid';

                // Cria os cards de cada item na categoria
                itensDaCategoria.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'item-card';
                    card.dataset.id = item.id;
                    
                    // Adiciona a descrição apenas se ela existir no JSON
                    const descricaoHTML = item.descricao ? `<p>${item.descricao}</p>` : '';
                    
                    card.innerHTML = `
                        <img src="imagem_cardapio/${item.imagem}" alt="${item.nome}">
                        <div class="item-card-content">
                            <h3>${item.nome}</h3>
                            ${descricaoHTML}
                            <span class="price">R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
                            <button class="btn-add">Adicionar</button>
                        </div>
                    `;
                    gridContainer.appendChild(card);
                });

                section.appendChild(gridContainer);
                mainContent.appendChild(section);
            }
        }
    } catch (error) {
        console.error('Erro ao carregar os itens:', error);
    }
}

// Funções do carrinho (manter o restante do seu código JavaScript aqui)
// ...

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
const carrinhoItensEl = document.getElementById('carrinho-itens');
const carrinhoTotalEl = document.getElementById('carrinho-total-valor');
const carrinhoModal = document.getElementById('carrinho-modal');
const cartCountEl = document.getElementById('cart-count');
const notificacaoEl = document.getElementById('notificacao');

// Funções do Carrinho
function adicionarAoCarrinho(itemId) {
    fetch('itens.json')
        .then(response => response.json())
        .then(data => {
            let itemEncontrado = null;
            for (const categoria in data) {
                const item = data[categoria].find(i => i.id == itemId);
                if (item) {
                    itemEncontrado = item;
                    break;
                }
            }

            if (itemEncontrado) {
                const itemExistente = carrinho.find(item => item.id == itemId);
                if (itemExistente) {
                    itemExistente.quantidade++;
                } else {
                    carrinho.push({ ...itemEncontrado, quantidade: 1 });
                }
                salvarCarrinho();
                atualizarCarrinhoModal();
                mostrarNotificacao();
            }
        });
}

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarContadorCarrinho();
}

function atualizarContadorCarrinho() {
    const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
    cartCountEl.textContent = totalItens;
}

function atualizarCarrinhoModal() {
    carrinhoItensEl.innerHTML = '';
    let total = 0;
    carrinho.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = 'carrinho-item';
        itemEl.innerHTML = `
            <span>${item.nome} (${item.quantidade})</span>
            <span>R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
        `;
        carrinhoItensEl.appendChild(itemEl);
        total += item.preco * item.quantidade;
    });
    carrinhoTotalEl.textContent = total.toFixed(2).replace('.', ',');
}

function abrirModal() {
    carrinhoModal.style.display = 'block';
    atualizarCarrinhoModal();
}

function fecharModal() {
    carrinhoModal.style.display = 'none';
}

function finalizarPedido() {
    const nome = document.getElementById('nome-cliente').value;
    const endereco = document.getElementById('endereco-cliente').value;
    const telefone = document.getElementById('telefone-cliente').value;
    
    if (!nome || !endereco || !telefone) {
        alert("Por favor, preencha todos os campos para finalizar o pedido.");
        return;
    }

    let mensagem = `*Olá, JottaV Burguer! Meu pedido é:*%0A%0A`;
    let total = 0;
    
    carrinho.forEach(item => {
        mensagem += `*${item.nome}* - Quantidade: ${item.quantidade}%0A`;
        total += item.preco * item.quantidade;
    });

    mensagem += `%0A*Total: R$ ${total.toFixed(2).replace('.', ',')}*%0A%0A`;
    mensagem += `*Dados para Entrega:*%0A`;
    mensagem += `Nome: ${nome}%0A`;
    mensagem += `Endereço: ${endereco}%0A`;
    mensagem += `Telefone: ${telefone}%0A`;

    const whatsappUrl = `https://wa.me/5586994793836?text=${mensagem}`;

    // Limpar o carrinho e fechar o modal
    carrinho = [];
    salvarCarrinho();
    fecharModal();

    window.open(whatsappUrl, '_blank');
}

function mostrarNotificacao() {
    notificacaoEl.classList.add('show');
    setTimeout(() => {
        notificacaoEl.classList.remove('show');
    }, 3000);
}

// Função para o menu hambúrguer (mobile)
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}
