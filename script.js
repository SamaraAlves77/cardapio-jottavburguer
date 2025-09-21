// Dados do cardápio com caminhos de imagem locais
const cardapioData = {
    'Hambúrguer Artesanal': [
        { id: 1, nome: 'Smash Original', descricao: 'Pão, Carne 80g prensada na chapa, queijo Muçarela, cebola caramelizada, alface, tomate e molho da casa.', preco: 18.99, imagem: 'smash_original.jpeg' },
        { id: 2, nome: 'Smash Duplo', descricao: 'Pão, 2 carnes 80g prensadas na chapa, 2 queijos muçarela, cebola caramelizada, alface, tomate e molho da casa.', preco: 24.99, imagem: 'smash_duplo.jpeg' },
        { id: 3, nome: 'Jotta Básico', descricao: 'Pão, Carne 120g prensada na chapa com cebola, queijo muçarela e molho da casa.', preco: 14.99, imagem: 'jotta_basico.jpeg' },
        { id: 4, nome: 'Jotta Classic', descricao: 'Pão, Carne 120g, molho barbecue, tomate, alface, bacon e queijo muçarela.', preco: 25.99, imagem: 'jotta_classic.jpeg' },
        { id: 5, nome: 'Burguer do Xerife', descricao: 'Pão, carne de 120g, requeijão longá e farofa de bacon.', preco: 22.99, imagem: 'burguer_do_xerife.jpeg' },
        { id: 6, nome: 'Duplo Brutão', descricao: 'Pão, 2 carnes de 120g,requeijão longa, molho da casa, 2 fatias de bacon.', preco: 37.99, imagem: 'duplo_brutao.jpeg' },
        { id: 7, nome: 'Calabresa Prime', descricao: 'Pão, molho, alface, tomate, calabresa, queijo, cebola caramelizada,carne 80g prensada na chapa', preco: 26.99, imagem: 'calabresa_prime.jpeg' },
        { id: 8, nome: 'Burguer Salame', descricao: 'Pão, requeijão, carne e salame.', preco: 28.99, imagem: 'burguer_salame.jpeg' },
        { id: 9, nome: 'Calabresa Básico', descricao: 'Pão, molho da casa, calabresa e queijo muçarela.', preco: 15.00, imagem: 'calabresa_basico.jpeg' }
    ],
    'Combos': [
        { id: 11, nome: 'Combo Econômico', descricao: '1 Smash Original + batata frita + refrigerante lata.', preco: 31.99, imagem: 'combo_economico_smash.jpeg' },
        { id: 12, nome: 'Combo do Chef', descricao: '1 Jotta Classic + batata frita + refrigerante lata.', preco: 41.99, imagem: 'combo_do_chef.jpeg' },
        { id: 13, nome: 'Combo Smash Duplo', descricao: '1 Smash duplo + batata frita + refrigerante lata.', preco: 37.99, imagem: 'combo_smash_duplo.jpeg' },
        { id: 14, nome: 'Combo Premium', descricao: '1 Duplo Brutão + batata frita + refrigerante lata.', preco: 53.99, imagem: 'combo_premium.jpeg' },
        { id: 15, nome: 'Casal: 2x Smash Original', descricao: '2 Smash Original + batata frita + Guaraná 1L.', preco: 49.99, imagem: 'combo_economico_casal_smash.jpeg' },
        { id: 16, nome: 'Casal: 2x Jotta Classic', descricao: '2 Jotta Classic + batata frita + Guaraná 1L.', preco: 63.99, imagem: 'casal_jotta_classic.jpeg' },
        { id: 17, nome: 'Casal: 2x Smash Duplo', descricao: '2 Smash duplo + batata frita + Guaraná 1L.', preco: 61.99, imagem: 'casal_smash_duplo.jpeg' },
        { id: 18, nome: 'Casal: 2x Duplo Brutão', descricao: '2 Duplo Brutão + batata frita + Guaraná 1L.', preco: 87.99, imagem: 'casal_duplo_brutao.jpeg' },
        { id: 19, nome: 'Família: 4x Smash Original', descricao: '4 Smash Original + batata frita + Guaraná 1L.', preco: 87.99, imagem: 'familia_smash_original.jpeg' },
        { id: 20, nome: 'Família: 4x Jotta Classic', descricao: '4 Jotta Classic + batata frita + Guaraná 1L.', preco: 115.99, imagem: 'familia_jotta_classic.jpeg' },
        { id: 21, nome: 'Família: 4x Smash Duplo', descricao: '4 Smash duplo + batata frita + Guaraná 1L.', preco: 111.99, imagem: 'familia_smash_duplo.jpeg' },
        { id: 22, nome: 'Família: 4x Duplo Brutão', descricao: '4 Duplo Brutão + batata frita + Guaraná 1L.', preco: 154.99, imagem: 'familia_duplo_brutao.jpeg' }
    ],
    'Acompanhamentos': [
        { id: 23, nome: 'Batata Palito', descricao: 'Porção individual de batata frita palito.', preco: 11.99, imagem: 'batata_palito_nova.jpeg' },
        { id: 24, nome: 'Anéis de Cebola', descricao: 'Porção individual de anéis de cebola empanados.', preco: 13.99, imagem: 'aneis_de_cebola.jpeg' },
        { id: 25, nome: 'Nuggets de Frango', descricao: 'Porção de nuggets de frango.', preco: 12.99, imagem: 'nuggets_frango.jpeg' },
        { id: 26, nome: 'Queijo Cheddar', descricao: 'Porção de queijo cheddar cremoso.', preco: 5.00, imagem: 'cheddar.jpeg' },
        { id: 27, nome: 'Cebola Caramelizada', descricao: 'Porção de cebola caramelizada.', preco: 4.00, imagem: 'cebola_caramelizada.jpeg' }
    ],
    'Bebidas': [
        { id: 28, nome: 'Refrigerante Lata', descricao: 'Coca-Cola, Guaraná, Fanta Uva, Sprite.', preco: 6.00, imagem: 'refrigerante_lata.jpeg' },
        { id: 29, nome: 'Refrigerante 1L', descricao: 'Coca-Cola, Guaraná, Fanta Uva, Sprite.', preco: 10.00, imagem: 'refrigerante_1l.jpeg' },
        { id: 30, nome: 'Água Mineral', descricao: 'Água mineral sem gás.', preco: 3.00, imagem: 'agua_mineral.jpeg' },
        { id: 31, nome: 'Suco Natural', descricao: 'Suco de Laranja, Limão ou Maracujá.', preco: 8.00, imagem: 'suco_natural.jpeg' },
    ],
    'Opcionais': [
        { id: 32, nome: 'Cheddar', preco: 5.00, imagem: 'cheddar.jpeg' },
        { id: 33, nome: 'Bacon', preco: 6.00, imagem: 'bacon.jpeg' },
        { id: 34, nome: 'Ovo', preco: 3.00, imagem: 'ovo.jpeg' },
        { id: 35, nome: 'Molho da Casa Extra', preco: 3.00, imagem: 'molho_da_casa.jpeg' },
        { id: 36, nome: 'Catupiry', preco: 6.00, imagem: 'catupiry.jpeg' },
        { id: 37, nome: 'Salame', preco: 7.00, imagem: 'salame.jpeg' },
        { id: 38, nome: 'Requeijão Longá', preco: 5.00, imagem: 'requeijao_longa.jpeg' },
    ],
};

