const ejs = require('ejs');
const nodemailer = require('nodemailer');
const path = require('path');


let transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    host: process.env.HOST,
    port:process.env.MAIL_PORT,
    secure: false, 
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS, 
    },
});

let renderTemplate = (data,filename) => {
    let mailHTML;

    ejs.renderFile(path.join(__dirname,'../views/mailers',filename),data,function(err,template){
        if(err){console.log(`Error in rendering template ${err}`); return }
        mailHTML = template;
    });

    return mailHTML;
}


module.exports = {transporter, renderTemplate}