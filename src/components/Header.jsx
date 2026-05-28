function Header({ user, cartCount, onLogout, onNavigate, currentPage }) {
    return (
        <header className="topbar">
            <div>
                <span className="eyebrow">Cypress Demo App</span>
                <h2 data-cy="welcome-title">Willkommen, {user.name}</h2>
            </div>

            <nav className="topnav">
                <button
                    className={currentPage === 'shop' ? 'nav-link active' : 'nav-link'}
                    data-cy="nav-shop"
                    onClick={() => onNavigate('shop')}
                >
                    Shop
                </button>

                <button
                    className={currentPage === 'cart' ? 'nav-link active' : 'nav-link'}
                    data-cy="nav-cart"
                    onClick={() => onNavigate('cart')}
                >
                    Warenkorb ({cartCount})
                </button>

                <button className="ghost-button" data-cy="logout-button" onClick={onLogout}>
                    Logout
                </button>
            </nav>
        </header>
    )
}

export default Header