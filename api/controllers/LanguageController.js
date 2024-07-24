const { Language } = require('../models');

class LanguageController {
    // Créer une nouvelle langue
    static async createLanguage(req, res) {
        try {
            const { name, description, image, linkDoc, idAdmin } = req.body;
            const language = await Language.create({ name, description, image, linkDoc, idAdmin });
            res.status(201).json(language);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Obtenir toutes les langues
    static async getLanguages(req, res) {
        try {
            const languages = await Language.findAll();
            res.status(200).json(languages);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Obtenir une langue par son ID
    static async getLanguageByID(req, res) {
        try {
            const { id } = req.params;
            const language = await Language.findByPk(id);

            if (!language) {
                return res.status(404).json({ message: "Language not found!" });
            }
            res.status(200).json(language);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Mettre à jour une langue
    static async updateLanguage(req, res) {
        try {
            const { id } = req.params;
            const { name, description, image, linkDoc, idAdmin } = req.body;
            const language = await Language.findByPk(id);

            if (!language) {
                return res.status(404).json({ message: "Language not found!" });
            }

            await language.update({ name, description, image, linkDoc, idAdmin });
            res.status(200).json(language);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Supprimer une langue
    static async deleteLanguage(req, res) {
        try {
            const { id } = req.params;
            const language = await Language.findByPk(id);

            if (!language) {
                return res.status(404).json({ message: "Language not found!" });
            }

            await language.destroy();
            res.status(204).json();
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

module.exports = LanguageController;