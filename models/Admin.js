const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    id:String,
    name:String,
    address:String,
    card:String,
    gender:String,
 });

module.exports = mongoose.model('ration', AdminSchema);