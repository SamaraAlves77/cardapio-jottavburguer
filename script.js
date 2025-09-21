// ATENÇÃO: SUBSTITUA ESTES DADOS!
// LEMBRE-SE de substituir o número e o Instagram para que os links funcionem!
const WHATSAPP_NUMERO = '5586994253258'; 
const INSTAGRAM_USUARIO = 'jottavburguer';

// Ponto central para gerenciamento de itens. Altere este objeto para modificar o cardápio.
const cardapioData = {
    hamburgueres: [
        { id: 1, nome: 'Smash Original', preco: 18.99, descricao: 'Pão, carne 80g prensada na chapa, queijo muçarela, cebola caramelizada, alface, tomate e molho da casa.', imagem: '[URL-DA-IMAGEM-SMASH-ORIGINAL.jpg]', disponivel: true },
        { id: 2, nome: 'Smash Duplo', preco: 24.99, descricao: 'Pão, 2 carnes 80g prensadas na chapa, 2 queijos muçarela, cebola caramelizada, alface, tomate e molho da casa.', imagem: '[URL-DA-IMAGEM-SMASH-DUPLO.jpg]', disponivel: true },
        { id: 3, nome: 'JottaV Básico', preco: 14.99, descricao: 'Pão, carne 80g prensada na chapa com cebola, queijo muçarela e molho da casa.', imagem: '[URL-DA-IMAGEM-JOTTAV-BASICO.jpg]', disponivel: true },
        { id: 4, nome: 'JottaV Classic', preco: 25.99, descricao: 'Pão, carne 150g, molho barbecue, tomate, alface, bacon e queijo muçarela.', imagem: '[URL-DA-IMAGEM-JOTTAV-CLASSIC.jpg]', disponivel: true },
        { id: 5, nome: 'Búrguer do Xerife', preco: 22.99, descricao: 'Pão, carne de 120g, (queijo muçarela ou requeijão longa) e farofa (bacon ou alho).', imagem: '[URL-DA-IMAGEM-BURGUE-DO-XERIFE.jpg]', disponivel: true },
        { id: 6, nome: 'Duplo Brutão', preco: 37.99, descricao: 'Pão, 2 carnes de 120g, (queijo muçarela ou requeijão longa), molho da casa, 2 fatias de bacon.', imagem: '[URL-DA-IMAGEM-DUPLO-BRUTAO.jpg]', disponivel: true },
        { id: 7, nome: 'Calabresa Prime', preco: 26.99, descricao: 'Pão, molho, alface, tomate, calabresa, queijo, cebola caramelizada, (carne ou frango).', imagem: '[URL-DA-IMAGEM-CALABRESA-PRIME.jpg]', disponivel: true },
        { id: 8, nome: 'Burguer Salame', preco: 28.99, descricao: 'Pão, requeijão, carne e salame.', imagem: '[URL-DA-DA-IMAGEM-BURGUE-SALAME.jpg]', disponivel: true },
        { id: 9, nome: 'Calabresa Básico', preco: 15.00, descricao: 'Pão, molho da casa, calabresa e queijo muçarela.', imagem: '[URL-DA-IMAGEM-CALABRESA-BASICO.jpg]', disponivel: true }
    ],
    acompanhamentos: [
        { id: 10, nome: 'Batata Palito', preco: 11.99, descricao: 'Batata com batata.', imagem: '[URL-DA-IMAGEM-BATATA-PALITO.jpg]', disponivel: true },
        { id: 11, nome: 'Batata com Bacon', preco: 17.99, descricao: 'Batata com bacon.', imagem: '[URL-DA-IMAGEM-BATATA-BACON.jpg]', disponivel: true }
    ],
    combos: [
        { id: 12, nome: 'Combo Econômico', preco: 31.99, descricao: '1 Smash Original + batata frita + refrigerante lata.', imagem: '[URL-DA-IMAGEM-COMBO-ECONOMICO.jpg]', disponivel: true },
        { id: 13, nome: 'Combo do Chef', preco: 41.99, descricao: '1 JottaV Classic + batata frita + refrigerante lata.', imagem: '[URL-DA-IMAGEM-COMBO-DO-CHEF.jpg]', disponivel: true },
        { id: 14, nome: 'Combo Smash Duplo', preco: 37.99, descricao: '1 Smash Duplo + batata frita + refrigerante lata.', imagem: '[URL-DA-IMAGEM-COMBO-SMASH-DUPLO.jpg]', disponivel: true },
        { id: 15, nome: 'Combo Premium', preco: 53.99, descricao: '1 Duplo Brutão + batata frita + refrigerante lata.', imagem: '[URL-DA-IMAGEM-COMBO-PREMIUM.jpg]', disponivel: true },
        { id: 16, nome: 'Casal R$ 49,99', preco: 49.99, descricao: '2 Smash Original + batata frita + Guaraná 1L.', imagem: '[URL-DA-IMAGEM-COMBO-CASAL-49.jpg]', disponivel: true },
        { id: 17, nome: 'Casal R$ 63,99', preco: 63.99, descricao: '2 JottaV Classic + batata frita + Guaraná 1L.', imagem: '[URL-DA-IMAGEM-COMBO-CASAL-63.jpg]', disponivel: true },
        { id: 18, nome: 'Casal R$ 61,99', preco: 61.99, descricao: '2 Smash Duplo + batata frita + Guaraná 1L.', imagem: '[URL-DA-IMAGEM-COMBO-CASAL-61.jpg]', disponivel: true },
        { id: 19, nome: 'Casal R$ 87,99', preco: 87.99, descricao: '2 Duplo Brutão + batata frita + Guaraná 1L.', imagem: '[URL-DA-IMAGEM-COMBO-CASAL-87.jpg]', disponivel: true },
        { id: 20, nome: 'Família R$ 87,99', preco: 87.99, descricao: '4 Smash Original + batata frita + Guaraná 1L.', imagem: '[URL-DA-IMAGEM-COMBO-FAMILIA-87.jpg]', disponivel: true },
        { id: 21, nome: 'Família R$ 115,99', preco: 115.99, descricao: '4 JottaV Classic + batata frita + Guaraná 1L.', imagem: '[URL-DA-IMAGEM-COMBO-FAMILIA-115.jpg]', disponivel: true },
        { id: 22, nome: 'Família R$ 111,99', preco: 111.99, descricao: '4 Smash Duplo + batata frita + Guaraná 1L.', imagem: '[URL-DA-IMAGEM-COMBO-FAMILIA-111.jpg]', disponivel: true },
        { id: 23, nome: 'Família R$ 154,90', preco: 154.90, descricao: '4 Duplo Brutão + batata frita + Guaraná 1L.', imagem: '[URL-DA-IMAGEM-COMBO-FAMILIA-154.jpg]', disponivel: true }
    ],
    adicionais: [
        { id: 24, nome: 'Creme de Requeijão', preco: 4.00, descricao: '', imagem: '[URL-DA-IMAGEM-CREME-REQUEIJAO.jpg]', disponivel: true },
        { id: 25, nome: 'Queijo Muçarela', preco: 4.00, descricao: '', imagem: '[URL-DA-IMAGEM-QUEIJO.jpg]', disponivel: true },
        { id: 26, nome: 'Bacon', preco: 4.00, descricao: '', imagem: '[URL-DA-IMAGEM-BACON.jpg]', disponivel: true },
        { id: 27, nome: 'Farofa de Bacon', preco: 3.00, descricao: '', imagem: '[URL-DA-IMAGEM-FAROFA-BACON.jpg]', disponivel: true },
        { id: 28, nome: 'Farofa de Alho', preco: 3.00, descricao: '', imagem: '[URL-DA-IMAGEM-FAROFA-ALHO.jpg]', disponivel: true },
        { id: 29, nome: 'Molho Barbecue', preco: 2.00, descricao: '', imagem: '[URL-DA-IMAGEM-MOLHO-BARBECUE.jpg]', disponivel: true },
        { id: 30, nome: 'Molho da Casa', preco: 2.00, descricao: '', imagem: '[URL-DA-IMAGEM-MOLHO-CASA.jpg]', disponivel: true },
        { id: 31, nome: 'Calabresa', preco: 5.00, descricao: '', imagem: '[URL-DA-IMAGEM-ADICIONAL-CALABRESA.jpg]', disponivel: true },
        { id: 32, nome: 'Salame', preco: 7.00, descricao: '', imagem: '[URL-DA-IMAGEM-ADICIONAL-SALAME.jpg]', disponivel: true },
        { id: 33, nome: 'Requeijão', preco: 4.00, descricao: '', imagem: '[URL-DA-IMAGEM-ADICIONAL-REQUEIJAO.jpg]', disponivel: true }
    ],
    bebidas: [
        { id: 34, nome: 'Coca-Cola Lata', preco: 7.00, descricao: '', imagem: '[URL-DA-IMAGEM-COCA-LATA.jpg]', disponivel: true },
        { id: 35, nome: 'Guaraná Lata', preco: 6.00, descricao: '', imagem: '[URL-DA-IMAGEM-GUARANA-LATA.jpg]', disponivel: true },
        { id: 36, nome: 'Guaraná 1L', preco: 9.00, descricao: '', imagem: '[URL-DA-IMAGEM-GUARANA-1L.jpg]', disponivel: true }
    ]
};

