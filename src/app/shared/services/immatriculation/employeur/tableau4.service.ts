import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import{LayoutComponent} from '../../../../layout/layout.component';
import { Tableau1Service } from './tableau1.service';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class Tableau4Service {

  prefixeUrl:string = "";

  tableHeaderData:any = [
    {id:1, libelle: TableHeaderDescription.Annee1, valeur: 56},
    {id:2, libelle: TableHeaderDescription.Annee2, valeur: 36},
    {id:3, libelle: TableHeaderDescription.Annee3, valeur: 78},
    {id:4, libelle: TableHeaderDescription.Annee4, valeur: 12},
    {id:5, libelle: TableHeaderDescription.Annee5, valeur: 45}
  ];

  secteurArrayList: Array<any> = [
    {id:1, libelleSecteur: SecteurText.Prive},
    {id:2, libelleSecteur: SecteurText.publique},
    {id:3, libelleSecteur: SecteurText.Maison},
    {id:4, libelleSecteur: SecteurText.Assure},
    {id:5, libelleSecteur: SecteurText.Travailleur}
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

    xAxisLabel: "5 dernières années",
    yAxisLabel: "Nombre employeur",

    xAxisLabel2: "5 dernières années",
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


  queryTableau4(noannee:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'dataTableau4/'+noannee,{headers:rqHeader})
  }
}


enum TableHeaderDescription{
  Annee1 = "2015",
  Annee2 = "2016",
  Annee3 = "2017",
  Annee4 = "2018",
  Annee5 = "2019"
}

enum SecteurText{
  Prive = "Secteur privé",
  publique = "Secteur public",
  Maison = "Gens de maison",
  Assure = "Assurés volontaires",
  Travailleur = "Travailleurs indépendants"
}
