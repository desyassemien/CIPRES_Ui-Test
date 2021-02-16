import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { UserService } from 'src/app/shared/services/user.service';
import { LayoutComponent } from '../layout.component';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { from } from 'rxjs';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  dropdownList:any = [];
  selectedItems:any = [];
  dropdownEditList:any = [];
  selectedEditItems:any = [];
 dropdownSettings:any={};

  url= LayoutComponent.RESOURCE_SERVER_URL;
  form: any = {};
  formRole: any ={};
  modalForm: any = {};
  formModalEditRole: any={};
  ModalEditRole:any={};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  showModal=false;
  showModalModifRole=false;
  isSuccessRoleAdd = false;
  isRoleAddFailed = false;
  errorRoleAddMessage :any = '';

  //Modal1
  showModalModiSupfRole=false;
  ModalEditRoleSup :any = {};
  
  //pays:any =["Côte D'Ivoire","Mali","Burkina Faso","Guinnée"];
  departements: any =["BI","DEV","DBA","CPT"];
  paysAll: any = ["Côte D'Ivoire","Mali","Burkina Faso","Guinnée"];
  usernameAll:any =[];
  roleAll: any = [];
  userAll: any = [];
  userDetail: any = {}

  constructor(private authService: AuthService, private userService: UserService,private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.userService.empList()

    //this.departements = [];
    //this.usernameAll = [];
    //this.userAll = [];


     // appel de la fonction pour l'affichage des utilisteurs
     this.userListe();
     
     //code pour Lister les rôles
     this.userService.getRoleAll().subscribe(
      data => {
        console.log(data)
        var i = 6;
        data.forEach((role:any) => {
          this.roleAll.push( role.roleName);
          i++
        });
        
      },
      err =>{
        console.log(err.error.message);
      }
    );
  }


  // Pour les select multiple

  onItemSelect(item: any) {
    console.log('onItemSelect',item);
    console.log(this.selectedItems);
  }

  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
}
  onSelectAll(items: any) {
    console.log('onSelectAll',items);
  }
  onDeSelectAll(items: any) {
    console.log(items);
}


  //affiche les utilisateurs crées
  userListe(){
    this.userAll = [];
    this.usernameAll = [];
    this.userService.getUserAll().subscribe(
      data => {
        this.userAll = data;
        data.forEach((user:any) => {
          this.usernameAll.push(user.username);
        });
      },
      err =>{
        console.log(err.error.message);
      }
    );  
  }

  deleteUserRole(index:number){
    this.userDetail = this.userAll[index]
    console.log(this.userDetail);
    this.showModal =true;
    this.modalForm.username=this.userDetail.username;
    this.modalForm.roleName=this.userDetail.roles[0].roleName;
    
  }

  deleteUserRole2(username:any){
    var deletesRoleList:any=[]
    this.userAll.forEach((user:any) => {
      if(user.username == username ){
        this.userDetail = user;
        
        this.modalForm.username=this.userDetail.username;
        this.modalForm.roleName=this.userDetail.roles[0].roleName;

        this.userDetail.roles.forEach((role:any,index:number) => {
         deletesRoleList.push({item_id:index,item_text:role.roleName});

         if(index == Number(this.userDetail.roles.length-1)){
          console.log(deletesRoleList)
          this.dropdownList = deletesRoleList
          this.dropdownSettings = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Tout Selectionner',
            unSelectAllText: 'Tout Déselectionner',
            //itemsShowLimit: 3,
            allowSearchFilter: true
          };
          console.log(this.dropdownList)
          this.showModalModifRole=false;
          this.showModal = true;
         }
        });
      
        
      }
    }); 
  }
  closeModal(){
    
    this.showModal =false;
    this.showModalModifRole=true;
    this.showModalModiSupfRole=false;
  }
  closeModal1(){
    this.showModal =false;
    this.showModalModifRole=false;
    this.showModalModiSupfRole=false;
  }

  onDeleteRole(){
    this.closeModal1();
    this.modalForm.roleName = this.selectedItems;
    this.selectedItems.forEach((element:any) => {
   var Supform={username:this.modalForm.username,roleName:element.item_text} 
   console.log(Supform)
     this.userService.deleteUserRole(Supform).subscribe(
      data=>{
         alert("Le rôle à été supprimé")
         this.userListe(); 
         this.userService.sendAudit({
        msg:'Suppression rôle',
              status:'succes',
         })         

      }

     )
    });
 
    console.log(this.modalForm)
  }

  EditUserRole(index:number){
    this.showModalModifRole=true;
    this.userDetail=this.userAll[index];
    this.formModalEditRole.username=this.userDetail.username;
    this.formModalEditRole.roleName=this.userDetail.roles[0].roleName;
    this.formModalEditRole.newRoleName=this.userDetail.roles[0].newRoleName;
  }

  EditUserRole2(username:any){

    var editRoleList:any=[]
    this.userAll.forEach((user:any) => {
      if(user.username == username ){
        this.userDetail=user;
        this.showModalModifRole=false;
        this.showModalModiSupfRole=true;
        this.formModalEditRole.username=this.userDetail.username;
        this.formModalEditRole.roleName=this.userDetail.roles[0].roleName;
        this.formModalEditRole.newRoleName=this.userDetail.roles[0].newRoleName;
   
      }
    }); 


  }

  onEditRole(){
    console.log(this.formModalEditRole)
    this.closeModal1();
    this.userService.editUserRole(this.formModalEditRole).subscribe(
      data=>{
        alert("Le rôle à été modifié")
        this.userListe();  
        this.userService.sendAudit({
          msg:'Modification de rôle',
          status:'succes',
        })    
      },
      err=>{
        console.log(err.error)
        this.userService.sendAudit({
          msg:'Modification de rôle',
          status:'échec',
        })    
      }
    )
  
  }


  
  deleteUser(index:number){

    let userName = this.userAll[index].username
    let r = confirm('Voulez vous vraiment supprimez l\'utilisateur '+userName+" ?");
    if (r == true) {
      
      this.userService.deleteUser(userName).subscribe(
        data =>{
          console.log(data);
          this.userListe();
          this.userService.sendAudit({
            msg:'Suppression utilisateur',
            status:'succes',
          })    
        },
        err=>{
          console.log(err.error)
          this.userService.sendAudit({
            msg:'Suppression utilisateur',
            status:'échec',
          })    
        }
      )
    console.log(this.userAll[index])}
  }


  onSubmit() {
    console.log(this.form)
    
    this.authService.register(this.form).subscribe(
      resp => {
        console.log(resp);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.userListe();
        this.userService.sendAudit({
          msg:'Ajout utilisateur',
          status:'succes',
        })    

      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.userService.sendAudit({
          msg:'Ajout utilisateur',
          status:'échec',
        })    
      }
    );
  }

  onSubmitRole(){
    console.log(this.formRole)
   this.userService.addRole(this.formRole).subscribe(
     data=>{
      console.log(data);
      this.isSuccessRoleAdd = true;
      this.isRoleAddFailed = false;
      this.userListe();
      this.userService.sendAudit({
        msg:'Ajout de rôle',
        status:'succes',
      })
    },
    err => {
      this.errorRoleAddMessage = err.error;
      this.isRoleAddFailed = true;
      console.log(err)
      this.userService.sendAudit({
        msg:'Ajout de rôle',
        status:'échec',
      })
    }
     
   )
  }


}
