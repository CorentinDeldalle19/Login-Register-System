const { UserLanguages } = require('../models');

class UserLanguagesController {
    // Créer une nouvelle association utilisateur-langue
    static async createUserLanguage(req, res) {
        try {
            const { userId, idLanguage } = req.body;
            const userLanguage = await UserLanguages.create({ userId, idLanguage });
            res.status(201).json(userLanguage);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Obtenir toutes les associations utilisateur-langue
    static async getUserLanguages(req, res) {
        try {
            const userLanguages = await UserLanguages.findAll();
            res.status(200).json(userLanguages);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Obtenir une association utilisateur-langue par les IDs
    static async getUserLanguageByID(req, res) {
        try {
            const { userId, idLanguage } = req.params;
            const userLanguage = await UserLanguages.findOne({ where: { userId, idLanguage } });

            if (!userLanguage) {
                return res.status(404).json({ message: "UserLanguage not found!" });
            }
            res.status(200).json(userLanguage);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Mettre à jour une association utilisateur-langue
    static async updateUserLanguage(req, res) {
        try {
            const { userId, idLanguage } = req.params;
            const { newUserId, newIdLanguage } = req.body;
            const userLanguage = await UserLanguages.findOne({ where: { userId, idLanguage } });

            if (!userLanguage) {
                return res.status(404).json({ message: "UserLanguage not found!" });
            }

            await userLanguage.update({ userId: newUserId, idLanguage: newIdLanguage });
            res.status(200).json(userLanguage);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Supprimer une association utilisateur-langue
    static async deleteUserLanguage(req, res) {
        try {
            const { userId, idLanguage } = req.params;
            const userLanguage = await UserLanguages.findOne({ where: { userId, idLanguage } });

            if (!userLanguage) {
                return res.status(404).json({ message: "UserLanguage not found!" });
            }

            await userLanguage.destroy();
            res.status(204).json();
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

module.exports = UserLanguagesController;