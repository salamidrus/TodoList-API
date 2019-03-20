const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const uniqueValidator = require('mongoose-unique-validator');



const UserSchema = Schema({
    name: {
        type: String, require: true
    },
    username: {
        type: String, 
        lowercase: true, 
        required: [true, "can't be blank"], 
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'], 
        index: true,
        unique: [true, "username already exists!"],
        uniqueCaseInsensitive: true,
        min: [4, "username minimum 4 characters"],
        max: 10

    },
    password: {
        type: String, 
        required: [true, "can't be blank"],
        min: 4, 
        max: 10
    },
    email: {
        type: String, 
        lowercase: true, 
        required: [true, "can't be blank"], 
        match: [/\S+@\S+\.\S+/, 'is invalid'], 
        index: true,
        unique: true,
        min: 4,
        max: 10
        
    },
    todo: [{
        type: Schema.Types.ObjectId, 
        ref : 'Todo'
    }],
    image: {type: String}
    },
    {
        timestamps : true
    })

UserSchema.pre('save', function(next) {
    this.username = this.username.toLowerCase()
    this.password = bcrypt.hashSync(this.password, saltRounds)
    next();
})
UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema)