document.addEventListener('DOMContentLoaded', () => {

    const menuContainer = document.getElementById('menu-container');
    const navLinksContainer = document.getElementById('nav-links');
    const carrinhoModal = document.getElementById('carrinho-modal');
    const abrirCarrinhoBtn = document.getElementById('abrir-carrinho');
    const fecharModalBtns = document.querySelectorAll('.fechar-modal');
    const carrinhoItensContainer = document.getElementById('carrinho-itens');
    const totalPedidoSpan = document.getElementById('total-pedido');
    const contadorCarrinhoSpan = document.getElementById('contador-carrinho');
    const finalizarPedidoBtn = document.getElementById('finalizar-pedido-whatsapp');
    const boasVindasOverlay = document.getElementById('boas-vindas-overlay');
    const abrirCardapioBtn = document.getElementById('abrir-cardapio');
    const mainContent = document.getElementById('main-content');
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const carrinhoVazioDiv = document.getElementById('carrinho-vazio');
    const adicionaisModal = document.getElementById('adicionais-modal');
    const adicionaisOpcoesDiv = document.getElementById('adicionais-opcoes');
    const confirmarAdicionaisBtn = document.getElementById('confirmar-adicionais');
    const observacaoItemTextarea = document.getElementById('observacao-item');

    let carrinho = [];
    let itemAtualParaAdicionais = null;

    // Dados do cardápio e adicionais
    const cardapioData = {
        'Hambúrgueres': [
            { id: 1, nome: 'Smash Original', descricao: 'Pão, blend da casa, queijo e molho da casa.', preco: 14.99, imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_hamburgueres/smash_original.jpg?raw=true' },
            { id: 2, nome: 'Smash Cheddar e Bacon', descricao: 'Pão, blend da casa, queijo cheddar, farofa de bacon e molho da casa.', preco: 18.99, imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_hamburgueres/smash_cheddar_bacon.jpg?raw=true' },
            { id: 3, nome: 'Smash Duplo', descricao: 'Pão, 2x blend da casa, 2x queijo, alface, tomate e molho da casa.', preco: 23.99, imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_hamburgueres/smash_duplo.jpg?raw=true' },
            { id: 4, nome: 'Smash Salada', descricao: 'Pão, blend da casa, queijo, alface, tomate e molho da casa.', preco: 16.99, imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_hamburgueres/smash_salada.jpg?raw=true' },
            { id: 5, nome: 'Smash com Cream Cheese', descricao: 'Pão, blend da casa, queijo, cream cheese e molho da casa.', preco: 17.99, imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_hamburgueres/smash_cream_cheese.jpg?raw=true' }
        ],
        'Combos': [
            { id: 6, nome: 'Combo Smash Duplo', descricao: 'Smash Duplo + Batata Palito + Guaraná 1L.', preco: 37.99, imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_combos/combo_smash_duplo.jpg?raw=true' },
            { id: 7, nome: 'Combo do Chef', descricao: 'Smash Original + Batata Palito + Guaraná 1L.', preco: 30.99, imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_combos/combo_do_chef.jpg?raw=true' },
            { id: 8, nome: 'Família', descricao: '2x Smash Original + Smash com Cheddar e Bacon + Batata Palito (grande).', preco: 154.90, imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_combos/combo_familia.jpg?raw=true' }
        ],
        'Bebidas': [
            { id: 9, nome: 'Coca-Cola Lata', descricao: 'Refrigerante Coca-Cola 350ml.', preco: 6.00, imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_bebidas/coca_lata.jpg?raw=true' },
            { id: 10, nome: 'Guaraná Lata', descricao: 'Refrigerante Guaraná Antarctica 350ml.', preco: 6.00, imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_bebidas/guarana_lata.jpg?raw=true' },
            { id: 11, nome: 'Guaraná 1L', descricao: 'Refrigerante Guaraná Antarctica 1 Litro.', preco: 9.00, imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_bebidas/guarana_1l.jpg?raw=true' }
        ]
    };

    const adicionaisData = [
        { id: 101, nome: 'Creme de Requeijão', preco: 4.00, imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_adicionais/creme_requeijao.jpg?raw=true' },
        { id: 102, nome: 'Queijo Muçarela', preco: 4.00, imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_adicionais/queijo_mucarela.jpg?raw=true' },
        { id: 103, nome: 'Bacon', preco: 5.00, imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_adicionais/bacon.jpg?raw=true' },
        { id: 104, nome: 'Farofa de Bacon', preco: 3.00, imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_adicionais/farofa_bacon.jpg?raw=true' },
        { id: 105, nome: 'Cebola Caramelizada', preco: 3.00, imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_adicionais/cebola_caramelizada.jpg?raw=true' },
        { id: 106, nome: 'Molho Barbecue', preco: 2.50, imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_adicionais/molho_barbecue.jpg?raw=true' },
        { id: 107, nome: 'Molho da Casa', preco: 2.00, imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_adicionais/molho_da_casa.jpg?raw=true' },
        { id: 108, nome: 'Batata Palito', preco: 9.99, imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_adicionais/batata_palito.jpg?raw=true' },
        { id: 109, nome: 'Farofa de Alho', preco: 3.00, imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_adicionais/farofa_alho.jpg?raw=true' },
        { id: 110, nome: 'Ovo Frito', preco: 2.50, imagem: 'https://github.com/SamaraAlves77/cardapio-jottavburguer/blob/main/imagens_adicionais/ovo_frito.jpg?raw=true' }
    ];

    // CIDADES E ESTADOS (APENAS PARA EXEMPLO)
    const estados = {
        'PI': ['Parnaíba', 'Teresina'],
        'MA': ['São Luís', 'Imperatriz']
    };
    const estadoInput = document.getElementById('campo-estado');
    const cidadeInput = document.getElementById('campo-cidade');
    const estadosList = document.getElementById('estados-list');
    const cidadesList = document.getElementById('cidades-list');

    // Funções de inicialização
    function inicializar() {
        preencherCardapio();
        preencherNavLinks();
        preencherEstados();
        adicionarEventosDeModal();
        adicionarEventosDeInteracao();
    }

    function preencherCardapio() {
        menuContainer.innerHTML = '';
        for (const categoria in cardapioData) {
            const section = document.createElement('section');
            section.classList.add('menu-section');
            section.id = `section-${categoria.toLowerCase().replace(/á/g, 'a')}`;
            section.innerHTML = `<h2>${categoria}</h2><div class="item-grid" id="grid-${categoria.toLowerCase().replace(/á/g, 'a')}"></div>`;
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
            const link = document.createElement('a');
            link.href = `#section-${categoria.toLowerCase().replace(/á/g, 'a')}`;
            link.textContent = categoria;
            navLinksContainer.appendChild(link);
        }
    }

    function preencherEstados() {
        estadosList.innerHTML = '';
        for (const estado in estados) {
            const option = document.createElement('option');
            option.value = estado;
            estadosList.appendChild(option);
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

    function adicionarEventosDeInteracao() {
        abrirCardapioBtn.addEventListener('click', () => {
            boasVindasOverlay.style.display = 'none';
            mainContent.style.display = 'block';
        });

        abrirCarrinhoBtn.addEventListener('click', () => {
            renderizarCarrinho();
            carrinhoModal.style.display = 'flex';
        });

        finalizarPedidoBtn.addEventListener('click', finalizarPedido);
        hamburgerMenu.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
        });

        estadoInput.addEventListener('input', (e) => {
            const estadoSelecionado = e.target.value.toUpperCase();
            cidadesList.innerHTML = '';
            if (estados[estadoSelecionado]) {
                estados[estadoSelecionado].forEach(cidade => {
                    const option = document.createElement('option');
                    option.value = cidade;
                    cidadesList.appendChild(option);
                });
            }
        });

        document.getElementById('btn-localizacao').addEventListener('click', obterLocalizacao);

        confirmarAdicionaisBtn.addEventListener('click', () => {
            adicionarItemAoCarrinho(itemAtualParaAdicionais);
            fecharModal();
        });
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
            if (categoria === 'Hambúrgueres') {
                itemAtualParaAdicionais = { ...item };
                renderizarAdicionaisModal();
                adicionaisModal.style.display = 'flex';
            } else {
                adicionarItemAoCarrinho(item);
            }
        });
        return card;
    }

    function renderizarAdicionaisModal() {
        adicionaisOpcoesDiv.innerHTML = '';
        observacaoItemTextarea.value = '';

        const adicionaisSelecionados = {};

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

            const quantidadeSpan = adicionalCard.querySelector('.quantidade-add');
            adicionaisSelecionados[adicional.id] = 0;

            adicionalCard.querySelector('.btn-add-adicional').addEventListener('click', () => {
                adicionaisSelecionados[adicional.id]++;
                quantidadeSpan.textContent = adicionaisSelecionados[adicional.id];
            });

            adicionalCard.querySelector('.btn-remove-adicional').addEventListener('click', () => {
                if (adicionaisSelecionados[adicional.id] > 0) {
                    adicionaisSelecionados[adicional.id]--;
                    quantidadeSpan.textContent = adicionaisSelecionados[adicional.id];
                }
            });
        });

        confirmarAdicionaisBtn.onclick = () => {
            const novosAdicionais = Object.keys(adicionaisSelecionados)
                .filter(id => adicionaisSelecionados[id] > 0)
                .map(id => {
                    const adicional = adicionaisData.find(a => a.id == id);
                    return {
                        ...adicional,
                        quantidade: adicionaisSelecionados[id]
                    };
                });
            
            const observacao = observacaoItemTextarea.value.trim();

            adicionarItemAoCarrinho(itemAtualParaAdicionais, novosAdicionais, observacao);
            fecharModal();
        };
    }

    function adicionarItemAoCarrinho(item, adicionais = [], observacao = '') {
        const itemExistente = carrinho.find(c => c.id === item.id);
        
        if (itemExistente && adicionais.length === 0 && observacao === '') {
            itemExistente.quantidade++;
        } else {
            const novoItem = { ...item, quantidade: 1, adicionais: adicionais, observacao: observacao, uid: Date.now() };
            carrinho.push(novoItem);
        }
        
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
            let adicionaisTxt = '';

            if (item.adicionais && item.adicionais.length > 0) {
                const adicionaisNome = item.adicionais.map(ad => `${ad.nome} (${ad.quantidade})`).join(', ');
                adicionaisTxt = `<br><span class="adicionais-txt">${adicionaisNome}</span>`;
                
                item.adicionais.forEach(adicional => {
                    precoTotalItem += adicional.preco * adicional.quantidade * item.quantidade;
                });
            }

            const itemDiv = document.createElement('div');
            itemDiv.classList.add('carrinho-item');
            itemDiv.innerHTML = `
                <div>
                    <span class="item-quantidade">${item.quantidade}x</span> ${item.nome}
                    <div class="item-adicionais">${adicionaisTxt}</div>
                    <div class="item-observacao">${observacoesTxt}</div>
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
            alert('Seu carrinho está vazio!');
            return;
        }

        const nome = 'Cliente';
        const telefone = '86994253258';
        const formaPagamento = document.getElementById('forma-pagamento').value;
        const observacoesGerais = document.getElementById('observacoes-gerais').value;
        const estado = document.getElementById('campo-estado').value;
        const cidade = document.getElementById('campo-cidade').value;
        const rua = document.getElementById('campo-rua').value;
        const numero = document.getElementById('campo-numero').value;
        const observacoesEndereco = document.getElementById('observacoes-endereco').value;

        let mensagem = `Olá, meu nome é ${nome} e gostaria de fazer o seguinte pedido:\n\n`;

        let total = 0;
        carrinho.forEach(item => {
            let precoItem = item.preco;
            let adicionaisDetalhes = '';
            if (item.adicionais && item.adicionais.length > 0) {
                adicionaisDetalhes = item.adicionais.map(ad => {
                    precoItem += ad.preco * ad.quantidade;
                    return `+ ${ad.nome} (${ad.quantidade}x)`;
                }).join('\n');
            }

            let obs = item.observacao ? `\n(Obs: ${item.observacao})` : '';

            mensagem += `* ${item.nome} (${item.quantidade}x) - R$ ${(precoItem * item.quantidade).toFixed(2).replace('.', ',')}\n`;
            if (adicionaisDetalhes) {
                mensagem += `${adicionaisDetalhes}\n`;
            }
            if (obs) {
                mensagem += obs + '\n';
            }
        });

        const totalFinal = carrinho.reduce((acc, item) => {
            let precoItem = item.preco;
            if (item.adicionais) {
                item.adicionais.forEach(ad => {
                    precoItem += ad.preco * ad.quantidade;
                });
            }
            return acc + (precoItem * item.quantidade);
        }, 0);

        mensagem += `\n*TOTAL: R$ ${totalFinal.toFixed(2).replace('.', ',')}*\n\n`;
        mensagem += `*Forma de Pagamento:* ${formaPagamento}\n`;

        if (observacoesGerais) {
            mensagem += `*Observações do pedido:* ${observacoesGerais}\n`;
        }
        
        if (rua && numero) {
            mensagem += `\n*Endereço de Entrega:*\n`;
            mensagem += `  - Rua: ${rua}, Nº: ${numero}\n`;
            if (estado) mensagem += `  - Estado: ${estado}\n`;
            if (cidade) mensagem += `  - Cidade: ${cidade}\n`;
            if (observacoesEndereco) mensagem += `  - Obs. Endereço: ${observacoesEndereco}\n`;
        }

        const encodedMessage = encodeURIComponent(mensagem);
        const url = `https://wa.me/+55${telefone}?text=${encodedMessage}`;
        window.open(url, '_blank');
        
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
        const mensagem = document.createElement('div');
        mensagem.className = 'notificacao-flutuante';
        mensagem.textContent = texto;
        document.body.appendChild(mensagem);

        setTimeout(() => {
            mensagem.classList.add('show');
        }, 100);

        setTimeout(() => {
            mensagem.classList.remove('show');
            setTimeout(() => {
                mensagem.remove();
            }, 500);
        }, 3000);
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
                document.getElementById('campo-cidade').value = address.city || address.town || address.village || '';
                document.getElementById('campo-estado').value = address.state || '';
            } catch (error) {
                status.textContent = 'Não foi possível obter o endereço a partir da sua localização.';
                console.error('Erro ao buscar endereço:', error);
            }
        }, () => {
            status.textContent = 'Não foi possível obter sua localização. Por favor, digite o endereço manualmente.';
        });
    }

    inicializar();
});
