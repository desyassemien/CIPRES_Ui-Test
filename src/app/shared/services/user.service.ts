import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {LayoutComponent} from '../../layout/layout.component';
import { TokenStorageService } from './token-storage.service';

const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  requeteHead:any = {
    "Content-Type":"application/json", 
    "Authorization": sessionStorage.getItem("auth-token")
  }

  constructor(private http:HttpClient, private tokenStorageService: TokenStorageService) { }

  getUser(username:any):Observable<any>{
    console.log(sessionStorage.getItem('auth-token'));
    console.log(username);
    var rqHeader= new  HttpHeaders(this.requeteHead)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'user/'+username,{headers:rqHeader})
  }

  getUserAll():Observable<any>{
    var rqHeader= new  HttpHeaders(this.requeteHead)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'userList',{headers:rqHeader})
   }  

// Obtenir la liste des role
   getRoleAll():Observable<any>{
    var rqHeader= new  HttpHeaders(this.requeteHead)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'roleList',{headers:rqHeader})
   } 

 // Enregistrement du formulaire role
   addRole(donnee:any):Observable<any>{
    console.log(donnee)
    var rqHeader= new  HttpHeaders(this.requeteHead)
   return this.http.post(LayoutComponent.RESOURCE_SERVER_URL+'addrole',
   {username:donnee.usernameRole, 
    roleName:donnee.roleName},
    {headers:rqHeader});
 }
   //Suprimer un utilisateur
  
  deleteUser(username:any):Observable<any>{
    var rqHeader= new  HttpHeaders(this.requeteHead)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'userDelete/'+username,{observe:'response',responseType:'text',headers:rqHeader})
  }

   //Supprimer un rôle
   deleteUserRole(donnees:any):Observable<any>{
    var rqHeader= new  HttpHeaders(this.requeteHead)
    return this.http.post(LayoutComponent.RESOURCE_SERVER_URL+'deleteUserRole',{username:donnees.username,roleName:donnees.roleName},{headers:rqHeader})
  }

  //Modifier rôle
  editUserRole(donnees:any):Observable<any>{
    var rqHeader= new  HttpHeaders(this.requeteHead)
    return this.http.post(LayoutComponent.RESOURCE_SERVER_URL+'modifierUserRole',{username:donnees.username,roleName:donnees.roleName,newRoleName:donnees.newRoleName},{headers:rqHeader})
  }

  
audit(data:any):Observable<any>{
    var today = new Date()
    if(!data.user){
      data.user=this.tokenStorageService.getUser().username
    }
    var donnee={
    user : data.user,
    action : data.msg,
    actionDate : today,
    statut :data.status
   }
  return this.http.post(LayoutComponent.RESOURCE_SERVER_URL+'sendTrace',donnee)
}

sendAudit(data:any){
  this.audit(data).subscribe(
    data=>{
      console.log(data)
    },
    err=>{
      console.log('audit: '+ err.error.message)
    }

  )
}

auditList() : Observable<any>{
  var rqHeader= new  HttpHeaders(this.requeteHead)
  return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'TraceListe/',{headers:rqHeader})
  
}

empMensList() : Observable<any>{
  var rqHeader= new  HttpHeaders(this.requeteHead)
  return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'faitMensEmpList/',{headers:rqHeader})
}

empList()
{
  this.empMensList().subscribe(
    data=>{
      console.log(data)
    },
    err=>{
      console.log(err.error)
    }
  )
}


}
