import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {LayoutComponent} from '../../layout/layout.component';

const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'application/json'}),
  observe:'response' as 'response'
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  requeteHead:any = {
    "Content-Type":"application/json", 
    "Authorization": sessionStorage.getItem("auth-token")
  }

  constructor(private http:HttpClient) { }

  login(donnee:any):Observable<any>{
    return this.http.post(LayoutComponent.RESOURCE_SERVER_URL+'login', {username:donnee.username, password:donnee.password},httpOptions);
  }

  register(user:any): Observable<any> {
    var rqHeader= new  HttpHeaders(this.requeteHead)
    return this.http.post(LayoutComponent.RESOURCE_SERVER_URL + 'register', {
      username: user.username,
      email: user.email,
      password: user.password,
      repassword: user.repassword,
      pays: user.pays,
      departement: user.departement
    },{headers:rqHeader});
  }

  email(username:any,email:any):Observable<any>{
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'verifuserinfos/'+username+'/'+email)
  }

   //Changer le mot de passe
   modifierMp(donnees:any):Observable<any>{
    var rqHeader= new  HttpHeaders(this.requeteHead)
    return this.http.post(LayoutComponent.RESOURCE_SERVER_URL+'modifierMotdePasse',{username:donnees.username,oldPassword:donnees.password,newPassword:donnees.newPassword,confirmPassword:donnees.confirmPassword},{headers:rqHeader})
  }


}
