document.addEventListener('DOMContentLoaded', () => {
    const carrinhoBtn = document.getElementById('carrinho-btn');
    const carrinhoModal = document.getElementById('carrinho-modal');
    const fecharModal = document.querySelector('.fechar-modal');
    const contadorCarrinho = document.getElementById('contador-carrinho');
    const notificacao = document.getElementById('notificacao');
    const hamburgerMenuBtn = document.getElementById('hamburger-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const carrinhoItensContainer = document.getElementById('carrinho-itens');
    const carrinhoTotalSpan = document.getElementById('carrinho-total');

    let carrinho = [];
    let produtos = {}; // Agora será preenchido pelo JSON

    function formatarPreco(preco) {
        return preco.toFixed(2).replace('.', ',');
    }

    function renderizarProdutos(secao) {
        const gridElement = document.getElementById(secao.toLowerCase().replace(/\s/g, '-') + '-grid');
        gridElement.innerHTML = '';
        if (produtos[secao]) {
            produtos[secao].forEach(produto => {
                const card = document.createElement('div');
                card.classList.add('item-card');
                card.innerHTML = `
                    <img src="imagem_cardapio/${produto.imagem}" alt="${produto.nome}">
                    <h3>${produto.nome}</h3>
                    <p>${produto.descricao || ''}</p>
                    <span class="price">R$ ${formatarPreco(produto.preco)}</span>
                    <button class="btn-add" data-id="${produto.id}" data-secao="${secao}">Adicionar</button>
                `;
                gridElement.appendChild(card);
            });
        }
    }

    function atualizarCarrinhoModal() {
        carrinhoItensContainer.innerHTML = '';
        let total = 0;
        if (carrinho.length === 0) {
            carrinhoItensContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        } else {
            carrinho.forEach(item => {
                total += item.preco * item.quantidade;
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('carrinho-item');
                itemDiv.innerHTML = `
                    <span>${item.nome} (x${item.quantidade})</span>
                    <span>R$ ${formatarPreco(item.preco * item.quantidade)}</span>
                    <button class="btn-remove" data-id="${item.id}">&times;</button>
                `;
                carrinhoItensContainer.appendChild(itemDiv);
            });
        }
        carrinhoTotalSpan.textContent = formatarPreco(total);
        contadorCarrinho.textContent = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    }

    function adicionarAoCarrinho(produtoId, secao) {
        const produto = produtos[secao].find(p => p.id === produtoId);
        if (!produto) return;

        const itemExistente = carrinho.find(item => item.id === produtoId);

        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            carrinho.push({ ...produto, quantidade: 1 });
        }

        mostrarNotificacao();
        atualizarCarrinhoModal();
    }

    function removerDoCarrinho(produtoId) {
        carrinho = carrinho.filter(item => item.id !== produtoId);
        atualizarCarrinhoModal();
    }

    function mostrarNotificacao() {
        notificacao.classList.add('show');
        setTimeout(() => {
            notificacao.classList.remove('show');
        }, 3000);
    }

    // Event Listeners
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add')) {
            const produtoId = parseInt(e.target.dataset.id);
            const secao = e.target.dataset.secao;
            adicionarAoCarrinho(produtoId, secao);
        }
    });

    carrinhoItensContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-remove')) {
            const produtoId = parseInt(e.target.dataset.id);
            removerDoCarrinho(produtoId);
        }
    });

    carrinhoBtn.addEventListener('click', () => {
        carrinhoModal.style.display = 'flex';
    });

    fecharModal.addEventListener('click', () => {
        carrinhoModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === carrinhoModal) {
            carrinhoModal.style.display = 'none';
        }
    });

    hamburgerMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Iniciar a aplicação
    async function carregarProdutos() {
        try {
            const response = await fetch('imagem_cardapio/cardapio.json');
            if (!response.ok) {
                throw new Error('Não foi possível carregar o cardápio.');
            }
            produtos = await response.json();
            
            // Renderiza todas as seções dinamicamente a partir do JSON
            Object.keys(produtos).forEach(secao => {
                renderizarProdutos(secao);
            });

        } catch (error) {
            console.error('Erro ao carregar os dados:', error);
            // Exibir mensagem de erro na tela para o usuário
            document.querySelector('main').innerHTML = '<p style="text-align: center; margin-top: 50px; font-size: 1.2rem;">Erro ao carregar os produtos. Por favor, verifique se o arquivo cardapio.json está na pasta correta.</p>';
        }
    }

    carregarProdutos();
});
