import { Component, OnInit } from '@angular/core';
import{TokenStorageService} from '../../../shared/services/token-storage.service';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { LayoutComponent } from 'src/app/layout/layout.component';
import {filter,map} from 'rxjs/operators';
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  url = LayoutComponent.RESOURCE_SERVER_URL;
  notifModal = "";
  profilSetting = "";
  userImage="";
  private roles:any=[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  userPays:string;
  username: string;
  userRole="-";
  title="";

  travTab:boolean = false;
  empTab:boolean= true;

  FormMpMod:any={}
  showModalModifMp=false;
  showModalModifMpasse=false;
  nombreErreur=0;
  erreurMessage="Le mot de passe doit contenir "
  constructor(private tokenStorageService:TokenStorageService,private router: Router,
    private titreService:Title, private activatedRoute: ActivatedRoute,private userService: UserService,
    private authService: AuthService) { }

  ngOnInit(): void {

    const appTitle = this.titreService.getTitle();
    this.router.events.pipe(
      filter( event => event instanceof NavigationEnd),
      map(()=>{
        let child = this.activatedRoute.firstChild;
        console.log(child);
      
        if (child) {
          console.log(child.snapshot.data['titre']);
          return child.snapshot.data['titre'];
        }
        return appTitle;
      })
    ).subscribe(
      (ttle: string) =>{
        this.titreService.setTitle(ttle);
        this.title = ttle
      }
    );
    
    this.isLoggedIn = !!this.tokenStorageService.getToken();
     // Pour afficher l utilisateur connecté
     if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.username=user.username;
      this.roles.forEach(role => {
        
        this.userRole+=role.roleName+"-";
      });
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
      this.userImage = user.imageLink;
      this.userPays=user.pays;
      
     
      console.log(this.userImage);
    }

  }

  public onSignOut(){
    this.tokenStorageService.signOut();
  }


  
  //Afficher le role
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

  showHideModal() {
    if (this.notifModal !== "show")
    {
      this.notifModal = "show";
    } else {
      this.notifModal = "";
    }
  }


  showHideSetting() {
    if (this.profilSetting !== "show")
    {
      this.profilSetting = "show";
    } else {
      this.profilSetting = "";
    }
  }


  // Immatriculation assujettis empl_trav


  //SUIVANT
  getTravTab(){
 
    if( this.travTab == false)
    {
        this.empTab = false;
        this.travTab = true;
    }
   }
  // RETOUR
   getEmpTab(){
      if(this.travTab == true)
      {
        this.empTab = true;
        this.travTab = false;

      }
   }
  
}
