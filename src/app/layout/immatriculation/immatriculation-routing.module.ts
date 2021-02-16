import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{Routes, RouterModule} from '@angular/router';

//GUARDS
import{AuthenticationGuardService} from '../../shared/guards/authentication-guard.service';

//COMPONENTS
import { ImmatriculationComponent } from './immatriculation.component';

const immatriculationRoutes:Routes =[
  {
    path:'', component:ImmatriculationComponent, canActivate:[AuthenticationGuardService], children:[
      { path: 'employeur', loadChildren: () => import('./employeur/employeur.module').then(m => m.EmployeurModule)},
      { path: 'travailleur', loadChildren: () => import('./travailleur/travailleur.module').then(m => m.TravailleurModule)},
      { path: 'analyse', loadChildren: () => import('./analyse/analyse.module').then(m => m.AnalyseModule)},
      {path:'', redirectTo:'employeur', pathMatch:'full'}
    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(immatriculationRoutes)
  ],
  exports: [RouterModule]
})
export class ImmatriculationRoutingModule { }
