document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('main');
    const cartCountElement = document.getElementById('contador-carrinho');
    const carrinhoBtn = document.getElementById('carrinho-btn');
    const carrinhoModal = document.getElementById('carrinho-modal');
    const adicionaisModal = document.getElementById('adicionais-modal');
    const fecharCarrinhoBtn = document.querySelector('.fechar-carrinho');
    const fecharAdicionaisBtn = document.querySelector('.fechar-adicionais');
    const carrinhoItensContainer = document.getElementById('carrinho-itens');
    const carrinhoTotalElement = document.getElementById('carrinho-total');
    const finalizarPedidoBtn = document.getElementById('btn-finalizar-pedido');
    const hamburguerMenuBtn = document.getElementById('hamburger-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const notificacao = document.getElementById('notificacao');
    const adicionaisGrid = document.getElementById('adicionais-grid');

    // Elementos da nova janela flutuante
    const modalItemImg = document.getElementById('modal-item-img');
    const modalItemNome = document.getElementById('modal-item-nome');
    const modalItemDescricao = document.getElementById('modal-item-descricao');
    const modalItemPreco = document.getElementById('modal-item-preco');
    const btnMenos = document.getElementById('btn-menos');
    const btnMais = document.getElementById('btn-mais');
    const itemQuantidadeSpan = document.getElementById('item-quantidade');
    const btnAdicionarFinal = document.getElementById('btn-adicionar-final');

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let menuData = null;
    let adicionaisData = null;
    let itemAtualParaAdicionar = null;
    let quantidadeItemAtual = 1;

    function atualizarContadorCarrinho() {
        cartCountElement.textContent = carrinho.reduce((total, item) => total + item.quantidade, 0);
    }

    function renderizarMenu() {
        if (!menuData) return;
        
        for (const categoria in menuData) {
            if (menuData.hasOwnProperty(categoria) && categoria !== 'Adicionais') {
                criarSecaoCardapio(categoria, menuData[categoria]);
            }
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
            default:
                console.warn(`Categoria desconhecida: ${titulo}`);
                return;
        }

        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Contêiner não encontrado para a categoria: ${titulo}`);
            return;
        }

        container.innerHTML = '';
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
            addButton.onclick = () => abrirModalAdicionais(item);

            content.appendChild(itemTitle);
            content.appendChild(itemDescription);
            content.appendChild(itemPrice);
            content.appendChild(addButton);

            card.appendChild(img);
            card.appendChild(content);
            container.appendChild(card);
        });
    }

    async function carregarMenu() {
        try {
            const response = await fetch('./cardapio.json');
            menuData = await response.json();
            adicionaisData = menuData['Adicionais'];
            renderizarMenu();
            renderizarAdicionaisGrid();
        } catch (error) {
            console.error('Erro ao carregar o menu:', error);
            mainContainer.innerHTML = '<p>Não foi possível carregar o cardápio. Tente novamente mais tarde.</p>';
        }
    }

    function renderizarAdicionaisGrid() {
        adicionaisGrid.innerHTML = '';
        adicionaisData.forEach(item => {
            const adicionalCard = document.createElement('div');
            adicionalCard.classList.add('adicional-card');
            adicionalCard.dataset.id = item.id;
            adicionalCard.dataset.preco = item.preco;

            const img = document.createElement('img');
            img.src = `imagem_cardapio/${item.imagem}`;
            img.alt = item.nome;

            const nome = document.createElement('p');
            nome.textContent = item.nome;

            const preco = document.createElement('p');
            preco.classList.add('price');
            preco.textContent = `R$ ${item.preco.toFixed(2).replace('.', ',')}`;

            adicionalCard.appendChild(img);
            adicionalCard.appendChild(nome);
            adicionalCard.appendChild(preco);

            adicionalCard.onclick = () => {
                adicionalCard.classList.toggle('selected');
                atualizarPrecoModal();
            };

            adicionaisGrid.appendChild(adicionalCard);
        });
    }

    function abrirModalAdicionais(item) {
        itemAtualParaAdicionar = item;
        quantidadeItemAtual = 1;
        itemQuantidadeSpan.textContent = quantidadeItemAtual;
        
        modalItemImg.src = `imagem_cardapio/${item.imagem}`;
        modalItemNome.textContent = item.nome;
        modalItemDescricao.textContent = item.descricao;

        document.querySelectorAll('.adicional-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        atualizarPrecoModal();
        adicionaisModal.style.display = 'flex';
    }

    function atualizarPrecoModal() {
        let precoBase = itemAtualParaAdicionar.preco * quantidadeItemAtual;
        const adicionaisSelecionados = document.querySelectorAll('.adicional-card.selected');
        let precoAdicionais = 0;
        adicionaisSelecionados.forEach(card => {
            precoAdicionais += parseFloat(card.dataset.preco);
        });
        const precoTotal = precoBase + precoAdicionais;
        modalItemPreco.textContent = `R$ ${precoTotal.toFixed(2).replace('.', ',')}`;
        btnAdicionarFinal.textContent = `Adicionar ${quantidadeItemAtual} Item(s) por R$ ${precoTotal.toFixed(2).replace('.', ',')}`;
    }

    function fecharModalAdicionais() {
        adicionaisModal.style.display = 'none';
        itemAtualParaAdicionar = null;
    }

    function adicionarAoCarrinhoFinal() {
        const adicionaisSelecionados = [];
        document.querySelectorAll('.adicional-card.selected').forEach(card => {
            const id = parseInt(card.dataset.id);
            const adicional = adicionaisData.find(item => item.id === id);
            if (adicional) {
                adicionaisSelecionados.push(adicional);
            }
        });

        // Adiciona o item principal
        adicionarItemPrincipal(itemAtualParaAdicionar, quantidadeItemAtual);

        // Adiciona os adicionais
        adicionaisSelecionados.forEach(adicional => {
            adicionarAdicional(adicional, quantidadeItemAtual, `(adicional de ${itemAtualParaAdicionar.nome})`);
        });

        fecharModalAdicionais();
        atualizarContadorCarrinho();
        exibirNotificacao(`${itemAtualParaAdicionar.nome} adicionado(s)!`);
    }

    function adicionarItemPrincipal(item, quantidade) {
        const itemExistente = carrinho.find(c => c.id === item.id && c.nota === '');
        if (itemExistente) {
            itemExistente.quantidade += quantidade;
        } else {
            carrinho.push({ ...item, quantidade: quantidade, nota: '' });
        }
        salvarCarrinho();
    }

    function adicionarAdicional(item, quantidade, nota = '') {
        const itemExistente = carrinho.find(c => c.id === item.id && c.nota === nota);
        if (itemExistente) {
            itemExistente.quantidade += quantidade;
        } else {
            carrinho.push({ ...item, quantidade: quantidade, nota: nota });
        }
        salvarCarrinho();
    }

    function removerDoCarrinho(itemId, itemNota) {
        carrinho = carrinho.filter(item => !(item.id === itemId && item.nota === itemNota));
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
        if (carrinho.length === 0) {
            carrinhoItensContainer.innerHTML = '<p style="text-align: center; color: #666;">Seu carrinho está vazio.</p>';
        } else {
            carrinho.forEach(item => {
                total += item.preco * item.quantidade;
                const li = document.createElement('li');
                li.classList.add('carrinho-item');
                li.innerHTML = `
                    <span>${item.nome} (${item.quantidade}x) ${item.nota ? item.nota : ''}</span>
                    <span>R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
                    <button class="btn-remove" data-id="${item.id}" data-nota="${item.nota}">&times;</button>
                `;
                carrinhoItensContainer.appendChild(li);
            });
        }
        carrinhoTotalElement.textContent = total.toFixed(2).replace('.', ',');

        document.querySelectorAll('.btn-remove').forEach(button => {
            button.onclick = (e) => removerDoCarrinho(parseInt(e.target.dataset.id), e.target.dataset.nota);
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
            const itemNome = item.nome + (item.nota ? ` ${item.nota}` : '');
            mensagem += `* ${itemNome} (${item.quantidade}x) - R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}\n`;
            total += item.preco * item.quantidade;
        });

        mensagem += `\n*Total do Pedido: R$ ${total.toFixed(2).replace('.', ',')}*`;

        const whatsappUrl = `https://wa.me/5586981147596?text=${encodeURIComponent(mensagem)}`;
        window.open(whatsappUrl, '_blank');

        carrinho = [];
        salvarCarrinho();
        renderizarCarrinho();
        atualizarContadorCarrinho();
        carrinhoModal.style.display = 'none';
        document.getElementById('nome-cliente').value = '';
        document.getElementById('endereco-cliente').value = '';
        document.getElementById('telefone-cliente').value = '';
    }

    carrinhoBtn.onclick = () => {
        renderizarCarrinho();
        carrinhoModal.style.display = 'flex';
    };

    fecharCarrinhoBtn.onclick = () => {
        carrinhoModal.style.display = 'none';
    };

    fecharAdicionaisBtn.onclick = () => {
        fecharModalAdicionais();
    };

    btnAdicionarFinal.onclick = adicionarAoCarrinhoFinal;

    btnMais.onclick = () => {
        quantidadeItemAtual++;
        itemQuantidadeSpan.textContent = quantidadeItemAtual;
        atualizarPrecoModal();
    };

    btnMenos.onclick = () => {
        if (quantidadeItemAtual > 1) {
            quantidadeItemAtual--;
            itemQuantidadeSpan.textContent = quantidadeItemAtual;
            atualizarPrecoModal();
        }
    };

    window.onclick = (event) => {
        if (event.target === carrinhoModal) {
            carrinhoModal.style.display = 'none';
        }
        if (event.target === adicionaisModal) {
            fecharModalAdicionais();
        }
    };

    finalizarPedidoBtn.onclick = finalizarPedido;

    hamburguerMenuBtn.onclick = () => {
        navLinks.classList.toggle('active');
    };

    carregarMenu();
    atualizarContadorCarrinho();
});
