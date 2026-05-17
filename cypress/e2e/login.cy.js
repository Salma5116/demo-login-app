describe('Login E2E Test', () => {
    it('zeigt Erfolg bei richtigen Daten', () => {
        cy.visit('http://localhost:5173')
        cy.get('[data-cy="email"]').type('test@test.de')
        cy.get('[data-cy="password"]').type('123456')
        cy.get('[data-cy="login-button"]').click()
        cy.get('[data-cy="message"]').should('contain', 'Login erfolgreich')
    })

    it('zeigt Fehler bei falschen Daten', () => {
        cy.visit('http://localhost:5173')
        cy.get('[data-cy="email"]').type('falsch@test.de')
        cy.get('[data-cy="password"]').type('0000')
        cy.get('[data-cy="login-button"]').click()
        cy.get('[data-cy="message"]').should('contain', 'Login fehlgeschlagen')
    })
})