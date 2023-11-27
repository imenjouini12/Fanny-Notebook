module.exports = (sequelize, DataTypes) => {
  const Tascks = sequelize.define("Tasck", {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("À faire", "En cours", "Terminé", "En attente"),
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
  });
  // Association avec User
  return Tascks;
};
