/**
 * @swagger
 * /tascks/{id}:
 *   get:
 *     summary: Récupérer une tâche spécifique
 *     description: Endpoint pour récupérer une tâche spécifique en fonction de son identifiant.
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
 *         description: Identifiant de la tâche à récupérer.
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Jeton d'authentification JWT avec le rôle d'administrateur.
 *     responses:
 *       200:
 *         description: Succès - Tâche récupérée avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Tâche disponible avec cet ID.
 *               data:
 *                 id: 1
 *                 title: "Tâche 1"
 *                 description: "Description de la tâche 1"
 *                 assignedTo: "Utilisateur Assigné 1"
 *                 dueDate: "2023-12-31"
 *       404:
 *         description: Erreur - Aucune tâche disponible avec cet identifiant.
 *         content:
 *           application/json:
 *             example:
 *               error: Aucune tâche disponible avec cet identifiant.
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la récupération de la tâche.
 *         content:
 *           application/json:
 *             example:
 *               message: Erreur
 *               error: (message d'erreur détaillé)
 */
const { tascks, user } = require("../../db/connection");
const auth = require("../../auth/auth");

const { isTaskOwnerOrAdmin } = require("../../auth/middleware/authPrivesy");

const oneTasck = (app) => {
  app.get("/tascks/:id", auth, isTaskOwnerOrAdmin, (req, res) => {
    const idTask = req.params.id;

    tascks
      .findByPk(idTask)
      .then((oneTask) => {
        if (oneTask !== null) {
          const message = "tâche disponible avec cet id";
          res.json({ message, data: oneTask });
        } else {
          res.status(404).send("aucune tâche disponible avec cette id");
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: "Erreur", error: error.message });
      });
  });
};
module.exports = oneTasck;
