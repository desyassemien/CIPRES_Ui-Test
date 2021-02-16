import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
//import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRoutingModule } from './app-routing.module';
import{NgxChartsModule} from '@swimlane/ngx-charts';

//COMPONENTs
import { AppComponent } from './app.component';

//SERVICES
import{LoginService} from './shared/services/login.service';
import { DashbordComponent } from './dashbord/dashbord.component';
import { DashBordHeaderComponent } from './shared/components/dash-bord-header/dash-bord-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    DashbordComponent,
    DashBordHeaderComponent,
   
 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    NgxChartsModule
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
