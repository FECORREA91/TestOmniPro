// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Reporter
import 'cypress-mochawesome-reporter/register';
// xpath
require('cypress-xpath');
require('cypress-real-events/support');
require('./commands');
require('./hover-polyfill');

//  Global error handling
Cypress.on('uncaught:exception', (err) => {
  const ignoredErrors = [
    'ga is not defined',       // Google Analytics
    'replaceAll',              // undefined
    'postMessage',             // windows
    'Cannot read properties',  // undefined/null
  ];
  if (ignoredErrors.some(error => err.message.includes(error))) {
    console.log('Error ignorado:', err.message); // Opcional: para debug
    return false;
  }
  return true;
});

// Import commands.js using ES2015 syntax:
require('./commands');

// Importa todas las páginas
const LoginPage = require('./pages/LoginPage');

// Hazlas disponibles globalmente
global.LoginPage = LoginPage;