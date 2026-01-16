/**
 * carrinho-render.js
 * Renderização do carrinho de compras na página do carrinho
 */

// Aguardar o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se estamos na página do carrinho
    if (window.location.pathname.includes('carrinho.html')) {
        initializeCartPage();
    }
});

function initializeCartPage() {
    console.log('Inicializando página do carrinho...');
    
    // Aguardar componentes carregarem
    const waitForComponents = setInterval(function() {
        if (document.querySelector('#header-component header') && 
            document.querySelector('#footer-component footer')) {
            clearInterval(waitForComponents);
            loadCartItems();
            setupCartFunctionality();
        }
    }, 100);
    
    // Timeout para segurança
    setTimeout(function() {
        clearInterval(waitForComponents);
        loadCartItems();
        setupCartFunctionality();
    }, 3000);
}

function loadCartItems() {
    console.log('Carregando itens do carrinho...');
    
    // Verificar se as funções do carrinho estão disponíveis
    if (typeof getCart !== 'function' || typeof getCartTotal !== 'function') {
        console.error('Funções do carrinho não disponíveis');
        showCartError('Erro ao carregar carrinho. Recarregue a página.');
        return;
    }
    
    // Verificar se produtos estão disponíveis
    if (typeof window.produtos === 'undefined') {
        console.error('Produtos não disponíveis');
        showCartError('Produtos não carregados. Aguarde ou recarregue a página.');
        return;
    }
    
    const cart = getCart();
    console.log('Carrinho encontrado:', cart);
    
    if (cart.length === 0) {
        showEmptyCart();
        updateCartSummary(0, 0);
        return;
    }
    
    // Renderizar itens do carrinho
    renderCartItems(cart);
    
    // Atualizar resumo
    updateCartSummary();
}

function renderCartItems(cart) {
    const cartItemsList = document.getElementById('cart-items-list');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    
    if (!cartItemsList) {
        console.error('Elemento cart-items-list não encontrado');
        return;
    }
    
    // Limpar lista
    cartItemsList.innerHTML = '';
    
    // Esconder mensagem de carrinho vazio
    if (emptyCartMessage) {
        emptyCartMessage.style.display = 'none';
    }
    
    let subtotal = 0;
    
    // Renderizar cada item
    cart.forEach((item, index) => {
        const product = window.produtos.find(p => p.id == item.id);
        
        if (!product) {
            console.warn('Produto não encontrado para item do carrinho:', item.id);
            return;
        }
        
        const itemTotal = product.preco * item.quantity;
        subtotal += itemTotal;
        
        const cartItem = createCartItemElement(product, item, index);
        cartItemsList.appendChild(cartItem);
    });
    
    // Mostrar container de itens
    cartItemsList.style.display = 'block';
}

function createCartItemElement(product, cartItem, itemIndex) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item fade-in';
    
    // Verificar se tem personalizações
    const customizationsHTML = cartItem.customizations ? 
        createCustomizationsHTML(cartItem.customizations) : '';
    
    itemDiv.innerHTML = `
        <div class="cart-item-image">
            <img src="${product.imagem}" alt="${product.nome}" 
                 onerror="this.onerror=null; this.src='assets/images/produtos/sem-imagem.jpg'">
        </div>
        <div class="cart-item-details">
            <div class="cart-item-header">
                <h3 class="cart-item-title">${product.nome}</h3>
                <button class="remove-item-btn" data-index="${itemIndex}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="cart-item-category">${product.categoria ? product.categoria.charAt(0).toUpperCase() + product.categoria.slice(1) : 'Produto'}</div>
            <p class="cart-item-description">${product.descricao ? product.descricao.substring(0, 100) + '...' : ''}</p>
            ${customizationsHTML}
            <div class="cart-item-footer">
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-index="${itemIndex}">-</button>
                    <input type="number" class="quantity-input" value="${cartItem.quantity}" min="1" max="10" data-index="${itemIndex}">
                    <button class="quantity-btn plus" data-index="${itemIndex}">+</button>
                </div>
                <div class="cart-item-price">
                    <span class="item-total">${formatPrice(product.preco * cartItem.quantity)}</span>
                    <span class="item-unit">${formatPrice(product.preco)} cada</span>
                </div>
            </div>
        </div>
    `;
    
    return itemDiv;
}

