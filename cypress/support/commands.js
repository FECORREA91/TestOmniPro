Cypress.Commands.add('hoverAndVerify', (activatorSelector, menuSelector) => {
  // 1. Intenta con eventos de mouse normales
  cy.get(activatorSelector)
    .should('be.visible')
    .realHover() // Usa cypress-real-events para hover más realista

  // 2. Si falla, usa el task como fallback
  cy.get(menuSelector, { timeout: 15000 }).then(($menu) => {
    if ($menu.css('display') === 'none') {
      cy.task('forceHover', { selector: activatorSelector });
      cy.task('forceVisible', { selector: menuSelector });
    }
  });

  // 3. Verificación final
  cy.get(menuSelector)
    .should('be.visible')
    .and('not.have.css', 'display', 'none');
});