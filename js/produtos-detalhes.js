// produto-detalhe.js - Script específico para página de produto

function initProductPage() {
    console.log('Inicializando página de produto...');
    
    // Verificar se os produtos estão carregados
    if (typeof window.produtos === 'undefined' || !Array.isArray(window.produtos)) {
        console.error('Produtos não carregados!');
        showError('Erro ao carregar produtos. Recarregue a página.');
        return;
    }
    
    console.log('Produtos carregados:', window.produtos.length);
    
    // Verificar parâmetro de produto na URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        showProductNotFound('Nenhum produto selecionado.');
        return;
    }
    
    // Encontrar produto pelo ID
    const product = window.produtos.find(p => p.id == productId);
    
    if (product) {
        console.log('Produto encontrado:', product);
        // Remover placeholders de loading
        removeLoadingPlaceholders();
        // Atualizar informações do produto
        displayProductDetails(product);
        // Carregar produtos relacionados
        loadRelatedProducts(product);
        // Configurar funcionalidades da página
        setupProductPageFeatures();
    } else {
        console.log('Produto não encontrado, ID:', productId);
        removeLoadingPlaceholders();
        showProductNotFound(`Produto com ID ${productId} não encontrado.`);
    }
}

function removeLoadingPlaceholders() {
    // Remover todas as classes de loading placeholder
    const placeholders = document.querySelectorAll('.loading-placeholder');
    placeholders.forEach(el => {
        el.classList.remove('loading-placeholder');
        el.removeAttribute('style');
        
        // Limpar conteúdo dos elementos que deveriam ter conteúdo dinâmico
        if (el.classList.contains('main-image') || 
            el.classList.contains('thumbnail-images') ||
            el.classList.contains('product-breadcrumb') ||
            el.classList.contains('product-name') ||
            el.classList.contains('product-price') ||
            el.classList.contains('product-description') ||
            el.classList.contains('product-features') ||
            el.classList.contains('product-card')) {
            el.innerHTML = '';
        }
    });
}

function showError(message) {
    const content = document.querySelector('.product-detail-content');
    if (content) {
        content.innerHTML = `
            <div class="product-not-found" style="grid-column: 1 / -1;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #DC3545; margin-bottom: 20px;"></i>
                <h2>Erro ao carregar</h2>
                <p>${message}</p>
                <a href="produtos.html" class="btn-primary" style="margin-top: 20px;">Voltar para produtos</a>
            </div>
        `;
    }
}

function showProductNotFound(message) {
    const content = document.querySelector('.product-detail-content');
    if (content) {
        content.innerHTML = `
            <div class="product-not-found" style="grid-column: 1 / -1;">
                <i class="fas fa-search" style="font-size: 3rem; color: #6C757D; margin-bottom: 20px;"></i>
                <h2>Produto não encontrado</h2>
                <p>${message}</p>
                <a href="produtos.html" class="btn-primary" style="margin-top: 20px;">Ver todos os produtos</a>
            </div>
        `;
    }
}

