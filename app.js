const express = require("express");
// Importez le fichier de sequilize pour synchroniser la base de donnés
const { sequelize } = require("./src/db/connection");
// Importez le fichier des Api User
const listUser = require("./src/routes/user/findAllUser");
const oneUser = require("./src/routes/user/findOneUser");
const addUser = require("./src/routes/user/createUser");
const updateUser = require("./src/routes/user/updateUser");
const deleteUser = require("./src/routes/user/deleteUser");
const login = require("./src/routes/user/login")
// Importez le fichier des Api Tascks
const createTasck = require("./src/routes/tascks/createTasck")
const listTascks = require("./src/routes/tascks/findAllTascks")
const oneTasck  = require("./src/routes/tascks/findOneTasck")
const deletTasck = require("./src/routes/tascks/deleteTasck")
const updateTasck = require("./src/routes/tascks/updateTasck")
// Importez le fichier de configuration Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger'); 




const app = express();

const port = 3000;
app.use(express.json()) 
//appelle à la fonction  authenticate pour vérifier la connexion à la base de donneés */
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

//appelle à la fonction pour synchroniser les modéles dans la base de donneés */
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

/*liste des Api Tascks*/
createTasck(app)
listTascks(app)
oneTasck(app)
deletTasck(app)
updateTasck(app)



app.get("/", (req, res) => {
  res.send("hello !");
});

app.listen(port, () => {
  console.log(`vous etes sur le port ${port}`);
});
