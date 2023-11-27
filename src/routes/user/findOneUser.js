/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Récupérer un utilisateur par ID
 *     description: Récupérer un utilisateur en fournissant son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de l'utilisateur à récupérer
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Opération réussie
 *         content:
 *           application/json:
 *             example:
 *               message: Un utilisateur a été trouvé.
 *               data:
 *                 id: 1
 *                 username: john_doe
 *       404:
 *         description: Utilisateur non trouvé
 *         content:
 *           text/plain:
 *             example: Aucun utilisateur existe avec cet ID.
 */
const { user } = require("../../db/connection");


const oneUser = (app) => {
  app.get("/users/:id", (req, res) => {
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
