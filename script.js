document.addEventListener('DOMContentLoaded', () => {
    // Carrega o menu e configura os event listeners
    loadMenu();

    // Event listener para o botão de carrinho no cabeçalho
    document.querySelector('.carrinho-btn').addEventListener('click', showCartModal);

    // Event listener para fechar o modal
    document.querySelector('.fechar-modal').addEventListener('click', hideCartModal);
    
    // NOVO: Event listener para finalizar o pedido
    document.getElementById('btn-finalizar-pedido').addEventListener('click', finalizeOrder);
});

let cartItems = [];

// Função para carregar o menu a partir do JSON
async function loadMenu() {
    try {
        const response = await fetch('./menu.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const menuData = await response.json();
        renderMenu(menuData);
    } catch (error) {
        console.error('Erro ao carregar o menu:', error);
    }
}

// Função para renderizar o menu na página
function renderMenu(menu) {
    const mainContent = document.querySelector('main');
    mainContent.innerHTML = '';

    menu.categories.forEach(category => {
        const section = document.createElement('section');
        section.className = 'menu-section';
        section.id = category.name.toLowerCase().replace(' ', '-');

        const title = document.createElement('h2');
        title.textContent = category.name;
        section.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'item-grid';

        category.items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'item-card';

            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;

            const content = document.createElement('div');
            content.className = 'item-card-content';

            const itemName = document.createElement('h3');
            itemName.textContent = item.name;

            const itemDescription = document.createElement('p');
            itemDescription.textContent = item.description;

            const itemPrice = document.createElement('span');
            itemPrice.className = 'price';
            itemPrice.textContent = `R$ ${item.price.toFixed(2).replace('.', ',')}`;

            const addButton = document.createElement('button');
            addButton.className = 'btn-add';
            addButton.textContent = 'Adicionar';

            // Amarração do botão "Adicionar"
            addButton.addEventListener('click', (event) => {
                event.stopPropagation();
                addItemToCart(item);
                showNotification(`${item.name} adicionado!`);
            });

            content.appendChild(itemName);
            content.appendChild(itemDescription);
            content.appendChild(itemPrice);
            content.appendChild(addButton);
            
            card.appendChild(img);
            card.appendChild(content);

            grid.appendChild(card);
        });

        section.appendChild(grid);
        mainContent.appendChild(section);
    });
}

// --- Funções do Carrinho de Compras ---
function addItemToCart(item) {
    const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({...item, quantity: 1});
    }
    updateCartCount();
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    cartCountElement.style.display = totalItems > 0 ? 'block' : 'none';
}

function showCartModal() {
    const modal = document.getElementById('carrinho-modal');
    const cartList = document.querySelector('.carrinho-itens');
    const totalElement = document.getElementById('carrinho-total');

    cartList.innerHTML = '';
    let total = 0;

    if (cartItems.length === 0) {
        cartList.innerHTML = '<p>O carrinho está vazio.</p>';
    } else {
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.className = 'carrinho-item';
            li.innerHTML = `
                <span>${item.name} (${item.quantity}x)</span>
                <span>R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
            `;
            cartList.appendChild(li);
            total += item.price * item.quantity;
        });
    }

    totalElement.textContent = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
    modal.style.display = 'block';
}

function hideCartModal() {
    const modal = document.getElementById('carrinho-modal');
    modal.style.display = 'none';
}

function showNotification(message) {
    const notification = document.getElementById('notificacao');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Função para finalizar o pedido e enviar via WhatsApp
function finalizeOrder() {
    const clientName = document.getElementById('nome-cliente').value;
    const clientAddress = document.getElementById('endereco-cliente').value;
    const clientPhone = document.getElementById('telefone-cliente').value;
    
    if (!clientName || !clientAddress || !clientPhone) {
        alert("Por favor, preencha todos os campos para finalizar o pedido.");
        return;
    }
    
    let orderMessage = `*Olá! Meu pedido é:*%0A%0A`;
    let total = 0;
    
    cartItems.forEach(item => {
        orderMessage += `${item.name} - Quantidade: ${item.quantity}%0A`;
        total += item.price * item.quantity;
    });

    orderMessage += `%0A*Total: R$ ${total.toFixed(2).replace('.', ',')}*%0A%0A`;
    orderMessage += `*Dados para Entrega:*%0A`;
    orderMessage += `Nome: ${clientName}%0A`;
    orderMessage += `Endereço: ${clientAddress}%0A`;
    orderMessage += `Telefone: ${clientPhone}%0A`;

    // Substitua 'SEU_NUMERO' pelo número de telefone da empresa
    const whatsappNumber = '5586994793836';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${orderMessage}`;

    cartItems = [];
    updateCartCount();
    hideCartModal();
    
    window.open(whatsappUrl, '_blank');
}
