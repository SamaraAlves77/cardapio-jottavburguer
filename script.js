document.addEventListener('DOMContentLoaded', () => {
    const cardapioUrl = 'cardapio.json';
    const carrinhoItens = document.getElementById('carrinho-itens');
    const carrinhoTotal = document.getElementById('carrinho-total');
    const carrinhoCount = document.getElementById('cart-count');
    const carrinhoModal = document.getElementById('carrinho-modal');
    const carrinhoBtn = document.getElementById('carrinho-btn');
    const fecharModal = document.querySelector('.fechar-modal');
    const btnFinalizarPedido = document.getElementById('btn-finalizar-pedido');
    const nomeCliente = document.getElementById('nome-cliente');
    const enderecoCliente = document.getElementById('endereco-cliente');
    const telefoneCliente = document.getElementById('telefone-cliente');
    const notificacao = document.getElementById('notificacao');

    let carrinho = [];
    let todosItens = {};

    function fetchCardapio() {
        fetch(cardapioUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                todosItens = {};
                for (const categoria in data) {
                    const gridId = categoria.toLowerCase().replace(/á/g, 'a').replace(/é/g, 'e').replace(/ã/g, 'a').replace(/ú/g, 'u').replace(/ç/g, 'c').replace(/ /g, '-');
                    const gridElement = document.getElementById(gridId);

                    if (gridElement) {
                        data[categoria].forEach(item => {
                            todosItens[item.id] = item;
                            renderizarItem(item, gridElement);
                        });
                    }
                }
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }

    function renderizarItem(item, container) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item-card';
        itemDiv.innerHTML = `
            <img src="imagem_cardapio/${item.imagem}" alt="${item.nome}">
            <div class="item-info">
                <h3>${item.nome}</h3>
                <p>${item.descricao || ''}</p>
                <div class="price-and-button">
                    <div class="price">R$ ${item.preco.toFixed(2).replace('.', ',')}</div>
                    <button class="btn-add" data-id="${item.id}">Adicionar</button>
                </div>
            </div>
        `;
        container.appendChild(itemDiv);
    }

    function adicionarAoCarrinho(itemId) {
        const item = todosItens[itemId];
        const itemNoCarrinho = carrinho.find(cartItem => cartItem.id === itemId);

        if (itemNoCarrinho) {
            itemNoCarrinho.quantidade++;
        } else {
            carrinho.push({ ...item,
                quantidade: 1
            });
        }
        atualizarCarrinho();
        mostrarNotificacao();
    }

    function atualizarCarrinho() {
        carrinhoItens.innerHTML = '';
        let total = 0;

        carrinho.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'carrinho-item';
            itemElement.innerHTML = `
                <span>${item.nome} (${item.quantidade}x)</span>
                <span>R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
            `;
            carrinhoItens.appendChild(itemElement);
            total += item.preco * item.quantidade;
        });

        carrinhoTotal.textContent = total.toFixed(2).replace('.', ',');
        carrinhoCount.textContent = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    }

    function mostrarNotificacao() {
        notificacao.classList.add('show');
        setTimeout(() => {
            notificacao.classList.remove('show');
        }, 2000);
    }

    function finalizarPedido() {
        if (carrinho.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }

        const nome = nomeCliente.value;
        const endereco = enderecoCliente.value;
        const telefone = telefoneCliente.value;

        if (!nome || !endereco || !telefone) {
            alert('Por favor, preencha todos os campos: nome, endereço e telefone.');
            return;
        }

        let mensagem = `Olá, JottaV Burguer! Meu pedido é:\n\n`;
        let total = 0;

        carrinho.forEach(item => {
            mensagem += `* ${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}\n`;
            total += item.preco * item.quantidade;
        });

        mensagem += `\nTotal: R$ ${total.toFixed(2).replace('.', ',')}\n\n`;
        mensagem += `Dados para entrega:\n`;
        mensagem += `Nome: ${nome}\n`;
        mensagem += `Endereço: ${endereco}\n`;
        mensagem += `Telefone: ${telefone}`;

        const numeroWhatsApp = '5586994793836';
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

        window.open(urlWhatsApp, '_blank');
        
        carrinho = [];
        atualizarCarrinho();
        carrinhoModal.style.display = 'none';
        nomeCliente.value = '';
        enderecoCliente.value = '';
        telefoneCliente.value = '';
    }

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add')) {
            const itemId = e.target.dataset.id;
            adicionarAoCarrinho(itemId);
        }
    });

    carrinhoBtn.addEventListener('click', () => {
        carrinhoModal.style.display = 'block';
    });

    fecharModal.addEventListener('click', () => {
        carrinhoModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === carrinhoModal) {
            carrinhoModal.style.display = 'none';
        }
    });

    btnFinalizarPedido.addEventListener('click', finalizarPedido);

    const hamburgerMenuBtn = document.getElementById('hamburger-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    hamburgerMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('active');
        }
    });

    fetchCardapio();
});
