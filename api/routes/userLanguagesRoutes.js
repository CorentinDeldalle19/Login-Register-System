const express = require('express');
const { body, param } = require('express-validator');
const { authenticateJWT } = require('../middlewares/authMiddleware');
const UserLanguagesController = require('../controllers/UserLanguageController');

const router = express.Router();

// Validation
const validateUserLanguage = [
    body('userId').isInt().withMessage('userId must be an integer'),
    body('idLanguage').isInt().withMessage('idLanguage must be an integer')
];

const validateUserLanguageParams = [
    param('userId').isInt().withMessage('Invalid user ID'),
    param('idLanguage').isInt().withMessage('Invalid language ID')
];

// Routes pour les associations utilisateur-langue
router.post('/', authenticateJWT, validateUserLanguage, UserLanguagesController.createUserLanguage);
router.get('/', authenticateJWT, UserLanguagesController.getUserLanguages);
router.get('/:userId/:idLanguage', authenticateJWT, validateUserLanguageParams, UserLanguagesController.getUserLanguageByID);
router.put('/:userId/:idLanguage', authenticateJWT, [...validateUserLanguageParams, ...validateUserLanguage], UserLanguagesController.updateUserLanguage);
router.delete('/:userId/:idLanguage', authenticateJWT, validateUserLanguageParams, UserLanguagesController.deleteUserLanguage);

module.exports = router;