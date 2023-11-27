/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par ID
 *     description: Récupère les informations d'un utilisateur en fonction de son ID.
 *     tags:
 *       - Utilisateurs
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de l'utilisateur à récupérer.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Succès - Utilisateur récupéré avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Utilisateur récupéré avec succès.
 *               data:
 *                 id: 1
 *                 username: john_doe
 *                 email: john_doe@example.com
 *       404:
 *         description: Non trouvé - Aucun utilisateur trouvé avec cet ID.
 *         content:
 *           application/json:
 *             example:
 *               message: Aucun utilisateur trouvé avec cet ID.
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la récupération de l'utilisateur.
 *         content:
 *           application/json:
 *             example:
 *               error: Erreur lors de la récupération de l'utilisateur.
 *               details: (message d'erreur détaillé)
 */
const { user } = require("../../db/connection");
const auth = require("../../auth/auth");

const oneUser = (app) => {
  app.get("/users/:id", auth, (req, res) => {
    const userId = req.params.id;
    user
      .findByPk(userId)
      .then((oneUser) => {
        if (oneUser !== null) {
          const message = "Un utilisateur a été trouvé.";
          res.json({ message, data: oneUser });
        } else {
          res.send("aucun utilisateur existe avec cet id");
        }
      })
      .catch(console.error);
  });
};

module.exports = oneUser;
