import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{NgxChartsModule} from '@swimlane/ngx-charts';
import {NgxPaginationModule} from 'ngx-pagination';
import { ArchwizardModule } from 'angular-archwizard';
import{EmployeurRoutingModule} from './employeur-routing.module';

//SERVICES
import{VueGlobaleEmpService} from '../../../shared/services/immatriculation/employeur/vue-globale-emp.service';
import{Tableau1Service} from '../../../shared/services/immatriculation/employeur/tableau1.service';
import{Tableau2Service} from '../../../shared/services/immatriculation/employeur/tableau2.service';
import{Tableau3Service} from '../../../shared/services/immatriculation/employeur/tableau3.service';
import{Tableau4Service} from '../../../shared/services/immatriculation/employeur/tableau4.service';

//COMPONENTS
import { EmployeurComponent } from './employeur.component';
import { VueGlobalEmployeurComponent } from './vue-global-employeur/vue-global-employeur.component';
import { TousTableauxEmployeurComponent } from './tous-tableaux-employeur/tous-tableaux-employeur.component';
import { Tableau1EmployeurComponent } from './tableau1-employeur/tableau1-employeur.component';
import { Tableau2EmployeurComponent } from './tableau2-employeur/tableau2-employeur.component';
import { Tableau3EmployeurComponent } from './tableau3-employeur/tableau3-employeur.component';
import { Tableau4EmployeurComponent } from './tableau4-employeur/tableau4-employeur.component';


//material module
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MatNativeDateModule, MatRippleModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DimensionsService } from 'src/app/shared/services/immatriculation/dimensions.service';
import { ImmaPathService } from 'src/app/shared/services/immatriculation/imma-path.service';



@NgModule({
  declarations: [
    EmployeurComponent, 
    VueGlobalEmployeurComponent, 
    TousTableauxEmployeurComponent, 
    Tableau1EmployeurComponent, 
    Tableau2EmployeurComponent, 
    Tableau3EmployeurComponent, 
    Tableau4EmployeurComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    EmployeurRoutingModule,
    NgxChartsModule,
    NgxPaginationModule,
    ArchwizardModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatRippleModule,
    MatNativeDateModule,



  ],
  exports:[
    EmployeurComponent
  ],
  providers:[
    VueGlobaleEmpService,
    DimensionsService,
    ImmaPathService,
    Tableau2Service,
    Tableau3Service,
    Tableau4Service,
    {provide: MAT_DATE_LOCALE,useValue: 'fr-FR'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE,MAT_MOMENT_DATE_ADAPTER_OPTIONS]
   },
   {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}

  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class EmployeurModule { }
