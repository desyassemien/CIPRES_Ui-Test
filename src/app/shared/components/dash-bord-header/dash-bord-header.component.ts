import { Component, OnInit } from '@angular/core';
import{TokenStorageService} from '../../../shared/services/token-storage.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LayoutComponent } from '../../../layout/layout.component';
import {filter,map} from 'rxjs/operators';

@Component({
  selector: 'app-dash-bord-header',
  templateUrl: './dash-bord-header.component.html',
  styleUrls: ['./dash-bord-header.component.css']
})
export class DashBordHeaderComponent implements OnInit {


  url = LayoutComponent.RESOURCE_SERVER_URL;
  notifModal = "";
  profilSetting = "";
  userImage="";
  private roles:any=[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  userRole="-";
  title="";

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

}
 