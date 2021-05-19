const express=require('express');
const router=express.Router();
const path='path';

const userControl=require('../control/user');
const propertyControl=require('../control/property-details');
const multer=require('../../middleware/multer-config')
const cloudinary=require('../../middleware/cloudnary')
const imageMultiple=require('../control/cloudnary');
const imageControl=require('../control/image')
const addressControl=require('../control/address')
const contactControl=require('../control/contact')

router.post('/create-account',userControl.createAccount);
router.post('/login',userControl.login);
router.post('/image',multer,imageControl.image);
router.post('/upload',cloudinary,imageMultiple.multipleImage);


router.post('/property-details',propertyControl.property_details_post);
router.get('/property-details',propertyControl.property_details_get);

router.get('/address',addressControl.address_get);
router.post('/address',addressControl.address_post);

router.post('/contact',contactControl.contact_post)
router.get('/contact',contactControl.contact_get)

module.exports=router;