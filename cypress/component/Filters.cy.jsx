import Filters from '../../src/components/Filters'

describe('Filters', () => {
    it('rendert Suchfeld und Selects', () => {
        cy.mount(
            <Filters
                search=""
                setSearch={cy.stub()}
                category="all"
                setCategory={cy.stub()}
                sort="featured"
                setSort={cy.stub()}
                categories={['Audio', 'Accessories']}
            />,
        )

        cy.get('[data-cy="search-input"]').should('exist')
        cy.get('[data-cy="category-select"]').should('exist')
        cy.get('[data-cy="sort-select"]').should('exist')
    })

    it('ändert Suche', () => {
        const setSearch = cy.stub().as('setSearch')

        cy.mount(
            <Filters
                search=""
                setSearch={setSearch}
                category="all"
                setCategory={cy.stub()}
                sort="featured"
                setSort={cy.stub()}
                categories={['Audio']}
            />,
        )

        cy.get('[data-cy="search-input"]').type('Keyboard')
        cy.get('@setSearch').should('have.been.called')
    })

    it('ändert Kategorie', () => {
        const setCategory = cy.stub().as('setCategory')

        cy.mount(
            <Filters
                search=""
                setSearch={cy.stub()}
                category="all"
                setCategory={setCategory}
                sort="featured"
                setSort={cy.stub()}
                categories={['Audio', 'Home']}
            />,
        )

        cy.get('[data-cy="category-select"]').select('Audio')
        cy.get('@setCategory').should('have.been.calledWith', 'Audio')
    })
})