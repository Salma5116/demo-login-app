describe('Shop E2E', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173')
    })

    it('loggt sich erfolgreich ein', () => {
        cy.get('[data-cy="email"]').type('test@test.de')
        cy.get('[data-cy="password"]').type('123456')
        cy.get('[data-cy="login-button"]').click()
        cy.get('[data-cy="welcome-title"]').should('contain', 'Salma Demo')
    })

    it('zeigt eine Fehlermeldung bei falschem Login', () => {
        cy.get('[data-cy="email"]').type('falsch@test.de')
        cy.get('[data-cy="password"]').type('wrong')
        cy.get('[data-cy="login-button"]').click()
        cy.get('[data-cy="auth-error"]').should('contain', 'Login fehlgeschlagen')
    })

    it('filtert Produkte über Suche', () => {
        cy.loginDemoUser()
        cy.get('[data-cy="search-input"]').type('Keyboard')
        cy.get('[data-cy="product-card"]').should('have.length', 1)
        cy.contains('Luma Keyboard').should('be.visible')
    })

    it('fügt ein Produkt zum Warenkorb hinzu', () => {
        cy.loginDemoUser()
        cy.get('[data-cy="add-to-cart-1"]').click()
        cy.get('[data-cy="header-cart-count"]').should('contain', '1')
        cy.get('[data-cy="nav-cart"]').click()
        cy.get('[data-cy="cart-item"]').should('have.length', 1)
    })

    it('schließt eine Bestellung ab', () => {
        cy.loginDemoUser()
        cy.get('[data-cy="add-to-cart-1"]').click()
        cy.get('[data-cy="nav-cart"]').click()
        cy.get('[data-cy="checkout-button"]').click()
        cy.get('[data-cy="order-success"]').should('be.visible')
    })
})