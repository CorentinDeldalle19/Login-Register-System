const express = require('express');
const { body, param } = require('express-validator');
const { authenticateJWT, authorizeAdmin } = require('../middlewares/authMiddleware');
const LanguageController = require('../controllers/LanguageController');

const router = express.Router();

// Validation
const validateLanguage = [
    body('name').isString().withMessage('Name must be a string'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('image').optional().isString().withMessage('Image must be a string'),
    body('linkDoc').optional().isString().withMessage('LinkDoc must be a string'),
    body('idAdmin').isInt().withMessage('idAdmin must be an integer')
];

const validateLanguageId = [
    param('id').isInt().withMessage('Invalid language ID')
];

// Routes pour les langues
router.post('/', authenticateJWT, authorizeAdmin, validateLanguage, LanguageController.createLanguage);
router.get('/', authenticateJWT, LanguageController.getLanguages);
router.get('/:id', authenticateJWT, LanguageController.getLanguageByID);
router.put('/:id', authenticateJWT, authorizeAdmin, [...validateLanguageId, ...validateLanguage], LanguageController.updateLanguage);
router.delete('/:id', authenticateJWT, authorizeAdmin, validateLanguageId, LanguageController.deleteLanguage);

module.exports = router;