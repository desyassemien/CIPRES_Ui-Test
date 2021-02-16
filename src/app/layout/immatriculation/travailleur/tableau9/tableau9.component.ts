import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { Component, Input, OnInit } from '@angular/core';
import { DimensionsService } from 'src/app/shared/services/immatriculation/dimensions.service';
import { Tableau1Service } from 'src/app/shared/services/immatriculation/employeur/tableau1.service';
import { ImmaPathService } from 'src/app/shared/services/immatriculation/imma-path.service';
import { Tableau7Service } from 'src/app/shared/services/immatriculation/travailleur/tableau7.service';
import { Tableau9Service } from 'src/app/shared/services/immatriculation/travailleur/tableau9.service';
declare var $:any;
@Component({
  selector: 'app-tableau9',
  templateUrl: './tableau9.component.html',
  styleUrls: ['./tableau9.component.css']
})
export class Tableau9Component implements OnInit {
  chartsController:string = "ngx-charts-area-chart";
  graphController:string = "ngx-charts-pie-chart";
  @Input() masquer:boolean=true;
  tableHeaderData:any = this.tableau9Service.tableHeaderData;
  barChartsDataList:Array<any> = [];
  brancheArrayList:Array<any> = []
  chartsData:any = [];
  chartsOptions:any = this.tableau7Service.chartsOptions;
  donnees:Array<any> = [];
  p:any = 1;
  responsive:boolean = true;
  erreurChargement:boolean= false;
  loadingController:string ="LOADING"

  PeriodeListe =this.tableau1Service.PeriodeListe
  formPeriode:number = this.tableau1Service.formPeriode
  constructor(
    private tableau7Service:Tableau7Service,
    private tableau9Service:Tableau9Service,
    private tableau1Service:Tableau1Service,
    private immPathService: ImmaPathService,
    private dimensionService:DimensionsService
  ) { }



  ngOnInit(): void {
    this.immPathService.ontActiveLiensTravailleur();
    this.onGetGoupeAgeListItem();
    // this.onGetBrancheList();
    // this.onBuildBarChartsData();
    // this.onBuidAreaAndLineChartsData();
    registerLocaleData(es);
  }

  /**
   * [ A MODIFIER *************************************]
   * Construction et initialisation des données à afficher dans le tableau
   */

  public onGetGoupeAgeListItem(){
    this.dimensionService.queryGroupeAgeList().subscribe(
    
      data=>{
        let exlusData =[-1,-2,-3,-4]
        data.forEach((element:any) => {
          if(!exlusData.includes(element.grp_code)){
            let item = {id:element.cle_dim_groupe_age,libelle:element.grp_libelle}
            this.brancheArrayList.push(item)
          }
        });
       this.onGetPart1(this.formPeriode)
      },
      erreur =>{
        console.log(erreur)
        this.loadingController ="FAIL"
      }

    )
  }
  public onGetBrancheList(){
    this.donnees = [];
    let data:Array<any> = this.brancheArrayList;
    data.forEach((brancheItem:any,index:number) => {
      let obj:any = {
        "branche": brancheItem,
        "chartsData":{"libelle": "", data: []},
        "contenu": [
          {"id": 1, "libelle": groupeAgeDesignation.Hommes, "effectif": 0,"plafon":0,"nonPlafon":0},
          {"id": 2, "libelle": groupeAgeDesignation.Hommes,  "effectif": 0,"plafon":0,"nonPlafon":0},
          {"id": 3, "libelle": groupeAgeDesignation.Total,  "effectif": 0,"plafon":0,"nonPlafon":0},
        ]
      };
      this.donnees.push(obj); 
    });
    return this.donnees
    //this.onGetDataRealValue(this.donnees);
  }


  /*************************************************************Mon code */

  /**
   * data part1 : renvoie effectif actif debut période par branche
   * [
   *  { seclibel:"branche ..."
   *    effectifActifDp:59045
   *   },
   *  { seclibel: "Assurés volontaires"
   *    effectifActifDp: 117 
   *   }
   * ]
   * 
   */

  public onGetPart1(formPeriode:number){
    this.loadingController ="LOADING"
    this.erreurChargement=false
    this.donnees = [];
    var dp = formPeriode - 1;
    var periode = dp + '-12-31';
    this.tableau7Service.queryTableau7DebutFinPeriode(periode).subscribe(
      data =>{
        this.loadingController ="LOADED"
        console.log(data)
      let object = this.onGetBrancheList()
        // data.forEach((element:any) => {
        //   let index:number = object.findIndex((elt:any)=> elt.branche.id === element.secCode);
        //   if(index<0){
        //   //  alert("erreur")
        //   }else{
        //     object[index].contenu[0].valeur=(+element.effectifActif);
        //   }
        // });

        // this.onBuildBarChartsData();
        // this.onBuidAreaAndLineChartsData();
        // this.onBuildChartsDataByCategory();
      },
      erreur=>{
        this.loadingController ="FAIL"
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
    let totale:number = 0;
    let totalp:number = 0;
    let totalnp:number = 0;
    this.donnees.forEach((item:any) => {
      totale += (+item.contenu[position].effectif);
      totalp += (+item.contenu[position].plafon);
      totalnp += (+item.contenu[position].nonPlafon);
    });
    return totale;
  }
  public onCalculTotalEffectif(position:number):number{
    let totale:number = 0;
    this.donnees.forEach((item:any) => {
      totale += (+item.contenu[position].effectif);
    });
    return totale;
  }
  public onCalculTotalPlafon(position:number):number{
    let totalp:number = 0;

    this.donnees.forEach((item:any) => {
      totalp += (+item.contenu[position].plafon)
    });
    return totalp;
  }
  public onCalculTotalNonPlafon(position:number):number{
    let totalnp:number = 0;
    this.donnees.forEach((item:any) => {
      totalnp += (+item.contenu[position].nonPlafon);
    });
    return totalnp;
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
      let obj:any = {"name": headerItem.libelle, "series":[]};
      this.donnees.forEach((dataItem:any) => {
        let position:number = dataItem.contenu.findIndex((c:any)=> (+c.id) === (+headerItem.id));
        if(position >= 0){
          let objet:any = {"name": dataItem.branche.libelle, "value": dataItem.contenu[position].valeur};
          obj.series.push(objet);
        }
      });
      this.chartsData.push(obj);
    });
  }


  private onBuildChartsDataByCategory(){
    this.donnees.forEach((element:any) => {
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



enum groupeAgeDesignation{
  Hommes = "Hommes",
  Femmes = "Femmes",
  Total = "Total",

}