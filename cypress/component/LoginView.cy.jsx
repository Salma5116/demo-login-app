import LoginView from '../../src/components/LoginView'
describe('LoginView', () => {
    it('zeigt die Login-Maske', () => {
        cy.mount(<LoginView onLogin={cy.stub()} authError="" />)
        cy.get('[data-cy="login-card"]').should('be.visible')
        cy.get('[data-cy="login-button"]').should('contain', 'Einloggen')
    })
    it('zeigt eine Fehlermeldung', () => {
        cy.mount(<LoginView onLogin={cy.stub()} authError="Login fehlgeschlagen" />)
        cy.get('[data-cy="auth-error"]').should('contain', 'Login fehlgeschlagen')
    })
    it('ruft onLogin mit Eingabedaten auf', () => {
        const onLogin = cy.stub().as('onLogin')
        cy.mount(<LoginView onLogin={onLogin} authError="" />)

        cy.get('[data-cy="email"]').type('test@test.de')
        cy.get('[data-cy="password"]').type('123456')
        cy.get('[data-cy="login-button"]').click()

        cy.get('@onLogin').should('have.been.calledWith', {
            email: 'test@test.de',
            password: '123456',
        })
    })
})