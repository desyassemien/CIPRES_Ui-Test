import { Component, Input, OnInit } from '@angular/core';
import { DimensionsService } from 'src/app/shared/services/immatriculation/dimensions.service';
import { Tableau1Service } from 'src/app/shared/services/immatriculation/employeur/tableau1.service';
import { Tableau2Service } from 'src/app/shared/services/immatriculation/employeur/tableau2.service';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { ImmaPathService } from 'src/app/shared/services/immatriculation/imma-path.service';
import { Tableau5Service } from 'src/app/shared/services/immatriculation/travailleur/tableau5.service';
import { Tableau6Service } from 'src/app/shared/services/immatriculation/travailleur/tableau6.service';
import { Tableau10Service } from 'src/app/shared/services/immatriculation/travailleur/tableau10.service';
declare var $:any;

@Component({
  selector: 'app-tableau10',
  templateUrl: './tableau10.component.html',
  styleUrls: ['./tableau10.component.css']
})
export class Tableau10Component implements OnInit {
  chartsController:string = "ngx-charts-area-chart-stacked";
  graphController:string = "ngx-charts-pie-chart";
  @Input() masquer:boolean=true;

  // tableHeaderData:any = [ {id: 1, secteurLibelle: "Secteur privé", valeur:0},
  //   {id: 2, secteurLibelle: "Secteur public",valeur:0},
  //  {id: 3, secteurLibelle: "Gens de maison",valeur:0},
  //  {id: 4, secteurLibelle: "Assurés volontaires", valeur:0},
  //  {id: 5, secteurLibelle: "Travailleurs indépendants", valeur:0}
  // ]
  tableHeaderData:any=[];
  barChartsDataList:Array<any> = [];
  chartsData:any = [];
  chartsOptions:any = this.tableau10Service.chartsOptions;
  donnees:Array<any> = [];
  donneesTest:Array<any> = [];
  ExclusId:Array<any>=[-1,-2,-3,-4]

  PeriodeListe =this.tableau1Service.PeriodeListe
  formPeriode:number = this.tableau1Service.formPeriode
  categorieArrayList:Array<any>=[]
  loadingController:string= "LOADING";
  erreurChargement:boolean =false
  constructor(
    private tableau6Service:Tableau6Service,
    private tableau1Service:Tableau1Service,
    private tableau10Service:Tableau10Service,
    private dimensionService: DimensionsService,
    private immPathService: ImmaPathService,
  ) { }
 

  ngOnInit(): void {
   this.immPathService.ontActiveLiensTravailleur();
   //this.onGetPart1(this.formPeriode)
   this.onUpdateTableHeader(this.formPeriode);
    registerLocaleData(es);
    this.onGetCategorieActiviteListItem()
  }

  private onUpdateTableHeader(exercice:number){
    this.tableHeaderData=[
      {"id": 1, "libelle": exercice-4, "valeur": 0, "chartsData":{"libelle": "", data: []}},
      {"id": 2, "libelle": exercice-3, "valeur": 0, "chartsData":{"libelle": "", data: []}},
      {"id": 3, "libelle": exercice-2, "valeur": 0, "chartsData":{"libelle": "", data: []}},
      {"id": 4, "libelle": exercice-1, "valeur": 0, "chartsData":{"libelle": "", data: []}},
      {"id": 5, "libelle": exercice, "valeur": 0, "chartsData":{"libelle": "", data: []}}
    ];
  }


  /**
   * [ A MODIFIER *************************************]
   * Construction et initialisation des données à afficher dans le tableau
   */

  public onGetCategorieActiviteListItem(){
    this.dimensionService.queryCategorieList().subscribe(
      data=>{
        let exlusData =[-1,-2,-3,-4]
        data.forEach((element:any) => {
          if(!exlusData.includes(element.cat_code)){
            let item = {id:element.cat_code,libelle:element.cat_libelle}
            this.categorieArrayList.push(item)
          }
        });
      // this.onGetTableau5(this.formPeriode)
       this.onGetPart1(this.formPeriode)
      },
      erreur =>{
        console.log(erreur)
      }

    )
  }



  public onGetSecteurActiviteList(exercice:number):any{
    let data:Array<any> = this.categorieArrayList;
    console.log("ici")
     for (let i = 0 ; i <5 ; i++) {
      let obj:any = {
        annee:{id:i,libelle:exercice-i} ,
        chartsData:{"libelle": "", data: []},
        contenu: []
      }
      this.addContenue(obj,data)
     }    
    return this.donnees
  }

  private addContenue(obj,data){
      data.forEach(elt => {
         let contenuData ={"id":elt.id,"secteurLibelle":elt.libelle,"h":0,"f":0}
         obj.contenu.push(contenuData)
       });
       let contenuData ={"id":-1,"secteurLibelle":"total","h":0,"f":0}
       obj.contenu.push(contenuData)
     this.donnees.push(obj);
  }
  /*************************************************************Mon code */

  /**
   * data part1 : renvoie effectif actif debut période par secteur
   * [
   *  { catLibelle:"Secteur privé"
   *    effectifActifDp:59045
   *   },
   *  { catLibelle: "Assurés volontaires"
   *    effectifActifDp: 117 
   *   }
   * ]
   * 
   */

