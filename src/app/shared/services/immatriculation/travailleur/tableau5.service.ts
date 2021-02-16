import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { Tableau1Service } from '../employeur/tableau1.service';

@Injectable({
  providedIn: 'root'
})
export class Tableau5Service {
  
  //configuration des graphiques
  chartsOptions:any = {
    view: [1500,500],
    view2: [950,500],
    legend: true,
    showLabels: true,
    animations: true,
    xAxis: true,
    yAxis: true, 
    showXAxis: true,
    showYAxis: true,
    gradient: true,
    showLegend: true,
    showXAxisLabel: true,
    xAxisLabel: "Mois",
    xAxisLabel2: "Mois de l'année",
    showYAxisLabel: true,
    yAxisLabel: "Secteurs d'activité",
    yAxisLabel2: "Nombre travailleur",
    legendTitle: "Mois",
    legendPosition: "below",
    timeline: true,
    schemeType: "ordinal",
    showDataLabel: false,
    colorScheme :{
      domain: ["#0d3562", "#f07531", "#fbe21c", "#333", "#5AA454"]
    },
    colorScheme2 : {
      domain: ["#0d3562", "#f07531", "#fbe21c", "#444054", "#5AA454"]
    }
  }

  constructor(private http:HttpClient, private router:Router, private tableau1Service: Tableau1Service) { }

  queryTableau5(noannee:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'dataTableau5/'+noannee,{headers:rqHeader})
  }
}
 