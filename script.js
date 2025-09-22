document.addEventListener('DOMContentLoaded', () => {
    carregarItens();

    document.querySelector('main').addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add')) {
            const card = e.target.closest('.item-card');
            if (card) {
                const itemId = card.dataset.id;
                adicionarAoCarrinho(itemId);
            }
        }
    });

    document.getElementById('btn-finalizar-pedido').addEventListener('click', finalizarPedido);
});

async function carregarItens() {
    try {
        // CORRIGIDO: Agora o código busca por 'cardapio.json'
        const response = await fetch('cardapio.json');
        
        if (!response.ok) {
            throw new Error(`Erro ao carregar o arquivo JSON: ${response.statusText}`);
        }
        
        const data = await response.json();
        const mainContent = document.querySelector('main');
        
        mainContent.innerHTML = '';

        for (const categoriaNome in data) {
            if (Object.hasOwnProperty.call(data, categoriaNome)) {
                const itensDaCategoria = data[categoriaNome];

                const section = document.createElement('section');
                section.className = 'menu-section';

                const title = document.createElement('h2');
                title.textContent = categoriaNome;
                section.appendChild(title);

                const gridContainer = document.createElement('div');
                gridContainer.className = 'item-grid';

                itensDaCategoria.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'item-card';
                    card.dataset.id = item.id;
                    
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

// O restante das suas funções do carrinho permanecem as mesmas.
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
const carrinhoItensEl = document.getElementById('carrinho-itens');
const carrinhoTotalEl = document.getElementById('carrinho-total-valor');
const carrinhoModal = document.getElementById('carrinho-modal');
const cartCountEl = document.getElementById('cart-count');
const notificacaoEl = document.getElementById('notificacao');

function adicionarAoCarrinho(itemId) {
    fetch('cardapio.json')
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

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}
