document.addEventListener('DOMContentLoaded', () => {
    const carrinhoBtn = document.getElementById('carrinho-btn');
    const carrinhoModal = document.getElementById('carrinho-modal');
    const fecharModal = document.querySelector('.fechar-modal');
    const hamburgueresGrid = document.getElementById('hamburgueres-grid');
    const combosGrid = document.getElementById('combos-grid');
    const acompanhamentosGrid = document.getElementById('acompanhamentos-grid');
    const bebidasGrid = document.getElementById('bebidas-grid');
    const carrinhoItensContainer = document.getElementById('carrinho-itens');
    const carrinhoTotalSpan = document.getElementById('carrinho-total');
    const contadorCarrinho = document.getElementById('contador-carrinho');
    const notificacao = document.getElementById('notificacao');
    const hamburgerMenuBtn = document.getElementById('hamburger-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    let carrinho = [];

    const produtos = {
        hamburgueres: [
            { id: 1, nome: 'Chese Burguer', preco: 18.00, imagem: 'imagem_cardapio/cheseburguer.jpg', descricao: 'Pão de brioche, blend de 120g, queijo cheddar, maionese artesanal.' },
            { id: 2, nome: 'Chese Salada', preco: 20.00, imagem: 'imagem_cardapio/chese_salada.jpg', descricao: 'Pão de brioche, blend de 120g, queijo cheddar, alface, tomate e maionese artesanal.' },
            { id: 3, nome: 'Chese Bacon', preco: 22.00, imagem: 'imagem_cardapio/chese_bacon.jpg', descricao: 'Pão de brioche, blend de 120g, queijo cheddar, bacon e maionese artesanal.' },
            { id: 4, nome: 'Duplo Chese', preco: 28.00, imagem: 'imagem_cardapio/duplo_chese.jpg', descricao: 'Pão de brioche, 2 blends de 120g, 2x queijo cheddar e maionese artesanal.' },
            { id: 5, nome: 'Duplo Bacon', preco: 32.00, imagem: 'imagem_cardapio/duplo_bacon.jpg', descricao: 'Pão de brioche, 2 blends de 120g, 2x queijo cheddar, bacon e maionese artesanal.' },
            { id: 6, nome: 'Especial', preco: 35.00, imagem: 'imagem_cardapio/especial.jpg', descricao: 'Pão de brioche, 2 blends de 120g, bacon, queijo mussarela, alface, tomate e maionese especial.' }
        ],
        combos: [
            { id: 7, nome: 'Combo Econômico', preco: 24.99, imagem: 'imagem_cardapio/combo_economico.jpg', descricao: 'Smash Original + batata frita + refrigerante lata.' },
            { id: 8, nome: 'Combo do Chef', preco: 40.99, imagem: 'imagem_cardapio/combo_do_chef.jpg', descricao: 'Jotta Classic + batata frita + refrigerante 1L.' }
        ],
        acompanhamentos: [
            { id: 9, nome: 'Batata Frita', preco: 12.00, imagem: 'imagem_cardapio/batata_frita.jpg', descricao: 'Batata frita palito, crocante e sequinha.' },
            { id: 10, nome: 'Batata Cheddar e Bacon', preco: 18.00, imagem: 'imagem_cardapio/batata_cheddar_e_bacon.jpg', descricao: 'Batata coberta com cheddar cremoso e bacon crocante.' }
        ],
        bebidas: [
            { id: 11, nome: 'Refrigerante Lata', preco: 7.00, imagem: 'imagem_cardapio/refrigerante_lata.jpg', descricao: 'Coca-Cola, Guaraná, Fanta.' },
            { id: 12, nome: 'Refrigerante 1L', preco: 10.00, imagem: 'imagem_cardapio/refrigerante_1l.jpg', descricao: 'Coca-Cola, Guaraná, Fanta.' }
        ]
    };

    function formatarPreco(preco) {
        return preco.toFixed(2).replace('.', ',');
    }

    function renderizarProdutos(secao, gridElement) {
        gridElement.innerHTML = '';
        produtos[secao].forEach(produto => {
            const card = document.createElement('div');
            card.classList.add('item-card');
            card.innerHTML = `
                <img src="${produto.imagem}" alt="${produto.nome}">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <span class="price">R$ ${formatarPreco(produto.preco)}</span>
                <button class="btn-add" data-id="${produto.id}" data-secao="${secao}">Adicionar</button>
            `;
            gridElement.appendChild(card);
        });
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
        let produto;
        // Encontra o produto na seção correta
        if (secao === 'hamburgueres') produto = produtos.hamburgueres.find(p => p.id === produtoId);
        else if (secao === 'combos') produto = produtos.combos.find(p => p.id === produtoId);
        else if (secao === 'acompanhamentos') produto = produtos.acompanhamentos.find(p => p.id === produtoId);
        else if (secao === 'bebidas') produto = produtos.bebidas.find(p => p.id === produtoId);
        
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
    renderizarProdutos('hamburgueres', hamburgueresGrid);
    renderizarProdutos('combos', combosGrid);
    renderizarProdutos('acompanhamentos', acompanhamentosGrid);
    renderizarProdutos('bebidas', bebidasGrid);
});
