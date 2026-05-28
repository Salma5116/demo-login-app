import Header from '../../src/components/Header'

describe('Header', () => {
    it('zeigt Usernamen und Cart Count', () => {
        cy.mount(
            <Header
                user={{ name: 'Salma Demo' }}
                cartCount={3}
                currentPage="shop"
                onLogout={cy.stub()}
                onNavigate={cy.stub()}
            />,
        )

        cy.get('[data-cy="welcome-title"]').should('contain', 'Salma Demo')
        cy.get('[data-cy="nav-cart"]').should('contain', '3')
    })

    it('ruft Navigation auf', () => {
        const onNavigate = cy.stub().as('onNavigate')

        cy.mount(
            <Header
                user={{ name: 'Salma Demo' }}
                cartCount={0}
                currentPage="shop"
                onLogout={cy.stub()}
                onNavigate={onNavigate}
            />,
        )

        cy.get('[data-cy="nav-cart"]').click()
        cy.get('@onNavigate').should('have.been.calledWith', 'cart')
    })

    it('ruft Logout auf', () => {
        const onLogout = cy.stub().as('onLogout')

        cy.mount(
            <Header
                user={{ name: 'Salma Demo' }}
                cartCount={0}
                currentPage="shop"
                onLogout={onLogout}
                onNavigate={cy.stub()}
            />,
        )

        cy.get('[data-cy="logout-button"]').click()
        cy.get('@onLogout').should('have.been.calledOnce')
    })
})