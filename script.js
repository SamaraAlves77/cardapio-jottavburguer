document.addEventListener('DOMContentLoaded', () => {

    // Dados do cardápio
    const cardapio = {
        "Hambúrguer Artesanal": [
            { "id": 1, "nome": "Smash Original", "descricao": "Pão, blend da casa, queijo, picles e molho da casa.", "preco": 18.99, "imagem": "smash_original.jpeg" },
            { "id": 2, "nome": "Smash Duplo", "descricao": "Pão, 2x blend da casa, 2x queijo, picles e molho da casa.", "preco": 24.99, "imagem": "smash_duplo.jpeg" },
            { "id": 3, "nome": "Jotta Básico", "descricao": "Pão, blend de 160g, queijo, salada e molho de ervas.", "preco": 28.99, "imagem": "jotta_basico.jpeg" },
            { "id": 4, "nome": "Jotta Classic", "descricao": "Pão, blend de 160g, queijo, bacon, salada e molho de ervas.", "preco": 32.99, "imagem": "jotta_classic.jpeg" },
            { "id": 5, "nome": "Burguer do Xerife", "descricao": "Pão, blend de 160g, queijo, picles e molho defumado.", "preco": 35.99, "imagem": "burguer_do_xerife.jpeg" },
            { "id": 6, "nome": "Duplo Brutão", "descricao": "Pão, 2x blends de 160g, 2x queijo, cebola caramelizada e molho de bacon.", "preco": 40.99, "imagem": "duplo_brutao.jpeg" },
            { "id": 7, "nome": "Calabresa Básicão", "descricao": "Pão, calabresa fatiada, queijo, ovo, bacon, salada e maionese temperada.", "preco": 25.99, "imagem": "calabresa_basico.jpeg" },
            { "id": 8, "nome": "Burguer Salame", "descricao": "Pão, blend de 160g, queijo, salame, salada e geleia de pimenta.", "preco": 38.99, "imagem": "burguer_salame.jpeg" },
            { "id": 9, "nome": "Calabresa Prime", "descricao": "Pão, blend de 160g, queijo, calabresa, salada e molho de requeijão.", "preco": 35.99, "imagem": "calabresa_prime.jpeg" }
        ],
        "Combos": [
            { "id": 11, "nome": "Combo Econômico", "descricao": "1x Smash Original + Batata Frita.", "preco": 24.99, "imagem": "combo_economico_smash.jpeg" },
            { "id": 12, "nome": "Combo do Chef", "descricao": "1x Jotta Classic + Batata Frita + Bebida.", "preco": 40.99, "imagem": "combo_do_chef.jpeg" },
            { "id": 13, "nome": "Combo Smash", "descricao": "1x Smash Duplo + Batata Frita + Bebida.", "preco": 30.99, "imagem": "combo_smash_duplo.jpeg" },
            { "id": 14, "nome": "Combo Premium", "descricao": "1x Duplo Brutão + Batata Frita + Bebida.", "preco": 50.99, "imagem": "combo_premium.jpeg" },
            { "id": 15, "nome": "Casal: 2x Smash Original.", "descricao": "2x Smash Original + Batata Frita + Refri 1L.", "preco": 49.99, "imagem": "casal_2x_smash.jpeg" },
            { "id": 16, "nome": "Casal: 2x Jotta Classic", "descricao": "2x Jotta Classic + Batata Frita + Refri 1L.", "preco": 65.99, "imagem": "casal_2x_jotta.jpeg" },
            { "id": 17, "nome": "Casal: 2x Smash Duplo", "descricao": "2x Smash Duplo + Batata Frita + Refri 1L.", "preco": 55.99, "imagem": "casal_2x_smash_duplo.jpeg" },
            { "id": 18, "nome": "Casal: 2x Duplo Brutão", "descricao": "2x Duplo Brutão + Batata Frita + Refri 1L.", "preco": 75.99, "imagem": "casal_2x_duplo.jpeg" },
            { "id": 19, "nome": "Família: 4x Jotta Classic", "descricao": "4x Jotta Classic + 2x Batata Frita + Refri 2L.", "preco": 115.99, "imagem": "familia_4x_jotta.jpeg" }
        ],
        "Acompanhamentos": [
            { "id": 20, "nome": "Batata Frita", "descricao": "Batata frita palito, crocante e sequinha.", "preco": 12.00, "imagem": "batata_frita.jpeg" },
            { "id": 21, "nome": "Batata Cheddar e Bacon", "descricao": "Batata coberta com cheddar cremoso e bacon crocante.", "preco": 18.00, "imagem": "batata_cheddar_bacon.jpeg" },
            { "id": 22, "nome": "Anéis de Cebola", "descricao": "Anéis de cebola empanados e fritos, com molho especial.", "preco": 15.00, "imagem": "aneis_cebola.jpeg" },
            { "id": 23, "nome": "Nuggets", "descricao": "Nuggets de frango empanados e crocantes.", "preco": 16.00, "imagem": "nuggets.jpeg" }
        ],
        "Bebidas": [
            { "id": 24, "nome": "Refrigerante Lata", "descricao": "Coca-Cola, Guaraná, Fanta.", "preco": 7.00, "imagem": "refrigerante_lata.jpeg" },
            { "id": 25, "nome": "Refrigerante 1L", "descricao": "Coca-Cola, Guaraná, Fanta.", "preco": 10.00, "imagem": "refrigerante_1l.jpeg" },
            { "id": 26, "nome": "Refrigerante 2L", "descricao": "Coca-Cola, Guaraná, Fanta.", "preco": 15.00, "imagem": "refrigerante_2l.jpeg" },
            { "id": 27, "nome": "Suco Natural", "descricao": "Morango, Laranja, Maracujá.", "preco": 8.00, "imagem": "suco_natural.jpeg" },
            { "id": 28, "nome": "Água Mineral", "descricao": "Água sem gás.", "preco": 4.00, "imagem": "agua_mineral.jpeg" }
        ],
        "Opcionais": [
            { "id": 29, "nome": "Cheddar", "preco": 5.00, "imagem": "cheddar.jpeg" },
            { "id": 30, "nome": "Bacon", "preco": 6.00, "imagem": "bacon.jpeg" },
            { "id": 31, "nome": "Ovo", "preco": 3.00, "imagem": "ovo.jpeg" },
            { "id": 32, "nome": "Molho da Casa Extra", "preco": 3.00, "imagem": "molho_da_casa_extra.jpeg" },
            { "id": 33, "nome": "Catupiry", "preco": 6.00, "imagem": "catupiry.jpeg" },
            { "id": 34, "nome": "Salame", "preco": 7.00, "imagem": "salame.jpeg" },
            { "id": 35, "nome": "Requeijão Longá", "preco": 5.00, "imagem": "requeijao_longa.jpeg" }
        ]
    };

    let carrinho = [];
    let itemSelecionado = {};

    const entradaVisual = document.getElementById('entrada-visual');
    const mainContent = document.getElementById('main-content');
    const abrirCardapioVisual = document.getElementById('abrir-cardapio-visual');
    const menuContainer = document.getElementById('menu-container');
    const navLinks = document.getElementById('nav-links');
    const carrinhoModal = document.getElementById('carrinho-modal');
    const abrirCarrinhoBtn = document.getElementById('abrir-carrinho');
    const fecharModalBtns = document.querySelectorAll('.fechar-modal');
    const contadorCarrinho = document.getElementById('contador-carrinho');
    const carrinhoItens = document.getElementById('carrinho-itens');
    const carrinhoVazio = document.getElementById('carrinho-vazio');
    const totalPedido = document.getElementById('total-pedido');
    const finalizarPedidoBtn = document.getElementById('finalizar-pedido-whatsapp');
    const hamburgerMenuBtn = document.getElementById('hamburger-menu');
    const notificacao = document.getElementById('notificacao-flutuante');
    const adicionaisModal = document.getElementById('adicionais-modal');
    const adicionaisOpcoes = document.getElementById('adicionais-opcoes');
    const confirmarAdicionaisBtn = document.getElementById('confirmar-adicionais');
    const observacaoItem = document.getElementById('observacao-item');
    const campoRua = document.getElementById('campo-rua');
    const campoNumero = document.getElementById('campo-numero');
    const campoBairro = document.getElementById('campo-bairro');
    const formaPagamento = document.getElementById('forma-pagamento');
    const observacoesGerais = document.getElementById('observacoes-gerais');
    const btnLocalizacao = document.getElementById('btn-localizacao');
    const localizacaoStatus = document.getElementById('localizacao-status');

    // Mapeamento de categorias para exibir o modal de adicionais
    const categoriasComAdicionais = ["Hambúrguer Artesanal", "Acompanhamentos"];

    // Função para mostrar a tela do cardápio e esconder a de entrada
    const mostrarCardapio = () => {
        entradaVisual.style.display = 'none';
        mainContent.style.display = 'block';
        window.scrollTo(0, 0); // Volta para o topo da página
    };

    // Função para renderizar o cardápio
    const renderizarCardapio = () => {
        menuContainer.innerHTML = '';
        navLinks.innerHTML = '';

        // Obter as categorias, excluindo "Opcionais"
        const categoriasParaRenderizar = Object.keys(cardapio).filter(cat => cat !== "Opcionais");

        categoriasParaRenderizar.forEach(categoria => {
            const link = document.createElement('a');
            link.href = `#${categoria.toLowerCase().replace(/ /g, '-')}`;
            link.textContent = categoria;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                link.classList.add('active');
                document.getElementById(categoria.toLowerCase().replace(/ /g, '-')).scrollIntoView({ behavior: 'smooth' });
            });
            navLinks.appendChild(link);

            // Seção de itens
            const section = document.createElement('section');
            section.id = categoria.toLowerCase().replace(/ /g, '-');
            section.classList.add('menu-section');
            section.innerHTML = `<h2>${categoria}</h2>`;

            const grid = document.createElement('div');
            grid.classList.add('item-grid');

            cardapio[categoria].forEach(item => {
                const card = document.createElement('div');
                card.classList.add('item-card');
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
        });

        // Torna a primeira categoria ativa por padrão
        const primeiraCategoriaLink = navLinks.querySelector('a');
        if (primeiraCategoriaLink) {
            primeiraCategoriaLink.classList.add('active');
        }
    };

    // Função para renderizar o modal de adicionais
    const renderizarAdicionais = () => {
        adicionaisOpcoes.innerHTML = '';
        cardapio["Opcionais"].forEach(adicional => {
            const adicionalCard = document.createElement('div');
            adicionalCard.classList.add('adicional-card');
            adicionalCard.innerHTML = `
                <img src="${adicional.imagem}" alt="${adicional.nome}">
                <div class="adicional-info">
                    <span>${adicional.nome}</span>
                    <span class="price">R$ ${adicional.preco.toFixed(2).replace('.', ',')}</span>
                </div>
                <div class="adicional-actions">
                    <button class="btn-decrease-adicional" data-id="${adicional.id}">-</button>
                    <span id="adicional-count-${adicional.id}">0</span>
                    <button class="btn-increase-adicional" data-id="${adicional.id}">+</button>
                </div>
            `;
            adicionaisOpcoes.appendChild(adicionalCard);
        });
    };

    // Função para adicionar item ao carrinho
    const adicionarAoCarrinho = (item, categoria) => {
        const itemExistente = carrinho.find(c => c.item.id === item.id);
        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            carrinho.push({ item, quantidade: 1, adicionais: [], observacao: '' });
        }
        mostrarNotificacao(`${item.nome} adicionado ao carrinho!`);
        atualizarCarrinho();
    };

    // Função para atualizar o modal do carrinho
    const atualizarCarrinho = () => {
        carrinhoItens.innerHTML = '';
        let total = 0;
        if (carrinho.length === 0) {
            carrinhoVazio.style.display = 'block';
            finalizarPedidoBtn.disabled = true;
        } else {
            carrinhoVazio.style.display = 'none';
            finalizarPedidoBtn.disabled = false;
            carrinho.forEach(c => {
                let precoItem = c.item.preco * c.quantidade;
                const adicionaisTexto = c.adicionais.map(a => `${a.nome} (${a.quantidade})`).join(', ');
                const observacaoTexto = c.observacao ? `<br>Obs: ${c.observacao}` : '';
                
                c.adicionais.forEach(adicional => {
                    precoItem += adicional.preco * adicional.quantidade;
                });
                total += precoItem;

                const itemDiv = document.createElement('div');
                itemDiv.classList.add('carrinho-item');
                itemDiv.innerHTML = `
                    <p>${c.item.nome} (${c.quantidade}) R$ ${precoItem.toFixed(2).replace('.', ',')}
                    ${adicionaisTexto ? `<br><small>Opcionais: ${adicionaisTexto}</small>` : ''}
                    ${observacaoTexto}</p>
                    <div class="carrinho-actions">
                        <button class="btn-decrease" data-id="${c.item.id}">-</button>
                        <button class="btn-increase" data-id="${c.item.id}">+</button>
                        <button class="btn-remove" data-id="${c.item.id}"><i class="fas fa-trash"></i></button>
                    </div>
                `;
                carrinhoItens.appendChild(itemDiv);
            });
        }
        totalPedido.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        contadorCarrinho.textContent = carrinho.reduce((sum, item) => sum + item.quantidade, 0);
    };

    // Função para mostrar notificação
    const mostrarNotificacao = (mensagem) => {
        notificacao.textContent = mensagem;
        notificacao.classList.add('show');
        setTimeout(() => {
            notificacao.classList.remove('show');
        }, 3000);
    };

    // Função para gerar mensagem de pedido
    const gerarMensagemPedido = () => {
        const total = carrinho.reduce((sum, item) => {
            let precoItem = item.item.preco * item.quantidade;
            item.adicionais.forEach(a => {
                precoItem += a.preco * a.quantidade;
            });
            return sum + precoItem;
        }, 0);

        let mensagem = `Olá, gostaria de fazer o seguinte pedido:\n\n`;
        carrinho.forEach(c => {
            const nomeItem = c.item.nome;
            const quantidade = c.quantidade;
            const preco = (c.item.preco * c.quantidade).toFixed(2).replace('.', ',');
            const adicionais = c.adicionais.map(a => `  - ${a.nome} (${a.quantidade}) (R$ ${(a.preco * a.quantidade).toFixed(2).replace('.', ',')})`).join('\n');
            const observacao = c.observacao ? `  - Observação: ${c.observacao}` : '';
            mensagem += `${quantidade}x ${nomeItem} (R$ ${preco})\n${adicionais}\n${observacao}\n\n`;
        });

        mensagem += `Total: R$ ${total.toFixed(2).replace('.', ',')}\n\n`;
        mensagem += `*Forma de Pagamento:* ${formaPagamento.value}\n`;

        if (observacoesGerais.value) {
            mensagem += `*Observações Gerais:* ${observacoesGerais.value}\n`;
        }
        
        const endereco = `*Endereço:*
        - Rua: ${campoRua.value}
        - Número: ${campoNumero.value}
        - Bairro: ${campoBairro.value}
        - Observação: ${observacoesGerais.value}`;

        mensagem += endereco;

        return encodeURIComponent(mensagem);
    };

    // Event Listeners
    abrirCardapioVisual.addEventListener('click', mostrarCardapio);

    document.getElementById('menu-container').addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add')) {
            const itemId = parseInt(e.target.dataset.id);
            const categoria = e.target.dataset.categoria;
            const item = cardapio[categoria].find(i => i.id === itemId);

            itemSelecionado = {
                item: item,
                quantidade: 1,
                adicionais: [],
                observacao: ''
            };

            if (categoriasComAdicionais.includes(categoria)) {
                renderizarAdicionais();
                adicionaisModal.style.display = 'flex';
            } else {
                adicionarAoCarrinho(item, categoria);
            }
        }
    });

    confirmarAdicionaisBtn.addEventListener('click', () => {
        const adicionaisEscolhidos = [];
        document.querySelectorAll('.adicional-actions').forEach(actions => {
            const id = actions.querySelector('button').dataset.id;
            const quantidade = parseInt(actions.querySelector(`#adicional-count-${id}`).textContent);
            if (quantidade > 0) {
                const adicional = cardapio.Opcionais.find(a => a.id === parseInt(id));
                adicionaisEscolhidos.push({ ...adicional, quantidade });
            }
        });

        itemSelecionado.adicionais = adicionaisEscolhidos;
        itemSelecionado.observacao = observacaoItem.value;

        const itemExistente = carrinho.find(c => c.item.id === itemSelecionado.item.id);
        if (itemExistente) {
            itemExistente.quantidade++;
            itemExistente.adicionais = itemSelecionado.adicionais;
            itemExistente.observacao = itemSelecionado.observacao;
        } else {
            carrinho.push(itemSelecionado);
        }

        adicionaisModal.style.display = 'none';
        mostrarNotificacao(`${itemSelecionado.item.nome} adicionado ao carrinho!`);
        atualizarCarrinho();
    });

    adicionaisOpcoes.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

        const id = btn.dataset.id;
        const countSpan = document.getElementById(`adicional-count-${id}`);
        let count = parseInt(countSpan.textContent);

        if (btn.classList.contains('btn-increase-adicional')) {
            count++;
        } else if (btn.classList.contains('btn-decrease-adicional') && count > 0) {
            count--;
        }
        countSpan.textContent = count;
    });

    abrirCarrinhoBtn.addEventListener('click', () => {
        carrinhoModal.style.display = 'flex';
        atualizarCarrinho();
    });

    fecharModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            carrinhoModal.style.display = 'none';
            adicionaisModal.style.display = 'none';
        });
    });

    carrinhoModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-remove')) {
            const itemId = parseInt(e.target.dataset.id);
            carrinho = carrinho.filter(c => c.item.id !== itemId);
            atualizarCarrinho();
            mostrarNotificacao("Item removido do carrinho.");
        } else if (e.target.classList.contains('btn-increase')) {
            const itemId = parseInt(e.target.dataset.id);
            const item = carrinho.find(c => c.item.id === itemId);
            if (item) {
                item.quantidade++;
                atualizarCarrinho();
            }
        } else if (e.target.classList.contains('btn-decrease')) {
            const itemId = parseInt(e.target.dataset.id);
            const item = carrinho.find(c => c.item.id === itemId);
            if (item && item.quantidade > 1) {
                item.quantidade--;
                atualizarCarrinho();
            }
        }
    });

    finalizarPedidoBtn.addEventListener('click', () => {
        const mensagem = gerarMensagemPedido();
        const numeroWhatsapp = "55SEUNUMERODOTELEFONECOMDDD"; // Substitua pelo seu número de telefone
        const url = `https://api.whatsapp.com/send?phone=${numeroWhatsapp}&text=${mensagem}`;
        window.open(url, '_blank');
    });

    hamburgerMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    btnLocalizacao.addEventListener('click', () => {
        if (navigator.geolocation) {
            localizacaoStatus.textContent = 'Buscando sua localização...';
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    localizacaoStatus.textContent = 'Localização encontrada!';
                    const { latitude, longitude } = position.coords;
                    // Você pode usar um serviço de geocodificação reversa aqui (como Google Maps API, Nominatim, etc.)
                    // para converter as coordenadas em um endereço. Por enquanto, vamos preencher com um texto de exemplo.
                    const enderecoExemplo = `Latitude: ${latitude}, Longitude: ${longitude}`;
                    campoRua.value = enderecoExemplo;
                    campoNumero.value = 'N/A';
                    campoBairro.value = 'N/A';
                },
                (error) => {
                    localizacaoStatus.textContent = 'Não foi possível obter a localização. Por favor, preencha manualmente.';
                    console.error('Erro de geolocalização:', error);
                }
            );
        } else {
            localizacaoStatus.textContent = 'Geolocalização não é suportada pelo seu navegador.';
        }
    });

    // Inicialização
    renderizarCardapio();
    atualizarCarrinho();
});
