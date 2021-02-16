import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{LoginService} from '../../shared/services/login.service';
import{AuthService} from '../../shared/services/auth.service';
import{UserService} from '../../shared/services/user.service';
import{TokenStorageService} from '../../shared/services/token-storage.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  loginData: any = {username:"", password:"", grantType:"password"};
  loginControl:string = "";
  errortext:string = "";
  forGet:boolean = false;
  truePage:boolean= true;
  loginDataPwd:any ={};
  Reini = false;

  //code couleur cnps
  //#0a2c77 == bleu
  //#f07531 == orange
  //#fbe21c == jaune

  // handleSubmit(e){
  //   e.preventDefault();
  // }

  // handlekeyUp(e){
  //   if(e.keyCode === 13){
  //     this.handleSubmit(e)
  //     this.onLogin()
  //   }
  // }

  constructor(
    public router:Router,
    private loginService:LoginService,
    private authService:AuthService,
    private userService:UserService,
    private tokenStorageService:TokenStorageService
  ) { }

  ngOnInit(): void {
    this.tokenStorageService.signOut();
    this.loginData = {username:"", password:"", grantType:"password"};
  }


  public onLogin() {
    const username = this.loginData.username;
    this.loginControl = "START";
    this.authService.login(this.loginData)
    .subscribe((resp:any) => {
        const token = resp.headers.get('Authorization');
        this.tokenStorageService.saveToken(token);
        this. onGetCurrentUser(username);
        this.saveAudit("Authentification", "succès");
      },(err:any) => {
        this.saveAudit("Authentification", "échec");
        console.log(err);
        this.errortext = "identifiants incorrects";
        this.loginControl = "FAIL";
        //alert("errer1")
      }
    );
  }


  public onGetCurrentUser(username:string){
    this.userService.getUser(username)
    .subscribe((data:any) => {
      if(data != null && data != ""){
        this.roleControl(data);
        this.userDirection(data.roles);
      }else{
        this.loginControl = "FAIL";
      }   
      },(err:any) => {
        //alert("errer2")
        this.errortext = "identifiants incorrects";
        this.loginControl = "FAIL";
      }
   );
  }


  userDirection(roles:any){
    roles.forEach((role:any) => {
     if(role.roleName ==="ADMIN"){
       this.redirect("SUCCESS", "layout/admin");
     }
     else if(role.roleName ==="DEV"){
       this.redirect("SUCCESS", "dashbord");
     }
     else if(role.roleName ==="USER"){
       this.redirect("SUCCESS", "dashbord");
     }
     else{
       alert(role.roleName+" n'existe pas ")
      } 
    });
 }


 private roleControl(user:any){
  if(user.roles.length == 0){
    alert("Désolé vous n'avez pas de rôle attribué veuillez contacter l'admin de l'application")
  }else{
    this.tokenStorageService.saveUser(user);
  }
 }

 private saveAudit(message:string, status:string){
  this.userService.sendAudit({
    msg: message,
    status: status,
    user:this.loginData.username
  });
 }

 private redirect(resultStatus:string, redirectPath:string){
  this.loginControl = resultStatus;
  this.router.navigate(["/" + redirectPath]);
 }
 //Réinitialiser

//  *************************************** a revoir**************
 onSubmit() {
  const username=this.loginData.username;
  this.loginControl = "START";
  this.authService.login(this.loginData).subscribe(
    resp => {
      console.log(this.loginData.username);
    this.loginControl = "SEARCH";
      const token = resp.headers.get('Authorization');
      this.tokenStorageService.saveToken(token);

       this.userService.getUser(username).subscribe(
          data => {
            this.loginControl = "VERIFIED";           
            let user = data
            console.log(user.roles.length);
            if(user.roles.length==0){
              alert("Désolé vous n'avez pas de rôle attribué veuillez contacter l'admin de l'application")
            }else{
              this.tokenStorageService.saveUser(user);
            }
            this.userDirection(user.roles)
          },
          err => {
            console.log(err.toString());
            this.errortext = "identifiants incorrects";
            this.loginControl = "FAIL";
          }
       );

      console.log(resp.headers.get('Authorization'));
      this.userService.sendAudit({
        msg:'Authentification',
        status:'succes',
        user:this.loginData.username
      })

    },
    err => {
      this.userService.sendAudit({
        msg:'Authentification',
        status:'échec',
        user:this.loginData.username
      })
      console.log(err);
      this.errortext = "identifiants incorrects";
      this.loginControl = "FAIL";
    }
  );
}
// ************************ a revoir fin *******************



 onSubmitRmp(){
  this.loginControl="START";
  this.loginControl="SEARCH";
  const username=this.loginDataPwd.username;
  const email = this.loginDataPwd.email;
  this.authService.email(username,email).subscribe(
 
  data =>{
    this.loginControl="SUCCESS";
    this.Reini = true;
    console.log(data);
    this.userService.sendAudit({
      msg:'Réinitialisation de mot de passe ',
      status:'succes',
    })         
  },
  err =>{
    this.loginControl="FAIL";
    console.log(err.error)
    this.userService.sendAudit({
      msg:'Réinitialisation de mot de passe ',
      status:'échec',
    })  
  }
 )
  }

 getPageRmp(){
 
  if( this.forGet == false)
  {
      this.truePage = false;
      this.forGet=true;
  }
 }
 
 retourne(){
    if(this.forGet == true)
    {
      this.truePage = true;
      this.forGet=false;
    }
 }
  


}
