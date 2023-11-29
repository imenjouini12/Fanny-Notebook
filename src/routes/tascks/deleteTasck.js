/**
 * @swagger
 * /deleteTasck/{id}:
 *   delete:
 *     summary: Supprimer une tâche
 *     description: Endpoint pour supprimer une tâche existante.
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
 *         description: Identifiant de la tâche à supprimer.
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Jeton d'authentification JWT avec le rôle d'administrateur.
 *     responses:
 *       200:
 *         description: Succès - Tâche supprimée avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Tâche supprimée avec succès.
 *       404:
 *         description: Erreur - Aucune tâche disponible avec cet identifiant.
 *         content:
 *           application/json:
 *             example:
 *               error: Aucune tâche disponible avec cet identifiant.
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la suppression de la tâche.
 *         content:
 *           application/json:
 *             example:
 *               error: Une erreur s'est produite lors de la suppression de la tâche.
 *               details: (message d'erreur détaillé)
 */
const auth = require("../../auth/auth");
const { isTaskOwnerOrAdmin } = require("../../auth/middleware/authPrivesy");
const { tascks } = require("../../db/connection");

const deletTasck = (app) => {
  app.delete("/deleteTasck/:id", auth, isTaskOwnerOrAdmin, async (req, res) => {
    const idTask = req.params.id;
    try {
      const exestistingTasck = await tascks.findByPk(idTask);
      if (exestistingTasck !== null) {
        try {
          const deletingTasck = await tascks.destroy({ where: { id: idTask } });

          const message = "Tache supprimer avec succès";

          res.json({ message });
        } catch (error) {
          const message = "un probléme s'est produit lor de la suppression ";
          res.status(500).json({ error: message });
        }
      } else {
        const message = "il ya accune tache disponible avec cet id";
        res.status(404).send(message);
      }
    } catch (error) {
      const message = "un probléme s'est produit au niveau serveur";
      res.status(500).json({ error: message });
    }
  });
};

module.exports = deletTasck;
