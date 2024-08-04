import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { LoginserviceService } from '../../services/loginservice.service';
import { AnyCnameRecord } from 'dns';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  authId:any;
  authData:any[]=[];
  insituteName:any;
  Name:any;
constructor(private authAPi:LoginserviceService){
  this.authId=localStorage.getItem('authId');

  this.getData( this.authId)
}

async getData(id:any){
  try{
const response=await (await this.authAPi.getUserData(id)).toPromise();
if(response){

  this.authData=response[0].author;
  this.insituteName=response[0].author.instituteName;
  this.Name=response[0].author.email;
  console.log(this.authData,'');
  

}
  }
  catch(er){
  }
}
}
