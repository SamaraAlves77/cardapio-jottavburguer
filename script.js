let carrinho = [];

// Seletores do DOM
const hamburgueresGrid = document.getElementById('hamburgueres-artesanais-grid');
const combosGrid = document.getElementById('combos-e-familia-grid');
const acompanhamentosGrid = document.getElementById('acompanhamentos-grid');
const bebidasGrid = document.getElementById('bebidas-grid');

const itemModal = document.getElementById('item-modal');
const modalItemNome = document.getElementById('modal-item-nome');
const modalItemDescricao = document.getElementById('modal-item-descricao');
const modalItemPreco = document.getElementById('modal-item-preco');
const modalItemImagem = document.getElementById('modal-item-imagem');
const modalItemQuantidadeSpan = document.getElementById('modal-item-quantidade');
const btnMenos = document.getElementById('btn-menos');
const btnMais = document.getElementById('btn-mais');
const btnAdicionarFinal = document.getElementById('btn-adicionar-final');
const modalAdicionaisGrid = document.getElementById('adicionais-grid');

const carrinhoBtn = document.getElementById('carrinho-btn');
const carrinhoModal = document.getElementById('carrinho-modal');
const fecharModais = document.querySelectorAll('.fechar-modal');
const carrinhoItens = document.getElementById('carrinho-itens');
const carrinhoTotalSpan = document.getElementById('carrinho-total');

const nomeCliente = document.getElementById('nome-cliente');
const enderecoCliente = document.getElementById('endereco-cliente');
const telefoneCliente = document.getElementById('telefone-cliente');
const btnFinalizarPedido = document.getElementById('btn-finalizar-pedido');
const notificacao = document.getElementById('notificacao');

let itemSelecionado = null;
let quantidadeItem = 1;
let precoBaseItem = 0;
let totalAdicionais = 0;

// Renderizar o cardápio dinamicamente
function renderizarCardapio() {
    if (typeof cardapioData === 'undefined') {
        console.error('Erro: A variável cardapioData não foi encontrada. Verifique se o arquivo cardapio.js está linkado corretamente.');
        return;
    }

    const grids = {
        'Hambúrgueres Artesanais': hamburgueresGrid,
        'Combos e Família': combosGrid,
        'Acompanhamentos': acompanhamentosGrid,
        'Bebidas': bebidasGrid
    };

    for (const categoria in grids) {
        if (cardapioData.hasOwnProperty(categoria) && grids[categoria]) {
            cardapioData[categoria].forEach(item => {
                const itemCard = document.createElement('div');
                itemCard.className = 'item-card';
                itemCard.innerHTML = `
                    <img src="${item.imagem}" alt="${item.nome}">
                    <div class="item-card-content">
                        <h3>${item.nome}</h3>
                        <p>${item.descricao || ''}</p>
                        <span class="price">R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
                        <button class="btn-add" data-id="${item.id}">Adicionar</button>
                    </div>
                `;
                grids[categoria].appendChild(itemCard);
            });
        }
    }

    // Renderizar adicionais no modal
    if (cardapioData['Adicionais']) {
        modalAdicionaisGrid.innerHTML = '';
        cardapioData['Adicionais'].forEach(adicional => {
            const adicionalItem = document.createElement('div');
            adicionalItem.className = 'adicional-item';
            adicionalItem.innerHTML = `
                <input type="checkbox" id="adicional-${adicional.id}" data-preco="${adicional.preco}">
                <label for="adicional-${adicional.id}">${adicional.nome} <span>R$ ${adicional.preco.toFixed(2).replace('.', ',')}</span></label>
            `;
            modalAdicionaisGrid.appendChild(adicionalItem);
        });
    }
}

// Abrir modal do item e preencher com os dados
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-add')) {
        const itemId = parseInt(event.target.dataset.id);
        
        let foundItem = null;
        for (const categoria in cardapioData) {
            foundItem = cardapioData[categoria].find(item => item.id === itemId);
            if (foundItem) break;
        }

        if (foundItem) {
            itemSelecionado = foundItem;
            quantidadeItem = 1;
            precoBaseItem = itemSelecionado.preco;
            totalAdicionais = 0;

            modalItemNome.textContent = itemSelecionado.nome;
            modalItemDescricao.textContent = itemSelecionado.descricao;
            modalItemImagem.src = itemSelecionado.imagem;
            modalItemQuantidadeSpan.textContent = quantidadeItem;

            // Reiniciar estado dos adicionais
            const checkboxes = modalAdicionaisGrid.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            atualizarPrecoModal();
            itemModal.style.display = 'flex';
        }
    }
});

// Atualizar preço do modal
function atualizarPrecoModal() {
    let precoTotal = precoBaseItem * quantidadeItem;
    totalAdicionais = 0;
    const checkboxes = modalAdicionaisGrid.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(checkbox => {
        totalAdicionais += parseFloat(checkbox.dataset.preco);
    });
    
    precoTotal += totalAdicionais * quantidadeItem;

    modalItemPreco.textContent = `R$ ${precoTotal.toFixed(2).replace('.', ',')}`;
    btnAdicionarFinal.textContent = `Adicionar ${quantidadeItem} Item(s) por R$ ${precoTotal.toFixed(2).replace('.', ',')}`;
}

