import LoginForm from '../../src/LoginForm'

describe('LoginForm Component Test', () => {
    it('ruft onLogin mit den Eingabewerten auf', () => {
        const onLoginSpy = cy.spy().as('onLoginSpy')

        cy.mount(<LoginForm onLogin={onLoginSpy} />)

        cy.get('[data-cy="email"]').type('test@test.de')
        cy.get('[data-cy="password"]').type('123456')
        cy.get('[data-cy="login-button"]').click()

        cy.get('@onLoginSpy').should('have.been.calledWith', {
            email: 'test@test.de',
            password: '123456',
        })
    })
})