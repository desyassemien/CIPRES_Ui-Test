import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{Routes, RouterModule} from '@angular/router';

//SERVICES
import{AuthenticationGuardService} from '../shared/guards/authentication-guard.service';

//COMPONENTS
import { LayoutComponent } from './layout.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AuditUserComponent } from './audit-user/audit-user.component';
import { AdministrationComponent } from './administration/administration.component';
import { UserprofilComponent } from '../shared/components/userprofil/userprofil.component';

const route:Routes =[ 
  {
    path:'', component:LayoutComponent, canActivate:[AuthenticationGuardService], children:[
      {path:"admin",component:AdministrationComponent},
      {path:"audit",component:AuditUserComponent},
      {path:"profil",component:UserprofilComponent},
      {path:"adduser",component:AddUserComponent},
      { path: 'immatriculation', loadChildren: () => import('./immatriculation/immatriculation.module').then(m => m.ImmatriculationModule)},
      {path:'', redirectTo:'immatriculation', pathMatch:'full'}
    ]
  }
]

 
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ],
  exports:[RouterModule],
  providers:[
    
  ]
})
export class LayoutRoutingModule { }
