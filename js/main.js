/**
 * main.js - Script principal do site PersoIta
 * Sistema completo com componentes inline e funcionalidades
 */

// ==========================================================================
// DADOS E CONFIGURAÇÕES
// ==========================================================================

// DADOS DOS PRODUTOS (fallback se produtos.js não carregar)
if (typeof produtos === 'undefined') {
    console.log('Carregando produtos fallback...');
    window.produtos = [
        {
            id: 1,
            nome: "Caneca Personalizada Premium",
            categoria: "canecas",
            descricao: "Caneca de cerâmica personalizada com sua arte ou texto.",
            preco: 29.90,
            precoOriginal: 39.90,
            imagem: "https://via.placeholder.com/500x500/4A6FA5/FFFFFF?text=Caneca+PersoIta",
            emDestaque: true,
            estoque: 50
        },
        {
            id: 2,
            nome: "Camisa de Algodão Personalizada",
            categoria: "camisas",
            descricao: "Camisa 100% algodão com estampa exclusiva de alta qualidade.",
            preco: 59.90,
            precoOriginal: 79.90,
            imagem: "https://via.placeholder.com/500x500/4A6FA5/FFFFFF?text=Camisa+PersoIta",
            emDestaque: true,
            estoque: 120
        },
        {
            id: 3,
            nome: "Chaveiro de Acrílico Personalizado",
            categoria: "chaveiros",
            descricao: "Chaveiro de acrílico com foto personalizada em alta resolução.",
            preco: 14.90,
            precoOriginal: 19.90,
            imagem: "https://via.placeholder.com/500x500/4A6FA5/FFFFFF?text=Chaveiro+PersoIta",
            emDestaque: true,
            estoque: 200
        },
        {
            id: 4,
            nome: "Placa de Acrílico Retangular",
            categoria: "placas",
            descricao: "Placa de acrílico para sinalização personalizada.",
            preco: 49.90,
            precoOriginal: 69.90,
            imagem: "https://via.placeholder.com/500x500/4A6FA5/FFFFFF?text=Placa+PersoIta",
            emDestaque: true,
            estoque: 40
        },
        {
            id: 5,
            nome: "Caneca Mágica que Muda de Cor",
            categoria: "canecas",
            descricao: "Caneca especial que muda de cor com líquidos quentes.",
            preco: 39.90,
            imagem: "https://via.placeholder.com/500x500/4A6FA5/FFFFFF?text=Caneca+Mágica",
            emDestaque: false,
            estoque: 30
        },
        {
            id: 6,
            nome: "Moletom com Capuz Personalizado",
            categoria: "camisas",
            descricao: "Moletom confortável perfeito para dias frios.",
            preco: 119.90,
            imagem: "https://via.placeholder.com/500x500/4A6FA5/FFFFFF?text=Moletom+PersoIta",
            emDestaque: true,
            estoque: 45
        }
    ];
} else {
    console.log('Produtos já carregados do produtos.js');
}

// Configurações de nomes para filtros
const categoryNames = {
    'canecas': 'Canecas Personalizadas',
    'camisas': 'Camisas Personalizadas',
    'chaveiros': 'Chaveiros Personalizados',
    'placas': 'Placas de Acrílico Personalizadas',
    'azulejos': 'Azulejos Personalizados',
    'quebra-cabeca': 'Quebra-cabeças Personalizados',
    'chinelos': 'Chinelos Personalizados',
    'todos': 'Todos os Produtos'
};

const subcategoryNames = {
    // Canecas
    'porcelana': 'Canecas de Porcelana',
    'polimero': 'Canecas Polímero',
    'magica': 'Canecas Mágica',
    'alca-colorida': 'Canecas de Alça Colorida',
    'alca-coracao': 'Canecas de Alça Coração',
    
    // Camisas
    'body-infantil': 'Body Infantil',
    'brancas': 'Camisas Brancas',
    'cinzas': 'Camisas Cinzas',
    
    // Chaveiros
    'acrilico': 'Chaveiros de Acrílico',
    'madeira': 'Chaveiros de Madeira',
    
    // Placas
    'branca': 'Placas de Acrílico Branca',
    'transparente': 'Placas de Acrílico Transparente',
    
    // Novas categorias
    'quadrado': 'Azulejo Quadrado',
    'padrao': 'Quebra-cabeça Personalizado',
    'branco': 'Chinelo Branco'
};

