const cardapioData = {
    'Hambúrgueres Artesanais': [
        {
            id: 1,
            nome: 'Smash Original',
            descricao: 'Pão, carne 80g prensada na chapa, queijo muçarela, cebola caramelizada, alface, tomate e molho da casa.',
            preco: 18.99,
            imagem: 'imagem_cardapio/smash_original.jpeg'
        },
        {
            id: 2,
            nome: 'Smash Duplo',
            descricao: 'Pão, 2 carnes 80g prensadas na chapa, 2 queijos muçarela, cebola caramelizada, alface, tomate e molho da casa.',
            preco: 24.99,
            imagem: 'imagem_cardapio/smash_duplo.jpeg'
        },
        {
            id: 3,
            nome: 'Jotta Básico',
            descricao: 'Pão, carne 80g prensada na chapa com cebola, queijo muçarela e molho de casa',
            preco: 14.99,
            imagem: 'imagem_cardapio/jotta_basico.jpeg'
        },
        {
            id: 4,
            nome: 'Jotta Classic',
            descricao: 'Pão, carne de 120g,bacon, molho barbecue, tomate, alface e queijo muçarela',
            preco: 25.99,
            imagem: 'imagem_cardapio/jotta_classic.jpeg'
        },
        {
            id: 5,
            nome: 'Burguer do Xerife',
            descricao: 'Pão, carne de 120g, requeijão, e farofa de bacon',
            preco: 22.99,
            imagem: 'imagem_cardapio/burguer_do_xerife.jpeg'
        },
        {
            id: 6,
            nome: 'Duplo Brutão',
            descricao: 'Pão, 2 carnes de 120g, requeijão, molho da casa, 2 fatias de bacon.',
            preco: 37.99,
            imagem: 'imagem_cardapio/duplo_brutao.jpeg'
        },
        {
            id: 7,
            nome: 'Calabresa Prime',
            descricao: 'Pão, molho da casa, carne de 120g, alface, tomate, calabresa, queijo muçarela, e cebola caramelizada.',
            preco: 26.99,
            imagem: 'imagem_cardapio/calabresa_prime.jpeg'
        },
        {
            id: 9,
            nome: 'Calabresa Básico',
            descricao: 'Pão, molho da casa, calabresa e queijo muçarela.',
            preco: 15.99,
            imagem: 'imagem_cardapio/calabresa_basico.jpeg'
        }
    ],
    'Combos': [
        {
            id: 10,
            nome: 'Combo Smash Individual',
            descricao: '1 smash original, batata-frita e refrigerante em lata.',
            preco: 31.99,
            imagem: 'imagem_cardapio/combo_familia.jpeg'
        },
        {
            id: 11,
            nome: 'Combo Smash Casal',
            descricao: '2 smash original, batata-frita, 1 Refrigerante de 1L.',
            preco: 49.99,
            imagem: 'imagem_cardapio/combo_duplo.jpeg'
        },
        {
            id: 12,
            nome: 'Combo Smash Família',
            descricao: '4 smash original, batata-frita, 1 Refrigerante de 1L.',
            preco: 87.99,
            imagem: 'imagem_cardapio/combo_duplo.jpeg'
        },
       {
            id: 13,
            nome: 'Combo do chef individual',
            descricao: '1 Jotta Classic, batata-frita, 1 Refrigerante em lata.',
            preco: 41.99,
            imagem: 'imagem_cardapio/combo_duplo.jpeg'
        },
         {
            id: 14,
            nome: 'Combo do chef Casal',
            descricao: '2 Jotta Classic, batata-frita, 1 Refrigerante de 1L.',
            preco: 63.99,
            imagem: 'imagem_cardapio/combo_duplo.jpeg'
        },
         {
            id: 15,
            nome: 'Combo do chef Família',
            descricao: '4 Jotta Classic, batata-frita, 1 Refrigerante de 1L.',
            preco: 115.99,
            imagem: 'imagem_cardapio/combo_duplo.jpeg'
        },
        {
            id: 16,
            nome: 'Combo Smash Duplo Individual',
            descricao: '1 smash duplo, batata-frita, 1 refrigerante em lata.',
            preco: 37.99,
            imagem: 'imagem_cardapio/combo_duplo.jpeg'
        },
         {
            id: 17,
            nome: 'Combo Smash Duplo Casal',
            descricao: '2 smash duplo, batata-frita, 1 refrigerante de 1L.',
            preco: 61.99,
            imagem: 'imagem_cardapio/combo_duplo.jpeg'
        },
        {
            id: 18,
            nome: 'Combo Smash Duplo Família',
            descricao: '4 smash duplo, batata-frita, 1 refrigerante de 1L.',
            preco: 111.99,
            imagem: 'imagem_cardapio/combo_duplo.jpeg'
        },
         {
            id: 19,
            nome: 'Combo Premium Individual',
            descricao: '1 Duplo brutão, batata-frita, 1 refrigerante em lata.',
            preco: 53.99,
            imagem: 'imagem_cardapio/combo_duplo.jpeg'
        },
         {
            id: 20,
            nome: 'Combo Premium Casal',
            descricao: '2 Duplo brutão, batata-frita, 1 refrigerante de 1L.',
            preco: 87.99,
            imagem: 'imagem_cardapio/combo_duplo.jpeg'
        },
        {
            id: 21,
            nome: 'Combo Premium Família',
            descricao: '4 Duplo brutão, batata-frita, 1 refrigerante de 1L.',
            preco: 154.99,
            imagem: 'imagem_cardapio/combo_duplo.jpeg'
        }
    ],
    'Acompanhamentos': [
        {
            id: 12,
            nome: 'Batata Frita palito',
            descricao: 'Batata frita com molho da casa.',
            preco: 15.00,
            imagem: 'imagem_cardapio/batata_frita.jpeg'
        },
        {
            id: 13,
            nome: 'Batata com queijo muçarela',
            descricao: 'Batata palito frita coberta por queijo muçarala derretido.',
            preco: 18.00,
            imagem: 'imagem_cardapio/onion_rings.jpeg'
        }
    ],
    'Bebidas': [
        {
            id: 14,
            nome: 'Coca-Cola',
            descricao: 'Lata 350ml.',
            preco: 7.00,
            imagem: 'imagem_cardapio/cocalata.jpeg'
        },
        {
            id: 15,
            nome: 'Guaraná',
            descricao: 'Lata 350ml.',
            preco: 6.00,
            imagem: 'imagem_cardapio/guaranalata.jpeg'
        },
         {
            id: 15,
            nome: 'Guaraná 1L',
            descricao: '1L.',
            preco: 8.00,
            imagem: 'imagem_cardapio/guarana1l.jpeg'
        },
        {
            id: 16,
            nome: 'Pespi 1L',
            descricao: '1L.',
            preco: 8.00,
            imagem: 'imagem_cardapio/pepsi1l.jpeg'
        }
    ],
    'Adicionais': [
        {
            id: 17,
            nome: 'Requeijão cremoso',
            preco: 4.00,
            imagem: ''
        },
        {
            id: 18,
            nome: 'Queijo Muçarela',
            preco: 4.00,
            imagem: ''
        },
        {
            id: 19,
            nome: 'Bacon',
            preco: 4.00,
            imagem: ''
        },
        {
            id: 20,
            nome: 'Bacon em cubos',
            preco: 4.00,
            imagem: ''
        },
        {
            id: 22,
            nome: 'Molho Barbecue',
            preco: 2.00,
            imagem: ''
        },
        {
            id: 23,
            nome: 'Molho da Casa',
            preco: 2.00,
            imagem: ''
        },
        {
            id: 24,
            nome: 'Calabresa',
            preco: 5.00,
            imagem: ''
        }
    ]
};
