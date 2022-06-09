async function profile(){try{createProfileModal(profileDOM((await axios.get("/api/v1/users/profile",{baseURL:"http://localhost:8000/",headers:{authorization:"Bearer "+$.cookie("token")}})).data))}catch(e){var a;if(e.response&&401===e.response.status&&"TokenExpiredError"===e.response.data.message)return a=await axios.post("/api/v1/users/refresh",{token:$.cookie("ref_token")},{baseURL:"http://localhost:8000/"}),$.cookie("token",a.data.data.access_token,{path:"/"}),$.cookie("ref_token",a.data.data.refresh_token,{path:"/"}),void createProfileModal(profileDOM((await axios.get("/api/v1/users/profile",{baseURL:"http://localhost:8000/",headers:{authorization:"Bearer "+$.cookie("token")}})).data));if(e.response)return void $.notify(e.response.data.message,"error");$.notify(e,"error")}}function createProfileModal(e){let a=new Modal({html:e,header:"About"});a.init(),editProfile(),$("#cancel").click(function(){a.close()}),$("#save").click(function(){a.close()})}function profileDOM(e){return $(`<div id="edit_box">
    <div id="imageFile">
      <img src="http://localhost:8000${e.userImage}" alt="Problem in uploading file" />
      <input type="file" id="file" />
      <label for="file">Edit Photo</label>
    </div>
    <div id="profileDetails">
      <div id="details">
        <div id="id">
          <span><i class="fa-solid fa-id-card"></i></span>
          <input type="text" value="${e._id}" disabled />
          <span></span>
        </div>
        <div id="name">
          <span><i class="fa-solid fa-user"></i></span>
          <input type="text" value="${e.username}" disabled />
          <span id="usernameButton"
            ><i class="fa-solid fa-pencil"></i
          ></span>
        </div>
        <div id="email">
          <span><i class="fa-solid fa-envelope"></i></span>
          <input type="text" value="${e.email}" disabled />
          <span></span>
        </div>
      </div>
    </div>
  </div>
  <div id="saveUser">
    <button id="cancel">Cancel</button>
    <button id="save">Save</button>
  </div>`)}function editProfile(){const t=$("#name>input"),e=$("#saveUser>#save");let o,s;$("#file").change(function(e){o=e.target.files[0]}),$("#usernameButton").click(function(){t.prop("disabled",!1),t.css("background-color","grey")}),e.click(async function(){try{if(""===t.val())return void $.notify("Name is required",{className:"warning",position:"top right"});var e=$("#id>input").val(),a=t.val(),i=(o?((s=new FormData).append("userImage",o),s.append("username",a)):(s=new FormData).append("username",a),await axios.put("/api/v1/users/update/"+e,s,{baseURL:"http://localhost:8000/",headers:{authorization:"Bearer "+$.cookie("token")}}));$("#username").text(a),$("#imageFile>img").attr("src","http://localhost:8000"+i.data.data.userImage),$(".profile>img").attr("src","http://localhost:8000"+i.data.data.userImage),$.notify("Profile Updated",{className:"success",position:"top right"})}catch(e){if(e.response&&422===e.response.status||401===e.response.status)return void $.notify("Refresh your page and do again",{className:"error",position:"top right"})}})}$("#Profile_details").click(function(){profile()});