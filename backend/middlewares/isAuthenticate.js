"use strict"

const jwt = require('jsonwebtoken');
const User = require('../model/userModel.js');


module.exports.authenticated = async(req,res,next)=>{
    try{
        // get token from header
        let token = req.headers['authorization'].split(' ')[1];
        
        let verfiedToken =  await jwt.verify(token, process.env.ACCESS_SEKRET_KEY);

        // if token verfied
        if(verfiedToken){
            let user = await User.findById(verfiedToken.data);
            if(user){
                req.user = verfiedToken.data;
                next();
            }else{
                throw "User not found"
            }
                  
        }else{
            throw "you are not authenticated user"
        }
    }catch(err){
        if(err.name === 'TokenExpiredError'){
            res.status(401);
            err = err.name
        }
        // next(err)
        return res.json({
            message:err
        })
    }   
}