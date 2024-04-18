const express = require('express');
const bycrypt = require('bcryptjs');
const user = require('../models/user.models');
const { default: mongoose } = require('mongoose');
const router = express.Router();


router.post('/', async(req,res) => {
  const userData = req.body;
  const isExist = await user.find({email : userData.email});
  
  if(userData.name && userData.email && userData.password){
    try {
      const salt = await bycrypt.genSalt(10);
      const hashPassword = await bycrypt.hash(userData.password,salt);
      userData.password = hashPassword;

      const newUser = new user(userData);
      const response = await newUser.save();

      res.status(200).json(response);
    } catch (error) {
      console.log('error is present in register');
      res.status(500).json({error : 'Internal server error'});
    }
  }
  else{
    return res.json({error : 'Require all fields'})
  }
});

module.exports = router;