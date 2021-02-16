import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashbordComponent } from './dashbord/dashbord.component';

//GUARDS
import{AuthenticationGuardService} from './shared/guards/authentication-guard.service';

const routes: Routes = [
  {path: "dashbord", component:DashbordComponent, canActivate:[AuthenticationGuardService]},
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  { path: 'layout', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)},
  { path: '', redirectTo: 'login', pathMatch:'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
