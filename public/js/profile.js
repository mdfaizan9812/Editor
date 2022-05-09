async function profile(){
    // getting data from the server
    let data = await axios.get('/users/profile',{headers:{'authorization': `Bearer ${localStorage.getItem('token')}`}});
    let profileDetails = profileDOM(data.data);

    let modal = new Modal({
        html: profileDetails,
    })
    modal.init();

    // calling function to change profile
    editProfile();

    // close modal on click cancel button
    $('#cancel').click(function(){
        modal.close();
    });

    // close modal on click cancel button
    $('#save').click(function(){
      modal.close();
   });
}

function profileDOM(data){
    return $(`<div id="edit_box">
    <div id="imageFile">
      <img src="${data.userImage}" alt="Problem in uploading file" />
      <input type="file" id="file" />
      <label for="file">Edit Photo</label>
    </div>
    <div id="profileDetails">
      <h3>About</h3>
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
        let updatedProfile = await axios.post(`/users/update/${userid}`,fd,{headers:{'authorization': `Bearer ${localStorage.getItem('token')}`}});
        $('#username').text(username);
        $('#imageFile>img').attr('src',updatedProfile.data.data.userImage)
        $('.profile>img').attr('src',updatedProfile.data.data.userImage)
        $.notify('Profile Updated',{ className: "success", position:'top right'});
        
    } catch (error) {
        if(error.response && error.response.status === 422 || error.response.status === 401)
          $.notify(error.response.data.message,{ className: "error", position:'top right'});
    }
  });
}



// click on profile detail to show profile modal
$('#Profile_details').click(function(){
    profile();        
})