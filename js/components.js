/**
 * components.js - VERSÃO SEM CONTAINERS
 * Sistema de componentes para carregar Header e Footer dinamicamente
 */

// Prevenir execução múltipla
if (window.componentsLoaded) {
    console.log('Components já carregados, saindo...');
    return;
}

window.componentsLoaded = false;

// Configuração dos componentes
const COMPONENTS_CONFIG = {
    header: {
        file: 'components/header.html',
        position: 'afterbegin', // Inserir no início do body
        callback: initHeader
    },
    footer: {
        file: 'components/footer.html', 
        position: 'beforeend', // Inserir no final do body
        callback: initFooter
    }
};

// Flag para controle de execução
let componentsInitializing = false;

/**
 * Carrega um componente específico
 */
async function loadComponent(componentName) {
    const config = COMPONENTS_CONFIG[componentName];
    
    if (!config) {
        console.error(`Componente ${componentName} não configurado`);
        return false;
    }
    
    try {
        // Verificar se já existe um header/footer no DOM
        if (componentName === 'header' && document.querySelector('header')) {
            console.log('Header já existe no DOM, ignorando...');
            if (typeof config.callback === 'function') {
                setTimeout(config.callback, 0);
            }
            return true;
        }
        
        if (componentName === 'footer' && document.querySelector('footer')) {
            console.log('Footer já existe no DOM, ignorando...');
            if (typeof config.callback === 'function') {
                setTimeout(config.callback, 0);
            }
            return true;
        }
        
        // Buscar o conteúdo do arquivo
        const response = await fetch(config.file);
        
        if (!response.ok) {
            throw new Error(`Erro ao carregar ${config.file}: ${response.status}`);
        }
        
        const html = await response.text();
        
        // Inserir no body na posição especificada
        document.body.insertAdjacentHTML(config.position, html);
        
        // Executar callback de inicialização se existir
        if (typeof config.callback === 'function') {
            setTimeout(config.callback, 0);
        }
        
        console.log(`✅ Componente ${componentName} carregado com sucesso`);
        return true;
        
    } catch (error) {
        console.error(`❌ Erro ao carregar componente ${componentName}:`, error);
        return false;
    }
}

/**
 * Mostra mensagem de erro se o componente não carregar
 */
function showComponentError(componentName) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'component-error';
    errorDiv.innerHTML = `
        <p>Erro ao carregar ${componentName}. Por favor, recarregue a página.</p>
        <button onclick="location.reload()" class="btn-primary">Recarregar</button>
    `;
    
    if (componentName === 'header') {
        document.body.insertAdjacentHTML('afterbegin', errorDiv.outerHTML);
    } else {
        document.body.insertAdjacentHTML('beforeend', errorDiv.outerHTML);
    }
}


function highlightActiveMenuLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // Remove classe ativa de todos
        link.classList.remove('active');
        
        // Adiciona classe ativa ao link correspondente
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage.includes('produto.html') && linkHref === 'produtos.html')) {
            
            link.classList.add('active');
        }
    });
}

/**
 * Inicializa o header após carregamento
 */
function initHeader() {
    console.log('Inicializando header...');
    
    // Configurar funcionalidades do header
    initHeaderNavigation();
    initSearch();
    
    // Atualizar contador do carrinho
    if (typeof updateCartCount === 'function') {
        updateCartCount();
    }
}

/**
 * Configura a navegação do header (mega menu)
 */
function initHeaderNavigation() {
    console.log('Configurando navegação do header...');
    
    // Destacar link ativo no menu
    highlightActiveMenuLink();
    
    // Configurar comportamento dos links do menu
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remover classe active de todos os links
            navLinks.forEach(l => l.classList.remove('active'));
            // Adicionar classe active ao link clicado
            this.classList.add('active');
        });
    });
    
    // Para mobile (se você tiver menu mobile no futuro)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.classList.toggle('show');
            }
        });
    }
}

