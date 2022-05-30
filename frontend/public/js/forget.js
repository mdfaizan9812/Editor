class ResetPassword{
    constructor(){
        this.emailElement = $('#email');
        this.submitElement = $('#submit');
        this.emailSendContainerElement = $('#emailSendContainer');
        this.otpContainerElement = $('#otpContainer');
        this.OTPElement = $('#otp');
        this.sendElement = $('#send');
        this.email; this.otp;
    }

    sendMailToResetPassword(){
        self = this;
        self.submitElement.click(async function(){
            try {
                const data = self.updateData();
                if(!data.email){
                    $.notify('Email is required',{className:'warn', elementPosition:'top right',});
                    return;
                }
                await self.saveIntoDB(data);
                $.notify('Check Your Email','success');
                self.emailSendContainerElement.addClass('hidden');
                self.otpContainerElement.removeClass('hidden');
                self.CheckOTP();
            } catch (error) {
                if(error.response && error.response.status === 400){
                    $.notify(error.response.data.message,{className:'warn', postion:'top'});
                    return;
                }
                $.notify(error,{className:'warn', postion:'top'});
            }
        })
    }

    updateData(){
        this.email = this.emailElement.val();
        return {
          email: this.email,
        };
    }

    saveIntoDB(data){
        return new Promise((resolve, reject) => {
          let OTPData = axios.post('/users/forget',data,{baseURL: "http://localhost:8000/",});
          resolve(OTPData);
          reject(OTPData);
        })
    }

    CheckOTP(){
        self = this;
        this.sendElement.click(async function(e){
            e.preventDefault();
            
            try {
                const OTPData = self.updateOTP();
                if(OTPData.OTP === '') {$.notify('Wrong OTP', 'warn'); return;}
                let data = await self.saveIntoDB2(OTPData);
                location.assign(`/users/set/${data.data.code}`)
            } catch (error) {
                if(error.response && error.response.status === 400) {$.notify(error.response.data.message,'warn', ); return;}
                if(error.response && error.response.status === 500) {$.notify(error.response.data.message,'error',); return;}
                $.notify(error,'error');
            }
        });
    }

    updateOTP(){
        this.otp = this.OTPElement.val();
        return {
          OTP: this.otp,
          email: this.emailElement.val()
        };
    }

    saveIntoDB2(data){
        return new Promise((resolve, reject) => {
          let OTP = axios.post('/users/otp',   {  OTP:data.OTP, email: data.email },{  baseURL: "http://localhost:8000/" });
          resolve(OTP);
          reject(OTP);
        })
      }
}