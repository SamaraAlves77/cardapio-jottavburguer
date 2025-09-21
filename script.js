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
        { id: 9, nome: 'Calabresa Básico', descricao: 'Pão, molho da casa, calabresa e queijo muçarela.', preco: 15.00, imagem: 'calabresa_basico.jpg' }
    ],
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
        { id: 22, nome: 'Família: 4x Duplo Brutão', descricao: '4 Duplo Brutão + batata frita + Guaraná 1L.', preco: 154.99, imagem: 'imagens/familia_duplo_brutao.jpg' }
    ],
    'Acompanhamentos': [
        { id: 23, nome: 'Batata Palito', descricao: 'Porção individual de batata frita palito.', preco: 11.99, imagem: 'imagens/batata_palito_nova.jpg' }
    ]
};
