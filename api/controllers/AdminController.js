const { Admin } = require('../models');

class AdminController {
    // Créer un nouvel admin
    static async createAdmin(req, res) {
        try {
            const { idUser } = req.body;
            const admin = await Admin.create({ idUser });
            res.status(201).json(admin);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Obtenir tous les admins
    static async getAdmins(req, res) {
        try {
            const admins = await Admin.findAll();
            res.status(200).json(admins);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Obtenir un admin par son ID
    static async getAdminByID(req, res) {
        try {
            const { id } = req.params;
            const admin = await Admin.findByPk(id);

            if (!admin) {
                return res.status(404).json({ message: "Admin not found!" });
            }
            res.status(200).json(admin);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Mettre à jour un admin
    static async updateAdmin(req, res) {
        try {
            const { id } = req.params;
            const { idUser } = req.body;
            const admin = await Admin.findByPk(id);

            if (!admin) {
                return res.status(404).json({ message: "Admin not found!" });
            }

            await admin.update({ idUser });
            res.status(200).json(admin);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Supprimer un admin
    static async deleteAdmin(req, res) {
        try {
            const { id } = req.params;
            const admin = await Admin.findByPk(id);

            if (!admin) {
                return res.status(404).json({ message: "Admin not found!" });
            }

            await admin.destroy();
            res.status(204).json();
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

module.exports = AdminController;