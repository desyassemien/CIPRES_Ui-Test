import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpRequest } from '@angular/common/http';

import {Router} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import{LayoutComponent} from '../../layout/layout.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  prefixeApiUrl:string = "api/v1/utilisateur";

  constructor(
    private http:HttpClient, 
    private router:Router, 
    private helper:JwtHelperService
  ) { }


  public login(userName: string, password: string){
    let params = new URLSearchParams();
    params.append('username',userName);
    params.append('password',password);    
    params.append('grant_type','password');
    params.append('client_id','USER_CLIENT_APP');
    var reqHeader = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Basic '+btoa("USER_CLIENT_APP:P@ssw0rd123")});
    return this.http.post(LayoutComponent.AUTHORIZATION_SERVER_URL+'/oauth/token', params.toString(), {headers: reqHeader})
  }
 
  public logout() {
    sessionStorage.removeItem("sygacut_access_token");
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
 
  public saveToken(token:any){
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    sessionStorage.setItem("sygacut_access_token", token.access_token)
  }
 
  public getUserByUsername(username:string){
    var reqHeader = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded','Authorization':'Bearer ' + sessionStorage.getItem("sygacut_access_token")});
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+"/"+this.prefixeApiUrl+"/oneuser/"+username, {headers: reqHeader});
  }


}
