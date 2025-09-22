document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('main');
    const cartCountElement = document.getElementById('contador-carrinho');
    const carrinhoBtn = document.getElementById('carrinho-btn');
    const modal = document.getElementById('carrinho-modal');
    const closeModalBtn = document.querySelector('.fechar-modal');
    const carrinhoItensContainer = document.getElementById('carrinho-itens');
    const carrinhoTotalElement = document.getElementById('carrinho-total');
    const finalizarPedidoBtn = document.getElementById('btn-finalizar-pedido');
    const hamburguerMenuBtn = document.getElementById('hamburger-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const notificacao = document.getElementById('notificacao');

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let menuData = null;

    function atualizarContadorCarrinho() {
        cartCountElement.textContent = carrinho.reduce((total, item) => total + item.quantidade, 0);
    }

    function renderizarMenu() {
        if (!menuData) return;
        mainContainer.innerHTML = '';
        const sections = document.createElement('div');
        for (const categoria in menuData) {
            if (menuData.hasOwnProperty(categoria)) {
                criarSecaoCardapio(categoria, menuData[categoria]);
            }
        }
    }

    function criarSecaoCardapio(titulo, itens) {
        const section = document.createElement('section');
        section.classList.add('menu-section');
        section.id = titulo.toLowerCase().replace(/\s/g, '-');

        const title = document.createElement('h2');
        title.textContent = titulo;
        section.appendChild(title);

        const grid = document.createElement('div');
        grid.classList.add('item-grid');

        itens.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('item-card');

            const img = document.createElement('img');
            img.src = `imagem_cardapio/${item.imagem}`;
            img.alt = item.nome;

            const content = document.createElement('div');
            content.classList.add('item-card-content');

            const itemTitle = document.createElement('h3');
            itemTitle.textContent = item.nome;

            const itemDescription = document.createElement('p');
            if (item.descricao) {
                itemDescription.textContent = item.descricao;
            } else {
                itemDescription.style.display = 'none';
            }

            const itemPrice = document.createElement('p');
            itemPrice.classList.add('price');
            itemPrice.textContent = `R$ ${item.preco.toFixed(2).replace('.', ',')}`;

            const addButton = document.createElement('button');
            addButton.classList.add('btn-add');
            addButton.textContent = 'Adicionar';
            addButton.onclick = () => adicionarAoCarrinho(item);

            content.appendChild(itemTitle);
            content.appendChild(itemDescription);
            content.appendChild(itemPrice);
            content.appendChild(addButton);

            card.appendChild(img);
            card.appendChild(content);
            grid.appendChild(card);
        });

        section.appendChild(grid);
        mainContainer.appendChild(section);
    }

    async function carregarMenu() {
        try {
            const response = await fetch('./cardapio.json');
            menuData = await response.json();
            renderizarMenu();
        } catch (error) {
            console.error('Erro ao carregar o menu:', error);
            mainContainer.innerHTML = '<p>Não foi possível carregar o cardápio. Tente novamente mais tarde.</p>';
        }
    }

    function adicionarAoCarrinho(item) {
        const itemExistente = carrinho.find(c => c.id === item.id);
        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            carrinho.push({ ...item, quantidade: 1 });
        }
        salvarCarrinho();
        atualizarContadorCarrinho();
        exibirNotificacao(`${item.nome} adicionado!`);
    }

    function removerDoCarrinho(itemId) {
        carrinho = carrinho.filter(item => item.id !== itemId);
        salvarCarrinho();
        renderizarCarrinho();
        atualizarContadorCarrinho();
    }

    function salvarCarrinho() {
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }

    function renderizarCarrinho() {
        carrinhoItensContainer.innerHTML = '';
        let total = 0;
        carrinho.forEach(item => {
            total += item.preco * item.quantidade;
            const li = document.createElement('li');
            li.classList.add('carrinho-item');
            li.innerHTML = `
                <span>${item.nome} (${item.quantidade}x)</span>
                <span>R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
                <button class="btn-remove" data-id="${item.id}">&times;</button>
            `;
            carrinhoItensContainer.appendChild(li);
        });
        carrinhoTotalElement.textContent = total.toFixed(2).replace('.', ',');

        document.querySelectorAll('.btn-remove').forEach(button => {
            button.onclick = (e) => removerDoCarrinho(parseInt(e.target.dataset.id));
        });
    }

    function exibirNotificacao(mensagem) {
        notificacao.textContent = mensagem;
        notificacao.classList.add('show');
        setTimeout(() => {
            notificacao.classList.remove('show');
        }, 2000);
    }

    function finalizarPedido() {
        const nome = document.getElementById('nome-cliente').value;
        const endereco = document.getElementById('endereco-cliente').value;
        const telefone = document.getElementById('telefone-cliente').value;

        if (!nome || !endereco || !telefone) {
            alert('Por favor, preencha todos os campos para finalizar o pedido.');
            return;
        }

        let mensagem = `Olá, meu nome é ${nome}, moro no endereço ${endereco}, e meu telefone é ${telefone}.\n\nGostaria de fazer o seguinte pedido:\n\n`;

        let total = 0;
        carrinho.forEach(item => {
            mensagem += `* ${item.nome} (${item.quantidade}x) - R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}\n`;
            total += item.preco * item.quantidade;
        });

        mensagem += `\n*Total do Pedido: R$ ${total.toFixed(2).replace('.', ',')}*`;

        const whatsappUrl = `https://wa.me/5586981147596?text=${encodeURIComponent(mensagem)}`;
        window.open(whatsappUrl, '_blank');

        carrinho = [];
        salvarCarrinho();
        renderizarCarrinho();
        atualizarContadorCarrinho();
        modal.style.display = 'none';
        document.getElementById('nome-cliente').value = '';
        document.getElementById('endereco-cliente').value = '';
        document.getElementById('telefone-cliente').value = '';
    }

    carrinhoBtn.onclick = () => {
        renderizarCarrinho();
        modal.style.display = 'flex';
    };

    closeModalBtn.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    finalizarPedidoBtn.onclick = finalizarPedido;

    hamburguerMenuBtn.onclick = () => {
        navLinks.classList.toggle('active');
    };

    carregarMenu();
    atualizarContadorCarrinho();
});
