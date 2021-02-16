import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import{LayoutComponent} from '../../../../layout/layout.component';
import { Observable } from 'rxjs/internal/Observable';
import { Tableau1Service } from './tableau1.service';

@Injectable({
  providedIn: 'root'
})
export class Tableau2Service {
  prefixeUrl:string = "";

  tableHeaderData:any = [ 
    {id:1, libelle: TableHeaderLibelle.DebutPeriode, valeur: 0},
    {id:2, libelle: TableHeaderLibelle.NouvelleImmatriculation, valeur: 0},
    {id:3, libelle: TableHeaderLibelle.Reactive, valeur: 0},
    {id:4, libelle: TableHeaderLibelle.Suspendu, valeur: 0},
    {id:5, libelle: TableHeaderLibelle.Radie, valeur: 0},
    {id:6, libelle: TableHeaderLibelle.FinPeriode, valeur: 0}
  ];

  secteurArrayList: Array<any> = [
    {id:1, libelleSecteur: SecteurLibelle.Prive},
    {id:2, libelleSecteur: SecteurLibelle.publique},
    {id:3, libelleSecteur: SecteurLibelle.Maison},
    {id:4, libelleSecteur: SecteurLibelle.Assure},
    {id:5, libelleSecteur: SecteurLibelle.Travailleur}
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
    yAxisLabel: "Nombre employeur",

    xAxisLabel2: "Mois de l'année",
    yAxisLabel2: "Nombre employeur",

    xAxisLabel3 : "Employeurs",
    yAxisLabel3 : "Nombre Employeur",

    legendTitle: "Mois",
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

  constructor(private http:HttpClient, private router:Router, private tableau1Service: Tableau1Service) { }
/********************************************************** */


queryTableau2Part1(noannee:any) : Observable<any>{
  var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
  return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'dataTableau2/part1/'+noannee,{headers:rqHeader})
}
queryTableau2Part2(noannee:any) : Observable<any>{
  var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
  return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'dataTableau2/part2/'+noannee,{headers:rqHeader})
}
queryTableau2Part3(noannee:any) : Observable<any>{
  var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
  return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'dataTableau2/part3/'+noannee,{headers:rqHeader})
} 

//***********************tableau 2 Details
queryTableau2DetailsActifDp(periode:any,catLibelle:any) : Observable<any>{
var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'dataTableau2/DebutFinPeriode/Detail/'+periode+'/'+catLibelle,{headers:rqHeader})
}
queryTableau2DetailsImma(noannee:any,catLibelle:any) : Observable<any>{
var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'dataTableau2/NI/Detail/'+noannee+'/'+catLibelle,{headers:rqHeader})
}
queryTableau2DetailsReactive(noannee:any,catLibelle:any) : Observable<any>{
var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'dataTableau2/Reactive/Detail/'+noannee+'/'+catLibelle,{headers:rqHeader})
}
queryTableau2DetailsSuspendu(noannee:any,catLibelle:any) : Observable<any>{
var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'dataTableau2/Suspendu/Detail/'+noannee+'/'+catLibelle,{headers:rqHeader})
}

queryTableau2DetailsRadie(noannee:any,catLibelle:any) : Observable<any>{
var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'dataTableau2/Radie/Detail/'+noannee+'/'+catLibelle,{headers:rqHeader})
}

/***************************************************************** */


}

enum TableHeaderLibelle{
  DebutPeriode = "Effectifs actifs debut période",
  NouvelleImmatriculation = "Nouvelles immatriculations",
  Reactive = "Reactivés",
  Suspendu = "Suspendus",
  Radie = "Radiés",
  FinPeriode = "Effectifs actifs fin période"
}

enum SecteurLibelle{
  Prive = "Secteur privé",
  publique = "Secteur public",
  Maison = "Gens de maison",
  Assure = "Assurés volontaires",
  Travailleur = "Travailleurs indépendants"
}

