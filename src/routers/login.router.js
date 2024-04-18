const express = require('express');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const user = require('../models/user.models');
const router = express.Router();

router.post('/' , async(req,res) => {
  const userData = req.body;
  console.log('present 1');
  if(userData.email && userData.password){
    try {
      const userPresent = await user.findOne({email : userData.email});

      if(userPresent){
        const isPasswordSame = await bycrypt.compare(userData.password ,userPresent.password);

        if(isPasswordSame){
          // generate tokens theough JWT if correct password 
          const payload = {
            name : userPresent.name,
            id : userPresent.id,
          };

          const tokens = await jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn : '1d'});
          
          // through this method the cookie will be accessable by the backend only
          return res.cookie('access_token',tokens,{
            httpOnly : true,
          }).status(200).json({userPresent , tokens : tokens});
          // return res.status(200).json({tokens , user : userPresent});
        }
        else{
          return res.json('password is incorrect');
        }
      }
      else{
        return res.status(404).json({'message' : 'No user Found'});
      }
      
    } catch (error) {
      console.log('error is prsent in login');
      return res.status(500).json('internal server error',error);
    }
  }
  else{
    return res.json({'message' : 'All fields require'});
  }
});

module.exports = router;

