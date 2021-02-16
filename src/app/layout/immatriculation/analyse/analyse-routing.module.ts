import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import{Routes, RouterModule} from '@angular/router';

//GUARDS
import{AuthenticationGuardService} from '../../../shared/guards/authentication-guard.service';
import { AnalyseComponent } from './analyse.component';
import { DimEmployeurComponent } from './employeur/dim-employeur/dim-employeur.component';

//

const anlyseRoutes:Routes =[
  {
    path:'', component:AnalyseComponent, canActivate:[AuthenticationGuardService], children:[
      {path:'dim-employeur', component: DimEmployeurComponent},
      {path:'', redirectTo:'employeur', pathMatch:'full'}
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
      CommonModule,
      RouterModule.forChild(anlyseRoutes)
  ],
  exports:[RouterModule]
})
export class AnalyseRoutingModule { }
