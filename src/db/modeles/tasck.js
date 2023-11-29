const User = require("./user");
module.exports = (sequelize, DataTypes) => {
  const Tascks = sequelize.define("Tasck", {

    titre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("À faire", "En cours", "Terminé", "En attente","Archivé"),
      allowNull: false,
      defaultValue: "À faire", // Statut par défaut lors de la création
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deadLine: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });

Tascks.belongsTo(User(sequelize, DataTypes)); // Ajoutez la clé étrangère correcte


  return Tascks;
};
