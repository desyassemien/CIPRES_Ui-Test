import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  steps: number = 1;

  //pour le select multiple

  dropdownList:any = [];
  selectedItems:any = [];
  //dropdownSettings = {};
  dropdownSettings:any={};

    
  form:any={};
  formRole: any ={};//il prend {usernameRole: et roleName:}
  modalForm: any = {};
  formModalEditRole: any={};
  isSuccessful = false;//ok
  isSignUpFailed = false;//ok
  errorMessage = '';
  showModal=false;
  showModalModifRole=false;
  isSuccessRoleAdd = false;
  isRoleAddFailed = false;
  errorRoleAddMessage :any ='';
  
  //pays:any =["Côte D'Ivoire","Mali","Burkina Faso","Guinnée"];
  departements: any =["BI","DEV","DBA","CPT"];
  paysAll: any = ["Côte D'Ivoire","Mali","Burkina Faso","Guinnée"];
  usernameAll:any =[];//ok
  roleAll: any = [];//ok
  userAll: any = [];//ok
  userDetail: any = {} 
  constructor(
    public router:Router,
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder) { }

  ngOnInit() {

    // this.formRole.usernameRole=[{item_id: 6, item_text: "ADMIN"}]

      //appel de la fonction pour l'affichage des utilisteurs
        this.userListe();
    
      //code pour Lister les rôles
         this.userService.getRoleAll().subscribe(
          data => {
            console.log(data)
            var i = 6;
            data.forEach((role:any) => {
              this.roleAll.push({ item_id: i, item_text: role.roleName});
              i++ 
            });
              this.dropdownList= this.roleAll
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
          },
          err =>{
            console.log(err.error.message);
          }
        );
  

      }
 
  nextStep(value:any)
  {
    console.log(value);
    this.steps = value;
    if(this.form.username && this.form.password && this.form.password){
      this.onSubmit();
    }
    //this.onSubmitRole();
  }

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

//Valider l'enregistrement user
onSubmit() {
 // console.log(this.form)
  if(this.form.username && this.form.password && this.form.password){
    this.authService.register(this.form).subscribe(
      resp => {
        console.log(resp);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.userListe();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  } 
 }
 objetview(obj:any){
   let val = obj.required ? obj.required:false
   console.log(obj)
   return(obj)
 }
//Lorsqu'on valide le formulaire rôle
onSubmitRole(){
  this.formRole.roleName = this.selectedItems;
  console.log(this.formRole)
  var count:number=0;
  this.selectedItems.forEach((element:any,index:number) => {
   var Sendform={usernameRole:this.formRole.usernameRole,roleName:element.item_text} 
     this.userService.addRole(Sendform).subscribe(
       data=>{
        console.log("imp "+index);
        this.isSuccessRoleAdd = true;
        this.isRoleAddFailed = false;
        count=index;
        if(index==Number(this.selectedItems.length-1)){
          this.router.navigate(["/layout/admin"]);
        }
      },
      err => {
        this.errorRoleAddMessage = err.error;
        this.isRoleAddFailed = true;
        console.log(err)
      }
     )
     console.log("count:"+count+"  end: "+this.selectedItems.length)
    
 });
 

}

}
