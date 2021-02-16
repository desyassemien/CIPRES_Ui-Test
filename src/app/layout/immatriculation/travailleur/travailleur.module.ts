import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{NgxChartsModule} from '@swimlane/ngx-charts';
import {NgxPaginationModule} from 'ngx-pagination';
import { ArchwizardModule } from 'angular-archwizard';
import{TravailleurRoutingModule} from './travailleur-routing.module';

//material module
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MatNativeDateModule, MatRippleModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';


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





@NgModule({
  declarations: [
    TravailleurComponent, 
    VueGlobaleTravailleurComponent, 
    TableauxTravailleurComponent, 
    Tableau5Component, Tableau6Component, 
    Tableau7Component, Tableau8Component, 
    Tableau9Component, 
    Tableau10Component
  ],
  imports: [
    CommonModule,
    TravailleurRoutingModule,
    FormsModule, ReactiveFormsModule,
    NgxChartsModule,
    NgxPaginationModule,
    ArchwizardModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatRippleModule,
    MatNativeDateModule,
  ],
  exports:[TravailleurComponent],
  providers:[

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
export class TravailleurModule { }
