const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    id:String,
    username:String,
    password:String
    
 });

module.exports = mongoose.model('login', loginSchema);