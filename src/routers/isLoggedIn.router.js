const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();

router.get('/' , async(req,res) => {
  const token = req?.cookies?.access_token;
  if (!token) {
    return res.json(false);
  }
  return jwt.verify(token, process.env.JWT_SECRET_KEY, (err) => {
    if (err) {
      return res.json(false);
    }
    return res.json(true);
  });
});

module.exports = router;