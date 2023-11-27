/**
 * @swagger
 * /updateUser/{id}:
 *   put:
 *     summary: Met à jour un utilisateur.
 *     description: Utilisez cette API pour mettre à jour les informations d'un utilisateur existant.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'identifiant de l'utilisateur à mettre à jour.
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Les données à mettre à jour pour l'utilisateur.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateInput'
 *     responses:
 *       200:
 *         description: Succès de la mise à jour de l'utilisateur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indiquant le succès de la mise à jour.
 *                 data:
 *                   type: object
 *                   properties:
 *                     nombreDeModification:
 *                       type: integer
 *                       description: Nombre de modifications effectuées.
 *       400:
 *         description: Échec de la mise à jour en raison de données incorrectes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indiquant l'échec de la mise à jour.
 *       404:
 *         description: Utilisateur non trouvé avec l'identifiant spécifié.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message indiquant que l'utilisateur n'a pas été trouvé.
 *       500:
 *         description: Erreur interne du serveur lors de la mise à jour.
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

const updateUser = (app) => {
  app.put("/updatUser/:id", async (req, res) => {
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