function displayProductDetails(product) {
    console.log('Exibindo detalhes do produto:', product);
    
    // Atualizar informações básicas do produto
    const titleElement = document.querySelector('.product-detail-content h1');
    if (titleElement) {
        titleElement.textContent = product.nome || 'Produto sem nome';
    }
    
    // Atualizar breadcrumb
    const breadcrumbLinks = document.querySelector('.product-breadcrumb');
    if (breadcrumbLinks) {
        breadcrumbLinks.innerHTML = `
            <a href="index.html">Início</a> > 
            <a href="produtos.html?categoria=${product.categoria || 'todos'}">
                ${product.categoria ? product.categoria.charAt(0).toUpperCase() + product.categoria.slice(1) : 'Produtos'}
            </a> > 
            <span>${product.nome || 'Produto'}</span>
        `;
    }
    
    // Atualizar preço
    const priceContainer = document.querySelector('.product-price');
    if (priceContainer) {
        const hasDiscount = product.precoOriginal && product.precoOriginal > product.preco;
        
        let priceHTML = `
            <span class="current-price" id="product-price">R$ ${product.preco?.toFixed(2) || '0,00'}</span>
        `;
        
        if (hasDiscount) {
            const discount = Math.round(100 - (product.preco / product.precoOriginal) * 100);
            priceHTML += `
                <span class="original-price">R$ ${product.precoOriginal.toFixed(2)}</span>
                <span class="discount-badge">-${discount}%</span>
            `;
        }
        
        priceContainer.innerHTML = priceHTML;
    }
    
    // Atualizar descrição
    const descriptionElement = document.querySelector('.product-description');
    if (descriptionElement) {
        descriptionElement.innerHTML = `<p>${product.descricao || 'Descrição não disponível.'}</p>`;
    }
    
    // Atualizar imagem principal
    const mainImage = document.querySelector('.main-image');
    if (mainImage) {
        const imgSrc = product.imagem || 'assets/images/produtos/sem-imagem.jpg';
        mainImage.innerHTML = `<img id="main-product-image" src="${imgSrc}" alt="${product.nome}" style="width: 100%; height: 100%; object-fit: cover;">`;
    }
    
    // Criar miniaturas
    const thumbnailContainer = document.getElementById('thumbnail-container');
    if (thumbnailContainer) {
        thumbnailContainer.innerHTML = '';
        
        // Adicionar miniatura da imagem principal
        const imgSrc = product.imagem || 'assets/images/produtos/sem-imagem.jpg';
        addThumbnail(imgSrc, product.nome, thumbnailContainer);
        
        // Adicionar outras imagens se existirem
        if (product.imagensAdicionais && product.imagensAdicionais.length > 0) {
            product.imagensAdicionais.forEach(img => {
                addThumbnail(img, product.nome, thumbnailContainer);
            });
        }
        
        // Ativar primeira miniatura
        if (thumbnailContainer.firstChild) {
            thumbnailContainer.firstChild.classList.add('active');
        }
    }
}

function addThumbnail(src, alt, container) {
    const thumbnail = document.createElement('div');
    thumbnail.className = 'thumbnail';
    thumbnail.innerHTML = `<img src="${src}" alt="${alt}" style="width: 100%; height: 100%; object-fit: cover;">`;
    
    thumbnail.addEventListener('click', function() {
        // Atualizar imagem principal
        const mainImage = document.getElementById('main-product-image');
        if (mainImage) {
            mainImage.src = src;
            mainImage.alt = alt;
        }
        
        // Remover classe ativa de todas as miniaturas
        container.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
        
        // Adicionar classe ativa à miniatura clicada
        this.classList.add('active');
    });
    
    container.appendChild(thumbnail);
}