// Mapeamento de todos os itens por ID para fácil acesso
const todosOsItens = Object.values(cardapioData).flat().reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
}, {});

// Acessa elementos do DOM
const boasVindasOverlay = document.getElementById('boas-vindas-overlay');
const mainContent = document.getElementById('main-content');
const abrirCardapioBtn = document.getElementById('abrir-cardapio');
const navLinksContainer = document.querySelector('.nav-links');
const menuContainer = document.querySelector('.menu-container');
const cartModal = document.getElementById('carrinho-modal');
const closeModalBtn = document.querySelector('.fechar-modal');
const openModalBtn = document.getElementById('abrir-carrinho');
const cartItemsContainer = document.getElementById('carrinho-itens');
const cartTotalSpan = document.getElementById('total-pedido');
const finalizeOrderBtn = document.getElementById('finalizar-pedido-whatsapp');
const paymentMethodSelect = document.getElementById('forma-pagamento');
const orderNotesTextarea = document.getElementById('observacoes-pedido');
const cartCounterSpan = document.getElementById('contador-carrinho');

// Array para armazenar os itens do pedido com quantidades
let carrinho = [];

// Funções Principais
function construirCardapio() {
    menuContainer.innerHTML = '';
    navLinksContainer.innerHTML = '';
    
    // Mapeamento de categorias e seus nomes para a navegação
    const categorias = {
        hamburgueres: 'Hambúrgueres',
        acompanhamentos: 'Acompanhamentos',
        combos: 'Combos',
        adicionais: 'Adicionais',
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
            itemElement.innerHTML = `
                <span>${item.nome}</span>
                <div class="carrinho-actions">
                    <button class="decrementar" data-index="${index}">-</button>
                    <span>${item.quantidade}</span>
                    <button class="incrementar" data-index="${index}">+</button>
                    <span class="total-item">R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
                    <i class="fas fa-trash-alt remover-item" data-index="${index}"></i>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
            total += item.preco * item.quantidade;
            totalItens += item.quantidade;
        });
    }

    cartTotalSpan.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    cartCounterSpan.textContent = totalItens;
}

// Adiciona listeners de eventos
document.addEventListener('DOMContentLoaded', () => {
    // Carrega o cardápio
    construirCardapio();
    atualizarCarrinho();

    // Lógica da janela de boas-vindas
    abrirCardapioBtn.addEventListener('click', () => {
        boasVindasOverlay.style.display = 'none';
        mainContent.style.display = 'block';
    });

    // Lógica do carrinho
    openModalBtn.addEventListener('click', () => abrirModal(cartModal));
    closeModalBtn.addEventListener('click', () => fecharModal(cartModal));

    // Adicionar item ao carrinho
    menuContainer.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('btn-add')) {
            const itemId = parseInt(target.dataset.id);
            const item = todosOsItens[itemId];
            
            const itemNoCarrinho = carrinho.find(cartItem => cartItem.id === item.id);
            if (itemNoCarrinho) {
                itemNoCarrinho.quantidade++;
            } else {
                carrinho.push({ ...item, quantidade: 1 });
            }
            atualizarCarrinho();
        }
    });

    // Manipular quantidades no carrinho (incrementar/decrementar)
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

    // Finalizar pedido para o WhatsApp
    finalizeOrderBtn.addEventListener('click', () => {
        if (carrinho.length === 0) {
            alert('Seu carrinho está vazio. Adicione itens antes de finalizar o pedido.');
            return;
        }

        let mensagem = `Olá, gostaria de fazer o seguinte pedido:\n\n`;
        let total = 0;
        carrinho.forEach(item => {
            mensagem += `${item.quantidade}x - ${item.nome} (R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')})\n`;
            total += item.preco * item.quantidade;
        });
        
        const formaPagamento = paymentMethodSelect.options[paymentMethodSelect.selectedIndex].text;
        const observacoes = orderNotesTextarea.value.trim();

        mensagem += `\n*Total:* R$ ${total.toFixed(2).replace('.', ',')}`;
        mensagem += `\n*Forma de Pagamento:* ${formaPagamento}`;
        if (observacoes) {
            mensagem += `\n*Observações:* ${observacoes}`;
        }
        
        const mensagemCodificada = encodeURIComponent(mensagem);
        const whatsappUrl = `https://wa.me/qr/DQBGK3HE6V4LN1?text=${mensagemCodificada}`;
        
        window.open(whatsappUrl, '_blank');
    });

    // Funções para gerenciar os modais
    function abrirModal(modal) { modal.style.display = 'flex'; }
    function fecharModal(modal) { modal.style.display = 'none'; }

    // Atualiza links de contato com os dados do script
    document.querySelector('.btn-whatsapp').href = `https://wa.me/qr/DQBGK3HE6V4LN1`;
    document.querySelector('.btn-instagram').href = `https://www.instagram.com/jottavburguer/`;
});