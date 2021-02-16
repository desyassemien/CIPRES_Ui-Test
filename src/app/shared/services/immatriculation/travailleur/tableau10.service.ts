import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { Tableau1Service } from '../employeur/tableau1.service';
 
@Injectable({
  providedIn: 'root'
})
export class Tableau10Service {

  constructor(private http:HttpClient,private tableau1Service:Tableau1Service) { }

  queryTableau10(noannee:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'dataTableau10/'+noannee,{headers:rqHeader})
  } 


    //configuration des graphiques
    chartsOptions:any = {
      view: [945,500],
      view2: [950,500],
      view3: [460, 400],
  
      legend: true,
      showLabels: true,
      animations: true,
      xAxis: true,
      yAxis: true,
      showXAxis: true,
      showYAxis: true,
      gradient: true,
      showLegend: true,
      showLegend3: false,
      showXAxisLabel: true,
      showYAxisLabel: true,
  
      xAxisLabel: "Années",
      yAxisLabel: "Nombre travailleur",
  
      xAxisLabel2: "Secteurs d'activité",
      yAxisLabel2: "Nombre travailleur",
  
      xAxisLabel3 : "Secteurs d'activité",
      yAxisLabel3 : "Nombre travailleur",
  
      legendTitle: "Années",
      legendTitle3: "Secteurs d'activité",
  
      legendPosition: "below",
      legendPosition3: "below",
  
      timeline: true,
      schemeType: "ordinal",
      showDataLabel: true,
  
      doughnut: false,
      isDoughnut:true,
      explodeSlices:true,
  
      colorScheme :{
        domain: ["#0d3562", "#f07531", "#fbe21c", "#333", "#5AA454","#e02222"]
      },
      colorScheme2 : {
        domain: ["#0d3562", "#f07531", "#fbe21c", "#444054", "#5AA454", "#e02222"]
      }
    }
  
}
