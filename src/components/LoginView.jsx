import { useState } from 'react'

function LoginView({ onLogin, authError }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onLogin({ email, password })
    }

    return (
        <div className="auth-shell">
            <section className="auth-card" data-cy="login-card">
                <div className="auth-copy">
                    <span className="eyebrow">Demo Shop</span>
                    <h1>Login Cypress Demo App</h1>
                </div>

                <form className="auth-form" onSubmit={handleSubmit} data-cy="login-form">
                    <label htmlFor="email">E-Mail</label>
                    <input
                        id="email"
                        data-cy="email"
                        type="email"
                        placeholder="test@test.de"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Passwort</label>
                    <input
                        id="password"
                        data-cy="password"
                        type="password"
                        placeholder="123456"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {authError && (
                        <p className="error-message" data-cy="auth-error">
                            {authError}
                        </p>
                    )}

                    <button className="primary-button" data-cy="login-button" type="submit">
                        Einloggen
                    </button>

                    <p className="demo-hint" data-cy="demo-hint">
                        Demo-Login: <strong>test@test.de</strong> / <strong>123456</strong>
                    </p>
                </form>
            </section>
        </div>
    )
}

export default LoginView