const express = require('express');
const router = express.Router();
const { adminDashboard, createuser } = require('../controllers/Admin');

router.get('/', adminDashboard)
      .post('/', createuser)

module.exports=router


