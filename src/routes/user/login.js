



const { user } = require("../../db/connection");
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const privatekey = require("../../auth/private_key");

const login =(app)=>{

    app.post('/api/login',(req,res)=>{


  
     user.findOne({ where: { username: req.body.username } })
     .then(foundUser=>{
        if(!foundUser){

            const message = "aucun utilisateur existe avec ses coordonneés!"
            return res.status(404).json({message})
         }
        bcrypt.compare(req.body.password,foundUser.password)
        .then(isValidPassword=>{
            
            if (isValidPassword) {
                // Si le mot de passe est valide, renvoyer uniquement les informations nécessaires
                const { id, username, email } = foundUser;
                const message = "L'utilisateur a été connecté avec succès";

                        //jwt
        const token = jwt.sign(
            { userId : user.id },
            privatekey,
            { expiresIn : '24h'}
           )
                res.json({ message, data: { id, username, email,token } });
              } else {
                const message = "Mot de passe incorrect";
                res.status(401).json({ message });
              }


        })

     }
     )  .catch((error) => {
        console.error(error);
        res.status(500).json({
          error: "Une erreur s'est produite lors de la connexion.",
        });
      });

//


    })







}
module.exports = login;