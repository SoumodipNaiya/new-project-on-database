const mongoose = require('mongoose');

const user = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    
    firstname:{type:String,require:true},
    lastname:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true}
});
module.exports = mongoose.model('User',user);