// ==========================================================================
// COMPONENTES INLINE (HEADER E FOOTER)
// ==========================================================================

// HTML do Header (inline)
const headerHTML = `
<header class="header">
    <div class="container">
        <div class="header-content">
            <!-- Logo -->
            <div class="logo">
                <a href="index.html">
                    <img src="assets/images/logo.png" alt="PersoIta - Produtos Personalizados" class="logo-img">
                </a>
            </div>

            <!-- Menu Principal -->
            <nav class="nav-menu">
                <ul class="nav-list">
                    <!-- PRODUTOS (com mega dropdown) -->
                    <li class="nav-item mega-dropdown">
                        <a href="produtos.html" class="nav-link">
                            <i class="fas fa-store"></i> Produtos
                        </a>
                        <div class="mega-menu">
                            <div class="mega-menu-content">
                                <!-- Coluna 1: Canecas -->
                                <div class="mega-menu-column">
                                    <h4><i class="fas fa-mug-hot"></i> Canecas</h4>
                                    <div class="submenu-nested">
                                        <a href="produtos.html?categoria=canecas&tipo=porcelana" class="submenu-link">
                                            Canecas de Porcelana
                                        </a>
                                        <a href="produtos.html?categoria=canecas&tipo=polimero" class="submenu-link">
                                            Canecas Polímero
                                        </a>
                                        <a href="produtos.html?categoria=canecas&tipo=magica" class="submenu-link">
                                            Canecas Mágica
                                        </a>
                                        <a href="produtos.html?categoria=canecas&tipo=alca-colorida" class="submenu-link">
                                            Canecas de Alça Colorida
                                        </a>
                                        <a href="produtos.html?categoria=canecas&tipo=alca-coracao" class="submenu-link">
                                            Canecas de Alça Coração
                                        </a>
                                    </div>
                                </div>
                                
                                <!-- Coluna 2: Camisas -->
                                <div class="mega-menu-column">
                                    <h4><i class="fas fa-tshirt"></i> Camisas</h4>
                                    <div class="submenu-nested">
                                        <a href="produtos.html?categoria=camisas&tipo=body-infantil" class="submenu-link">
                                            Body Infantil
                                        </a>
                                        <a href="produtos.html?categoria=camisas&tipo=brancas" class="submenu-link">
                                            Camisas Brancas
                                        </a>
                                        <a href="produtos.html?categoria=camisas&tipo=cinzas" class="submenu-link">
                                            Camisas Cinzas
                                        </a>
                                    </div>
                                </div>
                                
                                <!-- Coluna 3: Chaveiros e Placas -->
                                <div class="mega-menu-column">
                                    <h4><i class="fas fa-key"></i> Chaveiros</h4>
                                    <div class="submenu-nested">
                                        <a href="produtos.html?categoria=chaveiros&tipo=acrilico" class="submenu-link">
                                            Chaveiros de Acrílico
                                        </a>
                                        <a href="produtos.html?categoria=chaveiros&tipo=madeira" class="submenu-link">
                                            Chaveiros de Madeira
                                        </a>
                                    </div>
                                    
                                    <h4><i class="fas fa-clipboard"></i> Placas</h4>
                                    <div class="submenu-nested">
                                        <a href="produtos.html?categoria=placas&tipo=branca" class="submenu-link">
                                            Placas de Acrílico Branca
                                        </a>
                                        <a href="produtos.html?categoria=placas&tipo=transparente" class="submenu-link">
                                            Placas de Acrílico Transparente
                                        </a>
                                    </div>
                                </div>
                                
                                <!-- Coluna 4: Novos Produtos -->
                                <div class="mega-menu-column">
                                    <h4><i class="fas fa-star"></i> Novos Produtos</h4>
                                    <div class="submenu-nested">
                                        <a href="produtos.html?categoria=azulejos&tipo=quadrado" class="submenu-link">
                                            <span class="new-badge">NOVO</span> Azulejo Quadrado
                                        </a>
                                        <a href="produtos.html?categoria=quebra-cabeca&tipo=padrao" class="submenu-link">
                                            <span class="new-badge">NOVO</span> Quebra-cabeça
                                        </a>
                                        <a href="produtos.html?categoria=chinelos&tipo=branco" class="submenu-link">
                                            <span class="new-badge">NOVO</span> Chinelo Branco
                                        </a>
                                    </div>
                                    
                                    <div class="mega-menu-promo">
                                        <h5>🌿 Promoção Especial</h5>
                                        <p>Frete grátis em compras acima de R$ 100</p>
                                        <a href="produtos.html?promocao=true" class="btn-promo">Ver Ofertas</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    
                    <!-- QUEM SOMOS -->
                    <li class="nav-item">
                        <a href="quem-somos.html" class="nav-link">
                            <i class="fas fa-users"></i> Quem Somos
                        </a>
                    </li>
                    
                    <!-- CONTATO -->
                    <li class="nav-item">
                        <a href="contato.html" class="nav-link">
                            <i class="fas fa-envelope"></i> Contato
                        </a>
                    </li>
                </ul>
            </nav>

            <!-- Área de busca e carrinho -->
            <div class="header-actions">
                <div class="search-box">
                    <input type="text" class="search-input" placeholder="Buscar produtos...">
                    <button class="search-btn"><i class="fas fa-search"></i></button>
                </div>
                <div class="cart-icon">
                    <a href="carrinho.html">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="cart-count">0</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</header>`;

