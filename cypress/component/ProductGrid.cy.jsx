import ProductGrid from '../../src/components/ProductGrid'

const products = [
    {
        id: 1,
        name: 'Aurora Headphones',
        category: 'Audio',
        price: 129.99,
        rating: 4.8,
        badge: 'Bestseller',
        stock: 12,
        image: '🎧',
        description: 'Kabellose Kopfhörer mit klarem Sound.',
    },
]

describe('ProductGrid', () => {
    it('zeigt Produkte', () => {
        cy.mount(<ProductGrid products={products} onAddToCart={cy.stub()} />)
        cy.get('[data-cy="product-card"]').should('have.length', 1)
        cy.contains('Aurora Headphones').should('be.visible')
    })

    it('zeigt Empty State', () => {
        cy.mount(<ProductGrid products={[]} onAddToCart={cy.stub()} />)
        cy.get('[data-cy="empty-products"]').should('be.visible')
    })

    it('ruft onAddToCart auf', () => {
        const onAddToCart = cy.stub().as('onAddToCart')

        cy.mount(<ProductGrid products={products} onAddToCart={onAddToCart} />)
        cy.get('[data-cy="add-to-cart-1"]').click()
        cy.get('@onAddToCart').should('have.been.calledWith', products[0])
    })
})