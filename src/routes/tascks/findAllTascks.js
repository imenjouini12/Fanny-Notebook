/**
 * @swagger
 * /tascks:
 *   get:
 *     summary: Récupérer la liste des tâches
 *     description: Endpoint pour récupérer la liste des tâches.
 *     tags:
 *       - Tâches
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Jeton d'authentification JWT avec le rôle d'administrateur.
 *     responses:
 *       200:
 *         description: Succès - Liste des tâches récupérée avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: success
 *               data:
 *                 - id: 1
 *                   title: "Tâche 1"
 *                   description: "Description de la tâche 1"
 *                   assignedTo: "Utilisateur Assigné 1"
 *                   dueDate: "2023-12-31"
 *                 - id: 2
 *                   title: "Tâche 2"
 *                   description: "Description de la tâche 2"
 *                   assignedTo: "Utilisateur Assigné 2"
 *                   dueDate: "2023-12-31"
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la récupération de la liste des tâches.
 *         content:
 *           application/json:
 *             example:
 *               message: Error
 *               error: (message d'erreur détaillé)
 */
const { tascks } = require("../../db/connection");
const { isAdmin } = require("../../auth/middleware/authMiddleware");
const auth = require("../../auth/auth");

const listTascks = (app) => {
  app.get("/tascks", auth, isAdmin, (req, res) => {
    tascks
      .findAll()
      .then((tas) => {
        const message = "success";
        return res.json({ message, data: tas });
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).json({ message: "Error", error: error.message });
      });
  });
};
module.exports = listTascks;
