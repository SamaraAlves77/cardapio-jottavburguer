import { menuData } from './cardapio.js';

// Constantes e variáveis globais
document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('main');
    const cartCountElement = document.getElementById('contador-carrinho');
    const carrinhoBtn = document.getElementById('carrinho-btn');
    const closeModalBtn = document.getElementById('fechar-modal');
    const carrinhoItensContainer = document.getElementById('carrinho-itens');
    const carrinhoTotalElement = document.getElementById('carrinho-total');
    const finalizarPedidoBtn = document.getElementById('btn-finalizar-pedido');
    const hamburgerMenuBtn = document.getElementById('hamburger-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const itemInfoModal = document.getElementById('item-info-modal');
    const fecharItemModalBtn = document.getElementById('fechar-item-modal');
    
    // Variáveis para a funcionalidade do modal
    const modalItemNome = document.getElementById('modal-item-nome');
    const modalItemDescricao = document.getElementById('modal-item-descricao');
    const modalItemImg = document.getElementById('modal-item-img');
    const modalItemPreco = document.getElementById('modal-item-preco');
    const itemQuantidade = document.getElementById('item-quantidade');
    const btnAumentar = document.getElementById('btn-aumentar');
    const btnDiminuir = document.getElementById('btn-diminuir');
    const adicionaisContainer = document.getElementById('adicionais-container');
    const btnAdicionarFinal = document.getElementById('btn-adicionar-final');

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let itemSelecionado = {};

    // Função que cria as seções do cardápio (hamburgueres, combos, etc.)
    function renderizarMenu() {
        if (!menuData) return;
        for (const categoria in menuData) {
            if (menuData.hasOwnProperty(categoria)) {
                // A lista de adicionais só é exibida no modal, não na página principal
                if (categoria === 'Adicionais') {
                    continue; 
                }
                criarSecaoCardapio(categoria, menuData[categoria]);
            }
        }
    }

    function criarSecaoCardapio(titulo, itens) {
        let containerId = '';
        switch (titulo) {
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

        itens.forEach(item => {
            const itemElemento = criarItemCardapio(item, titulo);
            container.appendChild(itemElemento);
        });
    }

    function criarItemCardapio(item, categoria) {
        const divItem = document.createElement('div');
        divItem.className = 'item-card';
        divItem.dataset.categoria = categoria; // Guarda a categoria no dataset

        const img = document.createElement('img');
        img.src = `imagem_cardapio/${item.imagem}`;
        img.alt = item.nome;
        divItem.appendChild(img);

        const contentDiv = document.createElement('div');
        contentDiv.className = 'item-card-content';

        const h3 = document.createElement('h3');
        h3.textContent = item.nome;
        contentDiv.appendChild(h3);

        if (item.descricao) {
            const pDescricao = document.createElement('p');
            pDescricao.textContent = item.descricao;
            contentDiv.appendChild(pDescricao);
        }

        const pPreco = document.createElement('p');
        pPreco.className = 'price';
        pPreco.textContent = `R$ ${item.preco.toFixed(2).replace('.', ',')}`;
        contentDiv.appendChild(pPreco);

        const btnAdicionar = document.createElement('button');
        btnAdicionar.className = 'btn-add';
        btnAdicionar.textContent = 'Adicionar';
        btnAdicionar.onclick = (e) => {
            e.stopPropagation();
            exibirModalItem(item);
        };
        contentDiv.appendChild(btnAdicionar);
        
        divItem.appendChild(contentDiv);
        return divItem;
    }

    // Função para exibir o modal de detalhes do item
    function exibirModalItem(item) {
        itemSelecionado = { ...item, quantidade: 1, adicionais: [], precoFinal: item.preco };

        modalItemImg.src = `imagem_cardapio/${item.imagem}`;
        modalItemNome.textContent = item.nome;
        modalItemDescricao.textContent = item.descricao;
        itemQuantidade.textContent = itemSelecionado.quantidade;
        
        // Limpa e renderiza a lista de adicionais no modal
        renderizarAdicionais();
        atualizarPrecoModal();

        itemInfoModal.style.display = 'flex';
    }
    
    // Função para renderizar os adicionais dentro do modal
    function renderizarAdicionais() {
        const adicionais = menuData['Adicionais'] || []; // Garante que a lista não é nula
        adicionaisContainer.innerHTML = ''; // Limpa o conteúdo anterior
        
        if (adicionais.length === 0) {
            adicionaisContainer.innerHTML = '<p style="text-align: center; color: #999;">Sem adicionais disponíveis.</p>';
            return;
        }

        const listContainer = document.createElement('div');
        listContainer.className = 'adicionais-list';

        adicionais.forEach(adicional => {
            const itemElement = document.createElement('div');
            itemElement.className = 'adicional-item';
            itemElement.dataset.id = adicional.id;

            const adicionalInfo = document.createElement('div');
            adicionalInfo.className = 'adicional-info';
            
            const nomeSpan = document.createElement('span');
            nomeSpan.className = 'adicional-nome';
            nomeSpan.textContent = adicional.nome;
            adicionalInfo.appendChild(nomeSpan);
            
            const precoSpan = document.createElement('span');
            precoSpan.className = 'adicional-preco';
            precoSpan.textContent = `+R$ ${adicional.preco.toFixed(2).replace('.', ',')}`;
            adicionalInfo.appendChild(precoSpan);
            
            itemElement.appendChild(adicionalInfo);
            
            const actionsDiv = document.createElement('div');
            actionsDiv.className = 'adicional-actions';
            
            // Botão para adicionar
            const btnAdicionar = document.createElement('button');
            btnAdicionar.className = 'adicional-btn-add';
            btnAdicionar.innerHTML = '<i class="fas fa-plus"></i>';
            btnAdicionar.onclick = (e) => {
                e.stopPropagation();
                adicionarAdicional(adicional);
            };
            actionsDiv.appendChild(btnAdicionar);
            
            itemElement.appendChild(actionsDiv);

            itemElement.addEventListener('click', () => {
                adicionarAdicional(adicional);
            });
            
            listContainer.appendChild(itemElement);
        });

        adicionaisContainer.appendChild(listContainer);
    }
    
    // Função para adicionar um adicional ao item selecionado
    function adicionarAdicional(adicional) {
        const adicionalExistente = itemSelecionado.adicionais.find(a => a.id === adicional.id);
        if (adicionalExistente) {
            adicionalExistente.quantidade++;
        } else {
            itemSelecionado.adicionais.push({ ...adicional, quantidade: 1 });
        }
        
        atualizarPrecoModal();
        
        // Adiciona classe de seleção visual
        const adicionalElement = document.querySelector(`.adicional-item[data-id='${adicional.id}']`);
        if (adicionalElement) {
            adicionalElement.classList.add('selected');
        }
    }
    
    // Função para atualizar o preço e a interface do modal
    function atualizarPrecoModal() {
        let precoTotal = itemSelecionado.preco * itemSelecionado.quantidade;
        itemSelecionado.adicionais.forEach(adicional => {
            precoTotal += adicional.preco * adicional.quantidade;
        });
        
        itemSelecionado.precoFinal = precoTotal;
        modalItemPreco.textContent = `R$ ${precoTotal.toFixed(2).replace('.', ',')}`;
        
        // Atualiza o texto do botão "Adicionar ao carrinho"
        btnAdicionarFinal.textContent = `Adicionar ${itemSelecionado.quantidade} Item(s) por R$ ${precoTotal.toFixed(2).replace('.', ',')}`;
    }

    // Função para adicionar o item do modal ao carrinho
    function adicionarItemAoCarrinho() {
        carrinho.push(itemSelecionado);
        salvarCarrinho();
        exibirNotificacao("Item adicionado ao carrinho!");
        fecharModal();
    }
    
    // Funções de controle do modal
    function fecharModal() {
        itemInfoModal.style.display = 'none';
    }

    btnAdicionarFinal.addEventListener('click', adicionarItemAoCarrinho);
    fecharItemModalBtn.addEventListener('click', fecharModal);

    // Eventos do contador de quantidade
    btnAumentar.addEventListener('click', () => {
        itemSelecionado.quantidade++;
        itemQuantidade.textContent = itemSelecionado.quantidade;
        atualizarPrecoModal();
    });

    btnDiminuir.addEventListener('click', () => {
        if (itemSelecionado.quantidade > 1) {
            itemSelecionado.quantidade--;
            itemQuantidade.textContent = itemSelecionado.quantidade;
            atualizarPrecoModal();
        }
    });

    // Função para exibir a notificação
    function exibirNotificacao(mensagem) {
        const notificacao = document.getElementById('notificacao');
        notificacao.textContent = mensagem;
        notificacao.classList.add('show');
        setTimeout(() => {
            notificacao.classList.remove('show');
        }, 3000);
    }

    // Função para salvar o carrinho no localStorage
    function salvarCarrinho() {
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarContadorCarrinho();
    }
    
    // Função para atualizar o contador do carrinho no cabeçalho
    function atualizarContadorCarrinho() {
        const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
        cartCountElement.textContent = totalItens;
    }

    // Função para renderizar os itens do carrinho no modal do carrinho
    function renderizarCarrinho() {
        carrinhoItensContainer.innerHTML = '';
        let total = 0;
        
        if (carrinho.length === 0) {
            carrinhoItensContainer.innerHTML = '<p style="text-align: center; color: #999;">Seu carrinho está vazio.</p>';
        } else {
            carrinho.forEach((item, index) => {
                const div = document.createElement('div');
                div.className = 'carrinho-item';
                div.innerHTML = `
                    <div class="carrinho-item-info">
                        <span class="carrinho-item-quantidade">${item.quantidade}x</span>
                        <span class="carrinho-item-nome">${item.nome}</span>
                        <span class="carrinho-item-preco">R$ ${(item.preco * item.quantidade).toFixed(2).replace('.', ',')}</span>
                    </div>
                    <button class="btn-remove" data-index="${index}">&times;</button>
                `;
                carrinhoItensContainer.appendChild(div);
                
                total += item.preco * item.quantidade;
            });
        }
        
        carrinhoTotalElement.textContent = total.toFixed(2).replace('.', ',');
        
        document.querySelectorAll('.btn-remove').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                carrinho.splice(index, 1);
                salvarCarrinho();
                renderizarCarrinho();
            });
        });
    }

    // Finalizar pedido (simulação)
    finalizarPedidoBtn.addEventListener('click', () => {
        alert('Pedido finalizado! Obrigado por comprar conosco.');
        carrinho = [];
        salvarCarrinho();
        renderizarCarrinho();
        document.getElementById('carrinho-modal').style.display = 'none';
    });

    // Eventos para abrir e fechar o modal do carrinho
    carrinhoBtn.addEventListener('click', () => {
        renderizarCarrinho();
        document.getElementById('carrinho-modal').style.display = 'flex';
    });

    closeModalBtn.addEventListener('click', () => {
        document.getElementById('carrinho-modal').style.display = 'none';
    });

    // Evento de menu hambúrguer para mobile
    hamburgerMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Inicia o carregamento quando a página é carregada
    renderizarMenu();
    atualizarContadorCarrinho();
});