// Variáveis globais
let carrinho = [];
let itemSelecionado = null;
const whatsappNumero = '5586994253258'; // Seu número de WhatsApp

const menuContainer = document.getElementById('menu-container');
const navLinksContainer = document.getElementById('nav-links');
const abrirCarrinhoBtn = document.getElementById('abrir-carrinho');
const contadorCarrinhoSpan = document.getElementById('contador-carrinho');
const carrinhoModal = document.getElementById('carrinho-modal');
const fecharModalSpan = document.querySelector('#carrinho-modal .fechar-modal');
const carrinhoItensDiv = document.getElementById('carrinho-itens');
const carrinhoVazioDiv = document.getElementById('carrinho-vazio');
const totalPedidoSpan = document.getElementById('total-pedido');
const finalizarPedidoBtn = document.getElementById('finalizar-pedido-whatsapp');
const notificacaoFlutuante = document.getElementById('notificacao-flutuante');
const adicionaisModal = document.getElementById('adicionais-modal');
const fecharAdicionaisSpan = document.querySelector('#adicionais-modal .fechar-modal');
const adicionaisOpcoesDiv = document.getElementById('adicionais-opcoes');
const confirmarAdicionaisBtn = document.getElementById('confirmar-adicionais');
const observacaoItemTextarea = document.getElementById('observacao-item');
const abrirCardapioVisualBtn = document.getElementById('abrir-cardapio-visual');
const entradaVisualDiv = document.getElementById('entrada-visual');
const mainContentDiv = document.getElementById('main-content');
const hamburgerMenuBtn = document.getElementById('hamburger-menu');

