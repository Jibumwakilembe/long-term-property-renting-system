const contactControl=require('../model/contact');

exports.contact_post=(req ,res ,next)=>{
    let newContact=new contactControl({
        Username: req.body.Username,
        Email: req.body.Email,
        Phone_number: req.body.Phone_number
    });

    newContact.save().then((listDoc)=>{
        res.send(listDoc);
    })
}

exports.contact_get=(req , res ,next)=>{
    contactControl.find().then((contact)=>{
        res.send(contact)
    })
}