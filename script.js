document.addEventListener('DOMContentLoaded', () => {

    const entradaVisual = document.getElementById('entrada-visual');
    const abrirCardapioBtnVisual = document.getElementById('abrir-cardapio-visual');
    const mainContent = document.getElementById('main-content');

    const menuContainer = document.getElementById('menu-container');
    const navLinksContainer = document.getElementById('nav-links');
    const carrinhoModal = document.getElementById('carrinho-modal');
    const abrirCarrinhoBtn = document.getElementById('abrir-carrinho');
    const fecharModalBtns = document.querySelectorAll('.fechar-modal');
    const carrinhoItensContainer = document.getElementById('carrinho-itens');
    const totalPedidoSpan = document.getElementById('total-pedido');
    const contadorCarrinhoSpan = document.getElementById('contador-carrinho');
    const finalizarPedidoBtn = document.getElementById('finalizar-pedido-whatsapp');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const carrinhoVazioDiv = document.getElementById('carrinho-vazio');
    const adicionaisModal = document.getElementById('adicionais-modal');
    const adicionaisOpcoesDiv = document.getElementById('adicionais-opcoes');
    const confirmarAdicionaisBtn = document.getElementById('confirmar-adicionais');
    const observacaoItemTextarea = document.getElementById('observacao-item');

    let carrinho = [];
    let itemAtualParaAdicionais = null;

    // Dados do cardápio com caminhos de imagem locais
    const cardapioData = {
        'Hambúrguer Artesanal': [
            { id: 1, nome: 'Smash Original', descricao: 'Pão, Carne 80g prensada na chapa, queijo Muçarela, cebola caramelizada, alface, tomate e molho da casa.', preco: 18.99, imagem: 'smash_original.jpg' },
            { id: 2, nome: 'Smash Duplo', descricao: 'Pão, 2 carnes 80g prensadas na chapa, 2 queijos muçarela, cebola caramelizada, alface, tomate e molho da casa.', preco: 24.99, imagem: 'smash_duplo.jpg' },
            { id: 3, nome: 'Jotta Básico', descricao: 'Pão, Carne 120g prensada na chapa com cebola, queijo muçarela e molho da casa.', preco: 14.99, imagem: 'imagens/jotta_basico.jpg' },
            { id: 4, nome: 'Jotta Classic', descricao: 'Pão, Carne 120g, molho barbecue, tomate, alface, bacon e queijo muçarela.', preco: 25.99, imagem: 'jotta_classic.jpg' },
            { id: 5, nome: 'Burguer do Xerife', descricao: 'Pão, carne de 120g, requeijão longá e farofa de bacon.', preco: 22.99, imagem: 'burguer_xerife.jpg' },
            { id: 6, nome: 'Duplo Brutão', descricao: 'Pão, 2 carnes de 120g,requeijão longa, molho da casa, 2 fatias de bacon.', preco: 37.99, imagem: 'duplo_brutao.jpg' },
            { id: 7, nome: 'Calabresa Prime', descricao: 'Pão, molho, alface, tomate, calabresa, queijo, cebola caramelizada,carne 80g prensada na chapa', preco: 26.99, imagem: 'imagens/calabresa_prime.jpg' },
            { id: 8, nome: 'Burguer Salame', descricao: 'Pão, requeijão, carne e salame.', preco: 28.99, imagem: 'imagens/burguer_salame.jpg' },
            { id: 9, nome: 'Calabresa Básico', descricao: 'Pão, molho da casa, calabresa e queijo muçarela.', preco: 15.00, imagem: 'calabresa_basico.jpg' },
           
        'Combos': [
            { id: 11, nome: 'Combo Econômico', descricao: '1 Smash Original + batata frita + refrigerante lata.', preco: 31.99, imagem: 'combo_economico_smash.jpg' },
            { id: 12, nome: 'Combo do Chef', descricao: '1 Jotta Classic + batata frita + refrigerante lata.', preco: 41.99, imagem: 'imagens/combo_do_chef.jpg' },
            { id: 13, nome: 'Combo Smash Duplo', descricao: '1 Smash duplo + batata frita + refrigerante lata.', preco: 37.99, imagem: 'imagens/combo_smash_duplo.jpg' },
            { id: 14, nome: 'Combo Premium', descricao: '1 Duplo Brutão + batata frita + refrigerante lata.', preco: 53.99, imagem: 'imagens/combo_premium.jpg' },
            { id: 15, nome: 'Casal: 2x Smash Original', descricao: '2 Smash Original + batata frita + Guaraná 1L.', preco: 49.99, imagem: 'combo_economico_casal_smash.jpg' },
            { id: 16, nome: 'Casal: 2x Jotta Classic', descricao: '2 Jotta Classic + batata frita + Guaraná 1L.', preco: 63.99, imagem: 'imagens/casal_jotta_classic.jpg' },
            { id: 17, nome: 'Casal: 2x Smash Duplo', descricao: '2 Smash duplo + batata frita + Guaraná 1L.', preco: 61.99, imagem: 'imagens/casal_smash_duplo.jpg' },
            { id: 18, nome: 'Casal: 2x Duplo Brutão', descricao: '2 Duplo Brutão + batata frita + Guaraná 1L.', preco: 87.99, imagem: 'imagens/casal_duplo_brutao.jpg' },
            { id: 19, nome: 'Família: 4x Smash Original', descricao: '4 Smash Original + batata frita + Guaraná 1L.', preco: 87.99, imagem: 'imagens/familia_smash_original.jpg' },
            { id: 20, nome: 'Família: 4x Jotta Classic', descricao: '4 Jotta Classic + batata frita + Guaraná 1L.', preco: 115.99, imagem: 'imagens/familia_jotta_classic.jpg' },
            { id: 21, nome: 'Família: 4x Smash Duplo', descricao: '4 Smash duplo + batata frita + Guaraná 1L.', preco: 111.99, imagem: 'imagens/familia_smash_duplo.jpg' },
            { id: 22, nome: 'Família: 4x Duplo Brutão', descricao: '4 Duplo Brutão + batata frita + Guaraná 1L.', preco: 154.99, imagem: 'imagens/familia_duplo_brutao.jpg' },
        ],
        'Acompanhamentos': [
            { id: 23, nome: 'Batata Palito', descricao: 'Porção individual de batata frita palito.', preco: 11.99, imagem: 'imagens/batata_palito_nova.jpg' },
            { id: 24, nome: 'Batata com Bacon', descricao: 'Porção de batata frita com bacon.', preco: 17.99, imagem: 'imagens/batata_bacon.jpg' },
    
        ],
        'Bebidas': [
            { id: 26, nome: 'Coca-Cola Lata', descricao: 'Refrigerante Coca-Cola 350ml.', preco: 7.00, imagem: 'imagens/coca_lata.jpg' },
            { id: 27, nome: 'Guaraná Lata', descricao: 'Refrigerante Guaraná Antarctica 350ml.', preco: 6.00, imagem: 'imagens/guarana_lata.jpg' },
            { id: 28, nome: 'Guaraná 1L', descricao: 'Refrigerante Guaraná Antarctica 1 Litro.', preco: 9.00, imagem: 'imagens/guarana_1l.jpg' },
           
        ]
    };

    // Dados de adicionais com caminhos de imagem locais
    const adicionaisData = [
        { id: 101, nome: 'Creme de Requeijão', preco: 4.00, imagem: 'imagens/creme_requeijao.jpg' },
        { id: 102, nome: 'Queijo Muçarela', preco: 4.00, imagem: 'imagens/queijo_mucarela.jpg' },
        { id: 103, nome: 'Bacon', preco: 4.00, imagem: 'imagens/bacon.jpg' },
        { id: 104, nome: 'Farofa de Bacon', preco: 3.00, imagem: 'imagens/farofa_bacon.jpg' },
        { id: 105, nome: 'Cebola Caramelizada', preco: 3.00, imagem: 'imagens/cebola_caramelizada.jpg' },
        { id: 106, nome: 'Molho Barbecue', preco: 2.00, imagem: 'imagens/molho_barbecue.jpg' },
        { id: 107, nome: 'Molho da Casa', preco: 2.00, imagem: 'imagens/molho_da_casa.jpg' },
        { id: 108, nome: 'Batata Palito (Add)', preco: 9.99, imagem: 'imagens/batata_palito.jpg' },
        { id: 111, nome: 'Calabresa', preco: 5.00, imagem: 'imagens/calabresa_add.jpg' },
        { id: 112, nome: 'Salame', preco: 7.00, imagem: 'imagens/salame_add.jpg' }
    ];

    // Funções de inicialização
    function inicializarApp() {
        // Evento para o botão da tela de entrada
        abrirCardapioBtnVisual.addEventListener('click', () => {
            entradaVisual.style.display = 'none';
            mainContent.style.display = 'block';
            // Garante que o cardápio seja renderizado e os eventos adicionados
            // apenas quando o mainContent estiver visível
            inicializarCardapioEEventos();
        });
    }

    function inicializarCardapioEEventos() {
        preencherCardapio();
        preencherNavLinks();
        adicionarEventosDeModal();
        adicionarEventosDeInteracaoCardapio();
        carregarCarrinhoDoLocalStorage();
    }

    function preencherCardapio() {
        menuContainer.innerHTML = '';
        for (const categoria in cardapioData) {
            // Verifica se a categoria possui itens antes de renderizá-la
            if (cardapioData[categoria].length === 0) continue;

            const section = document.createElement('section');
            section.classList.add('menu-section');
            // Ajusta IDs para URL e espaços, remove acentos
            const sectionId = `section-${categoria.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, '-')}`;
            section.id = sectionId;
            section.innerHTML = `<h2>${categoria}</h2><div class="item-grid" id="grid-${sectionId}"></div>`;
            menuContainer.appendChild(section);

            const grid = section.querySelector('.item-grid');
            cardapioData[categoria].forEach(item => {
                const card = criarItemCard(item, categoria);
                grid.appendChild(card);
            });
        }
    }

    function preencherNavLinks() {
        navLinksContainer.innerHTML = '';
        for (const categoria in cardapioData) {
            // Apenas adiciona link se a categoria tiver itens
            if (cardapioData[categoria].length === 0) continue;

            const link = document.createElement('a');
            // Ajusta IDs para URL e espaços, remove acentos
            const sectionId = `section-${categoria.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, '-')}`;
            link.href = `#${sectionId}`;
            link.textContent = categoria;
            navLinksContainer.appendChild(link);
            
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active'); // Fecha o menu hambúrguer ao clicar
            });
        }
    }

    function adicionarEventosDeModal() {
        fecharModalBtns.forEach(btn => {
            btn.addEventListener('click', fecharModal);
        });
        window.addEventListener('click', (event) => {
            if (event.target === carrinhoModal || event.target === adicionaisModal) {
                fecharModal();
            }
        });
    }

    function adicionarEventosDeInteracaoCardapio() {
        abrirCarrinhoBtn.addEventListener('click', () => {
            renderizarCarrinho();
            carrinhoModal.style.display = 'flex';
        });

        finalizarPedidoBtn.addEventListener('click', finalizarPedido);
        hamburgerMenu.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
        });

        document.getElementById('btn-localizacao').addEventListener('click', obterLocalizacao);
    }

    function criarItemCard(item, categoria) {
        const card = document.createElement('div');
        card.classList.add('item-card');
        card.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}">
            <h3>${item.nome}</h3>
            <p>${item.descricao}</p>
            <div class="price">R$ ${item.preco.toFixed(2).replace('.', ',')}</div>
            <button class="btn btn-add" data-item-id="${item.id}" data-categoria="${categoria}">Adicionar ao Carrinho</button>
        `;

        const btnAdd = card.querySelector('.btn-add');
        btnAdd.addEventListener('click', () => {
            // Apenas Hambúrgueres terão adicionais. Combos agora adicionam direto.
            if (categoria === 'Hambúrgueres') {
                itemAtualParaAdicionais = { ...item };
                renderizarAdicionaisModal();
                adicionaisModal.style.display = 'flex';
            } else {
                // Se não tiver adicionais, adiciona direto ao carrinho
                adicionarItemAoCarrinho(item);
            }
        });
        return card;
    }

    function renderizarAdicionaisModal() {
        adicionaisOpcoesDiv.innerHTML = '';
        observacaoItemTextarea.value = '';

        // Usar um Map para rastrear a quantidade, facilitando o reset e a leitura
        const adicionaisSelecionadosMap = new Map(); 
        
        adicionaisData.forEach(adicional => {
            const adicionalCard = document.createElement('div');
            adicionalCard.classList.add('adicional-card');
            adicionalCard.innerHTML = `
                <img src="${adicional.imagem}" alt="${adicional.nome}">
                <div class="adicional-info">
                    <span>${adicional.nome}</span>
                    <span class="price">R$ ${adicional.preco.toFixed(2).replace('.', ',')}</span>
                    <div class="adicional-actions">
                        <button class="btn-remove-adicional" data-id="${adicional.id}">-</button>
                        <span class="quantidade-add" data-id="${adicional.id}">0</span>
                        <button class="btn-add-adicional" data-id="${adicional.id}">+</button>
                    </div>
                </div>
            `;
            adicionaisOpcoesDiv.appendChild(adicionalCard);

            const quantidadeSpan = adicionalCard.querySelector(`.quantidade-add[data-id="${adicional.id}"]`);
            adicionaisSelecionadosMap.set(adicional.id, 0); // Inicializa com 0

            adicionalCard.querySelector('.btn-add-adicional').addEventListener('click', () => {
                let currentQty = adicionaisSelecionadosMap.get(adicional.id);
                adicionaisSelecionadosMap.set(adicional.id, currentQty + 1);
                quantidadeSpan.textContent = adicionaisSelecionadosMap.get(adicional.id);
            });

            adicionalCard.querySelector('.btn-remove-adicional').addEventListener('click', () => {
                let currentQty = adicionaisSelecionadosMap.get(adicional.id);
                if (currentQty > 0) {
                    adicionaisSelecionadosMap.set(adicional.id, currentQty - 1);
                    quantidadeSpan.textContent = adicionaisSelecionadosMap.get(adicional.id);
                }
            });
        });

        confirmarAdicionaisBtn.onclick = () => {
            const novosAdicionais = [];
            adicionaisSelecionadosMap.forEach((quantidade, id) => {
                if (quantidade > 0) {
                    const adicional = adicionaisData.find(a => a.id == id);
                    novosAdicionais.push({
                        ...adicional,
                        quantidade: quantidade
                    });
                }
            });
            
            const observacao = observacaoItemTextarea.value.trim();

            adicionarItemAoCarrinho(itemAtualParaAdicionais, novosAdicionais, observacao);
            fecharModal();
        };
    }

    function adicionarItemAoCarrinho(item, adicionais = [], observacao = '') {
        // Gera um ID único para cada item no carrinho, incluindo os adicionais e observações
        // Isso permite que itens iguais com adicionais/observações diferentes sejam tratados como itens separados
        const uid = Date.now() + Math.random().toString(36).substring(2, 9);
        const novoItem = { ...item, quantidade: 1, adicionais: adicionais, observacao: observacao, uid: uid };
        
        carrinho.push(novoItem);
        
        atualizarCarrinho();
        exibirMensagem(`"${item.nome}" adicionado!`);
    }

    function atualizarCarrinho() {
        renderizarCarrinho();
        atualizarContadorCarrinho();
        salvarCarrinhoNoLocalStorage();
    }

    function renderizarCarrinho() {
        carrinhoItensContainer.innerHTML = '';
        let total = 0;

        if (carrinho.length === 0) {
            carrinhoVazioDiv.style.display = 'block';
            totalPedidoSpan.textContent = 'R$ 0,00';
            return;
        }

        carrinhoVazioDiv.style.display = 'none';

        carrinho.forEach(item => {
            let precoTotalItem = item.preco * item.quantidade;
            let observacoesTxt = item.observacao ? `Obs: ${item.observacao}` : '';
            let adicionaisDetalhesTxt = ''; // Para exibir no carrinho

            if (item.adicionais && item.adicionais.length > 0) {
                adicionaisDetalhesTxt = item.adicionais.map(ad => {
                    precoTotalItem += ad.preco * ad.quantidade * item.quantidade; // Multiplica adicionais pela quantidade do item principal
                    return `${ad.nome} (${ad.quantidade}x)`;
                }).join(', ');
            }

            const itemDiv = document.createElement('div');
            itemDiv.classList.add('carrinho-item');
            itemDiv.innerHTML = `
                <div>
                    <span class="item-quantidade">${item.quantidade}x</span> ${item.nome}
                    ${adicionaisDetalhesTxt ? `<div class="item-adicionais">${adicionaisDetalhesTxt}</div>` : ''}
                    ${observacoesTxt ? `<div class="item-observacao">${observacoesTxt}</div>` : ''}
                </div>
                <div class="carrinho-actions">
                    <span class="total-item">R$ ${precoTotalItem.toFixed(2).replace('.', ',')}</span>
                    <i class="fas fa-trash-alt remover-item" data-uid="${item.uid}"></i>
                </div>
            `;
            carrinhoItensContainer.appendChild(itemDiv);
            total += precoTotalItem;
        });

        totalPedidoSpan.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

        document.querySelectorAll('.remover-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const uid = e.target.getAttribute('data-uid');
                removerItemDoCarrinho(uid);
            });
        });
    }

    function removerItemDoCarrinho(uid) {
        carrinho = carrinho.filter(item => item.uid != uid);
        atualizarCarrinho();
    }

    function atualizarContadorCarrinho() {
        const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
        contadorCarrinhoSpan.textContent = totalItens;
    }

    function fecharModal() {
        carrinhoModal.style.display = 'none';
        adicionaisModal.style.display = 'none';
    }

    function finalizarPedido() {
        if (carrinho.length === 0) {
            exibirMensagem('Seu carrinho está vazio!');
            return;
        }

        const nome = 'Cliente'; // Pode ser capturado de um campo de nome, se houver
        const telefoneJottaV = '86994253258'; // Telefone do JottaV Burguer
        const formaPagamento = document.getElementById('forma-pagamento').value;
        const observacoesGerais = document.getElementById('observacoes-gerais').value.trim();
        const rua = document.getElementById('campo-rua').value.trim();
        const numero = document.getElementById('campo-numero').value.trim();
        const bairro = document.getElementById('campo-bairro').value.trim();
        const observacoesEndereco = document.getElementById('observacoes-endereco').value.trim();

        let mensagem = `Olá, meu nome é ${nome} e gostaria de fazer o seguinte pedido:\n\n`;

        let totalFinal = 0;
        carrinho.forEach(item => {
            let precoItemAtual = item.preco;
            let detalhesAdicionaisTexto = '';

            if (item.adicionais && item.adicionais.length > 0) {
                detalhesAdicionaisTexto = item.adicionais.map(ad => {
                    precoItemAtual += ad.preco * ad.quantidade; // Adiciona preço dos adicionais ao item base
                    return `   + ${ad.nome} (${ad.quantidade}x)`; // Indentado para clareza
                }).join('\n');
            }

            let obsItem = item.observacao ? `\n(Obs do item: ${item.observacao})` : '';

            mensagem += `* ${item.nome} (${item.quantidade}x) - R$ ${(precoItemAtual * item.quantidade).toFixed(2).replace('.', ',')}\n`;
            if (detalhesAdicionaisTexto) {
                mensagem += `${detalhesAdicionaisTexto}\n`;
            }
            if (obsItem) {
                mensagem += obsItem + '\n';
            }
            totalFinal += (precoItemAtual * item.quantidade);
        });

        mensagem += `\n*TOTAL DO PEDIDO: R$ ${totalFinal.toFixed(2).replace('.', ',')}*\n\n`;
        mensagem += `*Forma de Pagamento:* ${formaPagamento}\n`;

        if (observacoesGerais) {
            mensagem += `*Observações do pedido:* ${observacoesGerais}\n`;
        }
        
        if (rua && numero) {
            mensagem += `\n*Endereço de Entrega:*\n`;
            mensagem += `   - Rua: ${rua}, Nº: ${numero}\n`;
            if (bairro) mensagem += `   - Bairro: ${bairro}\n`;
            if (observacoesEndereco) mensagem += `   - Obs. Endereço: ${observacoesEndereco}\n`;
        } else {
             mensagem += `\n*Endereço de Entrega:* Não informado.`;
        }

        const encodedMessage = encodeURIComponent(mensagem);
        const url = `https://wa.me/+55${telefoneJottaV}?text=${encodedMessage}`;
        window.open(url, '_blank');
        
        // Limpar carrinho e fechar modal após o pedido
        carrinho = [];
        atualizarCarrinho();
        fecharModal();
        exibirMensagem('Pedido enviado! Verifique seu WhatsApp.');
    }

    function salvarCarrinhoNoLocalStorage() {
        localStorage.setItem('carrinhoJottav', JSON.stringify(carrinho));
    }

    function carregarCarrinhoDoLocalStorage() {
        const carrinhoSalvo = localStorage.getItem('carrinhoJottav');
        if (carrinhoSalvo) {
            carrinho = JSON.parse(carrinhoSalvo);
            atualizarCarrinho();
        }
    }

    function exibirMensagem(texto) {
        const notificacao = document.getElementById('notificacao-flutuante');
        notificacao.textContent = texto;
        notificacao.classList.add('show');

        setTimeout(() => {
            notificacao.classList.remove('show');
        }, 3000); // Esconde após 3 segundos
    }

    async function obterLocalizacao() {
        const status = document.getElementById('localizacao-status');
        status.textContent = 'Buscando localização...';

        if (!navigator.geolocation) {
            status.textContent = 'Geolocalização não é suportada pelo seu navegador.';
            return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            status.textContent = `Localização obtida: Latitude ${lat.toFixed(4)}, Longitude ${lon.toFixed(4)}`;

            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
                const data = await response.json();
                
                const address = data.address;
                document.getElementById('campo-rua').value = address.road || '';
                document.getElementById('campo-bairro').value = address.suburb || address.neighbourhood || '';
                // Você pode tentar preencher o número se a API fornecer (raro, mas possível)
                // document.getElementById('campo-numero').value = address.house_number || ''; 
            } catch (error) {
                status.textContent = 'Não foi possível obter o endereço a partir da sua localização.';
                console.error('Erro ao buscar endereço:', error);
            }
        }, () => {
            status.textContent = 'Não foi possível obter sua localização. Por favor, digite o endereço manualmente.';
        });
    }

    // Inicializa a aplicação ao carregar a página
    inicializarApp();
});

