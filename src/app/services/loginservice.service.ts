import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { promises } from 'node:dns';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {
 ApiUrl:string='http://localhost:8080/api/'
  constructor(private http:HttpClient) { }

  async UserLogin(number:number,password:any): Promise<Observable<any>>{
    return this.http.get(`${this.ApiUrl}getByNumber/${number}/password/${password}`)
  }

  async getUserData(authId:any): Promise<Observable<any>>{
    return this.http.get(`${this.ApiUrl}users/${authId}`)
  }

  async addNewData(authId:any,data:any): Promise<Observable<any>>{
    return this.http.post(`${this.ApiUrl}userData/${authId}`,data)
  }

  async DeleteUser( id:number):Promise<Observable<any>>{
    return this.http.delete(`${this.ApiUrl}users/${id}`);
  }
}
