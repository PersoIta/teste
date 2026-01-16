/**
 * carrinho.js
 * Funcionalidades do carrinho de compras da PersoIta
 */

// Chave para armazenar no localStorage
const CARRINHO_STORAGE_KEY = 'persoita_carrinho';

/**
 * Retorna o carrinho atual do localStorage
 * @returns {Array} Lista de produtos no carrinho
 */
function getCart() {
    const cartJSON = localStorage.getItem(CARRINHO_STORAGE_KEY);
    return cartJSON ? JSON.parse(cartJSON) : [];
}

/**
 * Salva o carrinho no localStorage
 * @param {Array} cart - Carrinho a ser salvo
 */
function saveCart(cart) {
    localStorage.setItem(CARRINHO_STORAGE_KEY, JSON.stringify(cart));
}

/**
 * Adiciona um produto ao carrinho
 * @param {number|string} productId - ID do produto
 * @param {number} quantity - Quantidade (padrão: 1)
 * @param {Object} customizations - Personalizações do produto (opcional)
 * @returns {boolean} true se adicionado com sucesso
 */
function addToCart(productId, quantity = 1, customizations = {}) {
    // Validar parâmetros
    if (!productId || quantity < 1) {
        console.error('Parâmetros inválidos para adicionar ao carrinho');
        return false;
    }
    
    // Encontrar o produto na lista de produtos
    const product = produtos.find(p => p.id == productId);
    if (!product) {
        console.error('Produto não encontrado:', productId);
        return false;
    }
    
    // Verificar estoque
    if (product.estoque < quantity) {
        alert(`Desculpe, só temos ${product.estoque} unidades em estoque do produto "${product.nome}".`);
        return false;
    }
    
    // Obter carrinho atual
    const cart = getCart();
    
    // Verificar se o produto já está no carrinho
    const existingItemIndex = cart.findIndex(item => 
        item.id == productId && 
        JSON.stringify(item.customizations) === JSON.stringify(customizations)
    );
    
    if (existingItemIndex >= 0) {
        // Atualizar quantidade do item existente
        const newQuantity = cart[existingItemIndex].quantity + quantity;
        
        // Verificar estoque novamente
        if (product.estoque < newQuantity) {
            alert(`Desculpe, só temos ${product.estoque} unidades em estoque do produto "${product.nome}". Você já tem ${cart[existingItemIndex].quantity} no carrinho.`);
            return false;
        }
        
        cart[existingItemIndex].quantity = newQuantity;
    } else {
        // Adicionar novo item ao carrinho
        cart.push({
            id: productId,
            quantity: quantity,
            customizations: customizations,
            addedAt: new Date().toISOString()
        });
    }
    
    // Salvar carrinho atualizado
    saveCart(cart);
    
    // Atualizar contador do carrinho
    updateCartCount();
    
    // Feedback visual
    showNotification(`"${product.nome}" adicionado ao carrinho!`, 'success');
    
    return true;
}

/**
 * Remove um item do carrinho
 * @param {number} itemIndex - Índice do item no carrinho
 */
function removeFromCart(itemIndex) {
    const cart = getCart();
    
    if (itemIndex >= 0 && itemIndex < cart.length) {
        // Encontrar nome do produto para feedback
        const productId = cart[itemIndex].id;
        const product = produtos.find(p => p.id == productId);
        const productName = product ? product.nome : 'Produto';
        
        // Remover item
        cart.splice(itemIndex, 1);
        
        // Salvar carrinho atualizado
        saveCart(cart);
        
        // Atualizar contador do carrinho
        updateCartCount();
        
        // Feedback visual
        showNotification(`"${productName}" removido do carrinho.`, 'info');
    }
}

/**
 * Atualiza a quantidade de um item no carrinho
 * @param {number} itemIndex - Índice do item no carrinho
 * @param {number} quantityChange - Mudança na quantidade (positivo ou negativo)
 * @param {boolean} setExact - Se true, quantityChange é a quantidade exata
 */
function updateCartItemQuantity(itemIndex, quantityChange, setExact = false) {
    const cart = getCart();
    
    if (itemIndex >= 0 && itemIndex < cart.length) {
        const cartItem = cart[itemIndex];
        const product = produtos.find(p => p.id == cartItem.id);
        
        if (!product) {
            console.error('Produto não encontrado para atualizar quantidade');
            return;
        }
        
        // Calcular nova quantidade
        let newQuantity;
        if (setExact) {
            newQuantity = quantityChange;
        } else {
            newQuantity = cartItem.quantity + quantityChange;
        }
        
        // Validar quantidade mínima e máxima
        if (newQuantity < 1) {
            newQuantity = 1;
        } else if (newQuantity > 10) {
            newQuantity = 10;
            alert('Você pode adicionar no máximo 10 unidades do mesmo produto.');
        }
        
        // Verificar estoque
        if (product.estoque < newQuantity) {
            alert(`Desculpe, só temos ${product.estoque} unidades em estoque do produto "${product.nome}".`);
            newQuantity = product.estoque;
        }
        
        // Atualizar quantidade
        cart[itemIndex].quantity = newQuantity;
        
        // Salvar carrinho atualizado
        saveCart(cart);
        
        // Atualizar contador do carrinho
        updateCartCount();
    }
}

/**
 * Limpa todo o carrinho
 */
function clearCart() {
    localStorage.removeItem(CARRINHO_STORAGE_KEY);
    updateCartCount();
    showNotification('Carrinho limpo com sucesso.', 'info');
}

/**
 * Retorna a quantidade total de itens no carrinho
 * @returns {number} Total de itens no carrinho
 */
function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Retorna o valor total do carrinho
 * @returns {number} Valor total do carrinho
 */
