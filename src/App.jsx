import { useMemo, useState } from 'react'
import LoginView from './components/LoginView'
import Header from './components/Header'
import Filters from './components/Filters'
import ProductGrid from './components/ProductGrid'
import CartView from './components/CartView'
import { DEMO_USER, PRODUCTS } from './data/demoData'

function App() {
    const [user, setUser] = useState(null)
    const [authError, setAuthError] = useState('')
    const [currentPage, setCurrentPage] = useState('shop')
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('all')
    const [sort, setSort] = useState('featured')
    const [cart, setCart] = useState([])
    const [checkoutError, setCheckoutError] = useState('')
    const [orderPlaced, setOrderPlaced] = useState(false)

    const handleLogin = ({ email, password }) => {
        if (email === DEMO_USER.email && password === DEMO_USER.password) {
            setUser(DEMO_USER)
            setAuthError('')
            setCurrentPage('shop')
        } else {
            setAuthError('Login fehlgeschlagen. Bitte überprüfe deine Daten.')
        }
    }

    const handleLogout = () => {
        setUser(null)
        setCart([])
        setCurrentPage('shop')
        setOrderPlaced(false)
        setCheckoutError('')
    }

    const addToCart = (product) => {
        setOrderPlaced(false)

        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id)

            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                )
            }

            return [...prev, { ...product, quantity: 1 }]
        })
    }

    const increaseQty = (id) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
            ),
        )
    }

    const decreaseQty = (id) => {
        setCart((prev) =>
            prev.flatMap((item) => {
                if (item.id !== id) return [item]
                if (item.quantity === 1) return []
                return [{ ...item, quantity: item.quantity - 1 }]
            }),
        )
    }

    const removeItem = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id))
    }

    const handleCheckout = () => {
        if (!cart.length) {
            setCheckoutError('Bitte lege zuerst ein Produkt in den Warenkorb.')
            return
        }

        setCheckoutError('')
        setOrderPlaced(true)
        setCart([])
    }

    const categories = [...new Set(PRODUCTS.map((item) => item.category))]

    const filteredProducts = useMemo(() => {
        let result = [...PRODUCTS]

        if (search.trim()) {
            const query = search.toLowerCase()
            result = result.filter(
                (item) =>
                    item.name.toLowerCase().includes(query) ||
                    item.description.toLowerCase().includes(query),
            )
        }

        if (category !== 'all') {
            result = result.filter((item) => item.category === category)
        }

        if (sort === 'price-asc') result.sort((a, b) => a.price - b.price)
        if (sort === 'price-desc') result.sort((a, b) => b.price - a.price)
        if (sort === 'rating-desc') result.sort((a, b) => b.rating - a.rating)

        return result
    }, [search, category, sort])

    if (!user) {
        return <LoginView onLogin={handleLogin} authError={authError} />
    }

    return (
        <div className="app-shell">
            <Header
                user={user}
                cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
                onLogout={handleLogout}
                onNavigate={setCurrentPage}
                currentPage={currentPage}
            />

            <main className="main-content">
                {currentPage === 'shop' ? (
                    <>
                        <section className="hero-panel panel" data-cy="dashboard-hero">
                            <div>
                                <span className="eyebrow">Shop Dashboard</span>
                                <h1>Demo-App mit Login, Filter, Cart und Checkout</h1>
                            </div>

                            <div className="hero-stats">
                                <div className="stat-card">
                                    <span>Produkte</span>
                                    <strong data-cy="product-count">{PRODUCTS.length}</strong>
                                </div>
                                <div className="stat-card">
                                    <span>Kategorien</span>
                                    <strong>{categories.length}</strong>
                                </div>
                                <div className="stat-card">
                                    <span>Im Warenkorb</span>
                                    <strong data-cy="header-cart-count">
                                        {cart.reduce((sum, item) => sum + item.quantity, 0)}
                                    </strong>
                                </div>
                            </div>
                        </section>

                        <Filters
                            search={search}
                            setSearch={setSearch}
                            category={category}
                            setCategory={setCategory}
                            sort={sort}
                            setSort={setSort}
                            categories={categories}
                        />

                        <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
                    </>
                ) : (
                    <CartView
                        cart={cart}
                        onIncrease={increaseQty}
                        onDecrease={decreaseQty}
                        onRemove={removeItem}
                        onNavigate={setCurrentPage}
                        checkoutError={checkoutError}
                        onCheckout={handleCheckout}
                        orderPlaced={orderPlaced}
                    />
                )}
            </main>
        </div>
    )
}

export default App