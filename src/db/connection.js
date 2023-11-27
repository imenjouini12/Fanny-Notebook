const Sequelize = require("sequelize");
const DataTypes = require("sequelize");
const Tascks = require("./modeles/tasck");
const User = require("./modeles/user");

const sequelize = new Sequelize("tascks", "root", "", {
  host: "localhost",
  dialect: "mariadb",
});

const tascks = Tascks(sequelize, DataTypes);
const user = User(sequelize, DataTypes);

module.exports = { sequelize, user };
