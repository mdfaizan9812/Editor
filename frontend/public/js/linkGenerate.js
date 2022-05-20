// Copy the generated link
function copyLink() {
  let copyButton = $(".generateLinkButton");
  let linkContent = $(".link_box>input");
  copyButton.click(function () {
    linkContent.select();
    navigator.clipboard.writeText(linkContent.val());
    if (copyButton.text() === "Copy") {
      $.notify("Link Copied", "success");
    }
  });
}

// profile,edit password, logout will be Shown on mouseover on image
function showProfileOption() {
  const info = $("#info");
  const profileImage = $(".profile>img");
  let infoMouseCurser;
  profileImage.mouseover(function () {
    info.removeClass("infoDisplay");
  });
  info.mouseover(function (e) {
    infoMouseCurser = e.clientX;
    info.removeClass("infoDisplay");
  });
  profileImage.mouseout(function () {
    setTimeout(() => {
      // if cursor on info div then info div will not be hide
      if (!infoMouseCurser) {
        info.addClass("infoDisplay");
      }
    }, 2000);
  });
  info.mouseout(function (e) {
    info.addClass("infoDisplay");
  });
}

function getLinkFromServer() {
  const generateLinkButton = $(".generateLinkButton");

  // get link
  generateLinkButton.click(async function () {
    try {
      let data = await axios.get("/users/getlinkFromServer", {
        baseURL: "http://localhost:8000/",
        headers: { authorization: `Bearer ${$.cookie("token")}` },
      });
      getlink(`http://localhost:3000${data.data.data.Url}`);
    } catch (error) {
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.message === "TokenExpiredError"
      ) {
        // get new access and reference token.
        const token = await axios.post("/users/refresh_token", {
          token: $.cookie("ref_token"),
        },
        {baseURL: "http://localhost:8000/"});

        // set tokens in cookies
        $.cookie("token", token.data.data.access_token, { path: "/" });
        $.cookie("ref_token", token.data.data.refresh_token, { path: "/" });

        let data = await axios.get("/users/getlinkFromServer", {
            baseURL: "http://localhost:8000/",
          headers: { authorization: `Bearer ${$.cookie("token")}` },
        });
        getlink(data.data.data.Url);
        return;
      }
      if (error.response) {
        $.notify(error.response.data.message, "error");
        return;
      }
      $.notify(error, "error");
    }
  });
}

let params = new URLSearchParams(window.location.search);

//getting unique params by their name
let flag = params.get('flag');

if(flag == 1){
    $.notify("Logged-In Successfully","success");
    params.set('flag',0);
    history.replaceState(null,null, "?" + params.toString());
}

function getlink(url) {
  const inviteFriends = $(".invites");
  const join = $(".join");
  const linkBox = $(".link_box>input");
  const generateLinkButton = $(".generateLinkButton");

  // keep coming url into inputbox
  linkBox.val(url);
  if (generateLinkButton.text() === "Create") {
    $.notify("Link Generated", "success");
  }
  generateLinkButton.text("Copy");

  //append the came url into join button
  join.html(
    `<a href="${url}" target="_blank"><span><i class="fa fa-users"></i></span> Join</a>`
  );

  inviteFriends.html(
    `</span><a href="mailto:faizanahmed9801@gmail.com"><span><i class="fa fa-share-alt"></i> Invite Friend</a>`
  );
}


function logout() {
  $('#logout').click(function(){
    $.removeCookie('token', { path: '/' });
    $.removeCookie('ref_token', { path: '/' });
    location.replace('/users/login?flag=2');
  })
}


logout();
getLinkFromServer();
copyLink();
showProfileOption();
