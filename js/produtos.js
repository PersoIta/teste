// js/produtos.js - USE IMAGENS QUE EXISTEM

// No seu produtos.js, adicione esta função
function getSafeImagePath(imagePath) {
    // Verificar se a imagem existe, se não, usar placeholder
    return imagePath; // Por enquanto, retorna o caminho original
}

const produtos = [
    // Canecas
    {
        id: 1,
        nome: "Caneca de Polimero",
        categoria: "canecas",
        subcategoria: "polimero",
        descricao: "Caneca de polimero resistente, ideal para crianças",
        preco: 35.00,
        precoOriginal: 35.00,
        imagem: "assets/images/produtos/canecas/polimero.jpg", // SUA IMAGEM
        emDestaque: false,
        estoque: 30,
        avaliacao: 4.8
    },
    {
        id: 2,
        nome: "Caneca de Porcelana",
        categoria: "canecas",
        subcategoria: "ceramica",
        descricao: "Caneca de porcelana de alta qualidade, perfeita para personalização com sua foto ou texto. Capacidade de 350ml.",
        preco: 39.90,
        precoOriginal: 44.90,
        imagem: "assets/images/produtos/canecas/caneca-01.png",
        emDestaque: true,
        estoque: 50,
        avaliacao: 4.5
    },
    {
        id: 3,
        nome: "Caneca Mágica",
        categoria: "canecas",
        subcategoria: "magica",
        descricao: "Caneca mágica que muda de cor com líquidos quentes. Surpreenda-se com o efeito!",
        preco: 49.90,
        precoOriginal: 54.90,
        imagem: "assets/images/produtos/canecas/caneca-02.png", // SUA IMAGEM
        emDestaque: true,
        estoque: 30,
        avaliacao: 4.8
    },
    {
        id: 4,
        nome: "Caneca com Alça e Interior Colorido",
        categoria: "canecas",
        subcategoria: "interiorColorido",
        descricao: "Caneca com alça e interior coloridos. Design moderno e ideal para o dia a dia.",
        preco: 45.00,
        precoOriginal: 45.00,
        imagem: "assets/images/produtos/canecas/caneca-03.png", // SUA IMAGEM
        emDestaque: true,
        estoque: 30,
        avaliacao: 4.8
    },
    {
        id: 5,
        nome: "Caneca com Alça de Coração e Interior Colorido",
        categoria: "canecas",
        subcategoria: "alcaCoracao",
        descricao: "Caneca com alça em formato de coração e interior colorido. Design moderno e ideal para o dia a dia.",
        preco: 50.00,
        precoOriginal: 50.00,
        imagem: "assets/images/produtos/canecas/alca-coracao.jpg", // SUA IMAGEM
        emDestaque: false,
        estoque: 30,
        avaliacao: 4.8
    },
    // Camisas
    {
        id: 6,
        nome: "Camisa Personalizada Branca",
        categoria: "camisas",
        subcategoria: "poliester",
        descricao: "Camisa de poliester branca personalizada com nomes, frases e muito mais!",
        preco: 35.00,
        precoOriginal: 35.00,
        imagem: "assets/images/produtos/camisas/camisa-01.jpg",
        emDestaque: true,
        estoque: 30,
        avaliacao: 4.8
    },
    {
        id: 7,
        nome: "Camisa Personalizada Cinza",
        categoria: "camisas",
        subcategoria: "poliester",
        descricao: "Camisa de poliester cinza personalizada com nomes, frases e muito mais!",
        preco: 35.00,
        precoOriginal: 35.00,
        imagem: "assets/images/produtos/camisas/camisa-cinza.jpg",
        emDestaque: false,
        estoque: 30,
        avaliacao: 4.8
    },
    //Body
    {
        id: 8,
        nome: "Body Infantil",
        categoria: "camisas",
        subcategoria: "poliester",
        descricao: "Body infantil para momentos especiais com seu nenem!",
        preco: 35.00,
        precoOriginal: 35.00,
        imagem: "assets/images/produtos/camisas/body-infantil.jpg",
        emDestaque: true,
        estoque: 30,
        avaliacao: 4.8
    },
    // Placas Acrilico
    {
        id: 9,
        nome: "Placa Acrilico Branca",
        categoria: "placas",
        subcategoria: "branca",
        descricao: "Placa de Acrilico Branca, ideal para presentes ou utilização de QR-Code de pagamentos para empresas",
        preco: 35.00,
        precoOriginal: 35.00,
        imagem: "assets/images/produtos/placas/placa-branca.jpg",
        emDestaque: true,
        estoque: 30,
        avaliacao: 4.8
    },
    {
        id: 10,
        nome: "Placa Acrilico Transparente",
        categoria: "placas",
        subcategoria: "transparente",
        descricao: "Placa de Acrilico Transparente, ideal para presentes ou utilização de QR-Code de pagamentos para empresas",
        preco: 35.00,
        precoOriginal: 35.00,
        imagem: "assets/images/produtos/placas/placa-transparente.jpg",
        emDestaque: false,
        estoque: 30,
        avaliacao: 4.8
    },     
    //CHAVEIROS
        {
        id: 11,
        nome: "Chaveiro MDF",
        categoria: "chaveiros",
        subcategoria: "madeira",
        descricao: "Chaveiro de MDF ideal para presente com fotos e datas",
        preco: 7.00,
        precoOriginal: 7.00,
        imagem: "assets/images/produtos/chaveiros/chaveiros.jpg",
        emDestaque: false,
        estoque: 30,
        avaliacao: 4.8
    },
    {
        id: 12,
        nome: "Chaveiro Acrilico",
        categoria: "chaveiros",
        subcategoria: "acrilico",
        descricao: "Chaveiro de Acrilico ideal para presente com fotos e frases",
        preco: 7.00,
        precoOriginal: 7.00,
        imagem: "assets/images/produtos/chaveiros/chaveiro-acrilico.jpg",
        emDestaque: false,
        estoque: 30,
        avaliacao: 4.8
    },
    // Mouse Pad
    {
        id: 13,
        nome: "Mouse Pad Branco",
        categoria: "mouse-pad",
        subcategoria: "mouse-pad",
        descricao: "Mouse Pad Personalizado",
        preco: 40.00,
        precoOriginal: 44.90,
        imagem: "assets/images/produtos/mouse-pad/mouse-pad.jpg",
        emDestaque: false,
        estoque: 30,
        avaliacao: 4.8
    },   
    // Azulejos
    {
        id: 17,
        nome: "Azulejo Quadrado Personalizado",
        categoria: "azulejos",
        subcategoria: "quadrado",
        descricao: "Azulejo cerâmico quadrado para personalização. Perfeito para casamentos e decoração.",
        preco: 34.90,
        imagem: "assets/images/produtos/azulejos/azulejo-01.jpg",
        emDestaque: true,
        estoque: 40,
        avaliacao: 4.3
    },
    // Quebra-cabeças
    {
        id: 18,
        nome: "Quebra-cabeça 6 peças",
        categoria: "quebra-cabeca",
        subcategoria: "padrao",
        descricao: "Quebra-cabeça com sua foto personalizada. Diversão garantida!",
        preco: 30.00,
        precoOriginal: 30.00,
        imagem: "assets/images/produtos/quebra-cabeca/6-pecas.jpg",
        emDestaque: false,
        estoque: 25
    },
    {
        id: 19,
        nome: "Quebra-cabeça 100 peças",
        categoria: "quebra-cabeca",
        subcategoria: "padrao",
        descricao: "Quebra-cabeça com sua foto personalizada. Diversão garantida!",
        preco: 35.00,
        precoOriginal: 40.00,
        imagem: "assets/images/produtos/quebra-cabeca/100-pecas.jpg",
        emDestaque: false,
        estoque: 25
    },
    // Chinelos
    {
        id: 20,
        nome: "Chinelo Branco Personalizado",
        categoria: "chinelos",
        subcategoria: "branco",
        descricao: "Chinelo branco de alta qualidade para personalização. Confortável e durável.",
        preco: 39.90,
        imagem: "assets/images/produtos/chinelos/chinelo-branco.jpg",
        emDestaque: false,
        estoque: 60
    }
]

// Torna disponível globalmente
if (typeof window !== 'undefined') {
    window.produtos = produtos;
}