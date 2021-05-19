const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const User=require('./resources/user/routes/user')

const cloudnary=require('cloudinary');
const fs=require('fs')
const multipleImage=require('../api for long term property renting system/resources/user/control/multiple')



const database=require('./utilities/database')
database.Db_connection;
app.use((req ,res ,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization ,x-access-token ,x-refresh-token ,_id");
   res.setHeader("Access-Control-Allow-Methods", "GET, PUT,POST,PATCH,OPTIONS,DELETE");

   res.header(
       'Access-Control-Expose-Headers',
       'x-access-token ,x-refresh-token'
   );
    next();
});





app.use(bodyparser.json());
app.use('/house-renting',User);




module.exports=app;
