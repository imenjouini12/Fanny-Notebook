const { user } = require("../../db/connection");
const bcrypt = require("bcrypt");

const addUser = (app) => {
  app.post("/createuser", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        error: "Les champs username, email et password sont obligatoires.",
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
      });

      const message = `L'utilisateur ${username} a été créé avec succès.`;
      res.json({ message, data: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Une erreur s'est produite lors de la création de l'utilisateur.",
      });
    }
  });
};

module.exports = addUser;
