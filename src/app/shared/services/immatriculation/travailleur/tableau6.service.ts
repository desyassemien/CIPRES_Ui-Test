import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { Tableau1Service } from '../employeur/tableau1.service';

@Injectable({
  providedIn: 'root' 
})
export class Tableau6Service {

  tableHeaderData:any = [ 
    {id:1, libelle: TableHeaderLibelle.DebutPeriode, valeur: 0},
    {id:2, libelle: TableHeaderLibelle.NouvelleImmatriculation, valeur: 0},
    {id:3, libelle: TableHeaderLibelle.Retraites, valeur: 0},
    {id:4, libelle: TableHeaderLibelle.Decedes, valeur: 0},
    {id:5, libelle: TableHeaderLibelle.Autres, valeur: 0},
    {id:6, libelle: TableHeaderLibelle.FinPeriode, valeur: 0}
  ];

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

    xAxisLabel: "Secteurs d'activité",
    yAxisLabel: "Nombre travailleur",

    xAxisLabel2: "Mois de l'année",
    yAxisLabel2: "Nombre travailleur",

    xAxisLabel3 : "Employeurs",
    yAxisLabel3 : "Nombre travailleur",

    legendTitle: "Mois",
    legendTitle3: "Mois",

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

  constructor(private http:HttpClient, private router:Router, private tableau1Service: Tableau1Service) { }

  queryTableau6DebutFinPeriode(noannee:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'dataTableau6DebutFin/'+noannee,{headers:rqHeader})
  }
  queryTableau6NewIma(noannee:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'dataTableau6NouvelleImma/'+noannee,{headers:rqHeader})
  }
  queryTableau6AutreMotif(noannee:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'dataTableau6Motif/'+noannee,{headers:rqHeader})
  } 
  
}

enum TableHeaderLibelle{
  DebutPeriode = "Effectifs actifs debut période",
  NouvelleImmatriculation = "Nouvelles immatriculations",
  Retraites = "Retraités",
  Decedes = "Décedés",
  Autres = "Autres",
  FinPeriode = "Effectifs actifs fin période"
}