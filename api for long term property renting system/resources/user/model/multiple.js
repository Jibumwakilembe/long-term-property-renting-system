const mongoose= require('mongoose');

const multipleImage=new mongoose.Schema({
    image: {
        type: String,
    },
})

module.exports=mongoose.model('images',multipleImage);