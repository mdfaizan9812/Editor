let params = new URLSearchParams(window.location.search);

//getting unique params by their name
let flag = params.get("flag");

if (flag == 1) {
  $.notify("You have registered successfully", "success");
  params.set("flag", 0);
  history.replaceState(null, null, "?" + params.toString());
}

if (flag == 2) {
  $.notify("Logged-Out Successfully", {
    className: "success",
    position: "top right",
  });
  params.set("flag", 0);
  history.replaceState(null, null, "?" + params.toString());
}

if (flag == 3) {
  $.notify("User already exist", { className: "info", position: "top right" });
  params.set("flag", 0);
  history.replaceState(null, null, "?" + params.toString());
}

if (flag == 4) {
  $.notify("Password updated", { className: "success", position: "top right" });
  params.set("flag", 0);
  history.replaceState(null, null, "?" + params.toString());
}

function signin() {
  let email = $("input[name='email']");
  let password = $("input[name='password']");
  let submit = $("#Login");

  submit.click(async function (e) {
    e.preventDefault();
    try {
      let data = {
        email: email.val(),
        password: password.val(),
      };
      // request for login and get tokens
      let tokens = await axios.post("/users/login", data, {
        baseURL: "http://localhost:8000/",
      });

      $.cookie("token", tokens.data.data.access_token, { path: "/" });
      $.cookie("ref_token", tokens.data.data.refresh_token, { path: "/" });

      // redirect to link page
      window.location.replace("/users/link?flag=1");
      $(window).notify("error.response.data.message", "error");
    } catch (error) {
      // change::
      if (error.response && error.response.status === 422) {
        let msg = error.response.data.message.split(" ");
        $.notify(`${msg[0]} required`, "error");
        return;
      }
      if (
        (error.response && error.response.status === 401) ||
        error.response.status === 400
      ) {
        $.notify(error.response.data.message, "error");
        return;
      }
      
      if (error.response && error.response.status === 429) {
        $.notify(error.response.data, "error");
        return;
      }
      
    }
  });
}

signin();