function createCustomizationsHTML(customizations) {
    if (!customizations || Object.keys(customizations).length === 0) {
        return '';
    }
    
    let html = '<div class="cart-item-customizations"><strong>Personalizações:</strong><ul>';
    
    if (customizations.textoPersonalizado) {
        html += `<li><i class="fas fa-font"></i> Texto: "${customizations.textoPersonalizado.substring(0, 30)}"</li>`;
    }
    
    if (customizations.cor && customizations.cor !== 'branco') {
        html += `<li><i class="fas fa-palette"></i> Cor: ${customizations.cor.charAt(0).toUpperCase() + customizations.cor.slice(1)}</li>`;
    }
    
    if (customizations.imagemPersonalizada === 'Sim') {
        html += `<li><i class="fas fa-image"></i> Imagem personalizada: Sim</li>`;
    }
    
    html += '</ul></div>';
    return html;
}

function updateCartSummary() {
    const subtotalElement = document.getElementById('cart-subtotal');
    const totalElement = document.getElementById('cart-total');
    
    if (!subtotalElement || !totalElement) {
        console.warn('Elementos do resumo não encontrados');
        return;
    }
    
    if (typeof getCartTotal !== 'function') {
        console.error('Função getCartTotal não disponível');
        return;
    }
    
    const total = getCartTotal();
    
    subtotalElement.textContent = formatPrice(total);
    totalElement.textContent = formatPrice(total);
    
    // Atualizar frete grátis
    const freeShippingElement = document.querySelector('.free-shipping-note');
    if (freeShippingElement) {
        if (total >= 100) {
            freeShippingElement.innerHTML = '<i class="fas fa-check-circle"></i> Parabéns! Você ganhou frete grátis!';
            freeShippingElement.style.color = '#28a745';
        } else {
            const missing = (100 - total).toFixed(2);
            freeShippingElement.innerHTML = `<i class="fas fa-info-circle"></i> Adicione R$ ${missing} para ganhar frete grátis`;
            freeShippingElement.style.color = '#ffc107';
        }
    }
}

function showEmptyCart() {
    const cartItemsList = document.getElementById('cart-items-list');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartSummary = document.querySelector('.cart-summary');
    
    if (cartItemsList) {
        cartItemsList.style.display = 'none';
    }
    
    if (emptyCartMessage) {
        emptyCartMessage.style.display = 'block';
    }
    
    if (cartSummary) {
        cartSummary.style.display = 'none';
    }
}

function showCartError(message) {
    const cartItemsList = document.getElementById('cart-items-list');
    
    if (cartItemsList) {
        cartItemsList.innerHTML = `
            <div class="error-message" style="text-align: center; padding: 40px; color: #dc3545;">
                <i class="fas fa-exclamation-triangle" style="font-size: 3rem; margin-bottom: 20px;"></i>
                <h3>Erro ao carregar carrinho</h3>
                <p>${message}</p>
                <button onclick="location.reload()" class="btn-primary" style="margin-top: 20px;">
                    <i class="fas fa-sync-alt"></i> Recarregar Página
                </button>
            </div>
        `;
    }
}

