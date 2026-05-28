import { formatPrice } from '../utils/formatPrice'

function CartView({
                      cart,
                      onIncrease,
                      onDecrease,
                      onRemove,
                      onNavigate,
                      checkoutError,
                      onCheckout,
                      orderPlaced,
                  }) {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const shipping = cart.length ? 4.99 : 0
    const total = subtotal + shipping

    if (orderPlaced) {
        return (
            <section className="panel success-panel" data-cy="order-success">
                <span className="eyebrow">Bestellung erfolgreich</span>
                <h3>Danke für deine Bestellung.</h3>
                <p>
                    Deine Demo-Bestellung wurde erfolgreich abgeschickt und kann perfekt in
                    Cypress geprüft werden.
                </p>
                <button
                    className="primary-button"
                    data-cy="back-to-shop"
                    onClick={() => onNavigate('shop')}
                >
                    Zurück zum Shop
                </button>
            </section>
        )
    }

    return (
        <div className="cart-layout">
            <section className="panel" data-cy="cart-panel">
                <div className="section-header">
                    <div>
                        <span className="eyebrow">Warenkorb</span>
                        <h3>Deine Auswahl</h3>
                    </div>
                    <span className="cart-count" data-cy="cart-count">
            {cart.reduce((sum, item) => sum + item.quantity, 0)} Artikel
          </span>
                </div>

                {!cart.length ? (
                    <div className="empty-state" data-cy="empty-cart">
                        <h4>Dein Warenkorb ist leer</h4>
                        <p>Füge Produkte hinzu, um Checkout und Mocking testen zu können.</p>
                        <button
                            className="ghost-button"
                            data-cy="go-shopping"
                            onClick={() => onNavigate('shop')}
                        >
                            Produkte ansehen
                        </button>
                    </div>
                ) : (
                    <div className="cart-list">
                        {cart.map((item) => (
                            <article className="cart-item" key={item.id} data-cy="cart-item">
                                <div>
                                    <strong>{item.name}</strong>
                                    <p>
                                        {formatPrice(item.price)} · {item.category}
                                    </p>
                                </div>

                                <div className="qty-controls">
                                    <button data-cy={`decrease-${item.id}`} onClick={() => onDecrease(item.id)}>
                                        -
                                    </button>
                                    <span data-cy={`quantity-${item.id}`}>{item.quantity}</span>
                                    <button data-cy={`increase-${item.id}`} onClick={() => onIncrease(item.id)}>
                                        +
                                    </button>
                                </div>

                                <button
                                    className="remove-link"
                                    data-cy={`remove-${item.id}`}
                                    onClick={() => onRemove(item.id)}
                                >
                                    Entfernen
                                </button>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            <aside className="panel summary-panel" data-cy="summary-panel">
                <span className="eyebrow">Checkout</span>
                <h3>Bestellübersicht</h3>

                <div className="summary-row">
                    <span>Zwischensumme</span>
                    <strong data-cy="subtotal">{formatPrice(subtotal)}</strong>
                </div>

                <div className="summary-row">
                    <span>Versand</span>
                    <strong>{formatPrice(shipping)}</strong>
                </div>

                <div className="summary-row total">
                    <span>Gesamt</span>
                    <strong data-cy="total">{formatPrice(total)}</strong>
                </div>

                {checkoutError && (
                    <p className="error-message" data-cy="checkout-error">
                        {checkoutError}
                    </p>
                )}

                <button
                    className="primary-button"
                    data-cy="checkout-button"
                    disabled={!cart.length}
                    onClick={onCheckout}
                >
                    Bestellung abschließen
                </button>
            </aside>
        </div>
    )
}

export default CartView