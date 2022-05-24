const User = require('../model/userModel.js');
const Link = require('../model/linkModel.js');
const shortid = require('shortid')

module.exports.getlink = async (req,res) => {
    try {
        let user = await User.findById(req.user)
        //check user has the power to generate link or not
        if(user){         
            let newUrl;   
            // check same user have a link in db
            const link = await Link.findOne({user: req.user});

            if(!link){
                const urlCode = shortid.generate()
                
                newUrl = `/users?room=${urlCode}&id=${user._id}`

                await Link.create({
                    url: newUrl,
                    room: urlCode,
                    user: req.user
                });
                
            }else{
                console.log('helllo')
                newUrl = link.url;
            }
            
            

            return res.status(201).json({
                data:{
                    Url:newUrl
                },
                message:"Url generated"
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "Unable to create URL"
        });
    }
}

module.exports.checkCredentialforEditor =async (req,res) => {
    try {
            let link = await Link.findOne({user:req.query.id});
            
            if(link && link.room === req.query.room){
                res.status(200).json({
                    data:{
                        confirm:true
                    },
                    message: "Confirm"
                });
            }else{
                res.status(400).json({
                    data:{
                        confirm:false
                    },
                    message: "Not confirm"
                });
            }
        
    } catch (error) {
        res.status(400).json({
            data:{
                confirm:false
            },
            message: "Not confirm"
        });
    }
}