async function editPassword(){
    try {
        // getting data from the server
        let data = await axios.get('/users/profile',{headers:{'authorization': `Bearer ${localStorage.getItem('token')}`}});
        let editPasswordHTML = editPasswordDom(data.data.email)
        
        // making a modal
        let modal = new Modal({
            html: editPasswordHTML
        });
        modal.init(); 
        
        
        
        let email = $('#email1');
        let password = $('#passwordByUser>input');
        let confPassword = $('#comfirmPasswordByUser>input')
        let save = $('#saveByUser>#save');
        let cancel = $('#saveByUser>#cancel');
        

        // close modal on click cancel button
        cancel.click(function(){
            modal.close();
        })
        
        //
        save.click(async function(){
            try {
                if(password.val() === "" && confPassword.val() === ""){
                    throw "Password is required"
                }
                let data = await axios.post('/users/editPassword',{
                    email: email.val(),
                    password: password.val(),
                    cPassword: confPassword.val()
                },
                {headers:{'authorization': `Bearer ${localStorage.getItem('token')}`}});
                modal.close();
                $.notify('Password Updated',{ className: "success", position:'top right'});
            } catch (error) {
                // later on via notification
                if(error.response.status === 400){
                    $.notify(error.response.data.message,{ className: "error", position:'top right'});
                }
            }
        })
    } catch (error) {
        console.log(error);
    }
    
}
function editPasswordDom(email){
   return  $(`<input
    type="hidden"
    name="email"
    id="email1"
    value="${email}"
    />
    <div id="editPasswordByUser">
    
        <div id="passwordByUser">
        <span><i class="fa-solid fa-key"></i></span>
        <input type="password" placeholder="Password" />
        </div>

        
        <div id="comfirmPasswordByUser">
        <span><i class="fa-solid fa-key" aria-hidden="true"></i></span>
        <input type="password" placeholder="Confirm Password" />
        </div>

        
        <div id="saveByUser">
        <button id="cancel">Cancel</button>
        <button id="save">Save</button>
        </div>
    </div>
    `)
}

// show modal on click edit pasword button
$('#edit_password').click(function(){
    editPassword();
})