function setupCartFunctionality() {
    // Botão limpar carrinho
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('Tem certeza que deseja limpar todo o carrinho?')) {
                if (typeof clearCart === 'function') {
                    clearCart();
                    loadCartItems();
                }
            }
        });
    }
    
    // Botão finalizar compra
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const cart = getCart();
            if (cart.length === 0) {
                alert('Seu carrinho está vazio!');
                return;
            }
            
            // Redirecionar para WhatsApp com os itens do carrinho
            redirectToWhatsAppCheckout();
        });
    }
    
    // Delegar eventos para botões dinâmicos
    document.addEventListener('click', function(e) {
        // Botão remover item
        if (e.target.closest('.remove-item-btn')) {
            const btn = e.target.closest('.remove-item-btn');
            const itemIndex = parseInt(btn.getAttribute('data-index'));
            
            if (typeof removeFromCart === 'function') {
                removeFromCart(itemIndex);
                loadCartItems();
            }
        }
        
        // Botão diminuir quantidade
        if (e.target.closest('.quantity-btn.minus')) {
            const btn = e.target.closest('.quantity-btn.minus');
            const itemIndex = parseInt(btn.getAttribute('data-index'));
            
            if (typeof updateCartItemQuantity === 'function') {
                updateCartItemQuantity(itemIndex, -1);
                loadCartItems();
            }
        }
        
        // Botão aumentar quantidade
        if (e.target.closest('.quantity-btn.plus')) {
            const btn = e.target.closest('.quantity-btn.plus');
            const itemIndex = parseInt(btn.getAttribute('data-index'));
            
            if (typeof updateCartItemQuantity === 'function') {
                updateCartItemQuantity(itemIndex, 1);
                loadCartItems();
            }
        }
    });
    
    // Alteração direta no input de quantidade
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('quantity-input')) {
            const input = e.target;
            const itemIndex = parseInt(input.getAttribute('data-index'));
            const newQuantity = parseInt(input.value);
            
            if (isNaN(newQuantity) || newQuantity < 1) {
                input.value = 1;
                return;
            }
            
            if (newQuantity > 10) {
                input.value = 10;
                alert('Máximo de 10 unidades por produto.');
                return;
            }
            
            if (typeof updateCartItemQuantity === 'function') {
                updateCartItemQuantity(itemIndex, newQuantity, true);
                loadCartItems();
            }
        }
    });
}

function redirectToWhatsAppCheckout() {
    const cart = getCart();
    const total = getCartTotal();
    
    let message = `*PEDIDO - PersoIta Produtos Personalizados*\n\n`;
    message += `Olá! Gostaria de fazer um pedido com os seguintes itens:\n\n`;
    
    cart.forEach((item, index) => {
        const product = window.produtos.find(p => p.id == item.id);
        if (product) {
            message += `*${index + 1}. ${product.nome}*\n`;
            message += `   Quantidade: ${item.quantity}\n`;
            message += `   Valor unitário: ${formatPrice(product.preco)}\n`;
            message += `   Subtotal: ${formatPrice(product.preco * item.quantity)}\n`;
            
            if (item.customizations) {
                message += `   Personalizações:\n`;
                if (item.customizations.textoPersonalizado) {
                    message += `   • Texto: "${item.customizations.textoPersonalizado}"\n`;
                }
                if (item.customizations.cor && item.customizations.cor !== 'branco') {
                    message += `   • Cor: ${item.customizations.cor}\n`;
                }
                if (item.customizations.imagemPersonalizada === 'Sim') {
                    message += `   • Com imagem personalizada\n`;
                }
            }
            message += `\n`;
        }
    });
    
    message += `\n*TOTAL DO PEDIDO: ${formatPrice(total)}*\n\n`;
    message += `Nome: \n`;
    message += `Endereço de entrega: \n`;
    message += `Telefone: \n`;
    message += `Forma de pagamento: \n\n`;
    message += `Por favor, confirme os dados acima para finalizarmos o pedido!`;
    
    const whatsappNumber = "5531990617185"; // Seu número
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
}

// Exportar funções
if (typeof window !== 'undefined') {
    window.loadCartItems = loadCartItems;
    window.redirectToWhatsAppCheckout = redirectToWhatsAppCheckout;
}