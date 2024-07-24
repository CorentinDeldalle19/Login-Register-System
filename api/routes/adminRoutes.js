const express = require('express');
const { body, param } = require('express-validator');
const { authenticateJWT, authorizeAdmin } = require('../middlewares/authMiddleware');
const AdminController = require('../controllers/AdminController');

const router = express.Router();

// Validation
const validateAdmin = [
    body('idUser').isInt().withMessage('idUser must be an integer')
];

const validateAdminId = [
    param('id').isInt().withMessage('Invalid admin ID')
];

// Routes pour les admins
router.post('/', authenticateJWT, authorizeAdmin, validateAdmin, AdminController.createAdmin);
router.get('/', authenticateJWT, authorizeAdmin, AdminController.getAdmins);
router.get('/:id', authenticateJWT, authorizeAdmin, validateAdminId, AdminController.getAdminByID);
router.put('/:id', authenticateJWT, authorizeAdmin, [...validateAdminId, ...validateAdmin], AdminController.updateAdmin); 
router.delete('/:id', authenticateJWT, authorizeAdmin, validateAdminId, AdminController.deleteAdmin);

module.exports = router;