const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
  res.clearCookie('access_token');
  res.status(200).json('Logout success');
});

module.exports = router;
