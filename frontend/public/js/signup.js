function signUp() {
  let username = $("input[name='username']");
  let email = $("input[name='email']");
  let password = $("input[name='password']");
  let submit = $("#Login");

  submit.click(async function (e) {
    e.preventDefault();
    try {
      let data = {
        username: username.val(),
        email: email.val(),
        password: password.val(),
      };
      console.log(data);
      let user = await axios.post("/users/signup", data, {
        baseURL: "http://localhost:8000/",
      });

<<<<<<< HEAD
      location.assign("/users/login");
    } catch (error) {
      console.log(error);
      if(error.response){
          $.notify(error.response.data.message, "error");
      }
=======
      location.assign("/users/login?flag=1");
    } catch (error) {
      console.log(error);
      if(error.response && error.response.status === 422){
        $.notify(error.response.data.message,{ className: "warn", position:'top right'});
        return;
      }
      if(error.response && error.response.status === 403){
          location.assign('/users/login?flag=3')
          return;
      }
      $.notify(error,'warn');
>>>>>>> separate
      location.replace("/users/login");
    }
  });
}

signUp();
