function signUp() {
    let username = $("input[name='username']");
    let email = $("input[name='email']");
    let password = $("input[name='password']");
    let submit = $("#Login");
    
    submit.click(async function(e){
        e.preventDefault();
        try {
            
            let data = {
                username:username.val(),
                email: email.val(),
                password: password.val()
            };
            let user = await axios.post("/users/signup", data);
            
            location.assign('/users/login')
        } catch (error) {
            $.notify(error.response.data.message,"error");
            location.replace('/users/login')
        }
    }); 
}

signUp();
