// taskMiddleware.js
const jwt = require('jsonwebtoken');
const privateKey = require('../private_key');
const { tascks } = require('../../db/connection');

const isTaskOwnerOrAdmin = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
    return res.status(401).json({ message });
  }

  try {
    const token = authorizationHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, privateKey);

    // Vérifie si l'utilisateur est un administrateur
    if (decodedToken.user.role === 'Administrateur') {
      req.user = decodedToken;
      return next();
    }

    // Si l'utilisateur n'est pas un administrateur, vérifie s'il est le propriétaire de la tâche
    const taskId = req.params.id; // Assurez-vous que votre route a un paramètre taskId
    console.log(taskId)
    // Ici, utilisez la logique pour obtenir l'ID du propriétaire de la tâche à partir de votre modèle de données
    const taskOwnerId = await  getTaskOwnerId(taskId);
    console.log("taskOwnerId",taskOwnerId)
    console.log(`${decodedToken.user.id} egale à ${taskOwnerId} `)
    if (decodedToken.user.id === taskOwnerId) {
      req.user = decodedToken;
      return next();
    }

    res.status(403).json({ message: `Accès interdit. Vous n'êtes pas autorisé à effectuer cette action.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Erreur de validation du token.`, error: error.message });
  }
};

// Exemple de fonction factice pour obtenir l'ID du propriétaire de la tâche (à adapter à votre logique)
const getTaskOwnerId = async (taskId) => {
  try {
    const oneTasck = await tascks.findByPk(taskId);
    console.log("une tasck", oneTasck);

    if (oneTasck) {
      const idOwner = oneTasck.UserId;
      console.log('idOwner', idOwner);
      return idOwner;
    }

    return null;
  } catch (error) {
    console.error(error);
    throw error; // Propagez l'erreur pour qu'elle soit capturée par le middleware
  }
};


module.exports = { isTaskOwnerOrAdmin };
