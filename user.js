const express = require ('express')
const router =  express.Router();




router.get('/',(req,res)=>{
console.log("user router")
    res.end();

})

module.exports  = router;