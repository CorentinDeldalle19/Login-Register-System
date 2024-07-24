const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Importer le modèle User

const JWT_SECRET = 'your_jwt_secret_key';

// Middleware pour l'authentification JWT
function authenticateJWT(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403);

        try {
            const dbUser = await User.findByPk(user.id);
            if (!dbUser) return res.sendStatus(401);
            req.user = dbUser;
            next();
        } catch (dbErr) {
            return res.sendStatus(500); // Erreur de base de données
        }
    });
}

// Middleware pour autoriser uniquement les administrateurs
async function authorizeAdmin(req, res, next) {
    // Assurez-vous que l'utilisateur est authentifié
    if (!req.user) return res.sendStatus(401);

    // Vérifiez si l'utilisateur a le rôle d'administrateur
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access forbidden: Admins only' });
    }

    next();
}

module.exports = { authenticateJWT, authorizeAdmin };