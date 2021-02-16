import { Component, Input, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { DimensionsService } from 'src/app/shared/services/immatriculation/dimensions.service';
import { ImmaPathService } from 'src/app/shared/services/immatriculation/imma-path.service';
import{Tableau1Service} from '../../../../shared/services/immatriculation/employeur/tableau1.service';
declare var $:any;

@Component({
  selector: 'app-tableau1-employeur',
  templateUrl: './tableau1-employeur.component.html',
  styleUrls: ['./tableau1-employeur.component.css']
})
export class Tableau1EmployeurComponent implements OnInit {
@Input() masquer:boolean=true;
  chartsController:string = "ngx-charts-bar-vertical-2d";
  barChartsDataList:Array<any> = [];
  chartsData:any = [];
  isImprime:boolean=false
  chartsOptions:any = this.tableau1Service.chartsOptions;
  monthsData:any = this.tableau1Service.monthsData;
  totalEmployeurs = [... this.monthsData, {id:13, nom:"TOTAL", valeur:0}];
  subData:any  = [{id:1, libelle:"Moins de 20 salariés"}, {id:2, libelle:"20 salariés et plus"}];
  secteurArrayList: Array<any> = [
    {id:1, libelleSecteur: Secteur.Prive},
    {id:2, libelleSecteur: Secteur.publique},
    {id:3, libelleSecteur: Secteur.Maison},
    {id:4, libelleSecteur: Secteur.Assure},
    {id:5, libelleSecteur: Secteur.Travailleur} 
  ]
  donnees:any = [];

  //
  PeriodeListe =this.tableau1Service.PeriodeListe;                                                    
  formPeriode=2020;
  erreurChargement:boolean = false
  loadingController:string = "LOADING";
  

  constructor(
    private tableau1Service:Tableau1Service,
    private immaPathService :ImmaPathService,
    public dimensionService: DimensionsService,
  ) { }

  ngOnInit(): void {
    this.onGetPart1((+this.formPeriode));
    this.immaPathService.ontActiveLiens();
    // $(".active-menu").removeClass("active-menu");
    // $("#tEmployeur3").addClass("active-menu");
  }

  public onGetPart1(exercice:number){
    this.loadingController = "LOADING";
    this.donnees = [];
    this.tableau1Service.queryTableau1Part1(exercice)
    .subscribe((data:any)=>{
      this.loadingController = "LOADED";
      data.forEach((element:any) => {
        let index:number = this.donnees.findIndex((elt:any)=> elt.libelle.toUpperCase().trim() === element.catLibelle.toUpperCase().trim());
        if(index < 0){
          let obj:any = this.createGlobalObject(element);
          let subObject = this.creerSousObjet(element);
          obj.sousContenue.push(subObject);
          this.donnees.push(obj);
        }else{
          this.updateGlobalObject(index, element);
        }
      });
      this.onGetPart2(exercice);
    },(erreur:any)=>{
      this.erreurChargement =true
      console.log(erreur);
      this.loadingController = "FAIL";
    });
  }



  private createGlobalObject(element:any){
    let obj:any = {
      id:0,
      libelle: element.catLibelle,
      contenu:[
        {id:1, nom:"JANVIER", valeur:0}, {id:2, nom:"FEVRIER", valeur:0}, {id:3, nom:"MARS", valeur:0}, {id:4, nom:"AVRIL", valeur:0},
        {id:5, nom:"MAI", valeur:0}, {id:6, nom:"JUIN", valeur:0}, {id:7, nom:"JUILLET", valeur:0}, {id:8, nom:"AOUT", valeur:0},
        {id:9, nom:"SEMPTEMBRE", valeur:0}, {id:10, nom:"OCTOBRE", valeur:0}, {id:11, nom:"NOVEMBRE", valeur:0}, {id:12, nom:"DECEMBRE", valeur:0}, {id:13, nom:"TOTAL", valeur:0}
     ],
      sousContenue:[]
    };
    let indexCategorie:number = this.secteurArrayList.findIndex((e:any)=>e.libelleSecteur.toUpperCase().trim() === element.catLibelle.toUpperCase().trim());
    if(indexCategorie >= 0){
      obj.id = this.secteurArrayList[indexCategorie].id;
    }
    return obj;
  }

  private updateGlobalObject(index:number, element:any){
         let i:number =  this.donnees[index].sousContenue.findIndex((t:any)=> t.libelle.toUpperCase().trim() === element.taiLibelle.toUpperCase().trim());
         if(i >= 0){
           let ind:number = this.donnees[index].sousContenue[i].contain.findIndex((k:any)=> (+k.id) === (+element.noMois));
           if(ind >= 0){
              this.donnees[index].sousContenue[i].contain[ind].valeur += (+element.nouvelleImmatriculation);
           }
         }else{
            let subObject = this.creerSousObjet(element);
            this.donnees[index].sousContenue.push(subObject);
         }
  }

  private creerSousObjet(element:any){
    let subObject:any = {
      id:0,
      libelle: element.taiLibelle,
      contain: [
        {id:1, nom:"JANVIER", valeur:0}, {id:2, nom:"FEVRIER", valeur:0}, {id:3, nom:"MARS", valeur:0}, {id:4, nom:"AVRIL", valeur:0},
        {id:5, nom:"MAI", valeur:0}, {id:6, nom:"JUIN", valeur:0}, {id:7, nom:"JUILLET", valeur:0}, {id:8, nom:"AOUT", valeur:0},
        {id:9, nom:"SEMPTEMBRE", valeur:0}, {id:10, nom:"OCTOBRE", valeur:0}, {id:11, nom:"NOVEMBRE", valeur:0}, {id:12, nom:"DECEMBRE", valeur:0}, {id:13, nom:"TOTAL", valeur:0}
      ]
    }
    let indexSousCategorie:number = this.subData.findIndex((e:any)=>e.libelle.toUpperCase().trim() === element.taiLibelle.toUpperCase().trim());
    if(indexSousCategorie >= 0){
      subObject.id = this.subData[indexSousCategorie].id
    };
    let position:number = subObject.contain.findIndex((item:any)=> (+item.id) === (+element.noMois));
    if(position >= 0){
      subObject.contain[position].valeur =  (+element.nouvelleImmatriculation);
    }
    return subObject;
  }


  public onGetPart2(exercice:number){
    this.tableau1Service.queryTableau1Part2(exercice)
    .subscribe((data:any)=>{
      data.forEach((element:any) => {
        let index:number = this.donnees.findIndex((elt:any)=> elt.libelle.toUpperCase().trim() === element.catLibelle.toUpperCase().trim());
        if(index < 0){
          let obj:any = this.createGlobalObject(element);
          if(obj.id > 2){
            let position:number = obj.contenu.findIndex((item:any)=> (+item.id) === (+element.noMois));
            if(position >= 0){
              obj.contenu[position].valeur = (+element.nouvelleImmatriculation);
            }
            this.donnees.push(obj);
          }
        }else{
            let position2:number = this.donnees[index].contenu.findIndex((elt:any)=> (+elt.id) === (+element.noMois));
            if(position2 >= 0){
              this.donnees[index].contenu[position2].valeur += (+element.nouvelleImmatriculation);
            }
        }
      });
      this.onBuildBarChartsData();
      this.onBuidAreaAndLineChartsData();
    }, (erreur:any)=>{
      this.erreurChargement =true
      console.log(erreur);
    })
  }

 
  public onChangePeriode(){
    this.erreurChargement =false;
    this.onGetPart1((+this.formPeriode));
  }

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


  
  //telechargé en pdf
  openPDF(){
   
    var el =document.getElementById('tableau1')
    console.log(-window.scrollY)
    html2canvas(el,{scrollX: 0,scrollY: -window.scrollY}).then(canvas => {
      var imgWidth = 208;   
      var pageHeight = 295; 
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position , imgWidth, imgHeight)
      pdf.save('tableau1.pdf');
    });
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
