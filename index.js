const express = require('express');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const todoRouter = require('./src/routers/todo.router')
const registerRouter = require('./src/routers/register.router');
const loginRouter = require('./src/routers/login.router');
const logoutRouter = require('./src/routers/logout.router');
const isLoggedInRouter = require('./src/routers/isLoggedIn.router');
const db = require('./db');

const application = express();

application.use(cors());
application.use(cookieParser());
application.use(express.json());


application.listen(process.env.PORT,() => {
  console.log('sever is started at 3000 port');
});
application.get('/', (req,res) => {
  res.send('You are present on home page');
});

application.use('/todo' ,todoRouter);
application.use('/register',registerRouter);
application.use('/login',loginRouter);
application.use('/logout',logoutRouter);
application.use('/isLoggedIn',isLoggedInRouter);