// HTML do Footer (inline)
const footerHTML = `
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-section">
                <div class="logo">
                    <a href="index.html">
                        <img src="assets/images/logo-footer.png" alt="PersoIta - Produtos Personalizados" class="logo-img logo-footer-img">
                    </a>
                </div>
                <p class="footer-description">Criamos produtos personalizados com qualidade e cuidado para tornar momentos especiais ainda mais memoráveis.</p>
                <div class="social-links">
                    <a href="https://www.instagram.com/personalizados.itabira/"><i class="fab fa-instagram"></i></a>
                    <a href="https://wa.me/5531990617185?text=Ol%C3%A1%2C%20conheci%20a%20loja%20atrav%C3%A9s%20do%20site%20e%20gostaria%20de%20fazer%20um%20pedido."><i class="fab fa-whatsapp"></i></a>
                </div>
            </div>
            
            <div class="footer-section">
                <h3>Links Rápidos</h3>
                <ul class="footer-links">
                    <li><a href="index.html">Início</a></li>
                    <li><a href="produtos.html">Produtos</a></li>
                    <li><a href="carrinho.html">Carrinho</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h3>Categorias</h3>
                <ul class="footer-links">
                    <li><a href="produtos.html?categoria=canecas">Canecas</a></li>
                    <li><a href="produtos.html?categoria=camisas">Camisas</a></li>
                    <li><a href="produtos.html?categoria=chaveiros">Chaveiros</a></li>
                    <li><a href="produtos.html?categoria=placas">Placas de Acrílico</a></li>
                    <li><a href="produtos.html?categoria=azulejos">Azulejos</a></li>
                    <li><a href="produtos.html?categoria=quebra-cabeca">Quebra-cabeças</a></li>
                    <li><a href="produtos.html?categoria=chinelos">Chinelos</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h3>Contato</h3>
                <ul class="footer-contact">
                    <li><i class="fas fa-envelope"></i> perosita@hotmail.com</li>
                    <li><i class="fas fa-phone"></i> (31) 99061-7185</li>
                    <li><i class="fas fa-map-marker-alt"></i> Itabira, MG</li>
                    <li><i class="fas fa-clock"></i> Seg-Sex: 8h-17h | Sábado: 8h-12h</li>
                </ul>
            </div>
        </div>
        
        <div class="footer-bottom">
            <p>&copy; 2026 PersoIta - Produtos Personalizados. Todos os direitos reservados.</p>
        </div>
    </div>
</footer>`;

// ==========================================================================
// FUNÇÕES DE UTILIDADE
// ==========================================================================

/**
 * Corrige a logo em todas as páginas (fallback para versões antigas)
 */
function corrigirLogoEmTodasPaginas() {
    const logos = document.querySelectorAll('.logo');
    const logoComImagem = document.querySelector('.logo-img');
    
    if (!logoComImagem && logos.length > 0) {
        console.log('Corrigindo logo...');
        
        logos.forEach(logo => {
            const logoTexto = logo.querySelector('.logo-circle');
            if (logoTexto) {
                logo.innerHTML = `
                    <a href="index.html">
                        <img src="assets/images/logo.png" alt="PersoIta - Produtos Personalizados" class="logo-img">
                    </a>
                `;
            }
        });
    }
}