// Botões e campos do formulário
const formaPagamentoSelect = document.getElementById('forma-pagamento');
const observacoesGeraisTextarea = document.getElementById('observacoes-gerais');
const campoRuaInput = document.getElementById('campo-rua');
const campoNumeroInput = document.getElementById('campo-numero');
const campoBairroInput = document.getElementById('campo-bairro');
const observacoesEnderecoTextarea = document.getElementById('observacoes-endereco');
const btnLocalizacao = document.getElementById('btn-localizacao');
const localizacaoStatus = document.getElementById('localizacao-status');

// Funções do Cardápio
// ===================
function gerarCardapio() {
    menuContainer.innerHTML = '';
    navLinksContainer.innerHTML = '';
    let navLinksHtml = '';

    for (const categoria in cardapioData) {
        const categoriaId = categoria.replace(/\s+/g, '-').toLowerCase();
        
        // Adiciona o link na barra de navegação
        navLinksHtml += `<a href="#${categoriaId}">${categoria}</a>`;

        const section = document.createElement('section');
        section.className = 'menu-section';
        section.id = categoriaId;
        section.innerHTML = `<h2>${categoria}</h2>`;

        const grid = document.createElement('div');
        grid.className = 'item-grid';

        cardapioData[categoria].forEach(item => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = `
                <img src="${item.imagem}" alt="${item.nome}">
                <h3>${item.nome}</h3>
                <p>${item.descricao}</p>
                <span class="price">R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
                <button class="btn-add" data-id="${item.id}" data-categoria="${categoria}">Adicionar</button>
            `;
            grid.appendChild(card);
        });

        section.appendChild(grid);
        menuContainer.appendChild(section);
    }
    navLinksContainer.innerHTML = navLinksHtml;

    // Adiciona o evento de rolagem para os links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const offset = 80; // Ajuste para a altura da barra de navegação
                const targetPosition = targetElement.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            // Fecha o menu hambúrguer se estiver aberto
            navLinksContainer.classList.remove('active');
        });
    });
}

function exibirNotificacao(mensagem) {
    notificacaoFlutuante.textContent = mensagem;
    notificacaoFlutuante.classList.add('show');
    setTimeout(() => {
        notificacaoFlutuante.classList.remove('show');
    }, 2000);
}

// Funções do Carrinho
// ===================
function atualizarCarrinho() {
    carrinhoItensDiv.innerHTML = '';
    let total = 0;

    if (carrinho.length === 0) {
        carrinhoVazioDiv.style.display = 'block';
    } else {
        carrinhoVazioDiv.style.display = 'none';
        carrinho.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'carrinho-item';
            
            let adicionaisHtml = '';
            let adicionaisPreco = 0;
            if (item.adicionais && item.adicionais.length > 0) {
                const nomesAdicionais = item.adicionais.map(add => add.nome).join(', ');
                adicionaisHtml = `<p class="item-adicionais">Opcionais: ${nomesAdicionais}</p>`;
                adicionaisPreco = item.adicionais.reduce((sum, add) => sum + add.preco, 0);
            }

            let observacaoHtml = '';
            if (item.observacao) {
                observacaoHtml = `<p class="item-observacao">Obs: ${item.observacao}</p>`;
            }

            const precoTotalItem = (item.preco + adicionaisPreco) * item.quantidade;
            total += precoTotalItem;
            
            itemElement.innerHTML = `
                <div>
                    ${item.nome} (${item.quantidade})
                    <span class="total-item">R$ ${precoTotalItem.toFixed(2).replace('.', ',')}</span>
                    ${adicionaisHtml}
                    ${observacaoHtml}
                </div>
                <div class="carrinho-actions">
                    <button data-index="${index}" class="btn-quantidade-remover">-</button>
                    <button data-index="${index}" class="btn-quantidade-adicionar">+</button>
                    <i class="fas fa-trash-alt remover-item" data-index="${index}"></i>
                </div>
            `;
            carrinhoItensDiv.appendChild(itemElement);
        });
    }

    totalPedidoSpan.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    contadorCarrinhoSpan.textContent = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
    // Habilita ou desabilita o botão de finalizar pedido
    finalizarPedidoBtn.disabled = carrinho.length === 0;
}

