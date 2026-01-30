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
const { onlyAdmin } = require('./middlewears/auth');

const connectDB = require('./config/db');

const admin = require('./router/Admin');
const auth = require('./router/auth');
const rationItemAdmin = require('./router/RationItemAdmin');
app.use('/admin', rationItemAdmin);
app.use('/', auth);
app.use('/admin', onlyAdmin, admin);


const port = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log("Server started at port", port);
  });
}).catch(err => {
  console.error("DB connection failed", err);
});
