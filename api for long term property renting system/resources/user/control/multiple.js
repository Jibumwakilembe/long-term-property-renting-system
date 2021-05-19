const imageControl=require('../model/multiple')
exports.postImages=(req , res)=>{
    if(req.files){
        const images=new imageControl({
            image: req.files.path
        })

        images.save((err, imageStored)=>{
            if(err) res.status(500)

            res.status(200).send({images:imageStored})
        })
    }
}