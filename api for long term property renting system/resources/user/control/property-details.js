const property_details=require('../model/property-details')

exports.property_details_post=(req ,res, next)=>{

    let newProperty=new property_details({
        category:req.body.category,
        title:req.body.title,
        price:req.body.price,
        description:req.body.description,
        duration:req.body.duration,
        no_of_bedroom:req.body.no_of_bedroom,
        size:req.body.size,


    });

    newProperty.save().then((listDoc)=>{
        res.send(listDoc);
    })
}

exports.property_details_get=(req ,res, next)=>{
    property_details.find({
    }).then((properyt)=>{
        res.send(properyt);
    })
}