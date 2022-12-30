
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Cart =new Schema({ 
    userId: {type: 'string'},
    userCart: [{
        bookId : {type: 'string'}
    }]
},
{
    collection:'cart'
});

module.exports = mongoose.model('Cart',Cart);
