describe('Login E2E', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173');
    })

    it('loggt sich mit gültigen Daten erfolgreich ein', () => {
        cy.get('[data-cy="email"]').type('test@test.de')
        cy.get('[data-cy="password"]').type('123456')
        cy.get('[data-cy="login-button"]').click()

        cy.get('[data-cy="welcome-title"]').should('contain', 'Salma Demo')
        cy.get('[data-cy="dashboard-hero"]').should('be.visible')
        cy.get('[data-cy="auth-error"]').should('not.exist')
    })

    it('zeigt Fehlermeldung bei ungültigen Login-Daten', () => {
        cy.get('[data-cy="email"]').type('wrong@test.de')
        cy.get('[data-cy="password"]').type('falsch')
        cy.get('[data-cy="login-button"]').click()

        cy.get('[data-cy="auth-error"]')
            .should('be.visible')
            .and('contain', 'Login fehlgeschlagen')
    })
})
