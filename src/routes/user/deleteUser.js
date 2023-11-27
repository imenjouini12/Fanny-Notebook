
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur par son identifiant.
 *     description: Utilisez cette API pour supprimer un utilisateur en spécifiant son identifiant.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'identifiant de l'utilisateur à supprimer.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Succès de la suppression de l'utilisateur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indiquant que l'utilisateur a été supprimé avec succès.
 *       404:
 *         description: Aucun utilisateur trouvé avec l'identifiant spécifié.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indiquant qu'aucun utilisateur n'a été trouvé.
 *       500:
 *         description: Erreur interne du serveur lors de la suppression.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Message d'erreur interne du serveur.
 */

const { user } = require("../../db/connection");

const deleteUser = (app) => {
  app.delete("/users/:id", async (req, res) => {
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
