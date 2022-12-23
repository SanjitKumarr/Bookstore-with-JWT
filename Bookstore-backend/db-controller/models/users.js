
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let User =new Schema({ 
    userId:{
        type:String,
    },
    userName:{
        type:String,
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
},
{
    collection:'users'
});

module.exports = mongoose.model('Users',User);
