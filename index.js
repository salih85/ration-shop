require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('static'));
app.use(cookieParser());

const connectDB = require('./config/db');

const admin = require('./router/Admin');
const login = require('./router/auth');
app.use('/', admin);
app.use('/', login);



const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server started at port",port);
  connectDB();
});