function adicionarItemAoCarrinho(item, quantidade, adicionais = [], observacao = '') {
    const itemExistente = carrinho.find(
        c => c.id === item.id && 
             JSON.stringify(c.adicionais) === JSON.stringify(adicionais) &&
             c.observacao === observacao
    );

    if (itemExistente) {
        itemExistente.quantidade += quantidade;
    } else {
        const itemParaAdicionar = {
            id: item.id,
            nome: item.nome,
            preco: item.preco,
            quantidade: quantidade,
            adicionais: adicionais,
            observacao: observacao
        };
        carrinho.push(itemParaAdicionar);
    }
    atualizarCarrinho();
    exibirNotificacao(`"${item.nome}" adicionado!`);
}

function removerItemDoCarrinho(index) {
    if (carrinho[index]) {
        const nomeItem = carrinho[index].nome;
        carrinho.splice(index, 1);
        atualizarCarrinho();
        exibirNotificacao(`"${nomeItem}" removido!`);
    }
}

function alterarQuantidade(index, operacao) {
    if (carrinho[index]) {
        if (operacao === '+') {
            carrinho[index].quantidade++;
        } else if (operacao === '-' && carrinho[index].quantidade > 1) {
            carrinho[index].quantidade--;
        } else if (operacao === '-' && carrinho[index].quantidade === 1) {
            removerItemDoCarrinho(index);
            return;
        }
        atualizarCarrinho();
    }
}

// Funções de Modal e Event Listeners
// ==================================
function abrirModal(modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Impede rolagem do fundo
}
function fecharModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

abrirCarrinhoBtn.addEventListener('click', () => abrirModal(carrinhoModal));
fecharModalSpan.addEventListener('click', () => fecharModal(carrinhoModal));
fecharAdicionaisSpan.addEventListener('click', () => fecharModal(adicionaisModal));

window.addEventListener('click', (event) => {
    if (event.target === carrinhoModal) {
        fecharModal(carrinhoModal);
    }
    if (event.target === adicionaisModal) {
        fecharModal(adicionaisModal);
    }
});

menuContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-add')) {
        const itemId = parseInt(event.target.getAttribute('data-id'));
        const categoria = event.target.getAttribute('data-categoria');
        
        itemSelecionado = cardapioData[categoria].find(item => item.id === itemId);

        if (categoria === 'Combos' || categoria === 'Acompanhamentos' || categoria === 'Bebidas') {
            adicionarItemAoCarrinho(itemSelecionado, 1);
        } else {
            abrirAdicionaisModal();
        }
    }
});

carrinhoItensDiv.addEventListener('click', (event) => {
    if (event.target.classList.contains('remover-item')) {
        const index = event.target.getAttribute('data-index');
        removerItemDoCarrinho(index);
    } else if (event.target.classList.contains('btn-quantidade-adicionar')) {
        const index = event.target.getAttribute('data-index');
        alterarQuantidade(index, '+');
    } else if (event.target.classList.contains('btn-quantidade-remover')) {
        const index = event.target.getAttribute('data-index');
        alterarQuantidade(index, '-');
    }
});

// Funções do Modal de Adicionais
// ===============================
function abrirAdicionaisModal() {
    adicionaisOpcoesDiv.innerHTML = '';
    observacaoItemTextarea.value = '';
    const adicionaisSelecionados = new Map();

    cardapioData['Opcionais'].forEach(adicional => {
        const adicionalCard = document.createElement('div');
        adicionalCard.className = 'adicional-card';
        adicionalCard.innerHTML = `
            <img src="${adicional.imagem}" alt="${adicional.nome}">
            <div class="adicional-info">
                <span>${adicional.nome}</span>
                <span class="price">R$ ${adicional.preco.toFixed(2).replace('.', ',')}</span>
            </div>
            <div class="adicional-actions">
                <button class="btn-quantidade-adicional-remover" data-id="${adicional.id}">-</button>
                <span class="quantidade-add" id="quantidade-add-${adicional.id}">0</span>
                <button class="btn-quantidade-adicional-adicionar" data-id="${adicional.id}">+</button>
            </div>
        `;
        adicionaisOpcoesDiv.appendChild(adicionalCard);
    });

    adicionaisOpcoesDiv.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('btn-quantidade-adicional-adicionar')) {
            const id = parseInt(target.getAttribute('data-id'));
            const adicional = cardapioData['Opcionais'].find(add => add.id === id);
            adicionaisSelecionados.set(id, (adicionaisSelecionados.get(id) || 0) + 1);
            document.getElementById(`quantidade-add-${id}`).textContent = adicionaisSelecionados.get(id);
        } else if (target.classList.contains('btn-quantidade-adicional-remover')) {
            const id = parseInt(target.getAttribute('data-id'));
            const quantidade = adicionaisSelecionados.get(id) || 0;
            if (quantidade > 0) {
                adicionaisSelecionados.set(id, quantidade - 1);
                document.getElementById(`quantidade-add-${id}`).textContent = quantidade - 1;
            }
        }
    });

    confirmarAdicionaisBtn.onclick = () => {
        const adicionais = [];
        for (let [id, quantidade] of adicionaisSelecionados.entries()) {
            if (quantidade > 0) {
                const adicional = cardapioData['Opcionais'].find(add => add.id === id);
                for (let i = 0; i < quantidade; i++) {
                    adicionais.push(adicional);
                }
            }
        }
        const observacao = observacaoItemTextarea.value.trim();
        adicionarItemAoCarrinho(itemSelecionado, 1, adicionais, observacao);
        fecharModal(adicionaisModal);
    };

    abrirModal(adicionaisModal);
}

