
const imageModel=require('../model/image')

exports.image=(req, res ,next)=>{
    const url= req.get('host');
    const newImage=new imageModel({
        image: url + '/image/'+ req.files,
    })
    newImage.save().then((image)=>{
        res.send(image).status(201).json({
            message:'image save successfully'
        })
    }).catch((error)=>{
        res.status(401).json({
            error:error
        })
    })
}
