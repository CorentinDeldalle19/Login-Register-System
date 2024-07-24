import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/styles/login.css';
import Navbar from '../components/Navbar';
import Input from '../components/input';
import Button1 from '../components/Button1';

import { Link } from 'react-router-dom';

function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    // Fonction pour vérifier si l'email est valide
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    async function signup(event) {
        event.preventDefault();
        
        // Réinitialiser les messages d'erreur et de succès
        setError('');
        setSuccess('');

        // Validation des champs
        if (!firstName || !email || !password) {
            setError('Tous les champs doivent être remplis.');
            return; // Empêche la soumission du formulaire
        }

        if (!validateEmail(email)) {
            setError('L\'adresse email est invalide.');
            return; // Empêche la soumission du formulaire
        }

        try {
            const response = await axios.post('http://localhost:3001/users', {
                firstName,
                email,
                password,
                role: "user"
            });
            console.log('Response:', response);
            setSuccess('Inscription réussie !');
            
            // Redirection après une inscription réussie
            navigate('/dashboard');
        } catch (err) {
            console.error('Error:', err);
            setError('Erreur lors de l\'inscription. Veuillez réessayer.');
        }
    }

    return (
        <div className="all">
            <Navbar />
            <div className="page">
                <h1>Sign up</h1>
                <form className="inputs" onSubmit={signup}>
                    <Input
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
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
                        <Button1 text="Signup" type="submit" />
                    </div>
                </form>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <div className="link" id='linkSignUp'>
                    <Link to="/login">I already have an account</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;