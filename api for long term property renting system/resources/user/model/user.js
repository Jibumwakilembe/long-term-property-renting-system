
const mongoose=require('mongoose');
const lodash=require('lodash');
const jwt=require('jsonwebtoken');
const crypto=require('crypto')
const bcrypt=require('bcryptjs');

const jwtSecret="127628378377jdkdndjuhssjj28373928";

const userSchema=new mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim:true,
        minlength: 1,
        unique:true
    },
    password:{
        type: String,
        required:true,
        minlength:8
    },
    sessions:[{
        token:{
            type: String,
            required:true
        },
        expireAt:{
            type:Number,
            required:true

        }

    }]
})

userSchema.methods.toJSON=function(){
    const user=this;
    const userObject=user.toObject();

    return lodash.omit(userObject,['password','sessoins']);
}

userSchema.methods.generateAccessAuthToken=function(){
    const user=this;
    return new Promise((resolve ,reject)=>{
        jwt.sign({_id:user._id.toHexString()},jwtSecret ,{expiresIn:"50d"},(err, token)=>{
            if(!err){
                resolve(token);
            }
            else{
                reject();
            }
        });

    })
}

userSchema.methods.generateRefreshAuthToken=function(){
    return new Promise((resovle ,reject)=>{
        crypto.randomBytes(64 ,(err ,buf)=>{
            if(!err){
                let token=buf.toString("hex");
                return resovle(token);
            }
        })

    })
}

userSchema.methods.createSession=function(){
    let user=this;
    return user.generateRefreshAuthToken().then((refreshtoken)=>{
        return saveSessionToDatabase(user ,refreshtoken);
    }).then((refreshtoken)=>{
        return refreshtoken
    }).catch((e)=>{
        return Promise.reject("failed to save to database.\n"+ e);
    })
}

userSchema.statics.getJWTSecrete=()=>{
    return jwtSecret;

}
userSchema.statics.findByIdAndToken=function(_id,token){
    const User=this;

    return User.findOne({
        _id,
        'sessions.token':token
    })

}

userSchema.statics.findByCredentials=function(email ,password){
    const user =this;
    return user.findOne({email}).then((user)=>{
        if(!user){
            return promise.reject();
        }else{
            return new promise((resolve ,reject)=>{
                bcrypt.compare(password,user.password,(err ,res)=>{
                    if(res){
                        resolve(user);
                    }else{
                        reject();
                    }
                })
            })
        }
    })

}

userSchema.hasRefreshTokenExpired=function(expireAt){
    let secondSinceEpoch=Date.now()/1000;
    if(expireAt>secondSinceEpoch){
        return false;
    }else{
        return true; 
    }
}

let saveSessionToDatabase=(user ,refreshToken)=>{
    return new Promise((resovle ,reject)=>{
        let expireAt=generateRefreshTokenExpireTime();
        user.sessions.push({'token': refreshToken,expireAt});

        user.save().then(()=>{
            return resovle(refreshToken);
        }).catch((e)=>{
            reject(e);
        })
    })
}

let generateRefreshTokenExpireTime=()=>{
    let dayUntilExpire='10';
    let secondUntilExpire=((dayUntilExpire*24)*24);
    return ((Date.now()/1000)+secondUntilExpire);
}

const User=mongoose.model('User',userSchema);
module.exports=User;
