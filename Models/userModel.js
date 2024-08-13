const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');



const userSchema = new mongoose.Schema({

    id:{
        type:String,
        default: uuidv4
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        
    }
})

userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);       // bycryting the password
    next();
})


const User = mongoose.model("User",userSchema);

module.exports = User;