// Contador de quantidade no modal
btnMenos.addEventListener('click', () => {
    if (quantidadeItem > 1) {
        quantidadeItem--;
        modalItemQuantidadeSpan.textContent = quantidadeItem;
        atualizarPrecoModal();
    }
});

btnMais.addEventListener('click', () => {
    quantidadeItem++;
    modalItemQuantidadeSpan.textContent = quantidadeItem;
    atualizarPrecoModal();
});

modalAdicionaisGrid.addEventListener('change', atualizarPrecoModal);

// Adicionar item ao carrinho
btnAdicionarFinal.addEventListener('click', () => {
    if (itemSelecionado) {
        const adicionaisSelecionados = Array.from(modalAdicionaisGrid.querySelectorAll('input[type="checkbox"]:checked'))
            .map(checkbox => {
                const id = parseInt(checkbox.id.replace('adicional-', ''));
                const adicional = cardapioData['Adicionais'].find(a => a.id === id);
                return adicional;
            });

        carrinho.push({
            ...itemSelecionado,
            quantidade: quantidadeItem,
            adicionais: adicionaisSelecionados,
            precoTotal: precoBaseItem * quantidadeItem + totalAdicionais * quantidadeItem
        });

        // Fechar o modal e mostrar notificação
        itemModal.style.display = 'none';
        showNotification();
    }
});

// Mostrar notificação
function showNotification() {
    notificacao.classList.add('show');
    setTimeout(() => {
        notificacao.classList.remove('show');
    }, 2000);
}

// Renderizar o carrinho
function renderizarCarrinho() {
    carrinhoItens.innerHTML = '';
    let totalCarrinho = 0;
    
    if (carrinho.length === 0) {
        carrinhoItens.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
    } else {
        carrinho.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'carrinho-item';
            itemElement.innerHTML = `
                <div class="item-info">
                    <span class="quantidade-carrinho">${item.quantidade}x</span>
                    <h4>${item.nome}</h4>
                    <p class="preco-carrinho">R$ ${item.precoTotal.toFixed(2).replace('.', ',')}</p>
                    <p class="adicionais-carrinho">${item.adicionais.map(a => a.nome).join(', ') || ''}</p>
                </div>
                <button class="btn-remover" data-index="${index}">&times;</button>
            `;
            carrinhoItens.appendChild(itemElement);
            totalCarrinho += item.precoTotal;
        });
    }

    carrinhoTotalSpan.textContent = totalCarrinho.toFixed(2).replace('.', ',');
}

// Remover item do carrinho
carrinhoItens.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-remover')) {
        const itemIndex = parseInt(event.target.dataset.index);
        carrinho.splice(itemIndex, 1);
        renderizarCarrinho();
    }
});

// Abrir carrinho
carrinhoBtn.addEventListener('click', () => {
    renderizarCarrinho();
    carrinhoModal.style.display = 'flex';
});

// Fechar modais
fecharModais.forEach(btn => {
    btn.addEventListener('click', () => {
        itemModal.style.display = 'none';
        carrinhoModal.style.display = 'none';
    });
});

// Fechar modais clicando fora do conteúdo
window.addEventListener('click', (event) => {
    if (event.target === itemModal) {
        itemModal.style.display = 'none';
    }
    if (event.target === carrinhoModal) {
        carrinhoModal.style.display = 'none';
    }
});

// Finalizar pedido via WhatsApp
btnFinalizarPedido.addEventListener('click', () => {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const nome = nomeCliente.value.trim();
    const endereco = enderecoCliente.value.trim();
    const telefone = telefoneCliente.value.trim();

    if (!nome || !endereco || !telefone) {
        alert("Por favor, preencha todos os campos de finalização de pedido.");
        return;
    }

    let mensagem = `*Novo Pedido - JottaV Burguer*%0A%0A`;
    mensagem += `*Cliente:* ${nome}%0A`;
    mensagem += `*Endereço:* ${endereco}%0A`;
    mensagem += `*Telefone:* ${telefone}%0A%0A`;

    mensagem += `*Itens do Pedido:*%0A`;
    let totalPedido = 0;
    carrinho.forEach((item, index) => {
        let adicionaisTexto = item.adicionais.length > 0 ? ` (+ ${item.adicionais.map(a => a.nome).join(', ')})` : '';
        mensagem += `${index + 1}. ${item.quantidade}x ${item.nome} ${adicionaisTexto} - R$ ${item.precoTotal.toFixed(2).replace('.', ',')}%0A`;
        totalPedido += item.precoTotal;
    });

    mensagem += `%0A*Total:* R$ ${totalPedido.toFixed(2).replace('.', ',')}`;

    const numeroWhatsApp = "5586981147596";
    const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;

    window.open(linkWhatsApp, '_blank');
});


// Chamada inicial para renderizar o cardápio
document.addEventListener('DOMContentLoaded', renderizarCardapio);
