const Tascks = require("./tasck");


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: "l'email' est déjà pris"
    },
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
     
      type: DataTypes.ENUM("Utilisateur", "Administrateur"),
      defaultValue: 'Utilisateur', // Par défaut, l'utilisateur a le rôle 'utilisateur'
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

  // Association avec Task
  //User.hasMany(Tascks(sequelize, DataTypes));

  return User;
};
