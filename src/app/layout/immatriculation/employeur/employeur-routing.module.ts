import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{Routes, RouterModule} from '@angular/router';

//GUARDS
import{AuthenticationGuardService} from '../../../shared/guards/authentication-guard.service';

//COMPONENTS
import { EmployeurComponent } from './employeur.component';
import { VueGlobalEmployeurComponent } from './vue-global-employeur/vue-global-employeur.component';
import { TousTableauxEmployeurComponent } from './tous-tableaux-employeur/tous-tableaux-employeur.component';
import { Tableau1EmployeurComponent } from './tableau1-employeur/tableau1-employeur.component';
import { Tableau2EmployeurComponent } from './tableau2-employeur/tableau2-employeur.component';
import { Tableau3EmployeurComponent } from './tableau3-employeur/tableau3-employeur.component';
import { Tableau4EmployeurComponent } from './tableau4-employeur/tableau4-employeur.component';


//ROUTES
const employeurRoutes:Routes = [
  {
    path:'', component:EmployeurComponent, canActivate:[AuthenticationGuardService], children:[
      {path: 'vue-globale', component: VueGlobalEmployeurComponent},
      {path: 'tableaux', component: TousTableauxEmployeurComponent},
      {path: 'tableau1', component: Tableau1EmployeurComponent},
      {path: 'tableau2', component: Tableau2EmployeurComponent},
      {path: 'tableau3', component: Tableau3EmployeurComponent},
      {path: 'tableau4', component: Tableau4EmployeurComponent},
      {path:'', redirectTo:'vue-globale', pathMatch:'full'}
    ]
  }
]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(employeurRoutes)
  ],
  exports:[RouterModule]
})
export class EmployeurRoutingModule { }
