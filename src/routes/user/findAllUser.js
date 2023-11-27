/**
 * @swagger
 * /users:
 *   get:
 *     summary: Liste des utilisateurs
 *     description: Récupère la liste complète des utilisateurs.
 *     tags:
 *       - Utilisateurs
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Succès - Liste des utilisateurs récupérée avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Liste des utilisateurs récupérée avec succès.
 *               data:
 *                 - id: 1
 *                   username: john_doe
 *                   email: john_doe@example.com
 *                 - id: 2
 *                   username: jane_doe
 *                   email: jane_doe@example.com
 *                 - id: 3
 *                   username: bob_smith
 *                   email: bob_smith@example.com
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la récupération des utilisateurs.
 *         content:
 *           application/json:
 *             example:
 *               error: Erreur lors de la récupération des utilisateurs.
 *               details: (message d'erreur détaillé)
 */

const { user } = require("../../db/connection");
const { Op } = require("sequelize");
const auth = require("../../auth/auth");

const listUser = (app) => {
  app.get("/users",auth, (req, res) => {
    if (req.query.username) {
      const limit = parseInt(req.query.limit) || 10; // Par défaut, si limit n'est pas fourni, prenez 10
      const username = req.query.username;
      
      user
        .findAndCountAll({
          where: {
            username: { [Op.like]: `%${username}%` },
          },
          order: [['username', 'ASC']],
          limit: limit,
        })
        .then((users) => {
          const message = `${users.count} utilisateur(s) trouvé(s) avec le caractère ${username}`;
          res.json({ message, data: users.rows });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({
            error: "Une erreur s'est produite lors de la récupération des utilisateurs.",
          });
        });
    } else {
      user
        .findAll({
          order: [['username', 'ASC']],
          limit: parseInt(req.query.limit) || undefined, // Utiliser limit seulement si le paramètre est fourni
        })
        .then((users) => {
          const message = "La liste des utilisateurs a bien été récupérée.";
          res.json({ message, data: users });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({
            error: "Une erreur s'est produite lors de la récupération des utilisateurs.",
          });
        });
    }
  });
};
module.exports = listUser;
