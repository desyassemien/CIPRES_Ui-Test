import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { Tableau1Service } from '../employeur/tableau1.service';

@Injectable({
  providedIn: 'root'
})
export class Tableau8Service {
  [x: string]: any;

  tableHeaderData:any = [ 
    {id:1, libelle: TableHeaderLibelle.Hommes, valeur: 0},
    {id:2, libelle: TableHeaderLibelle.Femmes, valeur: 0},
    {id:3, libelle: TableHeaderLibelle.Total, valeur: 0},

  ];
 

    //configuration des graphiques
    chartsOptions:any = {
      view: [980,500],
      view2: [950,500],
      view3: [298, 300],
  
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
  
      xAxisLabel: "Groupe d'âge",
      yAxisLabel: "Nombre Travailleur",
  
      xAxisLabel2: "Groupe d'âge",
      yAxisLabel2: "Nombre Travailleur",
  
      xAxisLabel3 : "",
      yAxisLabel3 : "Nombre Travailleur",
  
      legendTitle: "",
      legendTitle3: "Mois",
  
      legendPosition: "below",
      legendPosition3: "below",
  
      timeline: true,
      schemeType: "ordinal",
      showDataLabel: false,
  
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


  constructor( private http:HttpClient,private tableau1Service:Tableau1Service) { }


  queryTableau8A(noannee:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'dataTableau8/'+noannee,{headers:rqHeader})
  } 
}

enum TableHeaderLibelle{
  Hommes = "Hommes",
  Femmes = "Femmes",
  Total = "Total",

}