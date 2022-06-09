class notification{
  constructor(){
    this.params = new URLSearchParams(window.location.search);
  }

  getFlag(){
    return this.params.get("flag");
  }

  checkFlagAndShowNotification(){
    let flag = this.getFlag();

    if (flag == 1) {
      $.notify("You have registered successfully", "success");
      this.params.set("flag", 0);
      history.replaceState(null, null, "?" + this.params.toString());
    }
    
    if (flag == 2) {
      $.notify("Logged-Out Successfully", "success");
      this.params.set("flag", 0);
      history.replaceState(null, null, "?" + this.params.toString());
    }
    
    if (flag == 3) {
      $.notify("User already exist", "info");
      this.params.set("flag", 0);
      history.replaceState(null, null, "?" + this.params.toString());
    }
    if (flag == 4) {
      $.notify("Password updated", "success");
      this.params.set("flag", 0);
      history.replaceState(null, null, "?" + this.params.toString());
    }
  }
}

class login{
  constructor(){
    this.emailElement = $("input[name='email']");
    this.passwordElement = $("input[name='password']");
    this.submitElement = $("#Login");
    this.email; this.password;
  }

  signin(){
    self = this;
    this.submitElement.click(async function (e) {
      e.preventDefault();
      try {
        let data = self.updateData();
        // request for login and get tokens
        let tokens = await self.saveIntoDB(data)
  
        $.cookie("token", tokens.data.data.access_token, { path: "/" });
        $.cookie("ref_token", tokens.data.data.refresh_token, { path: "/" });
  
        // redirect to link page
        window.location.replace("/users/link?flag=1");
  
      } catch (error) {
        // change::
        if (error.response && error.response.status === 422) {
          let msg = error.response.data.message.split(" ");
          $.notify(`${msg[0]} required`, "error");
          return;
        }
        if ( error.response && error.response.status === 401 || error.response.status === 400 ) {
          $.notify(error.response.data.message, "error");
          return;
        }
        
        if (error.response && error.response.status === 429) {
          $.notify(error.response.data, "error");
          return;
        }

        $.notify(error, "error");
        
      }
    });
  }

  updateData(){
    this.email = this.emailElement.val();
    this.password = this.passwordElement.val();
    return {
      email: this.email,
      password: this.password,
    };
  }

  saveIntoDB(data){
    return new Promise((resolve, reject) => {
      let tokens = axios.post("/api/v1/users/login", data, {   baseURL: "http://localhost:8000/",    });
      resolve(tokens);
      reject(tokens);
    })
  }

}