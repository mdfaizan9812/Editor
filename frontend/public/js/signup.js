class createAnAccount{
  // targetting elements
  constructor(){
    // Element that have values
    this.usernameElement = $("input[name='username']");
    this.emailElement = $("input[name='email']");
    this.passwordElement = $("input[name='password']");
    this.submitElement = $("#Login");
    // data for registering user
    this.username; this.email; this.password;
  }

  // creating an account
  signUp(){
    self = this;
    this.submitElement.click(async function (e) {
      e.preventDefault();
      try {

        // update user data
        let data = self.updateData()
        // save user's entered data into DB
        await self.saveIntoDB(data);   

        location.assign("/users/login?flag=1");

      } catch (error) {

        if(error.response && error.response.status === 422){
          $.notify(error.response.data.message, "warn");
          return;
        }

        if(error.response && error.response.status === 403){
            location.assign('/users/login?flag=3')
            return;
        }
        
        $.notify(error,'warn');
        location.replace("/users/login");
      }
    });    
  }

  updateData(){
    this.username = this.usernameElement.val();
    this.email = this.emailElement.val();
    this.password = this.passwordElement.val();
    return {
      username: this.username,
      email: this.email,
      password: this.password,
    };
  }

  saveIntoDB(data){
    return new Promise((resolve, reject) => {
      let user = axios.post("/users/signup", data, {   baseURL: "http://localhost:8000/",    });
      resolve(user);
      reject(user);
    })
  }
}


  

