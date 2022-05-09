function sendMailToResetPassword(){
    let email = $('#email');
    let submit = $('#submit');
    submit.click(async function(){
        if(email.val()){
            let data = await axios.post('/users/forget',{email:email.val()});
            $.notify('Check Your Email',{className:'success', postion:'top'});
        }else{
            $('#email').notify('Email is required',{className:'warn', elementPosition:'top right',});
        }
    })
}

sendMailToResetPassword();