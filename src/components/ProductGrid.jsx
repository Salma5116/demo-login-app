import { formatPrice } from '../utils/formatPrice'

function ProductGrid({ products, onAddToCart }) {
    if (!products.length) {
        return (
            <section className="empty-state panel" data-cy="empty-products">
                <h3>Keine Produkte gefunden</h3>
                <p>Ändere Suche oder Kategorie, um weitere Artikel anzuzeigen.</p>
            </section>
        )
    }

    return (
        <section className="product-grid" data-cy="product-grid">
            {products.map((product) => (
                <article key={product.id} className="product-card panel" data-cy="product-card">
                    <div className="product-card-top">
                        <span className="product-emoji">{product.image}</span>
                        <span className="badge">{product.badge}</span>
                    </div>

                    <h3>{product.name}</h3>
                    <p className="product-meta">
                        {product.category} · {product.rating} ★
                    </p>
                    <p className="product-description">{product.description}</p>

                    <div className="product-footer">
                        <div>
                            <strong>{formatPrice(product.price)}</strong>
                            <span data-cy={`stock-${product.id}`}>Noch {product.stock} verfügbar</span>
                        </div>

                        <button
                            className="primary-button"
                            data-cy={`add-to-cart-${product.id}`}
                            onClick={() => onAddToCart(product)}
                        >
                            In den Warenkorb
                        </button>
                    </div>
                </article>
            ))}
        </section>
    )
}

export default ProductGrid