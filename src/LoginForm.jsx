import { useState } from 'react'

function LoginForm({ onLogin }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onLogin({ email, password })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">E-Mail</label>
                <input
                    id="email"
                    data-cy="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="password">Passwort</label>
                <input
                    id="password"
                    data-cy="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button data-cy="login-button" type="submit">
                Login
            </button>
        </form>
    )
}

export default LoginForm