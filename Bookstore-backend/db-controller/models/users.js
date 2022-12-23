
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let User =new Schema({ 
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String },
},
{
    collection:'users'
});

module.exports = mongoose.model('Users',User);
