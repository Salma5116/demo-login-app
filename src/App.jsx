import { useState } from 'react'
import LoginForm from './LoginForm'

function App() {
    const [message, setMessage] = useState('')

    const handleLogin = ({ email, password }) => {
        if (email === 'test@test.de' && password === '123456') {
            setMessage('Login erfolgreich')
        } else {
            setMessage('Login fehlgeschlagen')
        }
    }

    return (
        <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
            <h1>Mini Login App</h1>
            <LoginForm onLogin={handleLogin} />
            {message && <p data-cy="message">{message}</p>}
        </div>
    )
}

export default App