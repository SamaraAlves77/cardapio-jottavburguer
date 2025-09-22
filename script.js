document.addEventListener('DOMContentLoaded', () => {
    const carrinhoBtn = document.getElementById('carrinho-btn');
    const carrinhoModal = document.getElementById('carrinho-modal');
    const fecharModalBtn = document.querySelector('.fechar-modal');
    const navLinks = document.querySelector('.nav-links');
    const hamburgerBtn = document.getElementById('hamburger-menu-btn');

    let carrinho = [];

    // Função para abrir o modal do carrinho
    function abrirModal() {
        carrinhoModal.classList.add('visivel');
    }

    // Função para fechar o modal do carrinho
    function fecharModal() {
        carrinhoModal.classList.remove('visivel');
    }

    // Evento para abrir o modal do carrinho
    carrinhoBtn.addEventListener('click', () => {
        atualizarCarrinhoModal();
        abrirModal();
    });

    // Evento para fechar o modal
    fecharModalBtn.addEventListener('click', () => {
        fecharModal();
    });

    window.addEventListener('click', (event) => {
        if (event.target === carrinhoModal) {
            fecharModal();
        }
    });

    // Adiciona evento de clique para cada botão "Adicionar"
    document.querySelectorAll('.btn-add').forEach(button => {
        button.addEventListener('click', (event) => {
            const itemCard = event.target.closest('.item-card');
            const item = {
                id: itemCard.getAttribute('data-id'),
                nome: itemCard.querySelector('h3').innerText,
                preco: parseFloat(itemCard.querySelector('.price').innerText.replace('R$ ', '').replace(',', '.'))
            };
            adicionarAoCarrinho(item);
        });
    });

    function adicionarAoCarrinho(item) {
        const itemExistente = carrinho.find(cartItem => cartItem.id === item.id);
        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            carrinho.push({ ...item, quantidade: 1 });
        }
        atualizarCarrinho();
        mostrarNotificacao();
    }

    function removerDoCarrinho(itemId) {
        carrinho = carrinho.filter(item => item.id !== itemId);
        atualizarCarrinho();
    }

    function atualizarCarrinho() {
        const cartCountElement = document.getElementById('cart-count');
        const totalItems = carrinho.reduce((total, item) => total + item.quantidade, 0);
        cartCountElement.innerText = totalItems;
        atualizarCarrinhoModal();
    }

    function atualizarCarrinhoModal() {
        const carrinhoItensDiv = document.getElementById('carrinho-itens');
        const carrinhoTotalSpan = document.getElementById('carrinho-total');
        let total = 0;
        carrinhoItensDiv.innerHTML = '';
        if (carrinho.length === 0) {
            carrinhoItensDiv.innerHTML = '<p>Seu carrinho está vazio.</p>';
        } else {
            carrinho.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('carrinho-item');
                itemElement.innerHTML = `
                    <p>${item.nome} (${item.quantidade})</p>
                    <p>R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</p>
                    <button class="remover-item" data-id="${item.id}">×</button>
                `;
                carrinhoItensDiv.appendChild(itemElement);
                total += item.preco * item.quantidade;
            });
        }
        carrinhoTotalSpan.innerText = total.toFixed(2).replace('.', ',');
    }

    carrinhoModal.addEventListener('click', (event) => {
        if (event.target.classList.contains('remover-item')) {
            const itemId = event.target.getAttribute('data-id');
            removerDoCarrinho(itemId);
        }
    });

    // Função para mostrar notificação de item adicionado
    function mostrarNotificacao() {
        const notificacao = document.getElementById('notificacao');
        notificacao.classList.add('mostrar');
        setTimeout(() => {
            notificacao.classList.remove('mostrar');
        }, 2000);
    }

    // Botão de menu hambúrguer para celular
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Carregar itens do cardápio do arquivo JSON
    fetch('cardapio.json')
        .then(response => response.json())
        .then(data => {
            renderizarItens(data.hamburgueres, 'hamburgueres-artesanais-grid');
            renderizarItens(data.combos, 'combos-e-familia-grid');
            renderizarItens(data.acompanhamentos, 'acompanhamentos-grid');
            renderizarItens(data.bebidas, 'bebidas-grid');
            renderizarItens(data.adicionais, 'adicionais-grid');
        })
        .catch(error => console.error('Erro ao carregar o cardápio:', error));

    function renderizarItens(itens, gridId) {
        const grid = document.getElementById(gridId);
        grid.innerHTML = '';
        itens.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.classList.add('item-card');
            itemCard.setAttribute('data-id', item.id);
            itemCard.innerHTML = `
                <img src="${item.imagem}" alt="${item.nome}">
                <h3>${item.nome}</h3>
                <p>${item.descricao}</p>
                <div class="price">R$ ${item.preco.toFixed(2).replace('.', ',')}</div>
                <button class="btn-add">Adicionar</button>
            `;
            grid.appendChild(itemCard);
        });
    }
});
