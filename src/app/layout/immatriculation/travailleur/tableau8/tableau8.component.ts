import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { Component, Input, OnInit } from '@angular/core';
import { element } from 'protractor';
import { DimensionsService } from 'src/app/shared/services/immatriculation/dimensions.service';
import { Tableau1Service } from 'src/app/shared/services/immatriculation/employeur/tableau1.service';
import { ImmaPathService } from 'src/app/shared/services/immatriculation/imma-path.service';
import { Tableau7Service } from 'src/app/shared/services/immatriculation/travailleur/tableau7.service';
import { Tableau8Service } from 'src/app/shared/services/immatriculation/travailleur/tableau8.service';
declare var $:any;
@Component({
  selector: 'app-tableau8',
  templateUrl: './tableau8.component.html',
  styleUrls: ['./tableau8.component.css']
})
export class Tableau8Component implements OnInit {

  chartsController:string = "ngx-charts-area-chart";
  graphController:string = "ngx-charts-pie-chart";
  @Input() masquer:boolean=true;
  tableHeaderData:any = this.tableau8Service.tableHeaderData;
  barChartsDataList:Array<any> = [];
  brancheArrayList:Array<any> = []
  chartsData:any = [];
  chartsOptions:any = this.tableau8Service.chartsOptions;
  donnees:Array<any> = [];
  p:any = 1;
  responsive:boolean = true;
  erreurChargement:boolean= false;
  loadingController:string = "LOADING";
  PeriodeListe =this.tableau1Service.PeriodeListe
  formPeriode:number = this.tableau1Service.formPeriode;
  constructor(
    private tableau7Service:Tableau7Service,
    private tableau1Service:Tableau1Service,
    private immPathService: ImmaPathService,
    private dimensionService:DimensionsService,
    private tableau8Service:Tableau8Service
  ) { }


  ngOnInit(): void {
    this.immPathService.ontActiveLiensTravailleur();
    this.onGetBrancheListItem();
    // this.onGetBrancheList();
    // this.onBuildBarChartsData();
    // this.onBuidAreaAndLineChartsData();
    registerLocaleData(es);

    this.tableau1Service.updateForm()
  }

  /**
   * [ A MODIFIER *************************************]
   * Construction et initialisation des données à afficher dans le tableau
   */

