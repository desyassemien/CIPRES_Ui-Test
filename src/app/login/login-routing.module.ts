import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{Routes, RouterModule} from '@angular/router';

//COMPONENTS
import { LoginComponent } from './login.component';
import { AuthenticationComponent } from './authentication/authentication.component';

//ROUTES
const routes:Routes =[
  {
    path:'', component:LoginComponent, children:[
      {path:"auth", component: AuthenticationComponent},
      {path:'', redirectTo:'auth', pathMatch:'full'}
    ]
  }
]




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule],
  providers:[
    
  ]
})
export class LoginRoutingModule { }
