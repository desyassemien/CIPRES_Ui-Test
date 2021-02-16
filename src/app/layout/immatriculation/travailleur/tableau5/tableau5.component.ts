import { Component, Input, OnInit } from '@angular/core';
import { DimensionsService } from 'src/app/shared/services/immatriculation/dimensions.service';
import { Tableau1Service } from 'src/app/shared/services/immatriculation/employeur/tableau1.service';
import { ImmaPathService } from 'src/app/shared/services/immatriculation/imma-path.service';
import { Tableau5Service } from 'src/app/shared/services/immatriculation/travailleur/tableau5.service';
declare var $:any;
@Component({
  selector: 'app-tableau5',
  templateUrl: './tableau5.component.html',
  styleUrls: ['./tableau5.component.css']
})
export class Tableau5Component implements OnInit {
  @Input() masquer:boolean=true;
  chartsController:string = "ngx-charts-bar-vertical-2d";
  monthsData:any = this.tableau1Service.monthsData;
  barChartsDataList:Array<any> = [];
  chartsData:any = [];
  chartsOptions:any = this.tableau5Service.chartsOptions;
  totalEmployeurs = [... this.monthsData, {id:13, nom:"TOTAL", valeur:0}];
  subData:any  = [{id:1, libelle:"Moins de 20 salariés"}, {id:2, libelle:"20 salariés et plus"}];
  secteurArrayList: Array<any> = [
    {id:1, libelleSecteur: Secteur.Prive},
    {id:2, libelleSecteur: Secteur.publique},
    {id:3, libelleSecteur: Secteur.Maison},
    {id:4, libelleSecteur: Secteur.Assure},
    {id:5, libelleSecteur: Secteur.Travailleur}
  ];
  PeriodeListe =this.tableau1Service.PeriodeListe;                                                    
  formPeriode=this.tableau1Service.formPeriode;
  erreurChargement:boolean = false
  loadingController:string = "LOADING";
  categorieArrayList:Array<any>=[]
  
  donnees:any = [];

  

  constructor(
    private tableau1Service:Tableau1Service,
    private immPathService: ImmaPathService,
    private tableau5Service:Tableau5Service,
    private dimensionService: DimensionsService,
  ) { }

  ngOnInit(): void {

    this.immPathService.ontActiveLiensTravailleur()
    //this.onGetCategorieActiviteListItem()
    this.onGetTableau5Option2(this.formPeriode)
  }


  /******************************************************option1 */
  public onGetTableau5(periode:number){
    this.loadingController = "LOADING";
   // this.donnees = [];
    this.tableau5Service.queryTableau5(periode)
    .subscribe((data:any)=>{
      this.loadingController = "LOADED";
     data.forEach((element:any) => {
        let index:number = this.donnees.findIndex((elt:any)=> elt.id === element.codeActivite);
        if(index >= 0){
          let position2:number = this.donnees[index].contenu.findIndex((elt:any)=> (+elt.id) === (+element.noMois));
          if(position2 >= 0){
            this.donnees[index].contenu[position2].valeur += (+element.nouvelleImmatriculation);
          }
        }
      });
       this.onBuildBarChartsData();
       this.onBuidAreaAndLineChartsData();
      console.log(this.donnees)
    },(erreur:any)=>{
      console.log(erreur);
      this.loadingController = "FAIL";
    });
  }

  public onGetCategorieActiviteListItem(){
    this.dimensionService.queryCategorieList().subscribe(
      data=>{
        let exlusData =[-1,-2,-3,-4]
        data.forEach((element:any) => {
          if(!exlusData.includes(element.cat_code)){
            let item = {id:element.cat_code,libelle:element.cat_libelle}
            this.categorieArrayList.push(item)
            let obj=this.createGlobalObject(element)
            this.donnees.push(obj)
          }
        });
       this.onGetTableau5(this.formPeriode)
       
      },
      erreur =>{
        console.log(erreur)
      }

    )
  }

  private createGlobalObject(element:any){
    let obj:any = {
      id:element.cat_code,
      libelle: element.cat_libelle,
      contenu:[
        {id:1, nom:"JANVIER", valeur:0}, {id:2, nom:"FEVRIER", valeur:0}, {id:3, nom:"MARS", valeur:0}, {id:4, nom:"AVRIL", valeur:0},
        {id:5, nom:"MAI", valeur:0}, {id:6, nom:"JUIN", valeur:0}, {id:7, nom:"JUILLET", valeur:0}, {id:8, nom:"AOUT", valeur:0},
        {id:9, nom:"SEMPTEMBRE", valeur:0}, {id:10, nom:"OCTOBRE", valeur:0}, {id:11, nom:"NOVEMBRE", valeur:0}, {id:12, nom:"DECEMBRE", valeur:0}, {id:13, nom:"TOTAL", valeur:0}
     ],
    };
    return obj;
  }

 
/****************************************************** FIN option1 */




/******************************************************option2 */

private createGlobalObjectOption2(element:any){
  let obj:any = {
    id:element.codeActivite,
    libelle: element.catLibelle,
    contenu:[
      {id:1, nom:"JANVIER", valeur:0}, {id:2, nom:"FEVRIER", valeur:0}, {id:3, nom:"MARS", valeur:0}, {id:4, nom:"AVRIL", valeur:0},
      {id:5, nom:"MAI", valeur:0}, {id:6, nom:"JUIN", valeur:0}, {id:7, nom:"JUILLET", valeur:0}, {id:8, nom:"AOUT", valeur:0},
      {id:9, nom:"SEMPTEMBRE", valeur:0}, {id:10, nom:"OCTOBRE", valeur:0}, {id:11, nom:"NOVEMBRE", valeur:0}, {id:12, nom:"DECEMBRE", valeur:0}, {id:13, nom:"TOTAL", valeur:0}
   ],
  };
  return obj;
}

public onGetTableau5Option2(periode:number){
  this.loadingController = "LOADING";
  this.donnees = [];
   this.tableau5Service.queryTableau5(periode)
   .subscribe((data:any)=>{
    data.forEach((element:any) => {
      this.loadingController = "LOADED";
       let index:number = this.donnees.findIndex((elt:any)=> elt.id === element.codeActivite);
       if(index < 0){
        let obj:any = this.createGlobalObjectOption2(element);
        let position:number = obj.contenu.findIndex((item:any)=> (+item.id) === (+element.noMois));
        if(position >= 0){
          obj.contenu[position].valeur = (+element.nouvelleImmatriculation);
        }
        this.donnees.push(obj);
      }else{
          let position2:number = this.donnees[index].contenu.findIndex((elt:any)=> (+elt.id) === (+element.noMois));
          if(position2 >= 0){
            this.donnees[index].contenu[position2].valeur += (+element.nouvelleImmatriculation);
          }
      }
     });
      this.onBuildBarChartsData();
      this.onBuidAreaAndLineChartsData();
   },(erreur:any)=>{
     console.log(erreur);
     this.loadingController = "FAIL";
   });
 }

/*********************************************************** fin option2 */

