const User=require('../model/user');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');




exports.createAccount=(req,res, next)=>{
    bcrypt.hash(req.body.password ,10).then((hash)=>{
        const newUser=new User({
            email:req.body.email,
            password:hash
        });
        newUser.save().then(()=>{
            return newUser.createSession();
        }).then((refreshToken)=>{
            return newUser.generateAccessAuthToken().then((accessToken)=>{
                return {accessToken ,refreshToken};
            })
        }).then((authTokens)=>{
            res
            .header('X-refresh-token',authTokens.refreshToken)
            .header('X-access-token',authTokens.accessToken)
            .send(newUser);
        }).catch((e)=>{
            res.status(400).send(e);
        })
    
        
    })

}

exports.login= (req,res, next)=>{
    User.findOne({email:req.body.email}).then((user)=>{
        if(!user){
            return res.status(401).json({
                error: new Error('user not found')
            });
        }else{
            bcrypt.compare(req.body.password ,user.password).then((valid)=>{
                if(!valid){
                    return res.status(401).json({
                        error: new Error('incorrect password')
                    })
                }else{
                return user.createSession().then((refreshToken)=>{

                            return user.generateAccessAuthToken().then((accessToken)=>{
                                return {accessToken ,refreshToken};
                            });
                
                        }).then((authTokens)=>{
                            res
                        .header('X-refresh-token',authTokens.refreshToken)
                        .header('X-access-token',authTokens.accessToken)
                        .send(user);
                        })
                              
                }

            })
        }
    }).catch((e)=>{
        res.status(400).send(e);
    })
}
