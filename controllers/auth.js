const Admin = require('../models/Auth');

exports.AdminsignupPage =(req,res)=>{
    try{
       return res.render('admin/signup',{admin:req.admin})
    }catch(e){
        console.log(e)
        res.redirect('/')
    }
}

exports.Adminsignup = async (req, res) => {
  try {
    const { username, password } = req.body;

    // create and save admin properly
    const user = new Admin({
      id: `${Date.now()}`,
      username,
      password
    });

    await user.save();
    return res.redirect('/admin/login');
  } catch (e) {
    console.log(e);
    res.redirect('/');
  }
};

exports.AdminloginPage = (req, res) => {
  try {
    return res.render('admin/login', {msg: null,admin: false });
  } catch (e) {
    console.log(e);
    res.redirect('/');
  }
};


exports.Adminlogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const foundUser = await Admin.findOne({ username });
    if (!foundUser) {
      return res.render('admin/login', {
        msg: 'No user found — please signup',
        admin: false
      });
    }

    const verified = await foundUser.validatepassword(password);
    if (!verified) {
      return res.render('admin/login', {
        msg: 'Incorrect password',
        admin: false
      });
    }

    const token = foundUser.getjwt();
    return res.cookie('admin', token).redirect('/admin');

  } catch (e) {
    console.log(e);
    return res.render('admin/login', {
      msg: 'Something went wrong',
      admin: false
    });
  }
};


   exports.Adminlogout =(req,res)=>{
      return res.clearCookie('admin').redirect('/admin/login');
   }