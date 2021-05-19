const mongoose=require('mongoose');
const conf=require('../configuration/development');

module.exports. Db_connection=mongoose.connect(
    conf.mongUrl,
    ()=>{console.log("connected successfully")}
).catch((e)=>{
    console.log('error while trying to connect to database');
    console.log(e);
});

//module.exports=Db_connection