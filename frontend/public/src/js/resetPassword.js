class ResetPassword{
    constructor(){
        this.passwordElement = $('#password');
        this.confirm_passwordElement = $('#cPassword');
        this.submitElement = $('#submit');
        this.codeElement = $('#code');
        this.code; this.password; this.cPassword;
    }

    newPassword(){
        self = this;
        self.submitElement.click(async function(e){
            e.preventDefault();
            try {
                let data = self.update();

                if(data.password !== data.cPassword){
                    throw "Enter valid password";
                }
                
                await self.save(data)
    
                location.assign('/users/login?flag=4');
            } catch (error) {
                if(error.response){
                    $.notify(error.response.data.message,"warn");
                }
                $.notify(error,"warn");
            }
        })
    }

    update(){
        this.code = this.codeElement.val();
        this.password = this.passwordElement.val();
        this.cPassword = this.confirm_passwordElement.val();
        return {
            code: this.code,
            password: this.password,
            cPassword: this.cPassword,
        };
    }
    
    save(data){
      return new Promise((resolve, reject) => {
        let passInfo = axios.post(`/api/v1/forget/reset/${data.code}`,{
                    password:data.password,
                    cPassword:data.cPassword,
        },
        {baseURL: "http://localhost:8000/",});
        resolve(passInfo);
        reject(passInfo);
      })
    }
}