/**
 * Aplica logo especial no footer
 */
function aplicarLogoFooter() {
    console.log('Aplicando logo especial no footer...');
    
    const footerLogo = document.querySelector('.footer .logo');
    
    if (!footerLogo) {
        console.log('Logo do footer não encontrada');
        return;
    }
    
    const logoEspecial = footerLogo.querySelector('.logo-footer-img');
    if (logoEspecial) {
        console.log('Logo especial já aplicada');
        return;
    }
    
    footerLogo.innerHTML = `
        <a href="index.html">
            <img src="assets/images/logo-footer.png" alt="PersoIta - Produtos Personalizados" class="logo-img logo-footer-img">
        </a>
    `;
    
    console.log('✅ Logo especial aplicada no footer');
    adicionarEstilosLogoFooter();
}

/**
 * Adiciona estilos específicos para a logo do footer
 */
function adicionarEstilosLogoFooter() {
    if (document.getElementById('logo-footer-styles')) {
        return;
    }
    
    const style = document.createElement('style');
    style.id = 'logo-footer-styles';
    style.textContent = `
        .logo-footer-img {
            filter: brightness(1.2);
            opacity: 0.9;
            transition: all 0.3s ease;
        }
        
        .logo-footer-img:hover {
            filter: brightness(1.5);
            opacity: 1;
            transform: scale(1.05);
        }
        
        .footer .logo {
            margin-bottom: 15px;
        }
        
        .footer .logo-img {
            height: 60px;
        }
    `;
    
    document.head.appendChild(style);
    console.log('Estilos da logo do footer aplicados');
}

// ==========================================================================
// FUNÇÕES PRINCIPAIS DO SITE
// ==========================================================================

/**
 * Carrega produtos em destaque na página inicial
 */
function loadFeaturedProducts() {
    console.log('Executando loadFeaturedProducts...');
    
    const container = document.getElementById('featured-products');
    if (!container) {
        console.log('Container featured-products não encontrado');
        return;
    }
    
    console.log('Produtos disponíveis:', window.produtos ? window.produtos.length : 0);
    
    const featuredProducts = window.produtos.filter(p => p.emDestaque === true);
    console.log('Produtos em destaque:', featuredProducts.length);
    
    const productsToShow = featuredProducts.length > 0 ? 
        featuredProducts.slice(0, 4) : window.produtos.slice(0, 4);
    
    container.innerHTML = '';
    
    productsToShow.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
    });
    
    console.log('Produtos carregados com sucesso!');
}

