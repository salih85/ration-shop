const express = require('express');
const router = express.Router();
const {  AdminloginPage, Adminlogin, AdminsignupPage, Adminsignup, Adminlogout } = require('../controllers/auth');

router
       .route('/')
       .get((req, res) => res.redirect('/admin/login'))

router
       .route('/admin/login')
       .get(AdminloginPage)
        .post(Adminlogin)

router
    .route('/admin/signup')
    .get(AdminsignupPage)
    .post(Adminsignup);

router
    .route('/admin/logout')
    .get(Adminlogout)
   

module.exports=router