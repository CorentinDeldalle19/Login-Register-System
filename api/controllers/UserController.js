const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Clé secrète pour signer les jetons JWT
const JWT_SECRET = 'your_jwt_secret_key';

class UserController {
    // Inscription (signup)
    static async signup(req, res) {
        try {
            const { firstName, email, password, role } = req.body;

            // Vérifier si l'utilisateur existe déjà
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }

            // Hacher le mot de passe
            const hashedPassword = await bcrypt.hash(password, 10);

            // Créer un nouvel utilisateur
            const user = await User.create({ firstName, email, password: hashedPassword, role });
            res.status(201).json({ message: 'User created successfully', user });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Connexion (login)
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            // Trouver l'utilisateur par email
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Comparer le mot de passe
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // Générer un jeton JWT
            const token = jwt.sign({ id: user.idUser }, JWT_SECRET, { expiresIn: '1h' });

            res.status(200).json({ message: 'Login successful', token });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Créer un nouvel utilisateur (corrigé pour hacher le mot de passe)
    static async createUser(req, res) {
        try {
            const { firstName, email, password, role } = req.body;

            // Hacher le mot de passe
            const hashedPassword = await bcrypt.hash(password, 10);

            // Créer un nouvel utilisateur
            const user = await User.create({ firstName, email, password: hashedPassword, role });
            res.status(201).json(user);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Obtenir tous les utilisateurs
    static async getUsers(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Obtenir un utilisateur par son ID
    static async getUserByID(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Mettre à jour un utilisateur (corrigé pour hacher le mot de passe si fourni)
    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { firstName, email, password, role } = req.body;
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Si un mot de passe est fourni, le hacher
            let updatedData = { firstName, email, role };
            if (password) {
                updatedData.password = await bcrypt.hash(password, 10);
            }

            await user.update(updatedData);
            res.status(200).json(user);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Supprimer un utilisateur
    static async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            await user.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = UserController;