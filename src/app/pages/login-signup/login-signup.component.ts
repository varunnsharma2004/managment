import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { CommonModule } from '@angular/common';
import { FormBuilder,FormControl,FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import { Router } from '@angular/router';
import { LoginserviceService } from '../../services/loginservice.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-login-signup',
  standalone: true,
imports: [ButtonComponent, CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css'
})
export class LoginSignupComponent {
isLogin:boolean=true;
isSignUp:boolean=false;
isForgot:boolean=false;
isReset:boolean=false;
LoginForm:FormGroup;
SignUpFrom:FormGroup;
ForgotNum:FormGroup;
ResetPassword:FormGroup;
data:any[]=[];
authId:any;
constructor(private route:Router,private Api:LoginserviceService)
{
  
  this.LoginForm=new FormGroup({
    number:new FormControl('',[Validators.required,Validators.minLength(10)]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)]),
  }) 
  this.SignUpFrom= new FormGroup({
    InstituteName:new FormControl('',[Validators.required]),
    MobileNumber:new FormControl('',[Validators.required,Validators.minLength(10)]),
    Email:new FormControl('',[Validators.required,Validators.email]),
    City:new FormControl('',[Validators.required]),
    State:new FormControl('',[Validators.required]),
    Address:new FormControl('Your Address',[Validators.required])
  })
  this.ForgotNum=new FormGroup({
    MobileNumber:new FormControl('',[Validators.required,Validators.minLength(10)])
  })
  this.ResetPassword=new FormGroup({
    newPass:new FormControl('',[Validators.required,Validators.minLength(8)]),
    confirmPass:new FormControl('',[Validators.required,Validators.minLength(8)]),
  }) 
}

login(){
  this.isLogin=true;
  this.isSignUp=false;
  this.isForgot=false;
  this.isReset=false;
}
signUp(){
  this.isLogin=false;
  this.isSignUp=true;
  this.isForgot=false;
  this.isReset=false;
}
reset(){
  this.isLogin=false;
  this.isSignUp=false;
  this.isForgot=false;
  this.isReset=true;
}
forgote(){
  this.isLogin=false;
  this.isSignUp=false;
  this.isForgot=true;
  this.isReset=false;
}
get loginInfo()
{
  return this.LoginForm.controls;
}
get SignUpInfo(){
  return this.SignUpFrom.controls;
}
get ForgotInfo(){
  return this.ForgotNum.controls;
}
get ResetInfor()
{
  return this.ResetPassword.controls;
}
loginValid():boolean{
  if(this.loginInfo['number'].valid && this.loginInfo['password'].valid )
  return false;

  return true;
}
ResetValid():boolean{
  if(this.ResetInfor['newPass'].valid && this.ResetInfor['confirmPass'].valid )
  return false;

  return true;
}
signupValid():boolean{
  if(this.SignUpInfo['InstituteName'].valid && this.SignUpInfo['MobileNumber'].valid && this.SignUpInfo['Email'].valid && this.SignUpInfo['City'].valid && this.SignUpInfo['State'].valid && this.SignUpInfo['Address'].valid){

    return false;
  }
  return true
}
forgotValid():boolean{
  if(this.ForgotInfo['MobileNumber'].valid)
  {
return false;
  }
  return true;
}

async UserLogin() {
  if (this.loginInfo['number'].valid && this.loginInfo['password'].valid) {
    const number = this.loginInfo['number'].value;
    const password = this.loginInfo['password'].value;
    
    try {
      const response = await (await this.Api.UserLogin(number, password)).toPromise();
      if (response) {
        this.data = response;
        this.authId = response[0].id;
        localStorage.setItem("authId",this.authId);
        console.log(this.data);
        this.route.navigate(['homePage']);
      } 
    } catch (error) {
      console.error("API error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong !',
      });
    }
  }
}

}