function getCartTotal() {
    const cart = getCart();
    let total = 0;
    
    cart.forEach(item => {
        const product = produtos.find(p => p.id == item.id);
        if (product) {
            total += product.preco * item.quantity;
        }
    });
    
    return total;
}

/**
 * Atualiza o contador do carrinho na interface
 */
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const itemCount = getCartItemCount();
    
    cartCountElements.forEach(element => {
        element.textContent = itemCount;
        
        // Adicionar classe para animação se o número mudou
        if (element.dataset.lastCount && element.dataset.lastCount != itemCount) {
            element.classList.add('updated');
            setTimeout(() => element.classList.remove('updated'), 300);
        }
        
        element.dataset.lastCount = itemCount;
    });
}

/**
 * Mostra uma notificação na tela
 * @param {string} message - Mensagem da notificação
 * @param {string} type - Tipo da notificação (success, error, info, warning)
 */
function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Estilos da notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Cor de fundo baseada no tipo
    const bgColors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#17a2b8',
        warning: '#ffc107'
    };
    
    notification.style.backgroundColor = bgColors[type] || bgColors.info;
    
    // Botão de fechar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        margin-left: 15px;
        line-height: 1;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Adicionar ao corpo
    document.body.appendChild(notification);
    
    // Remover automaticamente após 3 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 3000);
}

/**
 * Cria um elemento de card de produto
 * @param {Object} product - Objeto do produto
 * @returns {HTMLElement} Elemento do card de produto
 */
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card fade-in';
    
    // Verificar se o produto tem desconto
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
                <span class="current-price">${formatPrice(product.preco)}</span>
                ${hasDiscount ? `<span class="original-price">${formatPrice(product.precoOriginal)}</span>` : ''}
            </div>
            <div class="product-actions">
                <button class="btn-add-to-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Adicionar
                </button>
                <a href="produto.html?id=${product.id}" class="btn-view-details">Ver Detalhes</a>
            </div>
        </div>
    `;
    
    // Configurar evento do botão "Adicionar ao Carrinho"
    const addToCartBtn = card.querySelector('.btn-add-to-cart');
    addToCartBtn.addEventListener('click', function() {
        const productId = this.getAttribute('data-id');
        addToCart(productId, 1);
    });
    
    return card;
}

/**
 * Formata um valor numérico como preço em Reais
 * @param {number} price - Valor a ser formatado
 * @returns {string} Preço formatado
 */
function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
}

/**
 * Filtra e exibe produtos com base na categoria
 * @param {string} category - Categoria para filtrar (null para todos)
 * @param {string} subcategory - Subcategoria para filtrar (opcional)
 */
function filterAndDisplayProducts(category = null, subcategory = null) {
    const container = document.getElementById('products-container');
    const noProductsMessage = document.getElementById('no-products');
    
    if (!container) return;
    
    // Filtrar produtos
    let filteredProducts = [...produtos];
    
    if (category && category !== 'todos') {
        filteredProducts = filteredProducts.filter(p => p.categoria === category);
    }
    
    if (subcategory) {
        filteredProducts = filteredProducts.filter(p => p.subcategoria === subcategory);
    }
    
    // Limpar container
    container.innerHTML = '';
    
    // Verificar se há produtos
    if (filteredProducts.length === 0) {
        if (noProductsMessage) {
            noProductsMessage.style.display = 'block';
        }
        return;
    }
    
    // Esconder mensagem de "nenhum produto"
    if (noProductsMessage) {
        noProductsMessage.style.display = 'none';
    }
    
    // Adicionar produtos filtrados
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

/**
 * Ordena e exibe produtos
 * @param {string} criteria - Critério de ordenação
 */
function sortAndDisplayProducts(criteria) {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    // Obter produtos atualmente exibidos
    const currentProductIds = Array.from(container.querySelectorAll('.product-card'))
        .map(card => parseInt(card.querySelector('.btn-add-to-cart').getAttribute('data-id')));
    
    let productsToSort = produtos.filter(p => currentProductIds.includes(p.id));
    
    // Ordenar produtos
    switch(criteria) {
        case 'preco-crescente':
            productsToSort.sort((a, b) => a.preco - b.preco);
            break;
        case 'preco-decrescente':
            productsToSort.sort((a, b) => b.preco - a.preco);
            break;
        case 'nome':
            productsToSort.sort((a, b) => a.nome.localeCompare(b.nome));
            break;
        case 'relevancia':
        default:
            // Manter ordem original (produtos em destaque primeiro)
            productsToSort.sort((a, b) => {
                if (a.emDestaque && !b.emDestaque) return -1;
                if (!a.emDestaque && b.emDestaque) return 1;
                return 0;
            });
            break;
    }
    
    // Limpar container
    container.innerHTML = '';
    
    // Adicionar produtos ordenados
    productsToSort.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

// Exportar funções para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getCart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        getCartItemCount,
        getCartTotal,
        updateCartCount,
        createProductCard,
        filterAndDisplayProducts,
        sortAndDisplayProducts,
        formatPrice
    };
} else {
    // Tornar funções disponíveis globalmente
    window.getCart = getCart;
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.updateCartItemQuantity = updateCartItemQuantity;
    window.clearCart = clearCart;
    window.getCartItemCount = getCartItemCount;
    window.getCartTotal = getCartTotal;
    window.updateCartCount = updateCartCount;
    window.createProductCard = createProductCard;
    window.filterAndDisplayProducts = filterAndDisplayProducts;
    window.sortAndDisplayProducts = sortAndDisplayProducts;
    window.formatPrice = formatPrice;
}

// Inicializar contador do carrinho quando o script carrega
document.addEventListener('DOMContentLoaded', updateCartCount);

// Adicionar estilos para notificações
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .cart-count.updated {
        animation: pulse 0.3s ease;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.3); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);