function loadRelatedProducts(currentProduct) {
    const relatedContainer = document.getElementById('related-products');
    if (!relatedContainer) return;
    
    if (window.produtos && Array.isArray(window.produtos)) {
        // Filtrar produtos da mesma categoria (excluindo o atual)
        const relatedProducts = window.produtos.filter(p => 
            p.categoria === currentProduct.categoria && p.id !== currentProduct.id
        ).slice(0, 4);
        
        if (relatedProducts.length > 0) {
            relatedContainer.innerHTML = '';
            relatedProducts.forEach(product => {
                const productCard = createProductCard(product);
                relatedContainer.appendChild(productCard);
            });
        } else {
            relatedContainer.innerHTML = '<p class="no-related">Não há produtos relacionados no momento.</p>';
        }
    } else {
        relatedContainer.innerHTML = '<p class="no-related">Carregando produtos relacionados...</p>';
    }
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.imagem || 'assets/images/produtos/sem-imagem.jpg'}" alt="${product.nome}" loading="lazy">
            ${product.precoOriginal && product.precoOriginal > product.preco ? 
                '<span class="product-badge">Oferta</span>' : ''}
        </div>
        <div class="product-info">
            <div class="product-category">${product.categoria ? product.categoria.charAt(0).toUpperCase() + product.categoria.slice(1) : 'Produto'}</div>
            <h3 class="product-name">${product.nome || 'Produto'}</h3>
            <p class="product-description">${(product.descricao || '').substring(0, 60)}...</p>
            <div class="product-price">
                <span class="current-price">R$ ${product.preco?.toFixed(2) || '0,00'}</span>
                ${product.precoOriginal && product.precoOriginal > product.preco ? 
                    `<span class="original-price">R$ ${product.precoOriginal.toFixed(2)}</span>` : ''}
            </div>
            <div class="product-actions">
                <button class="btn-add-to-cart" onclick="addToCart('${product.id}', 1)">
                    <i class="fas fa-shopping-cart"></i> Adicionar
                </button>
                <button class="btn-view-details" onclick="window.location.href='produto.html?id=${product.id}'">
                    <i class="fas fa-eye"></i> Ver
                </button>
            </div>
        </div>
    `;
    
    return card;
}

function setupProductPageFeatures() {
    // Configurar contador de caracteres
    const textArea = document.getElementById('custom-text');
    const charCount = document.getElementById('char-count');
    
    if (textArea && charCount) {
        textArea.addEventListener('input', function() {
            charCount.textContent = this.value.length;
        });
    }
    
    // Configurar upload de imagem
    const uploadArea = document.getElementById('upload-area');
    const imageUpload = document.getElementById('image-upload');
    
    if (uploadArea && imageUpload) {
        uploadArea.addEventListener('click', function() {
            imageUpload.click();
        });
        
        imageUpload.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                // Validar tamanho do arquivo (max 5MB)
                if (this.files[0].size > 5 * 1024 * 1024) {
                    alert('Arquivo muito grande. Tamanho máximo: 5MB');
                    this.value = '';
                    return;
                }
                
                // Validar tipo do arquivo
                const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
                if (!validTypes.includes(this.files[0].type)) {
                    alert('Formato não suportado. Use JPG ou PNG.');
                    this.value = '';
                    return;
                }
                
                uploadArea.innerHTML = `
                    <i class="fas fa-check" style="color: #28A745; font-size: 1.5rem; margin-bottom: 10px;"></i>
                    <p style="margin: 0; font-size: 0.9rem;">Imagem selecionada:<br><strong>${this.files[0].name}</strong></p>
                `;
                uploadArea.classList.add('upload-success');
            }
        });
    }
    
    // Configurar botões de quantidade
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.querySelector('.quantity-input');
    
    if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value < 10) {
                quantityInput.value = value + 1;
            }
        });
        
        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) this.value = 1;
            if (value > 10) this.value = 10;
        });
    }
    
    // Configurar botão "Adicionar ao Carrinho"
    const addToCartBtn = document.getElementById('add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id');
            const quantity = parseInt(document.querySelector('.quantity-input')?.value || 1);
            const customText = document.getElementById('custom-text')?.value || '';
            const color = document.getElementById('color-select')?.value || 'branco';
            
            if (productId && window.addToCart) {
                // Verificar se há imagem personalizada
                const imageUpload = document.getElementById('image-upload');
                const hasCustomImage = imageUpload.files && imageUpload.files[0];
                
                // Adicionar produto ao carrinho
                const success = window.addToCart(productId, quantity, {
                    textoPersonalizado: customText,
                    cor: color,
                    imagemPersonalizada: hasCustomImage ? 'Sim' : 'Não'
                });
                
                if (success) {
                    // Feedback visual
                    const originalText = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check"></i> Adicionado!';
                    this.classList.add('added');
                    this.disabled = true;
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.classList.remove('added');
                        this.disabled = false;
                    }, 2000);
                    
                    // Atualizar contador do carrinho
                    if (typeof updateCartCount === 'function') {
                        updateCartCount();
                    }
                }
            } else {
                alert('Erro ao adicionar ao carrinho. Produto não encontrado.');
            }
        });
    }
}

// Função global para adicionar ao carrinho
window.addToCart = window.addToCart || function(productId, quantity, customizations) {
    console.log('Adicionando ao carrinho:', { productId, quantity, customizations });
    return true;
};

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Aguardar um momento para garantir que os componentes estejam carregados
    setTimeout(initProductPage, 500);
});

// Também inicializar se a página já estiver carregada
if (document.readyState === 'complete') {
    setTimeout(initProductPage, 500);
}