const mongoose = require("mongoose")
const Vacation = require("../modules/Vacation")

const Schema = mongoose.Schema
const userSchema = new Schema({
    // username: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     lowercase: true,
    //     trim: true
    // },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true
     },
    // phone: {
    //     type: String,
    // },
    roles: {
        type: String,
        enum: ['User', 'Manager'],
        default: "User",
    },
    vacationPackage: [{
        vacations: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vacation', // שם המודל השמור במסד הנתונים
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        purchaseDate:{
            type:Date,
        require:false 
        }
    }],
    shoppingCart: [{
        vacations: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vacation', // שם המודל השמור במסד הנתונים
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    pay: {
        type: Boolean,
    },
    isRegister:{
        type: Boolean,
        default:false
    },

}, { timestamps: true })
module.exports = mongoose.model("User", userSchema)