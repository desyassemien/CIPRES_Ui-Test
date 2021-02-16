import { Component, Input, OnInit } from '@angular/core';
import { DimensionsService } from 'src/app/shared/services/immatriculation/dimensions.service';
import { Tableau1Service } from 'src/app/shared/services/immatriculation/employeur/tableau1.service';
import { Tableau2Service } from 'src/app/shared/services/immatriculation/employeur/tableau2.service';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { ImmaPathService } from 'src/app/shared/services/immatriculation/imma-path.service';
import { Tableau5Service } from 'src/app/shared/services/immatriculation/travailleur/tableau5.service';
import { Tableau6Service } from 'src/app/shared/services/immatriculation/travailleur/tableau6.service';
declare var $:any;
@Component({
  selector: 'app-tableau6',
  templateUrl: './tableau6.component.html',
  styleUrls: ['./tableau6.component.css']
})
export class Tableau6Component implements OnInit {
  @Input() masquer:boolean=true;
  chartsController:string = "ngx-charts-area-chart-stacked";
  graphController:string = "ngx-charts-pie-chart";

  tableHeaderData:any = this.tableau6Service.tableHeaderData;
  barChartsDataList:Array<any> = [];
  chartsData:any = [];
  chartsOptions:any = this.tableau6Service.chartsOptions;
  donnees:Array<any> = [];
  donneesTest:Array<any> = [];
  ExclusId:Array<any>=[-1,-2,-3,-4]

  PeriodeListe =this.tableau1Service.PeriodeListe
  formPeriode:number = this.tableau1Service.formPeriode
  categorieArrayList:Array<any>=[]
  loadingController = "LOADING";

  erreurChargement:boolean =false
  constructor(
    private tableau6Service:Tableau6Service,
    private tableau1Service:Tableau1Service,
    private tableau2Service:Tableau2Service,
    private dimensionService: DimensionsService,
    private immPathService: ImmaPathService,
  ) { }
 

