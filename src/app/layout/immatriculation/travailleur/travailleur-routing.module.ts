import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{Routes, RouterModule} from '@angular/router';

//GUARDS
import{AuthenticationGuardService} from '../../../shared/guards/authentication-guard.service';

//COMPONENTS
import { TravailleurComponent } from './travailleur.component';
import { VueGlobaleTravailleurComponent } from './vue-globale-travailleur/vue-globale-travailleur.component';
import { TableauxTravailleurComponent } from './tableaux-travailleur/tableaux-travailleur.component';
import { Tableau5Component } from './tableau5/tableau5.component';
import { Tableau6Component } from './tableau6/tableau6.component';
import { Tableau7Component } from './tableau7/tableau7.component';
import { Tableau8Component } from './tableau8/tableau8.component';
import { Tableau9Component } from './tableau9/tableau9.component';
import { Tableau10Component } from './tableau10/tableau10.component';

//ROUTES
const travailleurRoutes:Routes = [
  {
    path:'', component:TravailleurComponent, canActivate:[AuthenticationGuardService], children:[
      {path: 'vue-globale', component: VueGlobaleTravailleurComponent},
      {path: 'tableaux', component: TableauxTravailleurComponent},
      {path: 'tableau5', component: Tableau5Component},
      {path: 'tableau6', component: Tableau6Component},
      {path: 'tableau7', component: Tableau7Component},
      {path: 'tableau8', component: Tableau8Component},
      {path: 'tableau9', component: Tableau9Component},
      {path: 'tableau10', component: Tableau10Component},
      {path:'', redirectTo:'vue-globale', pathMatch:'full'}
    ]
}];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(travailleurRoutes)
  ],
  exports:[RouterModule]
})
export class TravailleurRoutingModule { }