/**
 * Cria um card de produto
 */
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const hasDiscount = product.precoOriginal && product.precoOriginal > product.preco;
    const discountPercentage = hasDiscount ? 
        Math.round(100 - (product.preco / product.precoOriginal) * 100) : 0;
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.imagem}" alt="${product.nome}" loading="lazy">
            ${hasDiscount ? `<span class="product-badge">-${discountPercentage}%</span>` : ''}
        </div>
        <div class="product-info">
            <span class="product-category">${product.categoria.charAt(0).toUpperCase() + product.categoria.slice(1)}</span>
            <h3 class="product-name">${product.nome}</h3>
            <p class="product-description">${product.descricao.substring(0, 80)}...</p>
            <div class="product-price">
                <span class="current-price">R$ ${product.preco.toFixed(2)}</span>
                ${hasDiscount ? `<span class="original-price">R$ ${product.precoOriginal.toFixed(2)}</span>` : ''}
            </div>
            <div class="product-actions">
                <button class="btn-add-to-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Adicionar
                </button>
                <a href="produto.html?id=${product.id}" class="btn-view-details">Ver Detalhes</a>
            </div>
        </div>
    `;
    
    const addBtn = card.querySelector('.btn-add-to-cart');
    addBtn.addEventListener('click', function() {
        const productId = this.getAttribute('data-id');
        if (typeof addToCart === 'function') {
            addToCart(productId, 1);
            alert(`${product.nome} adicionado ao carrinho!`);
        }
    });
    
    return card;
}

/**
 * Inicializa a navegação do site
 */
function initNavigation() {
    console.log('Inicializando navegação...');
    
    // Mega dropdown functionality
    const megaDropdown = document.querySelector('.mega-dropdown');
    const megaMenu = document.querySelector('.mega-menu');
    
    if (megaDropdown && megaMenu) {
        megaDropdown.addEventListener('mouseenter', () => {
            megaMenu.style.opacity = '1';
            megaMenu.style.visibility = 'visible';
            megaMenu.style.transform = 'translateY(0)';
        });
        
        megaDropdown.addEventListener('mouseleave', () => {
            megaMenu.style.opacity = '0';
            megaMenu.style.visibility = 'hidden';
            megaMenu.style.transform = 'translateY(20px)';
        });
        
        megaMenu.addEventListener('mouseenter', () => {
            megaMenu.style.opacity = '1';
            megaMenu.style.visibility = 'visible';
            megaMenu.style.transform = 'translateY(0)';
        });
        
        megaMenu.addEventListener('mouseleave', () => {
            megaMenu.style.opacity = '0';
            megaMenu.style.visibility = 'hidden';
            megaMenu.style.transform = 'translateY(20px)';
        });
    }
    
    // Mobile navigation
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const submenu = item.querySelector('.submenu');
        
        if (link && submenu) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 767) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    document.querySelectorAll('.nav-item.active').forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    item.classList.toggle('active');
                }
            });
        }
    });
    
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 767 && !e.target.closest('.nav-item')) {
            document.querySelectorAll('.nav-item.active').forEach(item => {
                item.classList.remove('active');
            });
        }
    });
}

/**
 * Inicializa a funcionalidade de busca
 */
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', performSearch);
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `produtos.html?busca=${encodeURIComponent(query)}`;
        }
    }
}

/**
 * Carrega todos os produtos na página de produtos
 */
function loadAllProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    console.log('Carregando todos os produtos...');
    
    container.innerHTML = '';
    
    window.produtos.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
    });
}

/**
 * Filtra produtos por categoria e subcategoria
 */
function filterProductsByCategory(category, subcategory = null) {
    console.log(`Filtrando produtos: categoria=${category}, subcategoria=${subcategory}`);
    
    const container = document.getElementById('products-container');
    if (!container) {
        console.log('Container de produtos não encontrado');
        return;
    }
    
    let filteredProducts = [...window.produtos];
    
    if (category && category !== 'todos') {
        filteredProducts = filteredProducts.filter(p => p.categoria === category);
    }
    
    if (subcategory) {
        filteredProducts = filteredProducts.filter(p => p.subcategoria === subcategory);
    }
    
    console.log(`Encontrados ${filteredProducts.length} produtos`);
    
    container.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        container.innerHTML = `
            <div class="no-products-message">
                <i class="fas fa-search"></i>
                <h3>Nenhum produto encontrado</h3>
                <p>Tente alterar os filtros ou buscar por outro termo.</p>
            </div>
        `;
        return;
    }
    
    filteredProducts.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
    });
    
    updatePageTitle(category, subcategory);
}

/**
 * Atualiza o título da página com base no filtro
 */
function updatePageTitle(category, subcategory = null) {
    const pageTitle = document.getElementById('page-title');
    const pageSubtitle = document.getElementById('page-subtitle');
    
    if (!pageTitle) return;
    
    if (subcategory && subcategoryNames[subcategory]) {
        pageTitle.textContent = subcategoryNames[subcategory];
        if (pageSubtitle) {
            pageSubtitle.textContent = 'Encontre o produto ideal para personalizar';
        }
    } else if (category && categoryNames[category]) {
        pageTitle.textContent = categoryNames[category];
        if (pageSubtitle) {
            pageSubtitle.textContent = 'Encontre o produto ideal para personalizar';
        }
    }
}

/**
 * Configura os filtros da página de produtos
 */
function setupProductFilters() {
    console.log('Configurando filtros de produtos...');
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            filterProductsByCategory(category === 'todos' ? null : category);
        });
    });
    
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortProducts(this.value);
        });
    }
}

/**
 * Ordena produtos
 */
function sortProducts(criteria) {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    const productElements = Array.from(container.querySelectorAll('.product-card'));
    if (productElements.length === 0) return;
    
    const productsData = productElements.map(card => {
        const id = parseInt(card.querySelector('.btn-add-to-cart').getAttribute('data-id'));
        return window.produtos.find(p => p.id === id);
    }).filter(p => p);
    
    let sortedProducts;
    
    switch(criteria) {
        case 'preco-crescente':
            sortedProducts = [...productsData].sort((a, b) => a.preco - b.preco);
            break;
        case 'preco-decrescente':
            sortedProducts = [...productsData].sort((a, b) => b.preco - a.preco);
            break;
        case 'nome':
            sortedProducts = [...productsData].sort((a, b) => a.nome.localeCompare(b.nome));
            break;
        case 'relevancia':
        default:
            sortedProducts = [...productsData].sort((a, b) => {
                if (a.emDestaque && !b.emDestaque) return -1;
                if (!a.emDestaque && b.emDestaque) return 1;
                return 0;
            });
            break;
    }
    
    container.innerHTML = '';
    
    sortedProducts.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
    });
}

/**
 * Processa os parâmetros da URL
 */
function processUrlParameters() {
    console.log('Processando parâmetros da URL...');
    
    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get('categoria');
    const tipo = urlParams.get('tipo');
    const busca = urlParams.get('busca');
    
    console.log('Parâmetros encontrados:', { categoria, tipo, busca });
    
    if (busca) {
        console.log('Termo de busca:', busca);
        // Implementar busca aqui
    } 
    else if (categoria) {
        console.log(`Filtrando por categoria: ${categoria}, tipo: ${tipo}`);
        filterProductsByCategory(categoria, tipo);
        
        const filterButton = document.querySelector(`.filter-btn[data-category="${categoria}"]`);
        if (filterButton) {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            filterButton.classList.add('active');
        }
    }
}

// ==========================================================================
// INICIALIZAÇÃO PRINCIPAL
// ==========================================================================

/**
 * Inicializa o sistema completo
 */
function initializeSystem() {
    console.log('=== PERSOITA INICIALIZANDO ===');
    console.log('URL atual:', window.location.pathname);

    // Inserir header e footer
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
    document.body.insertAdjacentHTML('beforeend', footerHTML);

    // Corrigir logos (fallback)
    corrigirLogoEmTodasPaginas();
    aplicarLogoFooter();

    // Inicializar funcionalidades básicas
    initNavigation();
    initSearch();

    // Verificar página atual e inicializar funcionalidades específicas
    const path = window.location.pathname;
    
    if (path.includes('index.html') || path === '/' || path.endsWith('/')) {
        console.log('Página inicial - carregando produtos em destaque');
        setTimeout(loadFeaturedProducts, 100);
    } 
    else if (path.includes('produtos.html')) {
        console.log('Página de produtos');
        
        setTimeout(function() {
            setupProductFilters();
            processUrlParameters();
            
            const urlParams = new URLSearchParams(window.location.search);
            if (!urlParams.get('categoria') && !urlParams.get('busca')) {
                loadAllProducts();
            }
        }, 100);
    }
    else if (path.includes('produto.html')) {
        console.log('Página de produto individual');
        // Aqui você implementaria a página de produto individual
    }
    else if (path.includes('carrinho.html')) {
        console.log('Página do carrinho');
        // Aqui você implementaria o carrinho
    }
    else if (path.includes('quem-somos.html')) {
        console.log('Página Quem Somos');
    }
    else if (path.includes('contato.html')) {
        console.log('Página Contato');
    }
    
    // Atualizar contador do carrinho
    if (typeof updateCartCount === 'function') {
        updateCartCount();
    }
    
    console.log('=== INICIALIZAÇÃO COMPLETA ===');
}

// ==========================================================================
// EXPORTAR FUNÇÕES PARA USO GLOBAL
// ==========================================================================

// Tornar funções disponíveis globalmente
window.loadFeaturedProducts = loadFeaturedProducts;
window.createProductCard = createProductCard;
window.loadAllProducts = loadAllProducts;
window.filterProductsByCategory = filterProductsByCategory;
window.setupProductFilters = setupProductFilters;
window.processUrlParameters = processUrlParameters;
window.sortProducts = sortProducts;
window.updatePageTitle = updatePageTitle;

// ==========================================================================
// EXECUÇÃO INICIAL
// ==========================================================================

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSystem);
} else {
    initializeSystem();
}