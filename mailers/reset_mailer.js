const nodemailer = require('../config/nodemailer.js');

module.exports.resetPassword = (url, receiver)=>{
    let htmlString = nodemailer.renderTemplate({data:{url:url,email:receiver}},'/reset_password.ejs');

    nodemailer.transporter.sendMail({
        from:'lishakrr@gmail.com',
        to: receiver,
        subject:'Regard reset password',
        html: htmlString
    }),(err,info)=>{
        if(err){console.log('err in new comment',err); return}
        console.log('Message info ', info);
        return;
    }
}