  ngOnInit(): void {
   this.immPathService.ontActiveLiensTravailleur();
  // this.onGetPart1(this.formPeriode)
    registerLocaleData(es);
    this.onGetCategorieActiviteListItem()
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
            let item = {id:element.cat_code,libelleSecteur:element.cat_libelle}
            this.categorieArrayList.push(item)
          //  let obj=this.createGlobalObject(element)
          //  this.donnees.push(obj)
          }
        });
      // this.onGetTableau5(this.formPeriode)
       this.onGetPart1(this.formPeriode)
      },
      erreur =>{
        console.log(erreur)
        this.loadingController = "FAIL";
      }

    )
  }


  public onGetSecteurActiviteList():any{
    let data:Array<any> = this.categorieArrayList;
    data.forEach((secteurItem:any) => {
      let obj:any = {
        "secteur": secteurItem,
        "chartsData":{"libelle": "", data: []},
        "contenu": [
          {"id": 1, "libelle": CategorieLibelle.DebutPeriode, "valeur": 0},
          {"id": 2, "libelle": CategorieLibelle.NouvelleImmatriculation, "valeur": 0},
          {"id": 3, "libelle": CategorieLibelle.Retraites, "valeur": 0},
          {"id": 4, "libelle": CategorieLibelle.Decedes, "valeur": 0},
          {"id": 5, "libelle": CategorieLibelle.Autres, "valeur": 0},
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
    this.loadingController = "LOADING";
    this.donnees = [];
    var dp = formPeriode - 1;
    var periode = dp + '-12-31';
    this.tableau6Service.queryTableau6DebutFinPeriode(periode).subscribe(
      data =>{
        let object = this.onGetSecteurActiviteList()
        data.forEach((element:any) => {
          let index:number = object.findIndex((elt:any)=> elt.secteur.id === element.codeActivite);
          if(index<0){
            console.log("erreur correspondance non trouvé")
          }else{
            object[index].contenu[0].valeur=(+element.effectifActif);
          }
        });
        this.onGetPart2(formPeriode,object);
      },
      erreur=>{
        this.erreurChargement=true
        this.loadingController = "FAIL";
        console.log(erreur)
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

  public onGetPart2(formePeriode:number,object:any){
    this.tableau6Service.queryTableau6NewIma(formePeriode).subscribe(
      data =>{
        data.forEach((element:any) => {
          let index:number = object.findIndex((elt:any)=> elt.secteur.id === element.codeActivite);
          if(index<0){
            alert("erreur")
          }else{
            object[index].contenu[1].valeur=(+element.nouvelleImmatriculation);
          }
        });
      this.onGetPart3(this.formPeriode,object);
      },
      erreur =>{
        this.loadingController = "FAIL";
        this.erreurChargement=true
        console.log(erreur)
        
      }
    )
  }
 /**
   * data part3: renvoie motif par secteur
   * [
   *  {
   *    catLibelle: "Secteur public"
   *    nombreRetraite: 0 
   *    nombreDecede: 0 
   *    nombreAutre: 14
   *    nouvelleImmatriculation: 21

   *  }
  *  ]
   * 
   */
  public onGetPart3(formPeriode:number,object:any){
    this.tableau6Service.queryTableau6AutreMotif(formPeriode).subscribe(
      data =>{
        console.log(data)
        data.forEach((element:any) => {
          let index:number = object.findIndex((elt:any)=> elt.secteur.id === element.codeActivite);
          if(index<0){
            alert("erreur")
          }else{
            object[index].contenu[2].valeur=(+element.nombreRetraite);
            object[index].contenu[3].valeur=(+element.nombreDecede);
            object[index].contenu[4].valeur=(+element.nombreAutreMotif);
          }
        });
        this.onGetPart4(formPeriode,object);
      },
      erreur =>{
        this.erreurChargement=true
        this.loadingController = "FAIL";
        console.log(erreur)
        
      }
    )
  }

   /**
   * data part4 : renvoie effectif actif fin période par secteur
   * [
   *  { catLibelle: "Assurés volontaires"
   *    effectifActifFp: 203
   *   },
   * ]
   * 
   */
  public onGetPart4(formPeriode:number,object :any){
    var dp = formPeriode ;
    var periode = dp + '-12-31';
    this.tableau6Service.queryTableau6DebutFinPeriode(periode).subscribe(
      data =>{
        this.loadingController = "LOADED";
        console.log(data)
        data.forEach((element:any) => {
          let index:number = object.findIndex((elt:any)=> elt.secteur.id === element.codeActivite);
          if(index<0){
            alert("erreur")
          }else{
            object[index].contenu[5].valeur=(+element.effectifActif);
          }
        });
        this.onBuildBarChartsData();
        this.onBuidAreaAndLineChartsData();
        this.onBuildChartsDataByCategory();
      },
      erreur=>{
        this.erreurChargement=true
        console.log(erreur)
        this.loadingController = "FAIL";
      }
    )
  }

  /********
   * actualise les données
   *  l'orsqu'on change l'exercice
   * 
   */
  public onChangePeriode(){
    this.onGetPart1(this.formPeriode)
  }
  private updatePart2GlobalObject(object:any,element:any){
    object.contenu[1].valeur=(+element.nouvelleImmatriculation)
    object.contenu[2].valeur=(+element.nombreReactive)
    object.contenu[3].valeur=(+element.nombreSuspendu)
    object.contenu[4].valeur=(+element.nombreRadie)

 
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
  private onBuildBarChartsData(){
    this.barChartsDataList = [];
    this.donnees.forEach((dataItem:any) => {
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
  private onBuidAreaAndLineChartsData(){
    this.chartsData = [];
    this.tableHeaderData.forEach((headerItem:any) => {
      let obj:any = {"name": headerItem.libelle, "series":[]};
      this.donnees.forEach((dataItem:any) => {
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
  private onBuildChartsDataByCategory(){
    this.donnees.forEach((element:any) => {
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
  Retraites = "Retraités",
  Decedes = "Décedés",
  Autres = "Autres",
  FinPeriode = "Effectifs actifs fin période"
}

