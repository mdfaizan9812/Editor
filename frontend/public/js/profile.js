async function profile(){
  try {
    // getting data from the server

    let data = await axios.get('/users/profile',{baseURL: "http://localhost:8000/",headers:{'authorization': `Bearer ${$.cookie('token')}`}});
    let profileDetails = profileDOM(data.data);

    // create a modal and update the profile
    createProfileModal(profileDetails);
    
    
  } catch (error) {
    if(error.response && error.response.status === 401 && error.response.data.message === "TokenExpiredError"){

      // get new access and reference token.
      const token = await axios.post('/users/refresh_token',{'token':$.cookie('ref_token')},{baseURL: "http://localhost:8000/",});
      
      // set tokens in cookies
      $.cookie("token", token.data.data.access_token, {path:'/'});
      $.cookie("ref_token", token.data.data.refresh_token, {path:'/'});

      // get users data
      let data = await axios.get('/users/profile',{baseURL: "http://localhost:8000/",headers:{'authorization': `Bearer ${$.cookie('token')}`}});
      let profileDetails = profileDOM(data.data);
      // create a modal and update the profile
      createProfileModal(profileDetails);
      return;
    }
    if(error.response){
        $.notify(error.response.data.message,"error");
        return;
    }
    $.notify(error,"error");
  }
}

function createProfileModal(profileDetails){
  let modal = new Modal({
    html: profileDetails,
    header: 'About'
  })
  modal.init();
  
  // calling function to change profile
  editProfile();
  
  // close modal on click cancel button
  $('#cancel').click(function(){
    modal.close();
  });
  
  // close modal once changes done in profile
  $('#save').click(function(){
    modal.close();
  });
}



function profileDOM(data){
    return $(`<div id="edit_box">
    <div id="imageFile">
      <img src="http://localhost:8000${data.userImage}" alt="Problem in uploading file" />
      <input type="file" id="file" />
      <label for="file">Edit Photo</label>
    </div>
    <div id="profileDetails">
      <div id="details">
        <div id="id">
          <span><i class="fa-solid fa-id-card"></i></span>
          <input type="text" value="${data._id}" disabled />
          <span></span>
        </div>
        <div id="name">
          <span><i class="fa-solid fa-user"></i></span>
          <input type="text" value="${data.username}" disabled />
          <span id="usernameButton"
            ><i class="fa-solid fa-pencil"></i
          ></span>
        </div>
        <div id="email">
          <span><i class="fa-solid fa-envelope"></i></span>
          <input type="text" value="${data.email}" disabled />
          <span></span>
        </div>
      </div>
    </div>
  </div>
  <div id="saveUser">
    <button id="cancel">Cancel</button>
    <button id="save">Save</button>
  </div>`)
}

function editProfile(){
  const getUsername = $('#name>input');
  const editUsernameButton = $('#saveUser>#save');
  let yetToUploadFile;
  let fd;

  // Value to be set on change picture file
  $('#file').change(function(e){
      yetToUploadFile = e.target.files[0];
  });


  // targetting to edit username in input box
  $('#usernameButton').click(function(){
      getUsername.prop('disabled', false);
      getUsername.css('background-color','grey')
  });

  editUsernameButton.click(async function(){
    try {
        // to change user name
        if(getUsername.val() === ""){
            $.notify('Name is required',{ className: "warning", position:'top right'});
            return
        }
        const userid = $('#id>input').val();
        let username = getUsername.val();

        // to change profile picture
        if(yetToUploadFile){
          fd = new FormData();
          fd.append('userImage',yetToUploadFile);
          fd.append('username',username);
        }else{
          fd = new FormData();
          fd.append('username',username);
        }
        let updatedProfile = await axios.post(`/users/update/${userid}`,fd,{baseURL: "http://localhost:8000/",headers:{'authorization': `Bearer ${$.cookie('token')}`}});
        $('#username').text(username);
        $('#imageFile>img').attr('src',`http://localhost:8000${updatedProfile.data.data.userImage}`)
        $('.profile>img').attr('src',`http://localhost:8000${updatedProfile.data.data.userImage}`)
        $.notify('Profile Updated',{ className: "success", position:'top right'});
        
    } catch (error) {
        if(error.response && error.response.status === 422 || error.response.status === 401){
          $.notify("Refresh your page and do again",{ className: "error", position:'top right'});
          return;
        }
    }
  });
}



// click on profile detail to show profile modal
$('#Profile_details').click(function(){
    profile();        
})