/**
 * Configura a funcionalidade de busca
 */
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        // Remover event listeners anteriores
        searchBtn.removeEventListener('click', performSearch);
        searchInput.removeEventListener('keypress', handleSearchKeypress);
        
        searchBtn.addEventListener('click', performSearch);
        
        function handleSearchKeypress(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        }
        
        searchInput.addEventListener('keypress', handleSearchKeypress);
    }
    
    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `produtos.html?busca=${encodeURIComponent(query)}`;
        }
    }
}

/**
 * Inicializa o footer após carregamento
 */
function initFooter() {
    console.log('Inicializando footer...');
    
    // Atualizar ano atual
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Configurar links ativos no footer
    highlightActiveFooterLink();
}

/**
 * Destaca o link ativo no footer
 */
function highlightActiveFooterLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const footerLinks = document.querySelectorAll('.footer-links a');
    
    footerLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage.includes('produto.html') && linkHref === 'produtos.html')) {
            link.classList.add('active');
            link.style.color = 'white';
            link.style.fontWeight = '600';
        }
    });
}

/**
 * Carrega todos os componentes
 */
async function loadAllComponents() {
    // Prevenir execução múltipla
    if (componentsInitializing) {
        console.log('Components já estão sendo carregados...');
        return;
    }
    
    componentsInitializing = true;
    console.log('Carregando componentes...');
    
    try {
        // Carregar header e footer em paralelo
        await Promise.all([
            loadComponent('header'),
            loadComponent('footer')
        ]);
        
        console.log('✅ Todos os componentes carregados');
        window.componentsLoaded = true;
        
        // Inicializar sistema completo após carregamento
        initializeCompleteSystem();
        
    } catch (error) {
        console.error('❌ Erro ao carregar componentes:', error);
    } finally {
        componentsInitializing = false;
    }
}

/**
 * Inicializa o sistema completo após carregar componentes
 */
function initializeCompleteSystem() {
    // Verificar se estamos em uma página específica
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('produtos.html') || currentPage.includes('produto.html')) {
        // Inicializar funcionalidades de produtos
        if (typeof initProductPages === 'function') {
            setTimeout(initProductPages, 100);
        }
    }
    
    if (currentPage.includes('carrinho.html')) {
        // Inicializar carrinho
        if (typeof loadCart === 'function') {
            setTimeout(loadCart, 100);
        }
    }
    
    // Atualizar contador do carrinho periodicamente
    if (typeof updateCartCount === 'function') {
        // Atualizar agora
        updateCartCount();
        
        // Atualizar periodicamente (mas apenas se não estiver já atualizando)
        if (!window.cartUpdateInterval) {
            window.cartUpdateInterval = setInterval(updateCartCount, 5000);
        }
    }
}

/**
 * Inicializa o sistema de componentes
 */
function initComponentsSystem() {
    // Prevenir inicialização múltipla
    if (window.componentsSystemInitialized) {
        console.log('Sistema de componentes já inicializado');
        return;
    }
    
    console.log('Inicializando sistema de componentes...');
    window.componentsSystemInitialized = true;
    
    // Carregar todos os componentes
    loadAllComponents();
}

// Prevenir múltiplos event listeners
document.removeEventListener('DOMContentLoaded', initComponentsSystem);

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComponentsSystem);
} else {
    // DOM já carregado
    setTimeout(initComponentsSystem, 0);
}

// Exportar funções para uso global
window.loadComponent = loadComponent;
window.loadAllComponents = loadAllComponents;
window.initComponentsSystem = initComponentsSystem;

// Debug helper
window.debugComponents = function() {
    console.log('=== DEBUG COMPONENTS ===');
    console.log('Components loaded:', window.componentsLoaded);
    console.log('System initialized:', window.componentsSystemInitialized);
    console.log('Headers in DOM:', document.querySelectorAll('header').length);
    console.log('Footers in DOM:', document.querySelectorAll('footer').length);
    console.log('=======================');
};