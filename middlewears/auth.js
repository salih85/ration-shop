const jwt = require('jsonwebtoken');
const Admin = require('../models/Auth');

exports.onlyAdmin = async (req, res, next) => {
  try {
    const token = req.cookies && req.cookies.admin;

    if (!token) {
      return res.redirect('/admin/login');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.isAdmin) {
      return res.clearCookie('admin').redirect('/admin/login');
    }

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.clearCookie('admin').redirect('/admin/login');
    }

    req.user = { id: admin._id, username: admin.username, isAdmin: true };
    next();

  } catch (err) {
    console.log(err.message);
    return res.clearCookie('admin').redirect('/admin/login');
  }
};
