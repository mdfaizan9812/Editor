function signin(){
    let email = $("input[name='email']");
    let password = $("input[name='password']");
    let submit = $('#Login');
    let message = $('h1');
    
    submit.click(async function(e){
        e.preventDefault();
        try {
            
            let data = {
                email: email.val(),
                password: password.val()
            }
            // request for login and get tokens
            let tokens = await axios.post('/users/login',data);
            
            // set access token and referesh token in local storage
            localStorage.setItem("token", tokens.data.data.access_token);
            localStorage.setItem("ref_token", tokens.data.data.refresh_token);
            $.cookie("token", tokens.data.data.access_token, {expire: 7, path: '/'});

            // redirect to link page
            window.location.replace('/users/link')
            $(window).notify('error.response.data.message',"error");
        } catch (error) {
            // change::
            if(error.response && error.response.status === 422){
                let msg = error.response.data.message.split(' ')
                $.notify(`${msg[0]} required`,"error");
            }else if(error.response && error.response.status === 401 || error.response.status === 400){
                $.notify(error.response.data.message,"error");
            }
        }
    });
}

signin();