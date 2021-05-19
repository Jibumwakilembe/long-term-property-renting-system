const mongoose=require('mongoose');

const contactSchema=new mongoose.Schema({
    Username:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },

    Email:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },

    Phone_number:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }
});

module.exports=mongoose.model('contact',contactSchema);