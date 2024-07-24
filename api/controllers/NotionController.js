const { Notion } = require('../models');

class NotionController {
    // Créer une nouvelle notion
    static async createNotion(req, res) {
        try {
            const { idLanguage, number, title, text, linkVideo, linkCodepen } = req.body;
            const notion = await Notion.create({ idLanguage, number, title, text, linkVideo, linkCodepen });
            res.status(201).json(notion);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Obtenir toutes les notions
    static async getNotions(req, res) {
        try {
            const notions = await Notion.findAll();
            res.status(200).json(notions);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Obtenir une notion par son ID
    static async getNotionByID(req, res) {
        try {
            const { id } = req.params;
            const notion = await Notion.findByPk(id);

            if (!notion) {
                return res.status(404).json({ message: "Notion not found!" });
            }
            res.status(200).json(notion);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Mettre à jour une notion
    static async updateNotion(req, res) {
        try {
            const { id } = req.params;
            const { idLanguage, number, title, text, linkVideo, linkCodepen } = req.body;
            const notion = await Notion.findByPk(id);

            if (!notion) {
                return res.status(404).json({ message: "Notion not found!" });
            }

            await notion.update({ idLanguage, number, title, text, linkVideo, linkCodepen });
            res.status(200).json(notion);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    // Supprimer une notion
    static async deleteNotion(req, res) {
        try {
            const { id } = req.params;
            const notion = await Notion.findByPk(id);

            if (!notion) {
                return res.status(404).json({ message: "Notion not found!" });
            }

            await notion.destroy();
            res.status(204).json();
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
}

module.exports = NotionController;