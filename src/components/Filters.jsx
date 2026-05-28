function Filters({
                     search,
                     setSearch,
                     category,
                     setCategory,
                     sort,
                     setSort,
                     categories,
                 }) {
    return (
        <section className="panel filters-panel" data-cy="filters-panel">
            <div>
                <label htmlFor="search">Suche</label>
                <input
                    id="search"
                    data-cy="search-input"
                    placeholder="Produkt suchen"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="category">Kategorie</label>
                <select
                    id="category"
                    data-cy="category-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="all">Alle</option>
                    {categories.map((entry) => (
                        <option key={entry} value={entry}>
                            {entry}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="sort">Sortierung</label>
                <select
                    id="sort"
                    data-cy="sort-select"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="featured">Empfohlen</option>
                    <option value="price-asc">Preis aufsteigend</option>
                    <option value="price-desc">Preis absteigend</option>
                    <option value="rating-desc">Beste Bewertung</option>
                </select>
            </div>
        </section>
    )
}

export default Filters