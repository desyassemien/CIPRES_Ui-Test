import { Injectable } from '@angular/core';
import{Router} from '@angular/router';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(public router:Router) { }

  signOut() {
    window.sessionStorage.clear();
    this.router.navigate(['/']);
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    let token:any = sessionStorage.getItem(TOKEN_KEY);
    return token.toString() ;
  }

  public saveUser(user:any) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    let token:any = sessionStorage.getItem(USER_KEY);
    return JSON.parse(token.toString());
  }

}
