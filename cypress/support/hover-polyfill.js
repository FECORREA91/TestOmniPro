// Polyfill para hover en Chrome headless
Cypress.on('window:before:load', (win) => {
    if (Cypress.browser.isHeadless) {
      const originalAddEventListener = win.EventTarget.prototype.addEventListener;
      win.EventTarget.prototype.addEventListener = function(type, handler, options) {
        if (type === 'mouseenter' || type === 'mouseover') {
          type = 'click'; // Transforma hover a click en headless
        }
        return originalAddEventListener.call(this, type, handler, options);
      };
    }
  });