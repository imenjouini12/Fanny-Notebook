/**
 * @swagger
 * /createTascks:
 *   post:
 *     summary: Créer une nouvelle tâche
 *     description: Endpoint pour créer une nouvelle tâche.
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
 *     requestBody:
 *       description: Informations de la tâche à créer.
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: "Nouvelle tâche"
 *             description: "Description de la tâche"
 *             assignedTo: "Utilisateur Assigné"
 *             dueDate: "2023-12-31"
 *     responses:
 *       200:
 *         description: Succès - Tâche créée avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Tâche créée avec succès.
 *               data:
 *                 id: 1
 *                 title: "Nouvelle tâche"
 *                 description: "Description de la tâche"
 *                 assignedTo: "Utilisateur Assigné"
 *                 dueDate: "2023-12-31"
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la création de la tâche.
 *         content:
 *           application/json:
 *             example:
 *               error: Une erreur s'est produite lors de la création de la tâche.
 *               details: (message d'erreur détaillé)
 */
const auth = require("../../auth/auth");
const { isAdmin } = require("../../auth/middleware/authMiddleware");
const { user } = require("../../db/connection");
const { tascks } = require("../../db/connection");

const createTasck = (app) => {
  app.post("/createTascks", auth, isAdmin, (req, res) => {
    const resultat = req.body;

    tascks
      .create(resultat)
      .then((tasckCreated) => {
        const message = "Une ticket est creèr avec succès";
        res.json({ message, data: tasckCreated });
      })
      .catch((error) => {
        res
          .status(500)
          .json({
            error:
              "un erreur s'est produit lors de la creation de cette ticket !",
          });
      });
  });
};
module.exports = createTasck;
