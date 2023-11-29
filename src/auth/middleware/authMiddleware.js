// authMiddleware.js
const jwt = require('jsonwebtoken');
const privateKey = require('../private_key');

const isAdmin = (req, res, next) => {

  const authorizationHeader = req.headers.authorization


  if(!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`
    return res.status(401).json({ message })
  }

  try {
    const token = authorizationHeader.split(' ')[1]
    const decodedToken = jwt.verify(token, privateKey);
    if (decodedToken.user.role === 'Administrateur') {
      req.user = decodedToken;
      return next();
    }
    res.status(403).json({ message: `Accès interdit. Seuls les administrateurs peuvent effectuer cette action.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Erreur de validation du token.`, error: error.message });
  }
};

module.exports = { isAdmin };
