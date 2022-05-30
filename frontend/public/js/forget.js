function sendMailToResetPassword(){
    let email = $('#email');
    let submit = $('#submit');
    const emailSendContainer = $('#emailSendContainer');
    const otpContainer = $('#otpContainer');
    submit.click(async function(){
        try {
            if(email.val()){
                let data = await axios.post('/users/forget',{email:email.val()},{baseURL: "http://localhost:8000/",});
                $.notify('Check Your Email',{className:'success', postion:'top'});
                emailSendContainer.addClass('hidden');
                otpContainer.removeClass('hidden');
                CheckOTP();
            }else{
                $('#email').notify('Email is required',{className:'warn', elementPosition:'top right',});
            }
        } catch (error) {
            if(error.response && error.response.status === 400){
                $.notify(error.response.data.message,{className:'warn', postion:'top'});
                return;
            }
            $.notify(error,{className:'warn', postion:'top'});
        }
    })
}

function CheckOTP(){
    let email = $('#email');
    const OTP = $('#otp');
    const send = $('#send');
    send.click(async function(e){
        e.preventDefault();
        try {
            if(OTP.val() === '') {$.notify('Wrong OTP',{className:'warn', postion:'top'}); return;}
            let data = await axios.post('/users/otp',{OTP:OTP.val(), email: email.val()},{baseURL: "http://localhost:8000/",});
            location.assign(`/users/set/${data.data.code}`)
        } catch (error) {
            if(error.response && error.response.status === 400) {$.notify(error.response.data.message,{className:'warn', postion:'top'}); return;}
            if(error.response && error.response.status === 500) {$.notify(error.response.data.message,{className:'error', postion:'top'}); return;}
            $.notify(error,{className:'error', postion:'top'});
        }
    });
}
sendMailToResetPassword();