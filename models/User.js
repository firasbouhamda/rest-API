const mongoose = require('mongoose')
const Schema = mongoose.Schema; 

const UserSchema = new Schema ({
    firstName : {
        type : String,
        default: 'user first Name'
    }, 
    lastName :{
        type : String, 
        default : 'user last Name'
    },
    email: {
        type : String,
        required : true, 
        default : 'user@gmail.com'
    }
})
 
module.exports = mongoose.model('user', UserSchema)