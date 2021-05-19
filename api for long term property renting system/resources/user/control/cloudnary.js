
const imageModel=require('../model/multiple')

exports.multipleImage=(req ,res )=>{
    try{
        const imageMultiple=new imageModel({
            images: req.files
        })
        if(req.files){
          const imagesUrl=[];
          const files=req.files;
           for(const file of files){
            const {path}=file
            imagesUrl.push(path);
          };

          imageMultiple['images']=imagesUrl;
           imageMultiple.save();
          return res.status(201).json({imageMultiple});

       }

       if(req.file && req.file.path){
           imageMultiple['images']=req.file.path;
            imageMultiple.save();
           return res.status(201).json({imageMultiple});
       }

       res.status(400).json({
           message: 'please upload image'
       })
    }
    catch{
        console.error("server error" , error.message);
        return res.status(500).send("server error Occured")

    }
    
}
