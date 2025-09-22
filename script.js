document.addEventListener('DOMContentLoaded', () => {
    let cardapio = {};
    let carrinho = [];
    let itemSelecionado = {};

    // Elementos do DOM
    const navLinks = document.getElementById('nav-links');
    const menuContainer = document.getElementById('main-content');
    const hamburgerMenuBtn = document.querySelector('.hamburger-menu-btn');
    const carrinhoModal = document.getElementById('carrinho-modal');
    const adicionaisModal = document.getElementById('adicionais-modal');
    const carrinhoItensContainer = document.getElementById('carrinho-itens');
    const valorTotal = document.getElementById('valor-total');
    const contadorCarrinho = document.getElementById('contador-carrinho');
    const confirmarAdicionaisBtn = document.getElementById('confirmar-adicionais');
    const adicionaisOpcoesUl = document.getElementById('adicionais-opcoes');
    const observacaoItemTextarea = document.getElementById('observacao-item');
    const finalizarPedidoBtn = document.querySelector('.btn-principal');
    const nomeClienteInput = document.getElementById('nome-cliente');
    const enderecoClienteInput = document.getElementById('endereco-cliente');
    const telefoneClienteInput = document.getElementById('telefone-cliente');

    // Mapeamento de categorias que possuem adicionais
    const categoriasComAdicionais = ["Hambúrguer Artesanal", "Acompanhamentos"];

    // Funções de manipulação do localStorage
    const salvarCarrinho = () => {
        localStorage.setItem('carrinhoJottaV', JSON.stringify(carrinho));
    };

    const carregarCarrinho = () => {
        const carrinhoSalvo = localStorage.getItem('carrinhoJottaV');
        if (carrinhoSalvo) {
            carrinho = JSON.parse(carrinhoSalvo);
            atualizarCarrinho();
        }
    };

    // Função para carregar o cardápio do arquivo JSON
    const carregarCardapio = async () => {
        try {
            const response = await fetch('imagem_cardapio/cardapio.json');
            if (!response.ok) {
                throw new Error(`Erro ao carregar o cardápio: ${response.status} ${response.statusText}`);
            }
            cardapio = await response.json();
            renderizarCardapio();
            carregarCarrinho();
        } catch (error) {
            console.error('Erro ao carregar o cardápio:', error);
            alert('Não foi possível carregar o cardápio. Verifique se o arquivo cardapio.json existe e está na pasta correta.');
        }
    };

    // Renderiza o cardápio na página
    const renderizarCardapio = () => {
        if (!menuContainer || !navLinks) {
            console.error("Erro: Elementos principais do cardápio não encontrados.");
            return;
        }

        menuContainer.innerHTML = '';
        navLinks.innerHTML = '';

        // Filtra as categorias para renderizar, excluindo "Opcionais"
        const categoriasParaRenderizar = Object.keys(cardapio).filter(cat => cat !== "Opcionais");

        categoriasParaRenderizar.forEach(categoria => {
            // Cria os links de navegação para cada categoria
            const link = document.createElement('a');
            link.href = `#${categoria.toLowerCase().replace(/ /g, '-')}`;
            link.textContent = categoria;
            link.classList.add('nav-link');
            if (categoria === categoriasParaRenderizar[0]) {
                link.classList.add('active');
            }
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
                link.classList.add('active');
                document.getElementById(categoria.toLowerCase().replace(/ /g, '-')).scrollIntoView({ behavior: 'smooth' });
                toggleMenu(true);
            });
            navLinks.appendChild(link);

            // Cria a seção e o grid para os itens da categoria
            const section = document.createElement('section');
            section.id = categoria.toLowerCase().replace(/ /g, '-');
            section.classList.add('menu-section');
            section.innerHTML = `<h2>${categoria}</h2><div class="item-grid"></div>`;
            
            const itemGrid = section.querySelector('.item-grid');
            cardapio[categoria].forEach(item => {
                const card = document.createElement('div');
                card.classList.add('item-card');
                card.setAttribute('data-item-id', item.id);
                
                const imagemSrc = `imagem_cardapio/${item.imagem}`; 
                card.innerHTML = `
                    <img src="${imagemSrc}" alt="${item.nome}" onerror="this.onerror=null;this.src='https://via.placeholder.com/280';">
                    <h3>${item.nome}</h3>
                    <p>${item.descricao}</p>
                    <span class="price">R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
                    <button class="btn-add">Adicionar</button>
                `;
                
                itemGrid.appendChild(card);

                const btnAdd = card.querySelector('.btn-add');
                btnAdd.addEventListener('click', () => {
                    adicionarAoCarrinho(item, categoria);
                });
            });

            menuContainer.appendChild(section);
        });
    };

    // Adiciona um item ao carrinho, verificando se há adicionais
    const adicionarAoCarrinho = (item, categoria) => {
        itemSelecionado = { ...item, categoria, adicionais: [], observacao: '' };
        
        const temAdicionais = cardapio.Opcionais && categoriasComAdicionais.includes(categoria);

        if (temAdicionais) {
            abrirModalAdicionais(item);
        } else {
            carrinho.push(itemSelecionado);
            atualizarCarrinho();
            mostrarNotificacao(`${item.nome} adicionado ao carrinho!`);
        }
    };

    // Atualiza a visualização do carrinho e salva no localStorage
    const atualizarCarrinho = () => {
        carrinhoItensContainer.innerHTML = '';
        let total = 0;
        
        if (carrinho.length === 0) {
            carrinhoItensContainer.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio.</p>';
        } else {
            carrinho.forEach((item, index) => {
                let precoItem = item.preco;
                
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('carrinho-item');

                const itemInfo = document.createElement('p');
                itemInfo.textContent = item.nome;
                
                if (item.adicionais && item.adicionais.length > 0) {
                    itemInfo.innerHTML += '<br><small>Adicionais: </small>';
                    item.adicionais.forEach(adicional => {
                        precoItem += adicional.preco * adicional.quantidade;
                        itemInfo.innerHTML += `<br> - ${adicional.nome} (${adicional.quantidade}x)`;
                    });
                }
                
                if (item.observacao) {
                    itemInfo.innerHTML += `<br><small>Observação: ${item.observacao}</small>`;
                }
                
                itemDiv.appendChild(itemInfo);

                const itemActions = document.createElement('div');
                itemActions.classList.add('carrinho-actions');
                
                const precoSpan = document.createElement('span');
                precoSpan.textContent = `R$ ${precoItem.toFixed(2).replace('.', ',')}`;
                itemActions.appendChild(precoSpan);
                
                const removeBtn = document.createElement('button');
                removeBtn.classList.add('btn-remove');
                removeBtn.setAttribute('data-index', index);
                removeBtn.innerHTML = '&times;';
                removeBtn.addEventListener('click', () => removerDoCarrinho(index));
                itemActions.appendChild(removeBtn);

                itemDiv.appendChild(itemActions);
                carrinhoItensContainer.appendChild(itemDiv);
                total += precoItem;
            });
        }
        
        contadorCarrinho.textContent = carrinho.length;
        valorTotal.textContent = total.toFixed(2).replace('.', ',');
        finalizarPedidoBtn.disabled = carrinho.length === 0;
        salvarCarrinho();
    };

    // Remove um item do carrinho
    const removerDoCarrinho = (index) => {
        carrinho.splice(index, 1);
        atualizarCarrinho();
    };

    // Abre o modal de adicionais
    const abrirModalAdicionais = (item) => {
        adicionaisOpcoesUl.innerHTML = '';
        observacaoItemTextarea.value = '';

        cardapio.Opcionais.forEach(adicional => {
            const li = document.createElement('li');
            li.classList.add('adicional-item');
            li.setAttribute('data-adicional-id', adicional.id);
            li.innerHTML = `
                <div class="adicional-info">
                    <img src="imagem_cardapio/${adicional.imagem}" alt="${adicional.nome}" onerror="this.onerror=null;this.src='https://via.placeholder.com/50';">
                    <div>
                        <span>${adicional.nome}</span>
                        <span>R$ ${adicional.preco.toFixed(2).replace('.', ',')}</span>
                    </div>
                </div>
                <div class="adicional-actions">
                    <button class="btn-decrease">-</button>
                    <span class="adicional-quantidade">0</span>
                    <button class="btn-increase">+</button>
                </div>
            `;
            adicionaisOpcoesUl.appendChild(li);
        });

        adicionaisModal.style.display = 'flex';
    };

    // Fecha o modal de adicionais
    const fecharModalAdicionais = () => {
        adicionaisModal.style.display = 'none';
        itemSelecionado = {};
    };

    // Abre o modal do carrinho
    const abrirModalCarrinho = () => {
        atualizarCarrinho();
        carrinhoModal.style.display = 'flex';
    };

    // Fecha o modal do carrinho
    const fecharModalCarrinho = () => {
        carrinhoModal.style.display = 'none';
    };

    // Exibe notificação de confirmação
    const mostrarNotificacao = (mensagem) => {
        const notificacaoElement = document.createElement('div');
        notificacaoElement.classList.add('notificacao');
        notificacaoElement.textContent = mensagem;
        document.body.appendChild(notificacaoElement);

        setTimeout(() => {
            notificacaoElement.classList.add('show');
        }, 10);

        setTimeout(() => {
            notificacaoElement.classList.remove('show');
            setTimeout(() => {
                notificacaoElement.remove();
            }, 500);
        }, 3000);
    };

    // Finaliza o pedido e envia para o WhatsApp
    const finalizarPedido = () => {
        const nome = nomeClienteInput.value.trim();
        const endereco = enderecoClienteInput.value.trim();
        const telefone = telefoneClienteInput.value.trim();
        const formaPagamento = document.getElementById('forma-pagamento').value;

        if (!nome || !endereco || !telefone) {
            alert("Por favor, preencha todos os dados de entrega.");
            return;
        }

        let mensagem = `*Novo Pedido - JottaV Burguer*\n\n`;
        mensagem += `*Dados do Cliente:*\n`;
        mensagem += `Nome: ${nome}\n`;
        mensagem += `Endereço: ${endereco}\n`;
        mensagem += `Telefone: ${telefone}\n\n`;
        mensagem += `*Itens do Pedido:*\n\n`;

        let total = 0;
        carrinho.forEach(item => {
            let precoItem = item.preco;
            let observacao = item.observacao ? `\n(Obs: ${item.observacao})` : '';

            mensagem += `- ${item.nome}${observacao}\n`;

            if (item.adicionais && item.adicionais.length > 0) {
                mensagem += `  Adicionais:\n`;
                item.adicionais.forEach(adicional => {
                    precoItem += adicional.preco * adicional.quantidade;
                    mensagem += `  - ${adicional.nome} (${adicional.quantidade}x) - R$ ${(adicional.preco * adicional.quantidade).toFixed(2).replace('.', ',')}\n`;
                });
            }
            mensagem += `  Preço: R$ ${precoItem.toFixed(2).replace('.', ',')}\n\n`;
            total += precoItem;
        });

        mensagem += `*Total do Pedido: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
        mensagem += `*Forma de Pagamento:* ${formaPagamento}`;

        const numeroWhatsapp = "5586994253258"; 
        const linkWhatsapp = `https://api.whatsapp.com/send?phone=${numeroWhatsapp}&text=${encodeURIComponent(mensagem)}`;
        window.open(linkWhatsapp, '_blank');
        
        // Limpa o carrinho, fecha o modal e remove do localStorage
        carrinho = [];
        salvarCarrinho();
        atualizarCarrinho();
        fecharModalCarrinho();
    };

    // Toggle do menu hambúrguer para mobile
    const toggleMenu = (forceClose = false) => {
        if (forceClose) {
            navLinks.classList.remove('active');
        } else {
            navLinks.classList.toggle('active');
        }
    };

    // Event listeners para os botões do modal de adicionais
    adicionaisOpcoesUl.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        
        const itemLi = btn.closest('.adicional-item');
        const quantidadeSpan = itemLi.querySelector('.adicional-quantidade');
        let quantidade = parseInt(quantidadeSpan.textContent);

        if (btn.classList.contains('btn-increase')) {
            quantidade++;
        } else if (btn.classList.contains('btn-decrease') && quantidade > 0) {
            quantidade--;
        }
        quantidadeSpan.textContent = quantidade;
    });

    confirmarAdicionaisBtn.addEventListener('click', () => {
        const adicionaisSelecionados = [];
        document.querySelectorAll('.adicional-item').forEach(li => {
            const id = parseInt(li.getAttribute('data-adicional-id'));
            const quantidade = parseInt(li.querySelector('.adicional-quantidade').textContent);
            if (quantidade > 0) {
                const adicional = cardapio.Opcionais.find(op => op.id === id);
                if (adicional) {
                    adicionaisSelecionados.push({
                        ...adicional,
                        quantidade: quantidade
                    });
                }
            }
        });
        
        itemSelecionado.adicionais = adicionaisSelecionados;
        itemSelecionado.observacao = observacaoItemTextarea.value.trim();
        
        carrinho.push(itemSelecionado);
        atualizarCarrinho();
        fecharModalAdicionais();
        mostrarNotificacao(`${itemSelecionado.nome} adicionado com sucesso!`);
    });

    // Inicia o carregamento do cardápio
    carregarCardapio();
});
