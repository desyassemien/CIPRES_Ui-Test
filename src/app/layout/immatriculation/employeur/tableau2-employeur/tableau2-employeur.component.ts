import { Component, Input, OnInit } from '@angular/core';
import{Tableau2Service} from '../../../../shared/services/immatriculation/employeur/tableau2.service';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { DimensionsService } from 'src/app/shared/services/immatriculation/dimensions.service';
import { Tableau1Service } from 'src/app/shared/services/immatriculation/employeur/tableau1.service';
import { ImmaPathService } from 'src/app/shared/services/immatriculation/imma-path.service';
declare var $:any;

@Component({
  selector: 'app-tableau2-employeur',
  templateUrl: './tableau2-employeur.component.html',
  styleUrls: ['./tableau2-employeur.component.css']
})
export class Tableau2EmployeurComponent implements OnInit {
  @Input() masquer:boolean=true;
  chartsController:string = "ngx-charts-area-chart-stacked";
  graphController:string = "ngx-charts-pie-chart";

  tableHeaderData:any = this.tableau2Service.tableHeaderData;
  barChartsDataList:Array<any> = [];
  chartsData:any = [];
  chartsOptions:any = this.tableau2Service.chartsOptions;
  donnees:Array<any> = [];
  donneesTest:Array<any> = [];
  ExclusId:Array<any>=[-1,-2,-3,-4]

  PeriodeListe =this.tableau1Service.PeriodeListe
  formPeriode:number = this.tableau1Service.formPeriode

  loadingController:string = "LOADING";
  
  erreurChargement:boolean =false
  constructor(
    private tableau2Service:Tableau2Service,
    private tableau1Service:Tableau1Service,
    private dimensionService: DimensionsService,
    private immaPathService :ImmaPathService
  ) { }


  ngOnInit(): void {

    this.onGetPart1(this.formPeriode)
    registerLocaleData(es);
    this.immaPathService.ontActiveLiens();
    // $(".active-menu").removeClass("active-menu");
    // $("#tEmployeur4").addClass("active-menu");
  }


  /**
   * [ A MODIFIER *************************************]
   * Construction et initialisation des données à afficher dans le tableau
   */

  public onGetSecteurActiviteList():Array<any>{
    let data:Array<any> = this.tableau2Service.secteurArrayList;
    data.forEach((secteurItem:any) => {
      let obj:any = {
        "secteur": secteurItem,
        "chartsData":{"libelle": "", data: []},
        "contenu": [
          {"id": 1, "libelle": CategorieLibelle.DebutPeriode, "valeur": 0},
          {"id": 2, "libelle": CategorieLibelle.NouvelleImmatriculation, "valeur": 0},
          {"id": 3, "libelle": CategorieLibelle.Reactive, "valeur": 0},
          {"id": 4, "libelle": CategorieLibelle.Suspendu, "valeur": 0},
          {"id": 5, "libelle": CategorieLibelle.Radie, "valeur": 0},
          {"id": 6, "libelle": CategorieLibelle.FinPeriode, "valeur": 0}
        ]
      };
      this.donnees.push(obj);
    });
    return this.donnees  
  }

  /*************************************************************Mon code */

  /**
   * data part1 : renvoie effectif actif debut période par secteur
   * [
   *  { 
   *    catLibelle:"Secteur privé"
   *    effectifActifDp:59045
   *   },
   *  { catLibelle: "Assurés volontaires"
   *    effectifActifDp: 117 
   *   }
   * ]
   * 
   */

  public onGetPart1(formPeriode:number){
    this.loadingController = "LOADING";
    this.donnees = [];
    var dp = formPeriode - 1;
    var periode = dp + '-12-31';
    this.tableau2Service.queryTableau2Part1(periode)
    .subscribe(data =>{
      this.loadingController = "LOADED";
        let object:Array<any> = this.onGetSecteurActiviteList();
        data.forEach((element:any) => {
          /**
           * SUGGESTION:
           * Il sera plus interessant de donner un code unique à chaque secteur d'activité.
           * comme ça la vérification ci-dessous se fera sur le code.
           * le format des données qui viennent ressembleront à ceci:
           * {
           *   catCode: 68
           *   catLibelle: "Secteur privé",
           *   effectifActifDp: 59045
           * }
          */
          let index:number = object.findIndex((elt:any)=> elt.secteur.libelleSecteur.toUpperCase().trim() === element.catLibelle.toUpperCase().trim());
          if(index >= 0 ){
            object[index].contenu[0].valeur = (+element.effectifActifDp);
          }
        });
        this.onGetPart2(formPeriode, object);
      },
      erreur=>{
        this.erreurChargement=true
        console.log(erreur);
        this.loadingController = "FAIL";
      }
    )
  }
  


   /**
   * data part2: renvoie nouvelle imma, reactivé suspendu et radié par secteur
   * [
   *  {
   *    catLibelle: "Secteur public"
   *    nombreRadie: 0 
   *    nombreReactive: 0 
   *    nombreSuspendu: 14
   *    nouvelleImmatriculation: 21
   *    taiLibelle: null //a supprimer dans le back
   *  }
  *  ]
   * 
   */

  public onGetPart2(formePeriode:number, object:Array<any>){
    this.tableau2Service.queryTableau2Part2(formePeriode)
    .subscribe(data => {
        data.forEach((element:any) => {
         let index = object.findIndex((elt:any)=> elt.secteur.libelleSecteur.toUpperCase().trim() === element.catLibelle.toUpperCase().trim());
          if(index >= 0){
            this.updatePart2GlobalObject(object[index], element);
          }
        });
        this.onGetPart3(formePeriode,object)
      },
      erreur =>{
        this.erreurChargement = true
        console.log(erreur)
        
      }
    )
  }


