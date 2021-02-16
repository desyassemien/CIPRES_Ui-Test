import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardService {

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    let tokenStore:any = sessionStorage.getItem("auth-token");
    if(tokenStore != null && tokenStore != ""){
      return true;
    }else{
      alert("accès réfusé")
      this.router.navigate(['/']);
      return false;
    }
  }
}