  /**
   * Cette méthode permet de calculer les totaux du tableau de la barre grise verticale
   */
  public onCalculeTotal(contenueArrayList:Array<any>):number{
    let total:number = 0;
    contenueArrayList.forEach(element => {
      if(+element.id < 13){
        total += (+element.valeur);
      }
    });
    return total;
  }

  /**
   * Cette méthode permet de calculer les totaux du tableau de la barre grise horizontale
   */
  public onCalculTotalGlobal(index:number):number{
    let totalGlobal:number = 0;
    let totalSecteurPrive:number = 0;
    let totalSecteurPublic:number = 0;
    let totalGensMaison:number = 0;

    let indexSecteurPrive:number = this.donnees.findIndex((item:any)=> (+item.id) === 1);
    let indexSecteurPublic:number = this.donnees.findIndex((item:any)=> (+item.id) === 2);
    let indexGensMaison:number = this.donnees.findIndex((item:any)=> (+item.id) === 3);
    if(indexSecteurPrive >= 0){
      totalSecteurPrive = index != 12 ? (+this.donnees[indexSecteurPrive].contenu[index].valeur) : this.onCalculeTotal(this.donnees[indexSecteurPrive].contenu) ;
    }

    if(indexSecteurPublic >= 0){
      totalSecteurPublic = index != 12 ? (+this.donnees[indexSecteurPublic].contenu[index].valeur) : this.onCalculeTotal(this.donnees[indexSecteurPublic].contenu);
    }

    if(indexGensMaison >= 0){
      totalGensMaison = index != 12 ? (+this.donnees[indexGensMaison].contenu[index].valeur) : this.onCalculeTotal(this.donnees[indexGensMaison].contenu);
    }

    totalGlobal +=  (totalSecteurPrive  + totalSecteurPublic + totalGensMaison);
    return totalGlobal;
  }

  /**
   * Cette méthode permet de sélectionner un autre type de graphique
   */
  public onSelectionneTypeGraphe(grapheName:string, domId:any){
    this.chartsController = grapheName;
    $(".btn-chart-active").removeClass("btn-chart-active");
    $("#" + domId).addClass("btn-chart-active");
  }


  /**
   * Cette méthode construit les données pour la génération du graphe à bandes groupés
   * à partir de la source de données permettant de remplir le tableau.
   */
  private onBuildBarChartsData(){
    this.barChartsDataList = [];
    this.monthsData.forEach((monthItem:any) => {
      if(monthItem.id < 13){
        let obj:any = {"name": monthItem.nom, "series":[]};
        this.donnees.forEach((dataItem:any) => {
           let position:number = dataItem.contenu.findIndex((it:any) => (+it.id) === (+monthItem.id));
           if(position >= 0){
            let objet:any = {"name": dataItem.libelle, "value": dataItem.contenu[position].valeur};
            obj.series.push(objet);
           }
        });
        this.barChartsDataList.push(obj);
      }
    });
  }


  /**
   * Cette méthode construit les données pour la génération ds graphes de lignes et de secteur
   * à partir de la source de données permettant de remplir le tableau.
   */
  private onBuidAreaAndLineChartsData(){
    this.chartsData = [];
    this.donnees.forEach((dataItem:any) => {
      let obj:any = {"name": dataItem.libelle, "series":[]};
      dataItem.contenu.forEach((monthItem:any) => {
        if(monthItem.id < 13){
          let objet:any = {"name": monthItem.nom, "value": monthItem.valeur};
          obj.series.push(objet);
        }
      });
      this.chartsData.push(obj);
    });
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

  onChangePeriode(){
    this.donnees = [];
   // this.onGetCategorieActiviteListItem()
   this.onGetTableau5Option2(this.formPeriode)
  }

  imprime(div:string,name:string){
    this.dimensionService.openCreatePDF(div,name)
}


}


enum Secteur{
  Prive = "Secteur privé",
  publique = "Secteur public",
  Maison = "Gens de maison",
  Assure = "Assurés volontaires",
  Travailleur = "Travailleurs indépendants"
}