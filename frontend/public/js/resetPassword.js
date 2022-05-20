function reset_password(){
    const password = $('#password');
    const confirm_password = $('#cPassword');
    const submit = $('#submit');
    const code = $('#code');
    submit.click(async function(e){
        e.preventDefault();
        try {
            if(password.val() !== confirm_password.val()){
                throw "Enter valid password";
            }
            let data = await axios.post(`/users/resetPassword/${code.val()}`,{
                password:password.val(),
                cPassword: confirm_password.val(),
            },
            {baseURL: "http://localhost:8000/",});

            location.assign('/users/login?flag=4');
        } catch (error) {
            if(error.response){
                $.notify(error.response.data.message,"warn");
            }
            $.notify(error,"warn");
        }
    })
}

reset_password();