import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyseComponent } from './analyse.component';
import { AnalyseRoutingModule } from './analyse-routing.module';
import { DimEmployeurComponent } from './employeur/dim-employeur/dim-employeur.component';



@NgModule({
  declarations: [AnalyseComponent, DimEmployeurComponent],
  imports: [
    CommonModule,
    AnalyseRoutingModule
  ],
  exports:[
    AnalyseComponent
  ], 
  providers:[

  ],
  
})
export class AnalyseModule { }
