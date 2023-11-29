/**
 * @swagger
 * /createuser:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     description: Endpoint pour créer un nouvel utilisateur.
 *     tags:
 *       - Utilisateurs
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Informations de l'utilisateur à créer.
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             username: john_doe
 *             email: john_doe@example.com
 *             password: motDePasseSecret
 *     responses:
 *       200:
 *         description: Succès - Utilisateur créé avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: Utilisateur créé avec succès.
 *               data:
 *                 id: 1
 *                 username: john_doe
 *                 email: john_doe@example.com
 *       400:
 *         description: Erreur de requête - Certains champs obligatoires manquent ou l'e-mail est déjà utilisé.
 *         content:
 *           application/json:
 *             example:
 *               error: Les champs username, email et password sont obligatoires.
 *       500:
 *         description: Erreur serveur - Une erreur s'est produite lors de la création de l'utilisateur.
 *         content:
 *           application/json:
 *             example:
 *               error: Erreur lors de la création de l'utilisateur.
 *               details: (message d'erreur détaillé)
 */
const { user } = require("../../db/connection");
const bcrypt = require("bcrypt");
const auth = require("../../auth/auth");

const addUser = (app) => {
  app.post("/createuser", async (req, res) => {
    const { username, email, password , role} = req.body;

    if (!username || !email || !password || !role) {
      return res.status(400).json({
        error: "Les champs username, email et password et role sont obligatoires.",
      });
    }

    try {
      const existingEmail = await user.findOne({ where: { email: email } });
      if (existingEmail) {
        return res.status(400).json({
          Error: `${email} Cet e-mail est déjà utilisé. Veuillez choisir un autre e-mail.`,
        });
      }

      // Utiliser bcrypt pour hacher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Créer un nouvel utilisateur avec le mot de passe haché
      const newUser = await user.create({
        username: username,
        email: email,
        password: hashedPassword,
        role:role
      });

      const message = `L'utilisateur ${username} a été créé avec succès.`;
      res.json({ message, data: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error:
          "Une erreur s'est produite lors de la création de l'utilisateur.",
      });
    }
  });
};

module.exports = addUser;
