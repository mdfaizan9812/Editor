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

            location.assign('/users/login');
        } catch (error) {
            $.notify(error,"warn");
        }
    })
}

reset_password();