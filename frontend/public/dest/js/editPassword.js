async function editPassword(){try{createEditPasswordModal(editPasswordDom((await axios.get("/api/v1/users/profile",{baseURL:"http://localhost:8000/",headers:{authorization:"Bearer "+$.cookie("token")}})).data.email))}catch(e){var a;if(e.response&&401===e.response.status&&"TokenExpiredError"===e.response.data.message)return a=await axios.post("/api/v1/users/refresh",{token:$.cookie("ref_token")},{baseURL:"http://localhost:8000/"}),$.cookie("token",a.data.data.access_token,{path:"/"}),$.cookie("ref_token",a.data.data.refresh_token,{path:"/"}),void createEditPasswordModal(editPasswordDom((await axios.get("/api/v1/users/profile",{baseURL:"http://localhost:8000/",headers:{authorization:"Bearer "+$.cookie("token")}})).data.email));if(e.response)return void $.notify(e.response.data.message,"error");$.notify(e,"error")}}function createEditPasswordModal(e){let a=new Modal({html:e,header:"Change Pasword"}),s=(a.init(),$("#email1")),o=$("#passwordByUser>input"),t=$("#comfirmPasswordByUser>input"),r=$("#saveByUser>#save"),i=$("#saveByUser>#cancel");i.click(function(){a.close()}),r.click(async function(){try{if(""===o.val()&&""===t.val())throw"Enter Valid Password";await axios.post("/api/v1/users/reset",{email:s.val(),password:o.val(),cPassword:t.val()},{baseURL:"http://localhost:8000/",headers:{authorization:"Bearer "+$.cookie("token")}});a.close(),$.notify("Password Updated",{className:"success",position:"top right"})}catch(e){if(e.response&&400===e.response.status)return void $.notify(e.response.data.message,{className:"error",position:"top right"});if(e.response&&401===e.response.status&&"TokenExpiredError"===e.response.data.message)return void $.notify("Refresh your page and do again",{className:"error",position:"top right"});$.notify(e,"warn")}})}function editPasswordDom(e){return $(`<input
    type="hidden"
    name="email"
    id="email1"
    value="${e}"
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
    `)}$("#edit_password").click(function(){editPassword()});