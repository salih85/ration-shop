const login =require('../models/Auth') 
exports.login = async (req, res) => {
    try{
        res.render('login')
        // const{username,passeord}=req.body
        // const =users.find((i)=>i.username==username)&&(i.password==password)
        // if(!user){
        //     retern res.redreict('login')
        // }
    }catch(e){
        console.log(err)
    }
}
    