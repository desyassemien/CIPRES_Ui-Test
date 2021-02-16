import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {filter,map} from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LayoutComponent } from 'src/app/layout/layout.component';


@Component({
  selector: 'app-userprofil',
  templateUrl: './userprofil.component.html',
  styleUrls: ['./userprofil.component.css']
})
export class UserprofilComponent implements OnInit {
  private roles:any=[];
  url = LayoutComponent.RESOURCE_SERVER_URL;
  isLoggedIn = false; 
  showAdminBoard = false;
  showModeratorBoard = false;
  user=this.tokenStorageService.getUser();
  userImage="";
  username: string;
  userRole="-";
  userDepartement:string;
  userPays:string;
  userEmail:string
  role:string;
  title="";

  FormMpMod:any={}
  showModalModifMp=false;
  showModalModifMpasse=false;
  nombreErreur=0;
  erreurMessage="Le mot de passe doit contenir "


  //déclaration concernant la photo de profil
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  RESOURCE_SERVER_URL="";

 
  
  constructor(private tokenStorageService: TokenStorageService,private router: Router,
    private titreService:Title, private activatedRoute: ActivatedRoute,private userService: UserService,
    private authService: AuthService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    this.nombreErreur=0
    this.erreurMessage="";
    this.FormMpMod.password="";
    this.FormMpMod.newPassword="";
    this.FormMpMod.confirmPassword="";

    this.isAdmin();
    // Pour afficher l utilisateur connecté
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      console.log(user)
      user.imageLink=LayoutComponent.RESOURCE_SERVER_URL+ user.imageLink;
      console.log(user.imageLink);
      this.userImage=this.tokenStorageService.getUser().imageLink;
      this.roles = user.roles;
      this.username=user.username;
      this.userPays=user.pays;
      this.userDepartement=user.departement;
      this.userEmail=user.email;
      this.roles.forEach(role => {      
       this.userRole+=role.roleName+"-";
     });
     this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
     this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
     this.username = user.username;
   } 

   this.userService.sendAudit({
    msg:'Consultation de profil',
    status:'succes',
  })  
   
   
}

//////////////////////////////////////user profil photo /////////////////////////////////////////

 //Gets called when the user selects an image
 public onFileChanged(event) {
  //Select File
  this.selectedFile = event.target.files[0];
}

 //fonction permetant d'envoyer l'image dans l'API
  onUpload() {
  console.log(this.tokenStorageService.getUser())

  var formData = new FormData();
  formData.append("file", this.selectedFile);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", LayoutComponent.RESOURCE_SERVER_URL+"uploadFile/"+this.tokenStorageService.getUser().username);
  xhr.setRequestHeader('Authorization', this.tokenStorageService.getToken());

  xhr.onload = function() {
      console.log(xhr);
      var response = JSON.parse(xhr.responseText);
      var user:any =JSON.parse(sessionStorage.getItem('auth-user'));
      if(xhr.status == 200) {
          console.log(response.fileDownloadUri)
          console.log(user);
          user.imageLink = response.fileDownloadUri;
          window.sessionStorage.removeItem('auth-user');
          window.sessionStorage.setItem('auth-user', JSON.stringify(user));
          //localStorage.setItem("userImage",response.fileDownloadUri)
           location.reload();
                   
           
      } else {
         console.log("Some Error Occurred");
      }
  }

  // this.userService.sendAudit({
  //   msg:'Modification photo',
  //   status:'succes',
  // })
  xhr.send(formData);
}


//Recupérer le role
getRole():string
{
 let userR="-"
 this.isLoggedIn = !!this.tokenStorageService.getToken();
 if (this.isLoggedIn) {
   const user = this.tokenStorageService.getUser();
   this.roles = user.roles;
   this.userRole="-"
   this.roles.forEach(role => {
     userR+=role.roleName+"-";
   });
 }
 return userR
}

     //Changer le mot de passe
     OnValiderModalMp(){
      this.FormMpMod.username = this.tokenStorageService.getUser().username; 
      console.log(this.FormMpMod)
      let user=this.FormMpMod;
    if(user.newPassword == user.confirmPassword ){
        this.authService.modifierMp(user).subscribe(
  
      data =>{
        alert("Mot de passe modifié avec succès!");
        location.reload()
        this.showModalModifMpasse=false;
        this.userService.sendAudit({
          msg:'Modification de mot de passe ',
          status:'succes',
        })
          

      },
      err =>{
        console.log(err);
        this.userService.sendAudit({
          msg:'Modification de mot de passe ',
          status:'échec',
        })  
      }   
    );
    }else{
      this.nombreErreur=5;
      this.erreurMessage="Confirmer le mot de passe svp!";
    }
    }

     onReset(){
    this.FormMpMod.password="";
    this.FormMpMod.newPassword="";
    this.FormMpMod.confirmPassword="";

  }

  VerifierMo(password){
     
    if(password.length<8)
   {
     this.nombreErreur++;
     this.erreurMessage ="Au moins 8 caractères pour le mot de passe";
   }
   else if (password.search(/[0-9]/) == -1)
   {
     this.nombreErreur++;
     this.erreurMessage ="Le mot de passe doit contenir au moins 1 chiffre";
   }
   else if (password.search(/[a-z]/) == -1)
   {
     this.nombreErreur++;
     this.erreurMessage ="Le mot de passe doit contenir au moins une lettre Miniscule";
   }
   else if (password.search(/[A-Z]/) == -1)
   {
     this.nombreErreur++;
     this.erreurMessage ="Le mot de passe doit contenir au moins une lettre Majuscule";
   }
   else
   {
     this.erreurMessage ="Le mot de passe conforme";
   }
 }

 isAdmin():boolean{
   var user =  this.tokenStorageService.getUser();
   console.log(user.roles)
   if(user.roles[0].roleName=="ADMIN"){
     return true;
   } else{
     return false
   }
 }
    
}
