const express = require('express');
const { body, param } = require('express-validator');
const { authenticateJWT, authorizeAdmin } = require('../middlewares/authMiddleware');
const UserController = require('../controllers/UserController');

const router = express.Router();

// Validation
const validateUser = [
    body('firstName').isString().withMessage('FirstName must be a string'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').isString().withMessage('Role must be a string')
];

const validateUserId = [
    param('id').isInt().withMessage('Invalid user ID')
];

// Routes pour les utilisateurs
router.post('/', validateUser, UserController.createUser);
router.post('/login', UserController.login);
router.get('/', authenticateJWT, authorizeAdmin, UserController.getUsers);
router.get('/:id', authenticateJWT, UserController.getUserByID);
router.put('/:id', authenticateJWT, [...validateUserId, ...validateUser], UserController.updateUser);
router.delete('/:id', authenticateJWT, authorizeAdmin, validateUserId, UserController.deleteUser);

module.exports = router;