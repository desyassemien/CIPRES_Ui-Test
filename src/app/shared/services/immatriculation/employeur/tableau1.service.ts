import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import{LayoutComponent} from '../../../../layout/layout.component';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class Tableau1Service {
  prefixeUrl:string = "";
  PeriodeListe:Array<number>=[2010,2011] 
  formPeriode:number=new Date().getFullYear()-1
  monthsData:any = [
    {id:1, nom:"JANVIER", valeur:0}, {id:2, nom:"FEVRIER", valeur:0}, {id:3, nom:"MARS", valeur:0}, {id:4, nom:"AVRIL", valeur:0},
    {id:5, nom:"MAI", valeur:0}, {id:6, nom:"JUIN", valeur:0}, {id:7, nom:"JUILLET", valeur:0}, {id:8, nom:"AOUT", valeur:0},
    {id:9, nom:"SEMPTEMBRE", valeur:0}, {id:10, nom:"OCTOBRE", valeur:0}, {id:11, nom:"NOVEMBRE", valeur:0}, {id:12, nom:"DECEMBRE", valeur:0}
  ];

   subData:any  = [
     {id:1, libelle:"Moins de 20 salariés"},
     {id:2, libelle:"20 salariés et plus"}
  ]

  secteurArrayList: Array<any> = [
    {id:1, libelleSecteur: Secteur.Prive},
    {id:2, libelleSecteur: Secteur.publique},
    {id:3, libelleSecteur: Secteur.Maison},
    {id:4, libelleSecteur: Secteur.Assure},
    {id:5, libelleSecteur: Secteur.Travailleur}
  ];

  //configuration des graphiques
  chartsOptions:any = {
    view: [1900,500],
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
    yAxisLabel2: "Nombre employeur",
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

  requestHeader:any = {
    "Content-Type":"application/json",
    "Authorization":sessionStorage.getItem("auth-token")
  };

  constructor(private http:HttpClient, private router:Router) { }

  queryTableau1Part1(noannee:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'dataTableau1/part1/'+noannee,{headers:rqHeader})
  }
  queryTableau1Part2(noannee:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'dataTableau1/part2/'+noannee,{headers:rqHeader})
  }

  updateForm(){
    let lastYear:number=this.PeriodeListe[this.PeriodeListe.length-1]
    let currentYear:number=new Date().getFullYear()
    let nombreYear:number= currentYear - lastYear
    console.log(nombreYear)
    for (let i = 1; i <= nombreYear; i++) {
     this.PeriodeListe.push(lastYear + i)
      
    }
    
  }
}

enum Secteur{
  Prive = "Secteur privé",
  publique = "Secteur public",
  Maison = "Gens de maison",
  Assure = "Assurés volontaires",
  Travailleur = "Travailleurs indépendants"
}
