class ResetPassword{constructor(){this.passwordElement=$("#password"),this.confirm_passwordElement=$("#cPassword"),this.submitElement=$("#submit"),this.codeElement=$("#code"),this.code,this.password,this.cPassword}newPassword(){(self=this).submitElement.click(async function(s){s.preventDefault();try{var e=self.update();if(e.password!==e.cPassword)throw"Enter valid password";await self.save(e),location.assign("/users/login?flag=4")}catch(s){s.response&&$.notify(s.response.data.message,"warn"),$.notify(s,"warn")}})}update(){return this.code=this.codeElement.val(),this.password=this.passwordElement.val(),this.cPassword=this.confirm_passwordElement.val(),{code:this.code,password:this.password,cPassword:this.cPassword}}save(a){return new Promise((s,e)=>{var t=axios.post("/api/v1/forget/reset/"+a.code,{password:a.password,cPassword:a.cPassword},{baseURL:"http://localhost:8000/"});s(t),e(t)})}}