  public onGetBrancheListItem(){
    this.dimensionService.queryGroupeAgeList().subscribe(
    
      data=>{
        let exlusData =[-1,-2,-3,-4]
        data.forEach((element:any) => {
          if(!exlusData.includes(element.grp_code)){
            let item = {id:element.cle_dim_groupe_age,libelle:element.grp_libelle}
            this.brancheArrayList.push(item)
          }
        });
        ("alert ici")
       this.onGetPart1(this.formPeriode)
      },
      erreur =>{
        console.log(erreur)
        this.loadingController = "FAIL";
      }

    )
  }
  public onGetBrancheList(){
    this.donnees = [];
    let data:Array<any> = this.brancheArrayList;
    data.forEach((brancheItem:any) => {
      let obj:any = {
        "branche": brancheItem,
        "chartsData":{"libelle": "", data: []},
        "contenu": [
          {"id": 1, "libelle": groupeAgeDesignation.Hommes, "valeur": 0},
          {"id": 2, "libelle": groupeAgeDesignation.Femmes, "valeur": 0},
          {"id": 3, "libelle": groupeAgeDesignation.Total, "valeur": 0},
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
    this.loadingController = "LOADING";
    this.erreurChargement=false
    this.donnees = [];
    var dp = formPeriode - 1;
    var periode = dp + '-12-31';
    this.tableau8Service.queryTableau8A(formPeriode).subscribe(
     data =>{

      this.loadingController = "LOADED";
       //console.log(data)
       var currentYear =new Date().getFullYear();
        let object = this.onGetBrancheList()
      
        data.forEach((element:any) => {
          let grpAge =  currentYear-element.dateNaissance
           if(grpAge< 20){
            let index:number = object.findIndex((elt:any)=> elt.branche.id === 1)
            if(index>=0){
              let index2:number =object[index].contenu.findIndex((elt2:any)=> elt2.id === element.sexCode)
              if(index2>=0){
                object[index].contenu[index2].valeur+=(+element.nombreTravailleur)
              }
            }
           }else if(grpAge>=20 && grpAge<=24){
           // console.log(element)
            let index:number = object.findIndex((elt:any)=> elt.branche.id === 2)
            if(index>=0){
              let index2:number =object[index].contenu.findIndex((elt2:any)=> elt2.id === element.sexCode)
              if(index2>=0){
                object[index].contenu[index2].valeur+=(+element.nombreTravailleur)
              }
            }

           }else if(grpAge>=25 && grpAge<=29){
            //console.log(element)
            let index:number = object.findIndex((elt:any)=> elt.branche.id === 3)
            if(index>=0){
              let index2:number =object[index].contenu.findIndex((elt2:any)=> elt2.id === element.sexCode)
              if(index2>=0){
                object[index].contenu[index2].valeur+=(+element.nombreTravailleur)
              }
            }
          } 
          else if(grpAge>=30 && grpAge<=34){
           // console.log(element)
            let index:number = object.findIndex((elt:any)=> elt.branche.id === 4)
            if(index>=0){
              let index2:number =object[index].contenu.findIndex((elt2:any)=> elt2.id === element.sexCode)
              if(index2>=0){
                object[index].contenu[index2].valeur+=(+element.nombreTravailleur)
              }
            }
          } 
          else if(grpAge>=35 && grpAge<=39){
           // console.log(element)
            let index:number = object.findIndex((elt:any)=> elt.branche.id === 5)
            if(index>=0){
              let index2:number =object[index].contenu.findIndex((elt2:any)=> elt2.id === element.sexCode)
              if(index2>=0){
                object[index].contenu[index2].valeur+=(+element.nombreTravailleur)
              }
            }
          } 
          else if(grpAge>=40 && grpAge<=44){
           // console.log(element)
            let index:number = object.findIndex((elt:any)=> elt.branche.id === 6)
            if(index>=0){
              let index2:number =object[index].contenu.findIndex((elt2:any)=> elt2.id === element.sexCode)
              if(index2>=0){
                object[index].contenu[index2].valeur+=(+element.nombreTravailleur)
              }
            }
          } 
          else if(grpAge>=45 && grpAge<=49){
           // console.log(element)
            let index:number = object.findIndex((elt:any)=> elt.branche.id === 7)
            if(index>=0){
              let index2:number =object[index].contenu.findIndex((elt2:any)=> elt2.id === element.sexCode)
              if(index2>=0){
                object[index].contenu[index2].valeur+=(+element.nombreTravailleur)
              }
            }
          } 
          else if(grpAge>=50 && grpAge<=54){
           // console.log(element)
            let index:number = object.findIndex((elt:any)=> elt.branche.id === 8)
            if(index>=0){
              let index2:number =object[index].contenu.findIndex((elt2:any)=> elt2.id === element.sexCode)
              if(index2>=0){
                object[index].contenu[index2].valeur+=(+element.nombreTravailleur)
              }
            }
          } 
          else if(grpAge>=55 && grpAge<=59){
         //   console.log(element)
            let index:number = object.findIndex((elt:any)=> elt.branche.id === 9)
            if(index>=0){
              let index2:number =object[index].contenu.findIndex((elt2:any)=> elt2.id === element.sexCode)
              if(index2>=0){
                object[index].contenu[index2].valeur+=(+element.nombreTravailleur)
              }
            }
          } 
          else if(grpAge>=60){
           // console.log(element)
            let index:number = object.findIndex((elt:any)=> elt.branche.id === 10)
            if(index>=0){
              let index2:number =object[index].contenu.findIndex((elt2:any)=> elt2.id === element.sexCode)
              if(index2>=0){
                object[index].contenu[index2].valeur+=(+element.nombreTravailleur)
              }
            }
          }
          else{
            console.log("warning! Tranche d'age non repertorié "+grpAge )
          } 
             
             
           
      //     let index:number = object.findIndex((elt:any)=> elt.branche.id === element.secCode);
      //     if(index<0){
      //     //  alert("erreur")
      //     }else{
      //       object[index].contenu[0].valeur=(+element.effectifActif);
      //     }
        });
        this.onBuildBarChartsData();
        this.onBuidAreaAndLineChartsData();
        this.onBuildChartsDataByCategory();
       
      },
     erreur=>{
       this.erreurChargement=true
       this.loadingController = "FAIL";
       console.log(erreur)
     }
   )
  }
  
    /**
   * data part2: renvoie nouvelle immatriculation par branche
   * [
   *  {

   *    nouvelleImmatriculation: 21
 
   *  }
  *  ]
   * 
   */

  public onGetPart2(formePeriode:number,object:any){
    this.tableau7Service.queryTableau7NewIma(formePeriode).subscribe(
      data=>{
        data.forEach((element:any) => {
         let index =  object.findIndex((elt:any)=> elt.branche.id === element.secCode);
          if(index<0){
          //  alert("erreur")
          }else{
            object[index].contenu[1].valeur=(+element.nouvelleImmatriculation)
          }
        });

        // console.log(this.donnees)
       this.onGetPart3(formePeriode,object)
      },
      erreur =>{
        this.erreurChargement=true
        console.log(erreur)
        
      }
    )
  }



   /**
   * data part3: renvoie motif par branche
   * [
   *  {
   *    secLibel: "branche ..."
   *    nombreRetraite: 0 
   *    nombreDecede: 0 
   *    nombreAutre: 14
   *    nouvelleImmatriculation: 21

   *  }
  *  ]
   * 
   */
  public onGetPart3(formePeriode:number,object:any){
    this.tableau7Service.queryTableau7AutreMotif(formePeriode).subscribe(
      data=>{
        data.forEach((element:any) => {
         let index =  object.findIndex((elt:any)=> elt.branche.id === element.secCode);
          if(index<0){
         //   alert("erreur")
          }else{
            object[index].contenu[2].valeur=(+element.nombreRetraite);
            object[index].contenu[3].valeur=(+element.nombreDecede);
           // object[index].contenu[4].valeur=(+element.nombreAutreMotif);
          }
        });

        // console.log(this.donnees)
        //this.onGetPart4(formePeriode,object)
      },
      erreur =>{
        this.erreurChargement=true
        console.log(erreur)
        
      }
    )
  }


 /**
   * data part4 : renvoie effectif actif fin période par branche
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
  public onGetPart4(formPeriode:number,object :any){
    var dp = formPeriode ;
    var periode = dp + '-12-31';
    this.tableau7Service.queryTableau7DebutFinPeriode(periode).subscribe(
      data =>{
        //console.log(data)
        data.forEach((element:any) => {
          let index:number = object.findIndex((elt:any)=> elt.branche.id === element.secCode);
          if(index<0){
          //  alert("erreur")
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

  public onCalculeTotal(contenueArrayList:Array<any>):number{
    let total:number = 0;
    contenueArrayList.forEach(element => {
      if(+element.id < 3){
        total += (+element.valeur);
      }if(+element.id==3)[
        element.valeur=total
      ]
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
  private onBuildBarChartsData(){

    this.barChartsDataList = [];
    this.donnees.forEach((dataItem:any) => {
      let obj:any = {"name": dataItem.branche.libelle, "series":[]};
      dataItem.contenu.forEach((item:any) => {
        if(item.libelle!="Total"){
          let objet:any = {"name": item.libelle, "value": item.valeur};
          obj.series.push(objet);
        }
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
      console.log("------------------------------d-----------onBuidAreaAndLineChartsData")
      console.log(headerItem)
      console.log("------------------------------d-----------onBuidAreaAndLineChartsData")
      if(headerItem.libelle != "Total"){
        let obj:any = {"name": headerItem.libelle, "series":[]};
      
      this.donnees.forEach((dataItem:any) => {
        let position:number = dataItem.contenu.findIndex((c:any)=> (+c.id) === (+headerItem.id));
        if(position >= 0){
          let objet:any = {"name": dataItem.branche.libelle, "value": dataItem.contenu[position].valeur};
          obj.series.push(objet);
        }
      });
      this.chartsData.push(obj);
    }
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
