/**
 * @swagger
 * /updateUser/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur par ID
 *     description: Endpoint pour mettre à jour les informations d'un utilisateur en fonction de son ID.
 *     tags:
 *       - Utilisateurs
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID de l'utilisateur à mettre à jour.
 *         required: true
 *         type: integer
 *       - in: body
 *         name: user
 *         description: Nouvelles informations de l'utilisateur.
 *         required: true
 *         content:
 *           application/json:
 *             example:
 *               username: nouveau_nom
 *               email: nouveau_email@example.com
 *               password: nouveau_mot_de_passe
 *     responses:
 *       200:
 *         description: Succès - Utilisateur mis à jour avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Utilisateur mis à jour avec succès.
 *               data:
 *                 nombreDeModification: 1
 *       400:
 *         description: Erreur de requête - Aucune mise à jour effectuée. Vérifiez les données fournies.
 *         content:
 *           application/json:
 *             example:
 *               error: Aucune mise à jour effectuée. Vérifiez les données fournies.
 *       404:
 *         description: Non trouvé - Aucun utilisateur trouvé avec cet ID.
 *         content:
 *           application/json:
 *             example:
 *               error: Aucun utilisateur trouvé avec cet ID.
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la mise à jour.
 *         content:
 *           application/json:
 *             example:
 *               error: Erreur lors de la mise à jour de l'utilisateur.
 *               details: (message d'erreur détaillé)
 */
const { user } = require("../../db/connection");
const auth = require("../../auth/auth");

const updateUser = (app) => {
  app.put("/updatUser/:id", auth, async (req, res) => {
    const userId = req.params.id;

    try {
      const oneUser = await user.findByPk(userId);
      if (oneUser == null) {
        const message = `l'utilisateur recherché n'existe pas reéseiller avec un autre identidiant`;
        return res.status(404).json({ message });
      }
      const [userUpdate] = await user.update(req.body, {
        where: { id: userId },
      });

      if (userUpdate > 0) {
        const message = "Cet utilisateur est à jour.";
        res.json({ message, data: { nombreDeModification: userUpdate } });
      } else {
        const message =
          "Aucune mise à jour effectuée. Vérifiez les données fournies.";
        res.status(400).json({ message });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Une erreur s'est produite lors de la mise à jour.",
      });
    }
  });
};

module.exports = updateUser;
