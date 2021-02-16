import { Component, Input, OnInit } from '@angular/core';
import{Tableau3Service} from '../../../../shared/services/immatriculation/employeur/tableau3.service';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { Tableau1Service } from 'src/app/shared/services/immatriculation/employeur/tableau1.service';
import { ImmaPathService } from 'src/app/shared/services/immatriculation/imma-path.service';
import { DimensionsService } from 'src/app/shared/services/immatriculation/dimensions.service';
declare var $:any;

@Component({
  selector: 'app-tableau3-employeur',
  templateUrl: './tableau3-employeur.component.html',
  styleUrls: ['./tableau3-employeur.component.css']
})
export class Tableau3EmployeurComponent implements OnInit {
  chartsController:string = "ngx-charts-area-chart";
  graphController:string = "ngx-charts-pie-chart";
  @Input() masquer:boolean=true;
  tableHeaderData:any = this.tableau3Service.tableHeaderData;
  barChartsDataList:Array<any> = [];
  brancheArrayList:Array<any> = []
  chartsData:any = [];
  chartsOptions:any = this.tableau3Service.chartsOptions;
  donnees:Array<any> = [];
  p:any = 1;
  responsive:boolean = true;
  erreurChargement:boolean= false;
  loadingController:string = "LOADING";

  PeriodeListe =this.tableau1Service.PeriodeListe
  formPeriode:number = this.tableau1Service.formPeriode
  constructor(
    private tableau3Service:Tableau3Service,
    private tableau1Service:Tableau1Service,
    private immaPathService :ImmaPathService,
    private dimensionService: DimensionsService,
  ) { }


  ngOnInit(): void {
    this.onGetBrancheListItem();
    this.immaPathService.ontActiveLiens();
    registerLocaleData(es);
  }


  /**
   * [ A MODIFIER *************************************]
   * Construction et initialisation des données à afficher dans le tableau
   */

  public onGetBrancheListItem(){
    this.tableau3Service.querybrancheList()
    .subscribe(data=>{
        let exlusData =[-1,-2,-3,-4];
        data.forEach((element:any) => {
          if(!exlusData.includes(element.seccode)){
            let item = {id:element.seccode, libelle:element.seclibel}
            this.brancheArrayList.push(item)
          }
        });

       this.onGetPart1(this.formPeriode)
      },
      erreur =>{
        console.log(erreur)
      }
    )
  }


  public onGetBrancheList(){
    this.donnees = [];
    this.brancheArrayList.forEach((brancheItem:any) => {
      let obj:any = {
        "branche": brancheItem,
        "chartsData":{"libelle": "", data: []},
        "contenu": [
          {"id": 1, "libelle": CategorieDesignation.DebutPeriode, "valeur": 0},
          {"id": 2, "libelle": CategorieDesignation.NouvelleImmatriculation, "valeur": 0},
          {"id": 3, "libelle": CategorieDesignation.Reactive, "valeur": 0},
          {"id": 4, "libelle": CategorieDesignation.Suspendu, "valeur": 0},
          {"id": 5, "libelle": CategorieDesignation.Radie, "valeur": 0},
          {"id": 6, "libelle": CategorieDesignation.FinPeriode, "valeur": 0}
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
   *  effectifActifDp: 750
   *  secLibelle: "activite maritime"
   *  
   * ]
   * 
   */

  public onGetPart1(formPeriode:number){
    this.loadingController = "LOADING";
    this.erreurChargement=false
    this.donnees = [];
    var dp = formPeriode - 1;
    var periode = dp + '-12-31';
    this.tableau3Service.queryTableau3Part1(periode)
    .subscribe(data =>{
      this.loadingController = "LOADED";
      let object = this.onGetBrancheList();
        data.forEach((element:any) => {
          /**
           * SUGGESTION:
           * Faites intervenir seccode dans les données qui viennent du back et faites la vérification ci-dessous sur seccode
           * le format des données qui viennent ressembleront à ceci:
           * {
           *   seccode: 68
           *   effectifActifDp: 59045
           *   secLibelle: "activite maritime"
           * }
          */
          let index:number = object.findIndex((elt:any)=> elt.branche.libelle.toUpperCase().trim() === element.secLibelle.toUpperCase().trim());
          if(index >= 0){
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

  public onGetPart2(formePeriode:number,object:Array<any>){
    this.tableau3Service.queryTableau3Part2(formePeriode).subscribe(
      data=>{
        data.forEach((element:any) => {
         let index =  object.findIndex((elt:any)=> elt.branche.libelle.toUpperCase().trim() === element.secLibelle.toUpperCase().trim());
          if(index >= 0){
            this.updatePart2GlobalObject(object[index], element);
          }
        });
        this.onGetPart3(formePeriode, object)
      },
      erreur =>{
        this.erreurChargement=true
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
  public onGetPart3(formPeriode:number, object:Array<any>){
    var dp = formPeriode ;
    var periode = dp + '-12-31';
    this.tableau3Service.queryTableau3Part3(periode)
    .subscribe(data =>{
        data.forEach((element:any) => {
          let index:number = object.findIndex((elt:any)=> elt.branche.libelle.toUpperCase().trim() === element.secLibelle.toUpperCase().trim());
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


  public onChangePeriode(){
    this.erreurChargement=false
   this.onGetPart1(this.formPeriode)
  }
  /**
   * Cette méthode permet de calculer les totaux du tableau de la barre grise horizontale
   */
  public onCalculTotal(position:number):number{
    let total:number = 0;
    this.donnees.forEach((item:any) => {
      total += (+item.contenu[position].valeur);
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


  private updatePart2GlobalObject(object:any,element:any){
    object.contenu[1].valeur=(+element.nouvelleImmatriculation)
    object.contenu[2].valeur=(+element.nombreReactive)
    object.contenu[3].valeur=(+element.nombreSuspendu)
    object.contenu[4].valeur=(+element.nombreRadie)
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
  private onBuidAreaAndLineChartsData(dataArrayList:Array<any>){
    this.chartsData = [];
    this.tableHeaderData.forEach((headerItem:any) => {
      let obj:any = {"name": headerItem.libelle, "series":[]};
      dataArrayList.forEach((dataItem:any) => {
        let position:number = dataItem.contenu.findIndex((c:any)=> (+c.id) === (+headerItem.id));
        if(position >= 0){
          let objet:any = {"name": dataItem.branche.libelle, "value": dataItem.contenu[position].valeur};
          obj.series.push(objet);
        }
      });
      this.chartsData.push(obj);
    });
  }


  private onBuildChartsDataByCategory(dataArrayList:Array<any>){
    dataArrayList.forEach((element:any) => {
      element.chartsData.libelle = element.branche.libelle;
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


enum CategorieDesignation{
  DebutPeriode = "Effectifs actifs debut période",
  NouvelleImmatriculation = "Nouvelles immatriculations",
  Reactive = "Reactivés",
  Suspendu = "Suspendus",
  Radie = "Radiés",
  FinPeriode = "Effectifs actifs fin période"
}

enum SecteurDesignation{
  Prive = "Secteur privé",
  publique = "Secteur public",
  Maison = "Gens de maison",
  Assure = "Assurés volontaires",
  Travailleur = "Travailleurs indépendants"
}
