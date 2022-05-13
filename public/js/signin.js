function signin(){
    let email = $("input[name='email']");
    let password = $("input[name='password']");
    let submit = $('#Login');
    
    submit.click(async function(e){
        e.preventDefault();
        try {
            
            let data = {
                email: email.val(),
                password: password.val()
            }
            // request for login and get tokens
            let tokens = await axios.post('/users/login',data);
            

            $.cookie("token", tokens.data.data.access_token, {path:'/'});
            $.cookie("ref_token", tokens.data.data.refresh_token, {path:'/'});

            // redirect to link page
            window.location.replace('/users/link')
            $(window).notify('error.response.data.message',"error");
        } catch (error) {
            // change::
            if(error.response && error.response.status === 422){
                let msg = error.response.data.message.split(' ')
                $.notify(`${msg[0]} required`,"error");
                return
            }
            if(error.response && error.response.status === 401 || error.response.status === 400){
                $.notify(error.response.data.message,"error");
                return;
            }
        }
    });
}

signin();