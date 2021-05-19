const mongoose=require('mongoose');

const listSchema=new mongoose.Schema({

    category: {
        type: String,
        required: true,
        trim: true,
        minlength:1
    },

    title: {
        type: String,
        required: true,
        trim: true,
        minlength:1
    },

    price: {
        type: String,
        required: true,
        trim: true,
        minlength:1
    },

    description: {
        type: String,
        required: true,
        trim: true,
        minlength:1
    },

    duration: {
        type: String,
        required: true,
        trim: true,
        minlength:1
    },

    no_of_bedroom: {
        type: String,
        required: true,
        trim: true,
        minlength:1
    },

    size: {
        type: String,
        required: true,
        trim: true,
        minlength:1
    },

    
});

//const list=mongoose.model('list' ,listSchema);
module.exports=mongoose.model('property',listSchema)