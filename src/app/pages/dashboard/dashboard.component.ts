import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ButtonComponent } from "../../components/button/button.component";
import { CommonModule } from '@angular/common';
import { LoginserviceService } from '../../services/loginservice.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import Swal from 'sweetalert2'
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, ButtonComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
isAddnewPopup:boolean=false;
authId:any;
userData:any[]=[];
authData:any[]=[];
addNewData:FormGroup;
constructor(private getAPI:LoginserviceService)
{
  this.authId=localStorage.getItem('authId');
  console.log(this.authId);
  this.getData(this.authId);
  this.addNewData=new FormGroup({
    firstName:new FormControl('',[Validators.required]),
    LastName:new FormControl('',[Validators.required]),
    MobileNum:new FormControl('',[Validators.required,Validators.minLength(10)]),
    Email:new FormControl('',[Validators.required,Validators.email]),
    Semester:new FormControl('',[Validators.required]),
    address:new FormControl('',[Validators.required]),
  })
}
get addNewControl()
{
  return  this.addNewData.controls;
}

addNew()
{
this.isAddnewPopup=true;
alert()
}
close()
{
  this.isAddnewPopup=false;
}

  async getData(id:any){
  try{
const response=await (await this.getAPI.getUserData(id)).toPromise();
if(response){
  this.userData=response;
  this.authData=this.userData[0].author;
  console.log(this.userData);
  
  console.log(this.authData);
}
  }
  catch(er){
  }
}
validation():boolean{
if(this.addNewControl['firstName'].invalid || this.addNewControl['LastName'].invalid || this.addNewControl['Email'].invalid || this.addNewControl['Semester'].invalid || this.addNewControl['address'].invalid|| this.addNewControl['MobileNum'].invalid)
{
  return true;
}

  return false;
}

async AddNewOne(){
  let obj={
      "first_name":this.addNewControl['firstName'].value,
      "last_name": this.addNewControl['LastName'].value,
      "semester": this.addNewControl['Semester'].value,
      "number": this.addNewControl['MobileNum'].value,
      "address":this.addNewControl['address'].value,
      "email":this.addNewControl['Email'].value,
    }
    
    const  response=await (await this.getAPI.addNewData(this.authId,obj)).toPromise();
console.log(response);
if( response){
  Swal.fire({
    icon: 'success',
    title: ' Successful',
    text: 'Ragistration Success !',
  }).then((er)=>{
    location.reload();
    this.addNewData.reset();
    this.isAddnewPopup=false;

  });

  }  else{
    Swal.fire({
      icon: 'error',
      title: ' Not Submited',
      text: 'Ragistration Faild !',
    })
}

// alert('done')
}
  async deleteuser(id:any)
{
const response=await(await this.getAPI.DeleteUser(id)).toPromise();
if(response.status){
  Swal.fire({
    icon: 'warning',
    title: ' User Deleted',
    text: response.message,
  }).then((rs)=>{
    location.reload();
  })

}

}
}
