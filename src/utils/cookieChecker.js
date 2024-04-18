const jwt = require('jsonwebtoken');
const { token } = require('morgan');
require('dotenv').config();

const cookieChecker = async(req,res,next) => {
  const tokens = req?.body
  console.log('rnbrln   ' , tokens);
  if(!tokens){
    return res.json('no tokens found');
  }
  else{
    try {
      const decodedUser = await jwt.verify(tokens,process.env.JWT_SECRET_KEY);
    
      if(decodedUser){
        req.user = decodedUser;
        return next();
      }
      else{
        return res.json('Invalid Tokens');
      }
    } catch (error) {
      console.log('error is present in cookieChecker',error);
      return res.status(500).json('Internal Server Error');
    }
  }
//   const userData = {
//     "id": "66207c2c57c86a0bdd67af7b",
//     "name": "rk",
//     "email": "rk@gmail.com",
//     "password": "$2a$10$kSmIxSZ9CV8H3M1ZO2yf7uLl7VA0hDybfBWzDIRlb7gbwouxY6fRq",
// }
//   req.user = userData;
//   return next();
};

module.exports = cookieChecker;