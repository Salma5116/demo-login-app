import CartView from '../../src/components/CartView'

const cart = [
    {
        id: 1,
        name: 'Aurora Headphones',
        category: 'Audio',
        price: 129.99,
        quantity: 2,
    },
]

describe('CartView', () => {
    it('zeigt den Warenkorb', () => {
        cy.mount(
            <CartView
                cart={cart}
                onIncrease={cy.stub()}
                onDecrease={cy.stub()}
                onRemove={cy.stub()}
                onNavigate={cy.stub()}
                checkoutError=""
                onCheckout={cy.stub()}
                orderPlaced={false}
            />,
        )

        cy.get('[data-cy="cart-item"]').should('have.length', 1)
        cy.get('[data-cy="subtotal"]').should('exist')
        cy.get('[data-cy="total"]').should('exist')
    })

    it('zeigt leeren Warenkorb', () => {
        cy.mount(
            <CartView
                cart={[]}
                onIncrease={cy.stub()}
                onDecrease={cy.stub()}
                onRemove={cy.stub()}
                onNavigate={cy.stub()}
                checkoutError=""
                onCheckout={cy.stub()}
                orderPlaced={false}
            />,
        )

        cy.get('[data-cy="empty-cart"]').should('be.visible')
    })

    it('zeigt Success State nach Bestellung', () => {
        cy.mount(
            <CartView
                cart={[]}
                onIncrease={cy.stub()}
                onDecrease={cy.stub()}
                onRemove={cy.stub()}
                onNavigate={cy.stub()}
                checkoutError=""
                onCheckout={cy.stub()}
                orderPlaced={true}
            />,
        )

        cy.get('[data-cy="order-success"]').should('be.visible')
    })

    it('ruft Checkout auf', () => {
        const onCheckout = cy.stub().as('onCheckout')

        cy.mount(
            <CartView
                cart={cart}
                onIncrease={cy.stub()}
                onDecrease={cy.stub()}
                onRemove={cy.stub()}
                onNavigate={cy.stub()}
                checkoutError=""
                onCheckout={onCheckout}
                orderPlaced={false}
            />,
        )

        cy.get('[data-cy="checkout-button"]').click()
        cy.get('@onCheckout').should('have.been.calledOnce')
    })
})