import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import{LoginRoutingModule} from './login-routing.module';

//SERVICES
import{LoginService} from '../shared/services/login.service';

//COMPONENTS
import { LoginComponent } from './login.component';
import { AuthenticationComponent } from './authentication/authentication.component';



@NgModule({
  declarations: [LoginComponent, AuthenticationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ],
  exports:[LoginComponent],
  providers:[
    LoginService
  ],
  entryComponents: []
})
export class LoginModule { }
