const express = require('express');
const { body, param } = require('express-validator');
const { authenticateJWT, authorizeAdmin } = require('../middlewares/authMiddleware');
const NotionController = require('../controllers/NotionController');

const router = express.Router();

// Validation
const validateNotion = [
    body('idLanguage').isInt().withMessage('idLanguage must be an integer'),
    body('number').isInt().withMessage('Number must be an integer'),
    body('title').isString().withMessage('Title must be a string'),
    body('text').isString().withMessage('Text must be a string'),
    body('linkVideo').optional().isString().withMessage('LinkVideo must be a string'),
    body('linkCodepen').optional().isString().withMessage('LinkCodepen must be a string')
];

const validateNotionId = [
    param('id').isInt().withMessage('Invalid notion ID')
];

// Routes pour les notions
router.post('/', validateNotion, NotionController.createNotion);
router.get('/', authenticateJWT, NotionController.getNotions);
router.get('/:id', authenticateJWT, NotionController.getNotionByID);
router.put('/:id', authenticateJWT, authorizeAdmin, [...validateNotionId, ...validateNotion], NotionController.updateNotion);
router.delete('/:id', authenticateJWT, authorizeAdmin, validateNotionId, NotionController.deleteNotion);

module.exports = router;