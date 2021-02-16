import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { Tableau1Service } from './employeur/tableau1.service';
declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class ImmaPathService {
  menuEmployeur:any = [
    {
      id:1,
      tableau:"Vue globale :",
      title: "Vue globale",
      path: ["/layout/immatriculation/employeur/vue-globale"],
      icon: "fa fa-pie-chart"
    },
    {
      id:2,
      tableau:"Tous les tableaux:",
      title: "Tous les tableaux.",
      path: ["/layout/immatriculation/employeur/tableaux"],
      icon: "fa fa-table"
    },
    {
      id:3,
      tableau:"TABLEAU 1:",
      title: "Répartition des employés, des assurés volontaires et des travailleurs indépendants au cours de l'exercice par catégorie et par mois.",
      path: ["/layout/immatriculation/employeur/tableau1"],
      icon: "fa fa-area-chart"
    },
    {
      id:4,
      tableau:"TABLEAU 2:",
      title: "Mouvement des employeurs, des assurés volontaires et des travailleurs indépendants au cours de l'exercice",
      path: ["/layout/immatriculation/employeur/tableau2"],
      icon: "fa fa-bar-chart"
    },
    {
      id:5,
      tableau:"TABLEAU 3:",
      title: "Mouvement des employeurs par branche d'activité au cours de l'exercice",
      path: ["/layout/immatriculation/employeur/tableau3"],
      icon: "fa fa-line-chart"
    },
    {
      id:6,
      tableau:"TABLEAU 4:",
      title: "Evolution du nombre d'emplyeurs par catégorie au cours des 5 dernières années",
      path: ["/layout/immatriculation/employeur/tableau4"],
      icon: "fa fa-cubes"
    }
  ];


  menuTravailleur:any = [
    {
      id:1,
      tableau:"Vue globale :",
      title: "Vue globale",
      path: ["/layout/immatriculation/travailleur/vue-globale"],
      icon: "fa fa-pie-chart"
    },
    {
      id:2,
      tableau:"Tous les tableaux:",
      title: "Tous les tableaux.",
      path: ["/layout/immatriculation/travailleur/tableaux"],
      icon: "fa fa-table"
    },
    {
      id:3,
      tableau:"TABLEAU 5:",
      title: "Répartition des travailleurs immatriculés au cours de l’exercice selon le mois d’immatriculation et la catégorie d’employeurs.",
      path: ["/layout/immatriculation/travailleur/tableau5"],
      icon: "fa fa-area-chart"
    },
    {
      id:4,
      tableau:"TABLEAU 6:",
      title: "Mouvement au cours de l’exercice des travailleurs immatriculés",
      path: ["/layout/immatriculation/travailleur/tableau6"],
      icon: "fa fa-bar-chart"
    },
    {
      id:5,
      tableau:"TABLEAU 7:",
      title: "Mouvement au cours de l’exercice des travailleurs immatriculés par branche d’activité",
      path: ["/layout/immatriculation/travailleur/tableau7"],
      icon: "fa fa-line-chart"
    },
    {
      id:6,
      tableau:"TABLEAU 8:",
      title: "Répartition des travailleurs immatriculés par sexe et par groupe d’âges",
      path: ["/layout/immatriculation/travailleur/tableau8"],
      icon: "fa fa-cubes"
    },
    {
      id:7,
      tableau:"TABLEAU 9:",
      title: "Répartition des nouveaux travailleurs immatriculés et de la masse salariale au cours de l'exercice selon l’âge et le sexe",
      path: ["/layout/immatriculation/travailleur/tableau9"],
      icon: "fa fa-list"
    },
    {
      id:8,
      tableau:"TABLEAU 10:",
      title: "Evolution des nouvelles immatriculations des travailleurs au cours des 5 dernières années par sexe",
      path: ["/layout/immatriculation/travailleur/tableau10"],
      icon: "fa fa-circle-o"
    }
  ];


  constructor(private http:HttpClient, 
    private router:Router,
    private location :Location,
  ) { }
   
  public activeLiens(id:string){
    if(this.location.isCurrentPathEqualTo(this.location.path())){
     // console.log(this.location.path())
      $(".active-menu").removeClass("active-menu");
      $(id).addClass("active-menu");
    }
  }
  
  public ontActiveLiens(){
    this.menuEmployeur.forEach((element:any) => {
      if(this.location.path()== element.path[0]){
        let id:string="#tEmployeur"+element.id
         this.activeLiens(id);
      }
    })
  }

  public ontActiveLiensTravailleur(){
    this.menuTravailleur.forEach((element:any) => {
      // console.log(this.location.path())
      // console.log(element.path)
      if(this.location.path() == element.path){
        $("#tab-eg7-0").removeClass("active");
        $("#tab-eg7-1").addClass("active")
        let id:string="#tTravailleur"+element.id
        this.activeLiens(id);
      }
    })
  }
}
