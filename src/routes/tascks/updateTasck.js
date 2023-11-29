/**
 * @swagger
 * /updateTasck/{id}:
 *   put:
 *     summary: Mettre à jour une tâche
 *     description: Endpoint pour mettre à jour une tâche existante en fonction de son identifiant.
 *     tags:
 *       - Tâches
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Identifiant de la tâche à mettre à jour.
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Jeton d'authentification JWT avec le rôle d'administrateur.
 *     requestBody:
 *       description: Informations de la tâche à mettre à jour.
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "Nouveau titre de la tâche"
 *             description: "Nouvelle description de la tâche"
 *             assignedTo: "Nouvel utilisateur assigné"
 *             dueDate: "2023-12-31"
 *     responses:
 *       200:
 *         description: Succès - Tâche mise à jour avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Cette tâche est à jour.
 *               nombre_de_modification: 1
 *       404:
 *         description: Erreur - Aucune tâche disponible avec cet identifiant.
 *         content:
 *           application/json:
 *             example:
 *               error: Aucune tâche disponible avec cet identifiant.
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la mise à jour de la tâche.
 *         content:
 *           application/json:
 *             example:
 *               error: Problème lors de la mise à jour de la tâche.
 *               details: (message d'erreur détaillé)
 */
const { where } = require("sequelize");
const auth = require("../../auth/auth");
const { isTaskOwnerOrAdmin } = require("../../auth/middleware/authPrivesy");
const { tascks } = require("../../db/connection");

const updateTasck = (app) => {
  app.put("/updateTasck/:id", auth, isTaskOwnerOrAdmin, async (req, res) => {
    const tasckId = req.params.id;

    try {
      const existingTasck = await tascks.findByPk(tasckId);
      if (existingTasck !== null) {
        const [tasckUpdated] = await tascks.update(req.body, {
          where: { id: tasckId },
        });
        if (tasckUpdated > 0) {
          const message = "cette tache est à jour ";
          res.json({ message, nombre_de_modification: tasckUpdated });
        } else {
          message = "aucune tache disponible avec cette id ";
          res.status(404).send(message);
        }
      } else {
        const message = "aucune tache disponible avec cette id ";
        res.status(404).json({ message });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "probléme se produit lors de la mise à jour du tache" });
    }
  });
};

module.exports = updateTasck;
