const express = require("express");

const { sequelize } = require("./src/db/connection");
const User = require("./src/db/modeles/user");
const Tascks = require("./src/db/modeles/tasck");
const listUser = require("./src/routes/user/findAllUser");
const oneUser = require("./src/routes/user/findOneUser");
const addUser = require("./src/routes/user/createUser");
const updateUser = require("./src/routes/user/updateUser");
const deleteUser = require("./src/routes/user/deleteUser");
const login = require("./src/routes/user/login")
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); // Importez le fichier de configuration Swagger


const app = express();

const port = 3000;
app.use(express.json()) 

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })
  .catch((error) => {
    console.error(`Unable to connect to the database: ${error}`);
  });

/*appelle à la fonction pour synchroniser les modéles dans la base de donneés */
/*
sequelize.sync()
.then(_=>("acceés de synchronisation!"));
*/


// Utilisez le middleware swagger-ui-express pour afficher la documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



/*liste des Api user */
listUser(app);
oneUser(app);
addUser(app);
updateUser(app);
deleteUser(app);
login(app)


app.get("/", (req, res) => {
  res.send("hello !");
});

app.listen(port, () => {
  console.log(`vous etes sur le port ${port}`);
});