  /**
   * data part3 : renvoie effectif actif fin période par secteur
   * [
   *  { catLibelle: "Assurés volontaires"
   *    effectifActifFp: 203
   *   },
   * ]
   * 
   */
  public onGetPart3(formPeriode:number, object: Array<any>){
    var dp = formPeriode ;
    var periode = dp + '-12-31';
    this.tableau2Service.queryTableau2Part3(periode)
    .subscribe(data =>{
        data.forEach((element:any) => {
          let index:number = object.findIndex((elt:any)=> elt.secteur.libelleSecteur.toUpperCase().trim() === element.catLibelle.toUpperCase().trim());
          if(index >= 0){
            object[index].contenu[5].valeur=(+element.effectifActifFp);
          }
        });
        this.onBuildBarChartsData(object);
        this.onBuidAreaAndLineChartsData(object);
        this.onBuildChartsDataByCategory(object);
      },
      erreur=>{
        this.erreurChargement=true
        console.log(erreur)
      }
    )
  }



  /********
   * actualise les données
   *  l'orsqu'on change l'exercice
   * 
   */
  public onChangePeriode(){
    this.onGetPart1(this.formPeriode);
  }


  private updatePart2GlobalObject(object:any, element:any){
    object.contenu[1].valeur = (+element.nouvelleImmatriculation);
    object.contenu[2].valeur = (+element.nombreReactive);
    object.contenu[3].valeur = (+element.nombreSuspendu);
    object.contenu[4].valeur = (+element.nombreRadie);
   }














  /*********************************************************************** */

  /** 
   * [ A MODIFIER ***************************************]
   * Remplir les donnée données avec les valeurs réelles
   */
  public onGetDataRealValue(data:Array<any>){
    data.forEach(element => {
      element.contenu.forEach((item:any) => {
        let realValue:number = Math.floor(10700 * Math.random());
        item.valeur = realValue;
      });
    });
   
  }


  /**
   * Cette méthode permet de calculer les totaux du tableau de la barre grise horizontale
   */
  public onCalculTotal(position:number):number{
    let total:number = 0;
    this.donnees.forEach((item:any) => {
      if(item.secteur.id < 4){
        total += (+item.contenu[position].valeur);
      }
    });
    return total;
  }


  /**
   * Cette méthode permet de sélectionner un autre type de graphique
   */
  public onSelectionneTypeGraphe(grapheName:string, domId:any){
    this.chartsController = grapheName;
    $(".btn-chart-active").removeClass("btn-chart-active");
    $("#" + domId).addClass("btn-chart-active");
  }

  public onSelectGraphe(grapheName:string){
    this.graphController = grapheName;
  }

  /**
   * Cette méthode construit les données pour la génération ds graphes de lignes et de secteur
   * à partir de la source de données permettant de remplir le tableau.
   */
  private onBuildBarChartsData(dataArrayList:Array<any>){
    this.barChartsDataList = [];
    dataArrayList.forEach((dataItem:any) => {
      let obj:any = {"name": dataItem.secteur.libelleSecteur, "series":[]};
      dataItem.contenu.forEach((item:any) => {
        let objet:any = {"name": item.libelle, "value": item.valeur};
        obj.series.push(objet);
      });
      this.barChartsDataList.push(obj);
    });
  }
  

  /**
   * Cette méthode construit les données pour la génération ds graphes de lignes et de secteur
   * à partir de la source de données permettant de remplir le tableau.
   */
  private onBuidAreaAndLineChartsData(dataArrayList:Array<any>){
    this.chartsData = [];
    this.tableHeaderData.forEach((headerItem:any) => {
      let obj:any = {"name": headerItem.libelle, "series":[]};
      dataArrayList.forEach((dataItem:any) => {
        let position:number = dataItem.contenu.findIndex((c:any)=> (+c.id) === (+headerItem.id));
        if(position >= 0){
          let objet:any = {"name": dataItem.secteur.libelleSecteur, "value": dataItem.contenu[position].valeur};
          obj.series.push(objet);
        }
      });
      this.chartsData.push(obj);
    });
  }


  /**
   * Cette méthode construit les données pour la génération des graphes par catégorie d'activités
   * à partir de la source de données permettant de remplir le tableau.
   */
  private onBuildChartsDataByCategory(dataArrayList:Array<any>){
    dataArrayList.forEach((element:any) => {
      element.chartsData.libelle = element.secteur.libelleSecteur;
      element.chartsData.data = this.getChartsData(element.contenu);
    });
  }

  private getChartsData(arrayList:Array<any>): Array<any>{
    let returnedArray:Array<any> = [];
    arrayList.forEach((item:any) => {
      let obj:any = {"name": item.libelle, "value": item.valeur};
      returnedArray.push(obj);
    });
    return returnedArray;
  }


  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  
  imprime(div:string,name:string){
    this.dimensionService.openCreatePDF(div,name)
}

}

enum CategorieLibelle{
  DebutPeriode = "Effectifs actifs debut période",
  NouvelleImmatriculation = "Nouvelles immatriculations",
  Reactive = "Reactivés",
  Suspendu = "Suspendus",
  Radie = "Radiés",
  FinPeriode = "Effectifs actifs fin période"
}

