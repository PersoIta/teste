// js/produtos.js - USE IMAGENS QUE EXISTEM

const produtos = [
    // Canecas
    {
        id: 1,
        nome: "Caneca Porcelana Personalizada",
        categoria: "canecas",
        subcategoria: "ceramica",
        descricao: "Caneca de porcelana de alta qualidade, perfeita para personalização com sua foto ou texto. Capacidade de 350ml.",
        preco: 35.00,
        precoOriginal: 39.90,
        imagem: "assets/images/produtos/canecas/caneca-01.png",
        emDestaque: false,
        estoque: 50,
        avaliacao: 4.5
    },
    {
        id: 2,
        nome: "Caneca Mágica",
        categoria: "canecas",
        subcategoria: "magica",
        descricao: "Caneca mágica que muda de cor com líquidos quentes. Surpreenda-se com o efeito!",
        preco: 45.00,
        precoOriginal: 59.90,
        imagem: "assets/images/produtos/canecas/caneca-02.png", // SUA IMAGEM
        emDestaque: true,
        estoque: 30,
        avaliacao: 4.8
    },
        {
        id: 3,
        nome: "Caneca com Alça e Interior Colorido",
        categoria: "canecas",
        subcategoria: "interiorColorido",
        descricao: "Caneca com alça e interior coloridos. Design moderno e ideal para o dia a dia.",
        preco: 39.90,
        precoOriginal: 49.90,
        imagem: "assets/images/produtos/canecas/caneca-03.png", // SUA IMAGEM
        emDestaque: true,
        estoque: 30,
        avaliacao: 4.8
    },
        {
        id: 7,
        nome: "Caneca Mágica que Muda de Cor",
        categoria: "camisas",
        subcategoria: "algodao",
        descricao: "Caneca mágica que muda de cor com líquidos quentes. Surpreenda-se com o efeito!",
        preco: 39.90,
        precoOriginal: 49.90,
        imagem: "assets/images/produtos/canecas/caneca-02.png", // SUA IMAGEM
        // imagem: "https://via.placeholder.com/500x500/4A6FA5/FFFFFF?text=Caneca+Mágica",
        emDestaque: true,
        estoque: 30,
        avaliacao: 4.8
    },
    {
    id: 17,
    nome: "Azulejo Quadrado Personalizado",
    categoria: "azulejos",
    subcategoria: "quadrado",
    descricao: "Azulejo cerâmico quadrado para personalização. Perfeito para cozinhas e banheiros.",
    preco: 34.90,
    imagem: "assets/images/produtos/azulejos/azulejo-01.jpg",
    emDestaque: true,
    estoque: 40,
    avaliacao: 4.3
},

// Quebra-cabeças
{
    id: 18,
    nome: "Quebra-cabeça Personalizado 100 Peças",
    categoria: "quebra-cabeca",
    subcategoria: "padrao",
    descricao: "Quebra-cabeça de 100 peças com sua foto personalizada. Diversão garantida!",
    preco: 69.90,
    precoOriginal: 89.90,
    imagem: "assets/images/produtos/quebra-cabeca/quebra-cabeca-01.jpg",
    emDestaque: true,
    estoque: 25
},

// Chinelos
{
    id: 19,
    nome: "Chinelo Branco Personalizado",
    categoria: "chinelos",
    subcategoria: "branco",
    descricao: "Chinelo branco de alta qualidade para personalização. Confortável e durável.",
    preco: 39.90,
    imagem: "assets/images/produtos/chinelos/chinelo-01.jpg",
    emDestaque: true,
    estoque: 60
}
]

// Torna disponível globalmente
if (typeof window !== 'undefined') {
    window.produtos = produtos;
}