const mongoose=require('mongoose');


const addressSchema=new mongoose.Schema({
    city:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },

    district:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },

    direction:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
});

module.exports=mongoose.model('address',addressSchema);