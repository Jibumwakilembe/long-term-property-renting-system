const address=require('../model/address');

exports.address_post=(req , res , next)=>{
    let newAddress=new address({
        city: req.body.city,
        district: req.body.district,
        direction: req.body.direction,
    });

    newAddress.save().then((listDocu)=>{
       res.send(listDocu); 
    })
}

exports.address_get=(req ,res ,next)=>{
    address.find().then((address)=>{
        res.send(address);
    })
}