// Lógica de Finalização do Pedido
// ================================
finalizarPedidoBtn.addEventListener('click', () => {
    let pedidoTexto = 'Olá, gostaria de fazer um pedido!\n\n';
    let total = 0;

    carrinho.forEach(item => {
        let adicionaisTexto = '';
        let adicionaisPreco = 0;
        if (item.adicionais && item.adicionais.length > 0) {
            const nomesAdicionais = item.adicionais.map(add => add.nome).join(', ');
            adicionaisTexto = `\n  - Opcionais: ${nomesAdicionais}`;
            adicionaisPreco = item.adicionais.reduce((sum, add) => sum + add.preco, 0);
        }

        let observacaoTexto = '';
        if (item.observacao) {
            observacaoTexto = `\n  - Obs: ${item.observacao}`;
        }

        const precoItem = item.preco + adicionaisPreco;
        const subtotal = precoItem * item.quantidade;
        total += subtotal;

        pedidoTexto += `*${item.quantidade}x ${item.nome}* - R$ ${subtotal.toFixed(2).replace('.', ',')}${adicionaisTexto}${observacaoTexto}\n`;
    });

    pedidoTexto += `\n*TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*`;

    // Dados do formulário
    const formaPagamento = formaPagamentoSelect.value;
    const observacoesGerais = observacoesGeraisTextarea.value.trim();
    const rua = campoRuaInput.value.trim();
    const numero = campoNumeroInput.value.trim();
    const bairro = campoBairroInput.value.trim();
    const observacoesEndereco = observacoesEnderecoTextarea.value.trim();

    pedidoTexto += `\n\n---
*Dados do Pedido:*
- *Pagamento:* ${formaPagamento.charAt(0).toUpperCase() + formaPagamento.slice(1).replace('-', ' ')}
- *Observações Gerais:* ${observacoesGerais || 'Nenhuma'}

*Endereço de Entrega:*
- *Rua:* ${rua || 'Não informado'}
- *Número:* ${numero || 'Não informado'}
- *Bairro:* ${bairro || 'Não informado'}
- *Obs do Endereço:* ${observacoesEndereco || 'Nenhuma'}`;

    const linkWhatsapp = `https://wa.me/${whatsappNumero}?text=${encodeURIComponent(pedidoTexto)}`;
    window.open(linkWhatsapp, '_blank');
});

// Funções de Geolocalização
// ===========================
btnLocalizacao.addEventListener('click', () => {
    if (navigator.geolocation) {
        localizacaoStatus.textContent = 'Obtendo sua localização...';
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                localizacaoStatus.textContent = `Localização obtida. Latitude: ${lat}, Longitude: ${lon}.`;
                // Você pode usar uma API de geocodificação reversa aqui para obter o endereço
                // Ex: fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`)
                // Por agora, o texto de status é suficiente.
            },
            (error) => {
                localizacaoStatus.textContent = 'Não foi possível obter sua localização. Por favor, preencha o endereço manualmente.';
                console.error(error);
            }
        );
    } else {
        localizacaoStatus.textContent = 'Geolocalização não é suportada pelo seu navegador.';
    }
});

// Lógica de Transição de Tela
// ============================
abrirCardapioVisualBtn.addEventListener('click', () => {
    entradaVisualDiv.style.display = 'none';
    document.body.style.backgroundColor = 'var(--cor-fundo-secundario)';
    mainContentDiv.style.display = 'block';
    // Rola para o topo
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Lógica do Menu Hambúrguer
// ==========================
hamburgerMenuBtn.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
});

// Inicialização da página
// =======================
document.addEventListener('DOMContentLoaded', () => {
    gerarCardapio();
    atualizarCarrinho();
});
