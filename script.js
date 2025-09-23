// Função para renderizar os itens do cardápio
function renderizarCardapio() {
    // Verifica se os dados do cardapio existem
    if (typeof cardapioData === 'undefined' || !cardapioData) {
        console.error('Erro: A variável cardapioData não foi encontrada. Verifique se o arquivo cardapio.js está linkado corretamente.');
        return;
    }

    // Itera sobre cada categoria no objeto cardapioData
    for (const categoria in cardapioData) {
        if (cardapioData.hasOwnProperty(categoria)) {
            // Acessa os elementos HTML com os IDs corretos do cardapio.html
            const gridId = categoria.toLowerCase().replace(/á/g, 'a').replace(/é/g, 'e').replace(/ /g, '-');
            const gridElement = document.getElementById(gridId + '-grid'); // Adicionado '-grid' para corresponder ao HTML

            if (gridElement) {
                // Itera sobre cada item na categoria e cria o elemento HTML
                cardapioData[categoria].forEach(item => {
                    const itemCard = document.createElement('div');
                    itemCard.className = 'item-card';

                    const itemImg = document.createElement('img');
                    itemImg.src = item.imagem;
                    itemImg.alt = `Imagem de ${item.nome}`;
                    itemImg.className = 'item-img';

                    const itemNome = document.createElement('h3');
                    itemNome.className = 'item-nome';
                    itemNome.textContent = item.nome;

                    const itemDescricao = document.createElement('p');
                    itemDescricao.className = 'item-descricao';
                    itemDescricao.textContent = item.descricao;

                    const itemPreco = document.createElement('p');
                    itemPreco.className = 'item-preco';
                    itemPreco.textContent = `R$ ${item.preco.toFixed(2).replace('.', ',')}`;

                    const adicionarBtn = document.createElement('button');
                    adicionarBtn.className = 'adicionar-btn';
                    adicionarBtn.textContent = 'Adicionar';
                    adicionarBtn.dataset.itemId = item.id;

                    itemCard.appendChild(itemImg);
                    itemCard.appendChild(itemNome);
                    itemCard.appendChild(itemDescricao);
                    itemCard.appendChild(itemPreco);
                    itemCard.appendChild(adicionarBtn);

                    gridElement.appendChild(itemCard);
                });
            } else {
                console.warn(`Elemento com ID "${gridId}-grid" não encontrado.`);
            }
        }
    }
}

// Renderiza o cardápio quando a página carregar
document.addEventListener('DOMContentLoaded', renderizarCardapio);

// Adiciona os eventos de clique aos botões de adicionar
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('adicionar-btn')) {
        const itemId = event.target.dataset.itemId;
        console.log(`Item com ID ${itemId} adicionado.`);
        // Aqui você pode adicionar a lógica para adicionar o item ao carrinho
    }
});