  public onGetPart1(formPeriode:number){
    this.loadingController="LOADING";
    this.donnees = [];
    var dp = formPeriode - 1;
    //var periode = dp + '-12-31';
    this.tableau10Service.queryTableau10(formPeriode).subscribe(
      data =>{
        this.loadingController="LOADED";
        let object = this.onGetSecteurActiviteList(formPeriode)
        console.log(object)
        data.forEach((anneeData:any) => {
         
          anneeData.forEach(element => {
            let index:number = object.findIndex((elt:any)=> elt.annee.libelle === (+element.dateImma));
            if(index<0){
              console.log("Index non trouvé pour "+element.dateImma)
            }else{
            //  object[index].contenu[0].valeur=(+element.effectifActif);
            let index2=object[index].contenu.findIndex((elt:any)=> elt.id === (+element.codeActivite));
              if(index2<0){
                console.log("Index non trouvé pour "+element.dateImma)
              }else{
                if(element.sexCode == 1){
                  object[index].contenu[index2].h=element.nombreTravailleur
                }else if(element.sexCode == 2){
                  object[index].contenu[index2].f=element.nombreTravailleur
                }
              }
            }
          });
         
        });
        this.onBuildBarChartsData();
        this.onBuidAreaAndLineChartsData();
         this.onBuildChartsDataByCategory();
      },
      erreur=>{
        this.erreurChargement=true
        this.loadingController="FAIL";
      //  console.log(erreur)
      }
    )
  }
  
   /**
   * data part2: renvoie nouvelle immatriculation par secteur
   * [
   *  {

   *    nouvelleImmatriculation: 21
 
   *  }
  *  ]
   * 
   */


  /********
   * actualise les données
   *  l'orsqu'on change l'exercice
   * 
   */
  public onChangePeriode(){
    this.onGetPart1(this.formPeriode)
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
   * Cette méthode permet de calculer les totaux du tableau de la barre grise verticale
   */
  public onCalculeTotalVerticaleHomme(contenueArrayList:Array<any>):number{
    let total:number = 0;
    contenueArrayList.forEach(elt => {
      if(elt.id === 1 || elt.id === 2 || elt.id === 3){
        total += (+elt.h);
      }
      
    });
    return total;
  }
  public onCalculeTotalVerticaleFemme(contenueArrayList:Array<any>):number{
    let total:number = 0;
    contenueArrayList.forEach(elt => {
      if(elt.id === 1 || elt.id === 2 || elt.id === 3){
        total += (+elt.f);
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
  private onBuildBarChartsData(){
    this.barChartsDataList = [];
    this.donnees.forEach((dataItem:any) => {
      let obj:any = {"name": dataItem.annee.libelle.toString(), "series":[]};
      dataItem.contenu.forEach((item:any) => {
        if(item.id!=-1){
          let objeth:any = {"name": "h_"+item.secteurLibelle, "value": item.h};
          let objetf:any = {"name": "f_"+item.secteurLibelle, "value": item.f};
            obj.series.push(objeth);
            obj.series.push(objetf);
        }
      
      });
      console.log("-------------------------d-------------BuildBarChartsData")
      console.log(obj)
      console.log("-------------------------f-------------BuildBarChartsData")
      this.barChartsDataList.push(obj);
    });
  }
  
  private onBuildBarChartsDataOriginal(){
    this.barChartsDataList = [];
    this.donnees.forEach((dataItem:any) => {
      let obj:any = {"name": dataItem.branche.libelle, "series":[]};
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
  private onBuidAreaAndLineChartsData(){
    this.chartsData = [];
    this.tableHeaderData.forEach((headerItem:any) => {
     // console.log(headerItem)
      let obj:any = {"name": headerItem.libelle, "series":[]};
      this.donnees.forEach((dataItem:any) => {  
        console.log("--------------------------onBuidAreaAndLineChartsDataF")
        console.log(dataItem)
        console.log("-------------------onBuidAreaAndLineChartsData")  
       // let position:number = dataItem.findIndex((c:any)=> (+c.annee.libelle) === (+headerItem.libelle));
        if((+dataItem.annee.libelle) === (+headerItem.libelle)){
          dataItem.contenu.forEach(item => {
            if(item.id!=-1){
              let objeth:any = {"name": "h_"+item.secteurLibelle, "value": item.h};
              let objetf:any = {"name": "f_"+item.secteurLibelle, "value": item.f};
              obj.series.push(objeth);
              obj.series.push(objetf);
            }
           
          });
          
        }
      });
      console.log("onBuidAreaAndLineChartsDataF")
      console.log(obj)
      console.log("onBuidAreaAndLineChartsData")
      this.chartsData.push(obj);
    });
  }




  /**
   * Cette méthode construit les données pour la génération des graphes par catégorie d'activités
   * à partir de la source de données permettant de remplir le tableau.
   */
  private onBuildChartsDataByCategory(){
    this.donnees.forEach((element:any) => {
      element.chartsData.data = this.getChartsData(element.contenu);
    });
  }

  private getChartsData(arrayList:Array<any>): Array<any>{
    let returnedArray:Array<any> = [];
    arrayList.forEach((item:any) => {
      if(item.id!=-1){
        let objh:any = {"name": "h_"+item.secteurLibelle, "value": item.h};
        let objf:any = {"name": "f_"+item.secteurLibelle, "value": item.f};
      returnedArray.push(objh);
      returnedArray.push(objf);
    }
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



enum groupeAgeDesignation{
  Hommes = "Hommes",
  Femmes = "Femmes",
  Total = "Total",

}