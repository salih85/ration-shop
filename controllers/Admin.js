const admin =require('../models/Admin')
exports.adminDashboard = async (req, res) => {
    try{
        const users = await admin.find()
        res.render('dashboared', { users })
    }catch(e){
        console.log(e)
    }
}

exports.createuser =async (req,res)=>{
    try{
        const {name,address,card,gender}=req.body
        const user = await admin.create({
            name,
            address,
            card,
            gender
        })
        return res.redirect('/')
    }catch(e){
        console.log(e)
    }
}