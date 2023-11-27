/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur par ID
 *     description: Endpoint pour supprimer un utilisateur en fonction de son ID.
 *     tags:
 *       - Utilisateurs
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de l'utilisateur à supprimer.
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Succès - Utilisateur supprimé avec succès.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: Message de succès.
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la suppression.
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               description: Message d'erreur.
 */

const { user } = require("../../db/connection");
const auth = require("../../auth/auth");

const deleteUser = (app) => {
  app.delete("/users/:id", auth, async (req, res) => {
    const userId = req.params.id;
    try {
      const userDeleted = await user.destroy({
        where: { id: userId },
      });
      const message = " user supprimer avec succés ";
      res.json({ message });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Une erreur s'est produite lors de la suppression.",
      });
    }
  });
};
module.exports = deleteUser;
