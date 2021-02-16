import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import{LayoutComponent} from '../../../../layout/layout.component';
import { Observable } from 'rxjs';
import { Tableau1Service } from './tableau1.service';

@Injectable({
  providedIn: 'root'
})
export class Tableau3Service {
  prefixeUrl:string = "";

  tableHeaderData:any = [
    {id:1, libelle: TableHeaderText.DebutPeriode, valeur: 0},
    {id:2, libelle: TableHeaderText.NouvelleImmatriculation, valeur: 0},
    {id:3, libelle: TableHeaderText.Reactive, valeur: 0},
    {id:4, libelle: TableHeaderText.Suspendu, valeur: 0},
    {id:5, libelle: TableHeaderText.Radie, valeur: 0},
    {id:6, libelle: TableHeaderText.FinPeriode, valeur: 0}
  ];


  branchesArrayList: Array<any> = [
    {id:1, libelle: "Activité maritime"},
    {id:2, libelle: "Administration générale, économique et sociale et service de prérogative publique"},
    {id:3, libelle: "Agricole forestier"},
    {id:4, libelle: "Agricole industrie"},
    {id:5, libelle: "Agricole pur"},
    {id:6, libelle: "Agricole scierie"},
    {id:7, libelle: "Agriculture"},
    {id:8, libelle: "Agro industrie"},
    {id:9, libelle: "Ambassade"},
    {id:10, libelle: "Assemblée nationale députés"}
  ];


  //configuration des graphiques
  chartsOptions:any = {
    view: [2700,500],
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

    xAxisLabel: "Secteurs d'activité",
    yAxisLabel: "Nombre employeur",

    xAxisLabel2: "Branches d'activité",
    yAxisLabel2: "Nombre employeur",

    xAxisLabel3 : "",
    yAxisLabel3 : "Nombre Employeur",

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

  constructor(private http:HttpClient, private router:Router, private tableau1Service:Tableau1Service) { }


  querybrancheList() : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'brancheList',{headers:rqHeader})
  }

  queryTableau3Part1(noannee:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'dataTableau3/part1/'+noannee,{headers:rqHeader})
  }
  
  queryTableau3Part2(noannee:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'dataTableau3/part2/'+noannee,{headers:rqHeader})
  }
  queryTableau3Part3(noannee:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'dataTableau3/part3/'+noannee,{headers:rqHeader})
  }
  //***********************tableau 3 Details
queryTableau3DetailsActifDp(periode:any,catLibelle:any) : Observable<any>{
  var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
  return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'dataTableau3/DebutFinPeriode/Detail/'+periode+'/'+catLibelle,{headers:rqHeader})
}
queryTableau3DetailsImma(noannee:any,catLibelle:any) : Observable<any>{
  var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
  return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'dataTableau3/NI/Detail/'+noannee+'/'+catLibelle,{headers:rqHeader})
}
queryTableau3DetailsReactive(noannee:any,catLibelle:any) : Observable<any>{
  var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
  return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'dataTableau3/Reactive/Detail/'+noannee+'/'+catLibelle,{headers:rqHeader})
}
queryTableau3DetailsSuspendu(noannee:any,catLibelle:any) : Observable<any>{
  var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
  return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'dataTableau3/Suspendu/Detail/'+noannee+'/'+catLibelle,{headers:rqHeader})
}

queryTableau3DetailsRadie(noannee:any,catLibelle:any) : Observable<any>{
  var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
  return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'dataTableau3/Radie/Detail/'+noannee+'/'+catLibelle,{headers:rqHeader})
}

}


enum TableHeaderText{
  DebutPeriode = "Effectifs actifs debut période",
  NouvelleImmatriculation = "Nouvelles immatriculations",
  Reactive = "Reactivés",
  Suspendu = "Suspendus",
  Radie = "Radiés",
  FinPeriode = "Effectifs actifs fin période"
}

