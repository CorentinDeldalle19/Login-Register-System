import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../components/styles/login.css';
import Navbar from '../components/Navbar';
import Input from '../components/input';
import Button1 from '../components/Button1';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate(); // Hook pour la redirection

    async function handleLogin(event) {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/users/login', {
                email,
                password
            });

            setError('');

            navigate('/dashboard');
        } catch (err) {
            console.error('Error:', err.response ? err.response.data : err.message);
            setError('Erreur lors de la connexion. Veuillez réessayer.');
            setSuccess('');
        }
    }

    return (
        <div className="all">
            <Navbar />
            <div className="page">
                <h1>Login</h1>
                <form className="inputs" onSubmit={handleLogin}>
                    <Input
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="button">
                        <Button1 text="Login" type="submit" />
                    </div>
                </form>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <div className="link">
                    <Link to="/signup">I don't have an account</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;