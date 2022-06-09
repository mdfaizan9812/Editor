class Notification {
  constructor() {
    this.params = new URLSearchParams(window.location.search);
  }

  getFlag() {
    return this.params.get("flag");
  }

  checkFlagAndShowNotification() {
    if (this.getFlag() == 1) {
      $.notify("Logged-In Successfully", "success");
      this.params.set("flag", 0);
      history.replaceState(null, null, "?" + this.params.toString());
    }
  }
}

class CopyLinkAndShowProfileOption{
  constructor(){
    this.copyButton = $(".generateLinkButton");
    this.linkContent = $(".link_box>input"); 
    this.info = $("#info");
    this.profileImage = $(".profile>img");
  }

  // Copy the generated link
  copyLink() {
    self = this
    this.copyButton.click(function () {
      self.linkContent.select();
      navigator.clipboard.writeText(self.linkContent.val());
      if (self.copyButton.text() === "Copy") {
        $.notify("Link Copied", "success");
      }
    });
  }

  // profile,edit password, logout will be Shown on mouseover on image
  showProfileOption() {
    self = this;
    let infoMouseCurser;
    this.profileImage.mouseover(function () {
      self.info.removeClass("infoDisplay");
    });
    this.info.mouseover(function (e) {
      infoMouseCurser = e.clientX;
      self.info.removeClass("infoDisplay");
    });
    this.profileImage.mouseout(function () {
      setTimeout(() => {
        // if cursor on info div then info div will not be hide
        if (!infoMouseCurser) {
          self.info.addClass("infoDisplay");
        }
      }, 2000);
    });
    this.info.mouseout(function (e) {
      self.info.addClass("infoDisplay");
    });
  }

  logout() {
    $("#logout").click(function () {
      $.removeCookie("token", { path: "/" });
      $.removeCookie("ref_token", { path: "/" });
      location.replace("/users/login?flag=2");
    });
  }
}





function getLinkFromServer() {
  const generateLinkButton = $(".generateLinkButton");

  // get link
  generateLinkButton.click(async function () {
    try {
      let data = await axios.get("/api/v1/generate/link", {
        baseURL: "http://localhost:8000/",
        headers: { authorization: `Bearer ${$.cookie("token")}` },
      });
      getlink(`http://localhost:3000${data.data.data.Url}`);
    } catch (error) {
      if ( error.response &&  error.response.status === 401 && error.response.data.message === "TokenExpiredError") {
        // get new access and reference token.
        const token = await axios.post(
          "/api/v1/users/refresh",
          {
            token: $.cookie("ref_token"),
          },
          { baseURL: "http://localhost:8000/" }
        );

        // set tokens in cookies
        $.cookie("token", token.data.data.access_token, { path: "/" });
        $.cookie("ref_token", token.data.data.refresh_token, { path: "/" });

        let data = await axios.get("/api/v1/generate/link", {
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
    `</span><a href="mailto:"><span><i class="fa fa-share-alt"></i> Invite Friend</a>`
  );
}



getLinkFromServer();
