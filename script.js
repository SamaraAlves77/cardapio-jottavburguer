// ATENÇÃO: SUBSTITUA ESTES DADOS!
const WHATSAPP_NUMERO = '+5586994253258';
const INSTAGRAM_USUARIO = 'jottavburguer';

// Mapeamento de todos os itens por ID para fácil acesso
let todosOsItens = {};

// Ponto central para gerenciamento de itens. Altere este objeto para modificar o cardápio.
const cardapioData = {
    hamburgueres: [
        { id: 1, nome: 'Smash Original', preco: 18.99, descricao: 'Pão, carne 80g prensada na chapa, queijo muçarela, cebola caramelizada, alface, tomate e molho da casa.', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_hamburgueres/smash_original.jpg?raw=true', disponivel: true, adicionais: [24, 25, 26, 27, 28, 29, 30] },
        { id: 2, nome: 'Smash Duplo', preco: 24.99, descricao: 'Pão, 2 carnes 80g prensadas na chapa, 2 queijos muçarela, cebola caramelizada, alface, tomate e molho da casa.', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_hamburgueres/smash_duplo.jpg?raw=true', disponivel: true, adicionais: [24, 25, 26, 27, 28, 29, 30] },
        { id: 3, nome: 'JottaV Básico', preco: 14.99, descricao: 'Pão, carne 80g prensada na chapa com cebola, queijo muçarela e molho da casa.', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_hamburgueres/jottav_basico.jpg?raw=true', disponivel: true, adicionais: [24, 25, 26, 27, 28, 29, 30] },
        { id: 4, nome: 'JottaV Classic', preco: 25.99, descricao: 'Pão, carne 150g, molho barbecue, tomate, alface, bacon e queijo muçarela.', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_hamburgueres/jottav_classic.jpg?raw=true', disponivel: true, adicionais: [24, 25, 26, 27, 28, 29, 30] },
        { id: 5, nome: 'Búrguer do Xerife', preco: 22.99, descricao: 'Pão, carne de 120g, (queijo muçarela ou requeijão longa) e farofa (bacon ou alho).', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_hamburgueres/burguer_xerife.jpg?raw=true', disponivel: true, adicionais: [24, 25, 26, 27, 28, 29, 30] },
        { id: 6, nome: 'Duplo Brutão', preco: 37.99, descricao: 'Pão, 2 carnes de 120g, (queijo muçarela ou requeijão longa), molho da casa, 2 fatias de bacon.', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_hamburgueres/duplo_brutao.jpg?raw=true', disponivel: true, adicionais: [24, 25, 26, 27, 28, 29, 30] },
        { id: 7, nome: 'Calabresa Prime', preco: 26.99, descricao: 'Pão, molho, alface, tomate, calabresa, queijo, cebola caramelizada, (carne ou frango).', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_hamburgueres/calabresa_prime.jpg?raw=true', disponivel: true, adicionais: [24, 25, 26, 27, 28, 29, 30, 31, 33] },
        { id: 8, nome: 'Burguer Salame', preco: 28.99, descricao: 'Pão, requeijão, carne e salame.', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_hamburgueres/burguer_salame.jpg?raw=true', disponivel: true, adicionais: [24, 25, 26, 27, 28, 29, 30, 32, 33] },
        { id: 9, nome: 'Calabresa Básico', preco: 15.00, descricao: 'Pão, molho da casa, calabresa e queijo muçarela.', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_hamburgueres/calabresa_basico.jpg?raw=true', disponivel: true, adicionais: [24, 25, 26, 27, 28, 29, 30, 31] }
    ],
    acompanhamentos: [
        { id: 10, nome: 'Batata Palito', preco: 11.99, descricao: 'Batata com batata.', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_acompanhamentos/batata_palito.jpg?raw=true', disponivel: true, adicionais: [24, 26, 27, 28, 29, 30] },
        { id: 11, nome: 'Batata com Bacon', preco: 17.99, descricao: 'Batata com bacon.', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_acompanhamentos/batata_bacon.jpg?raw=true', disponivel: true, adicionais: [24, 26, 27, 28, 29, 30] }
    ],
    combos: [
        { id: 12, nome: 'Combo Econômico', preco: 31.99, descricao: '1 Smash Original + batata frita + refrigerante lata.', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_combos/combo_economico.jpg?raw=true', disponivel: true, adicionais: [] },
        { id: 13, nome: 'Combo do Chef', preco: 41.99, descricao: '1 JottaV Classic + batata frita + refrigerante lata.', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_combos/combo_chef.jpg?raw=true', disponivel: true, adicionais: [] },
        { id: 14, nome: 'Combo Smash Duplo', preco: 37.99, descricao: '1 Smash Duplo + batata frita + refrigerante lata.', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_combos/combo_smash_duplo.jpg?raw=true', disponivel: true, adicionais: [] },
        { id: 15, nome: 'Combo Premium', preco: 53.99, descricao: '1 Duplo Brutão + batata frita + refrigerante lata.', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_combos/combo_premium.jpg?raw=true', disponivel: true, adicionais: [] },
        { id: 16, nome: 'Casal R$ 49,99', preco: 49.99, descricao: '2 Smash Original + batata frita + Guaraná 1L.', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_combos/combo_casal_49.jpg?raw=true', disponivel: true, adicionais: [] },
        { id: 17, nome: 'Casal R$ 63,99', preco: 63.99, descricao: '2 JottaV Classic + batata frita + Guaraná 1L.', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_combos/combo_casal_63.jpg?raw=true', disponivel: true, adicionais: [] },
        { id: 18, nome: 'Casal R$ 61,99', preco: 61.99, descricao: '2 Smash Duplo + batata frita + Guaraná 1L.', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_combos/combo_casal_61.jpg?raw=true', disponivel: true, adicionais: [] },
        { id: 19, nome: 'Casal R$ 87,99', preco: 87.99, descricao: '2 Duplo Brutão + batata frita + Guaraná 1L.', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_combos/combo_casal_87.jpg?raw=true', disponivel: true, adicionais: [] },
        { id: 20, nome: 'Família R$ 87,99', preco: 87.99, descricao: '4 Smash Original + batata frita + Guaraná 1L.', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_combos/combo_familia_87.jpg?raw=true', disponivel: true, adicionais: [] },
        { id: 21, nome: 'Família R$ 115,99', preco: 115.99, descricao: '4 JottaV Classic + batata frita + Guaraná 1L.', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_combos/combo_familia_115.jpg?raw=true', disponivel: true, adicionais: [] },
        { id: 22, nome: 'Família R$ 111,99', preco: 111.99, descricao: '4 Smash Duplo + batata frita + Guaraná 1L.', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_combos/combo_familia_111.jpg?raw=true', disponivel: true, adicionais: [] },
        { id: 23, nome: 'Família R$ 154,90', preco: 154.90, descricao: '4 Duplo Brutão + batata frita + Guaraná 1L.', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_combos/combo_familia_154.jpg?raw=true', disponivel: true, adicionais: [] }
    ],
    adicionais: [
        { id: 24, nome: 'Creme de Requeijão', preco: 4.00, descricao: '', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_adicionais/creme_requeijao.jpg?raw=true', disponivel: true },
        { id: 25, nome: 'Queijo Muçarela', preco: 4.00, descricao: '', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_adicionais/queijo.jpg?raw=true', disponivel: true },
        { id: 26, nome: 'Bacon', preco: 4.00, descricao: '', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_adicionais/bacon.jpg?raw=true', disponivel: true },
        { id: 27, nome: 'Farofa de Bacon', preco: 3.00, descricao: '', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_adicionais/farofa_bacon.jpg?raw=true', disponivel: true },
        { id: 28, nome: 'Farofa de Alho', preco: 3.00, descricao: '', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_adicionais/farofa_alho.jpg?raw=true', disponivel: true },
        { id: 29, nome: 'Molho Barbecue', preco: 2.00, descricao: '', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_adicionais/molho_barbecue.jpg?raw=true', disponivel: true },
        { id: 30, nome: 'Molho da Casa', preco: 2.00, descricao: '', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_adicionais/molho_casa.jpg?raw=true', disponivel: true },
        { id: 31, nome: 'Calabresa', preco: 5.00, descricao: '', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_adicionais/calabresa.jpg?raw=true', disponivel: true },
        { id: 32, nome: 'Salame', preco: 7.00, descricao: '', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_adicionais/salame.jpg?raw=true', disponivel: true },
        { id: 33, nome: 'Requeijão', preco: 4.00, descricao: '', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_adicionais/requeijao.jpg?raw=true', disponivel: true }
    ],
    bebidas: [
        { id: 34, nome: 'Coca-Cola Lata', preco: 7.00, descricao: '', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_bebidas/coca_lata.jpg?raw=true', disponivel: true, adicionais: [] },
        { id: 35, nome: 'Guaraná Lata', preco: 6.00, descricao: '', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_bebidas/guarana_lata.jpg?raw=true', disponivel: true, adicionais: [] },
        { id: 36, nome: 'Guaraná 1L', preco: 9.00, descricao: '', imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_bebidas/guarana_1l.jpg?raw=true', disponivel: true, adicionais: [] }
    ]
};

const estadosCidades = {
    "AC": ["Rio Branco", "Cruzeiro do Sul"], "AL": ["Maceió", "Arapiraca"], "AM": ["Manaus", "Parintins"],
    "AP": ["Macapá", "Santana"], "BA": ["Salvador", "Feira de Santana"], "CE": ["Fortaleza", "Caucaia"],
    "DF": ["Brasília"], "ES": ["Vitória", "Serra"], "GO": ["Goiânia", "Aparecida de Goiânia"],
    "MA": ["São Luís", "Imperatriz"], "MG": ["Belo Horizonte", "Uberlândia"], "MS": ["Campo Grande", "Dourados"],
    "MT": ["Cuiabá", "Várzea Grande"], "PA": ["Belém", "Ananindeua"], "PB": ["João Pessoa", "Campina Grande"],
    "PE": ["Recife", "Jaboatão dos Guararapes"], "PI": ["Teresina", "Parnaíba"], "PR": ["Curitiba", "Londrina"],
    "RJ": ["Rio de Janeiro", "São Gonçalo"], "RN": ["Natal", "Mossoró"], "RO": ["Porto Velho", "Ji-Paraná"],
    "RR": ["Boa Vista"], "RS": ["Porto Alegre", "Caxias do Sul"], "SC": ["Florianópolis", "Joinville"],
    "SE": ["Aracaju", "Nossa Senhora do Socorro"], "SP": ["São Paulo", "Guarulhos"], "TO": ["Palmas", "Araguaína"]
};


// Reconstruir o mapa de todos os itens
Object.values(cardapioData).forEach(categoria => {
    categoria.forEach(item => {
        todosOsItens[item.id] = item;
    });
});

// Acessa elementos do DOM
const boasVindasOverlay = document.getElementById('boas-vindas-overlay');
const mainContent = document.getElementById('main-content');
const abrirCardapioBtn = document.getElementById('abrir-cardapio');
const navLinksContainer = document.getElementById('nav-links');
const menuContainer = document.querySelector('.menu-container');
const cartModal = document.getElementById('carrinho-modal');
const closeModalBtns = document.querySelectorAll('.fechar-modal');
const openModalBtn = document.getElementById('abrir-carrinho');
const cartItemsContainer = document.getElementById('carrinho-itens');
const cartTotalSpan = document.getElementById('total-pedido');
const finalizeOrderBtn = document.getElementById('finalizar-pedido-whatsapp');
const paymentMethodSelect = document.getElementById('forma-pagamento');
const observacoesGeraisTextarea = document.getElementById('observacoes-gerais');
const observacoesEnderecoTextarea = document.getElementById('observacoes-endereco');
const cartCounterSpan = document.getElementById('contador-carrinho');
const hamburgerMenuBtn = document.getElementById('hamburger-menu');

// Novos elementos do DOM para endereço e localização
const btnLocalizacao = document.getElementById('btn-localizacao');
const localizacaoStatus = document.getElementById('localizacao-status');
const campoEstado = document.getElementById('campo-estado');
const campoCidade = document.getElementById('campo-cidade');
const campoRua = document.getElementById('campo-rua');
const campoNumero = document.getElementById('campo-numero');
const estadosList = document.getElementById('estados-list');
const cidadesList = document.getElementById('cidades-list');

// Modal para Adicionais
const adicionaisModal = document.getElementById('adicionais-modal');

// Campo de observação de item no modal de adicionais
const observacaoItemTextarea = document.getElementById('observacao-item');

let itemParaAdicionar = null;
let carrinho = [];
let localizacaoAtual = null;

// Funções Principais
function construirCardapio() {
    menuContainer.innerHTML = '';
    navLinksContainer.innerHTML = '';
    
    const categorias = {
        hamburgueres: 'Hambúrgueres',
        acompanhamentos: 'Acompanhamentos',
        combos: 'Combos',
        bebidas: 'Bebidas'
    };

    for (const key in categorias) {
        if (cardapioData[key] && cardapioData[key].length > 0) {
            const navLink = document.createElement('a');
            navLink.href = `#${key}`;
            navLink.textContent = categorias[key];
            navLinksContainer.appendChild(navLink);

            const section = document.createElement('section');
            section.id = key;
            section.classList.add('menu-section');
            section.innerHTML = `<h2>${categorias[key]}</h2><div class="item-grid"></div>`;
            const itemGrid = section.querySelector('.item-grid');

            cardapioData[key].forEach(item => {
                const itemCard = document.createElement('div');
                itemCard.classList.add('item-card');
                if (!item.disponivel) {
                    itemCard.classList.add('indisponivel');
                }
                itemCard.innerHTML = `
                    <img src="${item.imagem}" alt="${item.nome}">
                    <h3>${item.nome}</h3>
                    <p>${item.descricao}</p>
                    <span class="price">R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
                    <button class="btn-add" data-id="${item.id}">Adicionar ao Pedido</button>
                `;
                itemGrid.appendChild(itemCard);
            });
            menuContainer.appendChild(section);
        }
    }
}

function calcularPrecoItem(item) {
    let precoBase = item.preco;
    if (item.adicionaisSelecionados && item.adicionaisSelecionados.length > 0) {
        precoBase += item.adicionaisSelecionados.reduce((acc, add) => acc + (todosOsItens[add.id].preco * add.quantidade), 0);
    }
    return precoBase;
}

function atualizarCarrinho() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let totalItens = 0;

    if (carrinho.length === 0) {
        cartItemsContainer.innerHTML = '<p id="carrinho-vazio">Seu carrinho está vazio.</p>';
    } else {
        carrinho.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('carrinho-item');
            
            let adicionaisHtml = '';
            if (item.adicionaisSelecionados && item.adicionaisSelecionados.length > 0) {
                adicionaisHtml = `<small> + ${item.adicionaisSelecionados.map(add => todosOsItens[add.id].nome).join(', ')}</small>`;
            }
            
            let observacaoHtml = '';
            if (item.observacao && item.observacao.trim() !== '') {
                observacaoHtml = `<p class="item-observacao">Obs: ${item.observacao}</p>`;
            }

            const subtotal = calcularPrecoItem(item);
            
            itemElement.innerHTML = `
                <div>
                    <span>${item.nome} ${adicionaisHtml}</span>
                    ${observacaoHtml}
                </div>
                <div class="carrinho-actions">
                    <button class="decrementar" data-index="${index}">-</button>
                    <span>${item.quantidade}</span>
                    <button class="incrementar" data-index="${index}">+</button>
                    <span class="total-item">R$ ${(subtotal * item.quantidade).toFixed(2).replace('.', ',')}</span>
                    <i class="fas fa-trash-alt remover-item" data-index="${index}"></i>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += subtotal * item.quantidade;
            totalItens += item.quantidade;
        });
    }

    cartTotalSpan.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    cartCounterSpan.textContent = totalItens;
}

function abrirModalAdicionais(item) {
    const adicionaisGrid = document.getElementById('adicionais-opcoes');
    adicionaisGrid.innerHTML = '';
    itemParaAdicionar = { ...item, quantidade: 1, adicionaisSelecionados: [], observacao: '' };

    const adicionaisDisponiveis = cardapioData.adicionais.filter(add => item.adicionais.includes(add.id));
    
    adicionaisDisponiveis.forEach(adicional => {
        const adicionalCard = document.createElement('div');
        adicionalCard.className = 'adicional-card';
        adicionalCard.innerHTML = `
            <img src="${adicional.imagem}" alt="${adicional.nome}">
            <div class="adicional-info">
                <span>${adicional.nome}</span>
                <span class="price">R$ ${adicional.preco.toFixed(2).replace('.', ',')}</span>
            </div>
            <div class="adicional-actions">
                <button class="decrementar-add" data-id="${adicional.id}">-</button>
                <span class="quantidade-add">0</span>
                <button class="incrementar-add" data-id="${adicional.id}">+</button>
            </div>
        `;
        adicionaisGrid.appendChild(adicionalCard);
    });

    observacaoItemTextarea.value = '';
    adicionaisModal.style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', () => {
    construirCardapio();
    atualizarCarrinho();

    document.querySelector('.numero-whatsapp').href = `https://wa.me/${WHATSAPP_NUMERO}`;
    document.querySelector('.btn-social').href = `https://www.instagram.com/${INSTAGRAM_USUARIO}/`;
    
    document.getElementById('abrir-cardapio').addEventListener('click', () => {
        boasVindasOverlay.style.display = 'none';
        mainContent.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    openModalBtn.addEventListener('click', () => abrirModal(cartModal));

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            fecharModal(cartModal);
            fecharModal(adicionaisModal);
        });
    });

    menuContainer.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('btn-add')) {
            const itemId = parseInt(target.dataset.id);
            const item = todosOsItens[itemId];
            
            if (item.adicionais && item.adicionais.length > 0) {
                abrirModalAdicionais(item);
            } else {
                adicionarItemAoCarrinho({ ...item, quantidade: 1, adicionaisSelecionados: [], observacao: '' });
            }
        }
    });

    document.getElementById('adicionais-opcoes').addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('incrementar-add')) {
            const id = parseInt(target.dataset.id);
            const adicional = itemParaAdicionar.adicionaisSelecionados.find(add => add.id === id);
            if (adicional) {
                adicional.quantidade++;
            } else {
                itemParaAdicionar.adicionaisSelecionados.push({ id: id, quantidade: 1 });
            }
        } else if (target.classList.contains('decrementar-add')) {
            const id = parseInt(target.dataset.id);
            const adicionalIndex = itemParaAdicionar.adicionaisSelecionados.findIndex(add => add.id === id);
            if (adicionalIndex > -1) {
                if (itemParaAdicionar.adicionaisSelecionados[adicionalIndex].quantidade > 1) {
                    itemParaAdicionar.adicionaisSelecionados[adicionalIndex].quantidade--;
                } else {
                    itemParaAdicionar.adicionaisSelecionados.splice(adicionalIndex, 1);
                }
            }
        }
        atualizarModalAdicionais();
    });

    document.getElementById('confirmar-adicionais').addEventListener('click', () => {
        itemParaAdicionar.observacao = observacaoItemTextarea.value.trim();
        adicionarItemAoCarrinho(itemParaAdicionar);
        fecharModal(adicionaisModal);
    });

    function adicionarItemAoCarrinho(item) {
        carrinho.push(item);
        atualizarCarrinho();
    }

    cartItemsContainer.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('incrementar')) {
            const index = parseInt(target.dataset.index);
            carrinho[index].quantidade++;
        } else if (target.classList.contains('decrementar')) {
            const index = parseInt(target.dataset.index);
            if (carrinho[index].quantidade > 1) {
                carrinho[index].quantidade--;
            } else {
                carrinho.splice(index, 1);
            }
        } else if (target.classList.contains('remover-item')) {
            const index = parseInt(target.dataset.index);
            carrinho.splice(index, 1);
        }
        atualizarCarrinho();
    });

    Object.keys(estadosCidades).forEach(estado => {
        const option = document.createElement('option');
        option.value = estado;
        estadosList.appendChild(option);
    });

    campoEstado.addEventListener('input', () => {
        const estadoSelecionado = campoEstado.value.toUpperCase();
        cidadesList.innerHTML = '';
        if (estadosCidades[estadoSelecionado]) {
            estadosCidades[estadoSelecionado].forEach(cidade => {
                const option = document.createElement('option');
                option.value = cidade;
                cidadesList.appendChild(option);
            });
            campoCidade.disabled = false;
        } else {
            campoCidade.value = '';
            campoCidade.disabled = true;
        }
    });

    btnLocalizacao.addEventListener('click', () => {
        if (navigator.geolocation) {
            localizacaoStatus.textContent = 'Obtendo sua localização...';
            navigator.geolocation.getCurrentPosition(
                (posicao) => {
                    localizacaoAtual = `https://www.google.com/maps/search/?api=1&query=${posicao.coords.latitude},${posicao.coords.longitude}`;
                    localizacaoStatus.textContent = 'Localização obtida com sucesso!';
                },
                (erro) => {
                    localizacaoStatus.textContent = 'Não foi possível obter sua localização. Por favor, digite o endereço manualmente.';
                    console.error('Erro ao obter localização:', erro);
                }
            );
        } else {
            localizacaoStatus.textContent = 'Seu navegador não suporta geolocalização.';
        }
    });

    finalizeOrderBtn.addEventListener('click', () => {
        if (carrinho.length === 0) {
            alert('Seu carrinho está vazio. Adicione itens antes de finalizar o pedido.');
            return;
        }

        let mensagem = `Olá, tudo bem? Gostaria de dar continuidade ao meu pedido:\n\n`;
        let total = 0;

        carrinho.forEach(item => {
            const subtotal = calcularPrecoItem(item);
            total += subtotal * item.quantidade;

            mensagem += `* - ${item.quantidade}x ${item.nome} (R$ ${(subtotal * item.quantidade).toFixed(2).replace('.', ',')})\n`;

            if (item.adicionaisSelecionados && item.adicionaisSelecionados.length > 0) {
                mensagem += item.adicionaisSelecionados.map(add => {
                    const adicionalItem = todosOsItens[add.id];
                    return `   + ${add.quantidade}x ${adicionalItem.nome} (R$ ${(adicionalItem.preco * add.quantidade).toFixed(2).replace('.', ',')})`;
                }).join('\n') + '\n';
            }

            if (item.observacao && item.observacao.trim() !== '') {
                mensagem += `   *Obs:* ${item.observacao}\n`;
            }
        });
        
        const formaPagamento = paymentMethodSelect.options[paymentMethodSelect.selectedIndex].text;
        const obsGerais = observacoesGeraisTextarea.value.trim();
        const obsEndereco = observacoesEnderecoTextarea.value.trim();
        const estado = campoEstado.value.trim();
        const cidade = campoCidade.value.trim();
        const rua = campoRua.value.trim();
        const numero = campoNumero.value.trim();

        mensagem += `\n*Endereço para Entrega:*`;
        if (localizacaoAtual) {
            mensagem += `\n- Localização GPS: ${localizacaoAtual}`;
        } else if (estado || cidade || rua || numero) {
            if (rua) mensagem += `\n- Rua: ${rua}`;
            if (numero) mensagem += `\n- Número: ${numero}`;
            if (cidade) mensagem += `\n- Cidade: ${cidade}`;
            if (estado) mensagem += `\n- Estado: ${estado}`;
        } else {
            mensagem += `\n- Endereço não informado`;
        }

        if (obsEndereco) {
            mensagem += `\n- Observações do Endereço: ${obsEndereco}`;
        }

        mensagem += `\n\n*Resumo do Pagamento:*`;
        mensagem += `\n- Total: R$ ${total.toFixed(2).replace('.', ',')}`;
        mensagem += `\n- Forma de Pagamento: ${formaPagamento}`;
        
        if (obsGerais) {
            mensagem += `\n\n*Observações Gerais do Pedido:* ${obsGerais}`;
        }
        
        const mensagemCodificada = encodeURIComponent(mensagem);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensagemCodificada}`;
        
        window.open(whatsappUrl, '_blank');
    });

    function atualizarModalAdicionais() {
        document.querySelectorAll('.adicional-card').forEach(card => {
            const id = parseInt(card.querySelector('.incrementar-add').dataset.id);
            const quantidadeSpan = card.querySelector('.quantidade-add');
            const adicionalSelecionado = itemParaAdicionar.adicionaisSelecionados.find(add => add.id === id);
            quantidadeSpan.textContent = adicionalSelecionado ? adicionalSelecionado.quantidade : 0;
        });
    }

    function abrirModal(modalElement) {
        modalElement.style.display = 'flex';
    }

    function fecharModal(modalElement) {
        modalElement.style.display = 'none';
    }

    hamburgerMenuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
    });

    navLinksContainer.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            navLinksContainer.classList.remove('active');
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navLinksContainer.classList.remove('active');
        }
    });
});
