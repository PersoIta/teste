/**
 * components-disabled.js
 * Sistema de componentes DESATIVADO temporariamente
 */

console.log('Components.js está desativado temporariamente para testes');

// Função vazia para não quebrar outros scripts
window.loadComponent = function() { return Promise.resolve(true); };
window.loadAllComponents = function() { return Promise.resolve(true); };
window.initComponentsSystem = function() { console.log('Components desativados'); };
window.debugComponents = function() { console.log('Components desativados'); };