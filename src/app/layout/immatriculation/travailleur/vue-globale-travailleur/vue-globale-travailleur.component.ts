import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { NgxChartsVarticalBarConfig } from 'src/app/shared/models/data';
import { VueGlobaleEmpService } from 'src/app/shared/services/immatriculation/employeur/vue-globale-emp.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ImmaPathService } from 'src/app/shared/services/immatriculation/imma-path.service';
import { ThrowStmt } from '@angular/compiler';
import { VueGlobaleTravailleurService } from 'src/app/shared/services/immatriculation/travailleur/vue-globale-travailleur.service';
import { Tableau1Service } from 'src/app/shared/services/immatriculation/employeur/tableau1.service';
//import { runInThisContext } from 'vm';
declare var $:any;

@Component({
  selector: 'app-vue-globale-travailleur',
  templateUrl: './vue-globale-travailleur.component.html',
  styleUrls: ['./vue-globale-travailleur.component.css']
})
export class VueGlobaleTravailleurComponent implements OnInit {
  vueController:string = "PROPORTION";
  afficheGraph:boolean=false;

  //Date
  PeriodeListe =this.tableau1Service.PeriodeListe
  formPeriode:number = this.tableau1Service.formPeriode
  FdateIntervale:any={
    dDebut:"",
    dFin:""
  }
  dDebut:string="";
  dFin:string="";
  intervalleDateCount=0;
  range = new FormGroup({
    debut: new FormControl(),
    fin: new FormControl()
  });
  Fdate=new FormGroup({
    dateC: new FormControl()
  });
  
  //DONNEES
  
dataFormat:any =[
    {
      "name": "Secteur public",
      "value": -1
    },
    {
      "name": "Secteur privé",
      "value": -1
    },
    {
      "name": "Assurés volontaires",
      "value": -1
    },
    {
      "name": "Gens de maison",
      "value": 5896532
    },
    {
      "name": "Travailleurs indépendants",
      "value": 8963250
    }
  ];

  donnees:any = [
    {
      "name": "Nouvelles immatriculations",
      "value": 0
    },
    {
      "name": "Travailleurs actifs",
      "value": 0
    },
    {
      "name": "Travailleurs retraités",
      "value": 0
    },
    {
      "name": "Travailleurs décédés",
      "value": 0
    },
    {
      "name": "Travailleurs autres motif",
      "value": 0
    }
  ];
  // nouvellesImmatriculationData:any= this.dataFormat;
  // employeursActifsData:any =this.dataFormat;
  // employeursReactiveData:any =this.dataFormat;
  // employeursSuspendusData:any =this.dataFormat;
  // employeursRadiesData:any = this.dataFormat;

  nouvellesImmatriculationData:any = [
    {
      "name": "Secteur public",
      "value": 0
    },
    {
      "name": "Secteur privé",
      "value": 0
    },
    {
      "name": "Assurés volontaires",
      "value": 0
    },
    {
      "name": "Gens de maison",
      "value": 0
    },
    {
      "name": "Travailleurs indépendants",
      "value": 0
    }
  ];


  employeursActifsData:any = [
    {
      "name": "Secteur public",
      "value": 0
    },
    {
      "name": "Secteur privé",
      "value": 0
    },
    {
      "name": "Assurés volontaires",
      "value": 0
    },
    {
      "name": "Gens de maison",
      "value": 0
    },
    {
      "name": "Travailleurs indépendants",
      "value": 0
    }
  ];

  employeursReactiveData:any = [
    {
      "name": "Secteur public",
      "value": 0
    },
    {
      "name": "Secteur privé",
      "value": 0
    },
    {
      "name": "Assurés volontaires",
      "value": 0
    },
    {
      "name": "Gens de maison",
      "value": 0
    },
    {
      "name": "Travailleurs indépendants",
      "value": 0
    }
  ];

  employeursSuspendusData:any = [
    {
      "name": "Secteur public",
      "value": 0
    },
    {
      "name": "Secteur privé",
      "value": 0
    },
    {
      "name": "Assurés volontaires",
      "value": 0
    },
    {
      "name": "Gens de maison",
      "value": 0
    },
    {
      "name": "Travailleurs indépendants",
      "value": 0
    }
  ];

  employeursRadiesData:any = [
    {
      "name": "Secteur public",
      "value": 0
    },
    {
      "name": "Secteur privé",
      "value": 0
    },
    {
      "name": "Assurés volontaires",
      "value": 0
    },
    {
      "name": "Gens de maison",
      "value": 0
    },
    {
      "name": "Travailleurs indépendants",
      "value": 0
    }
  ];

 

  
  graphController:string = "ngx-charts-bar-vertical";
  nouvelleImmatriculationgraphController:string = "ngx-charts-pie-chart";
  employeursActifsGraphController:string = "ngx-charts-pie-chart-with-doughnut";
  employeursReactiveGraphController:string = "ngx-charts-tree-map";
  employeursSuspenduGraphController:string = "ngx-charts-pie-chart";
  employeursRadiesGraphController:string = "ngx-charts-pie-chart";

  colorScheme :any = {
    domain: ["#0d3562", "#f07531", "#fbe21c", "#444054", "#5AA454"]
  }

  // CHARTS BAR OPTIONS
  ngxChartsOptions:any = {
    view: [550, 500],
    showXAxis : true,
    showYAxis : true,
    gradient : true,
    showLegend : true,
    showXAxisLabel : true,
    xAxisLabel : "",
    showYAxisLabel : true,
    yAxisLabel : "Nombre travailleurs",
    legendPosition: "right",
    roundDomains:true,
    showDataLabel:false,
    colorScheme : this.colorScheme
  }
  // PIE CHARTS OPTIONS
  ngxPieChartsOptions:any = {
    view: [550, 400],
    gradient: true,
    showLegend: true,
    showLabels: true,
    doughnut: false,
    isDoughnut:true,
    explodeSlices:true,
    legendPosition: "below",
    colorScheme :this.colorScheme
  }
  //TREE MAP OPTIONS
  treeMapOptions:any = {
    view: [550, 400],
    gradient: true,
    animations: true,
    colorScheme :this.colorScheme
  }

  constructor(
    private vueGlobaleEmpService: VueGlobaleEmpService,
    private vueGlobaleTravailleurService: VueGlobaleTravailleurService,
    private tableau1Service: Tableau1Service,
    private immaPathService: ImmaPathService,
    
    ) {
    // $(".active-menu").removeClass("active-menu");
    // $(".tEmployeur1").addClass("active-menu");
  }

  ngOnInit(): void {
    this.afficheGraph= true;
    this.getTravailleurNiAnnee(this.formPeriode)
    registerLocaleData(es);
    this.immaPathService.ontActiveLiensTravailleur();

    // $(".active-menu").removeClass("active-menu");
    // $(".tEmployeur1").addClass("active-menu");
  }
  /**************************Nos Implementation **************************** */

    private getCategorieIndex(data:Array<any>,element:any):number{
      return data.findIndex((e:any)=>e.name.toUpperCase().trim() == element.catLibelle.toUpperCase().trim());


    }

  /*
  *Get employeurs actifs par année 
  * par jour précis 
  * par  intervalle
  */
  getTravailleurNiAnnee(periode:number){  
     this.vueGlobaleTravailleurService.queryTravailleurNewIma(periode).subscribe(
    data=>{
      this.getTravailleurNIData(data)
      this.getEmpActifsAnnee(periode) 
    },
    err=>{
        console.log(err.error) 
    }    
)

  }  

  getTravailleurNiIntervalle(datedebut:string,datefin:string){
    this.afficheGraph=false;
    this.vueGlobaleTravailleurService.queryIntervalleTravailleurNewIma(datedebut,datefin).subscribe(
      data=>{
        console.log(data)
        this.getTravailleurNIData(data)
      this.getTravailleurctifsIntervalle(datedebut,datefin) 
      },
      err=>{
          console.log(err.error) 
      }    
  )
  }

  getTravailleurNiDaC(dateC:string){
    this.vueGlobaleTravailleurService.queryTravailleurNewImaDateC(dateC).subscribe(
      data=>{
        this.getTravailleurNIData(data)
        this.getTravailleurActifsDateC(dateC) 
      },
      err=>{
          console.log(err.error) 
      }    
   )
  }

  /*
  *Get employeurs actifs par année 
  * par jour précis 
  * par  intervalle
  */
  getEmpActifsAnnee(periode:number){
    this.vueGlobaleTravailleurService.queryTravailleurActif(periode).subscribe(
      data=>{
        this.getTravailleurActifsData(data)
        this.getTravailleurRetraiteAnnee(periode)  
      },
      err=>{
          console.log(err.error) 
      }    
  )

  } 

  getTravailleurctifsIntervalle(datedebut:string,datefin:string){
    this.vueGlobaleTravailleurService.queryIntervalleTravailleurActif(datedebut,datefin).subscribe(
      data=>{
        this.getTravailleurActifsData(data);
        this.getTravailleurRetraiteIntervalle(datedebut,datefin)
      },
      err=>{
          console.log(err.error) 
      }    
  )
  }

  getTravailleurActifsDateC(dateC:string){
    this.vueGlobaleTravailleurService.queryTravailleurActifDateC(dateC).subscribe(
      data=>{
        this.getTravailleurActifsData(data);
        this.getTravailleurRetraiteDateC(dateC)
      },
      err=>{
          console.log(err.error) 
      }    
  )
  }
  /*
  *Get employeurs réactivés par année 
  * par jour précis 
  * par intervalle
  */
  getTravailleurRetraiteAnnee(periode:number){
    this.vueGlobaleTravailleurService.queryTravailleurRetraite(periode).subscribe(
      data=>{
       
        this.getTravailleurRetraiteData(data)
        this.getTravailleurDecedeAnnee(periode)  
      },
      err=>{
          console.log(err.error) 
      }    
  )

  } 

  getTravailleurRetraiteIntervalle(datedebut:string,datefin:string){
    this.vueGlobaleTravailleurService.queryIntervalleTravailleurRetraite(datedebut,datefin).subscribe(
      data=>{
        this.getTravailleurRetraiteData(data);
        this.getTravailleurDecedeIntervalle(datedebut,datefin)
      },
      err=>{
          console.log(err.error) 
      }    
  )
  }

  getTravailleurRetraiteDateC(dateC:string){
    this.vueGlobaleTravailleurService.queryTravailleurRetraiteDateC(dateC).subscribe(
      data=>{
        this.getTravailleurRetraiteData(data);
        this.getTravailleurDecedeDateC(dateC)
      },
      err=>{
          console.log(err.error) 
      }    
  )
  }

  /*
  *Get employeurs suspendupar par année 
  * par jour précis 
  * par  intervalle
  */
    getTravailleurDecedeAnnee(periode:number){
      this.vueGlobaleTravailleurService.queryTravailleurDecede(periode).subscribe(
        data=>{
          this.getTravailleurDecedeData(data)
          this.getTravailleurAutreMotifAnnee(periode)  
        },
        err=>{
            console.log(err.error) 
        }    
    )

    }

    getTravailleurDecedeIntervalle(datedebut:string,datefin:string){
      this.vueGlobaleTravailleurService.queryIntervalleTravailleurDecede(datedebut,datefin).subscribe(
        data=>{
          this.getTravailleurDecedeData(data)
          this.getTravailleurAutreMotifIntervalle(datedebut,datefin)  
        },
        err=>{
            console.log(err.error) 
        }    
    )
    }

    getTravailleurDecedeDateC(dateC:string){
      this.vueGlobaleTravailleurService.queryTravailleurDecedeDateC(dateC).subscribe(
        data=>{
          this.getTravailleurDecedeData(data)
          this.getTravailleurAutreMotifDateC(dateC)  
        },
        err=>{
            console.log(err.error) 
        }    
    )

    }

  /*
  *Get employeurs radié  par année 
  * par jour précis 
  * par  intervalle
  */
    getTravailleurAutreMotifAnnee(periode:number){
      this.vueGlobaleTravailleurService.queryTravailleurAutreMotif(periode).subscribe(
        data=>{
          console.log(data)
         this.getTravailleurAutreMotifData(data)
          this.afficheGraph=true;  
        },
        err=>{
            console.log(err.error) 
        }    
    )
    }

    getTravailleurAutreMotifIntervalle(datedebut:string,datefin:string)  {
      this.vueGlobaleTravailleurService.queryIntervalleTravailleurAutreMotif(datedebut,datefin).subscribe(
        data=>{
          this.getTravailleurAutreMotifData(data)
          this.afficheGraph=true;
        },
        err=>{
            console.log(err.error) 
        }    
    )
    }
    
   getTravailleurAutreMotifDateC(dateC:string){
      this.vueGlobaleTravailleurService.queryTravailleurAutreMotifDateC(dateC).subscribe(
        data=>{
          this.getTravailleurAutreMotifData(data)
          this.afficheGraph=true;
        },
        err=>{
            console.log(err.error) 
        }    
    )

    }

 
    /***
     *  Charge les données employeur immatriculé 
     * dans le tableau correspondant 
     */
    getEmpNIData(data:any){}
    private getTravailleurNIData(data:any){
      data.forEach((element:any) => {
        let indexCategorie:number = this.getCategorieIndex(this.nouvellesImmatriculationData,element)
        if(indexCategorie>=0){
          this.nouvellesImmatriculationData[indexCategorie].value=(+element.nouvelleImmatriculation)
        }else{
          console.log("Attention!! "+element.catLibelle+" n'est pas refférencé")
        }
      });
      this.nouvellesImmatriculationData=[...this.nouvellesImmatriculationData]
      this.donnees[0].value = this.onCalculeTotal(this.nouvellesImmatriculationData)  
    }

    /***
     *  Charge les données employeur actifs 
     * dans le tableau correspondant 
     */
    
    private getTravailleurActifsData(data:any){
      console.log(data)
      data.forEach((element:any) => {
        let indexCategorie:number = this.getCategorieIndex(this.employeursActifsData,element)
        if(indexCategorie>=0){
          this.employeursActifsData[indexCategorie].value=(+element.nombreTravailleurActif)
        }else{
          console.log("Attention!! "+element.catLibelle+" n'est pas refférencé")
        }
      });
      this.employeursActifsData=[...this.employeursActifsData]
      this.donnees[1].value = this.onCalculeTotal(this.employeursActifsData)  
    }

    /***
     *  Charge les données employeur reactivé 
     * dans le tableau correspondant 
     */
    private getTravailleurRetraiteData(data:any){
      data.forEach((element:any) => {
        let indexCategorie:number = this.getCategorieIndex(this.employeursReactiveData,element)
        if(indexCategorie>=0){
          this.employeursReactiveData[indexCategorie].value=(+element.nombreTravailleurRetraite)
        }else{
          console.log("Attention!! "+element.catLibelle+" n'est pas refférencé")
        }
      });
      this.employeursReactiveData=[...this.employeursReactiveData]  
      this.donnees[2].value = this.onCalculeTotal(this.employeursReactiveData) 
    }
     /***
     *  Charge les données employeur suspendu 
     * dans le tableau correspondant 
     */
   
    private getTravailleurDecedeData(data:any){
      data.forEach((element:any) => {
        let indexCategorie:number = this.getCategorieIndex(this.employeursSuspendusData,element);
        if(indexCategorie>=0){
          this.employeursSuspendusData[indexCategorie].value=(+element.nombreTravailleurDecede)
        }else{
          console.log("Attention!! "+element.catLibelle+" n'est pas refférencé")
        }
      });  
      this.employeursSuspendusData=[...this.employeursSuspendusData]
      this.donnees[3].value = this.onCalculeTotal(this.employeursSuspendusData) 
    }

    /***
     *  Charge les données employeur Radie 
     * dans le tableau correspondant 
     */
  
    private getTravailleurAutreMotifData(data:any){
      data.forEach((element:any) => {
        let indexCategorie:number =  this.getCategorieIndex(this.employeursRadiesData,element);
        if(indexCategorie>=0){
          this.employeursRadiesData[indexCategorie].value=(+element.nombreTravailleurAutreMotif)
        }else{
          console.log("Attention!! "+element.catLibelle+" n'est pas refférencé")
        }
      });
      this.employeursRadiesData=[...this.employeursRadiesData]
      this.donnees[4].value = this.onCalculeTotal(this.employeursRadiesData) 
      this.donnees=[...this.donnees]
    }

    

     /*
      *charge les données l'orsqu'on selecltion un intervalle de temps
      * intervalleDateCount == 2 lorsque la datedebut et la datefin 
      * sont renseigné dans le formulaire intervalle temps
      * 
      */
      onSubmitInteralleTemp(event: MatDatepickerInputEvent<Date>) {
        this.intervalleDateCount++
        if(this.intervalleDateCount==2){
          this.intervalleDateCount=0;
          this.Fdate.reset();
        if(this.range.value.fin){
          console.log("ici")
          this.formatDateIntervalle(this.range)
          this.getTravailleurNiIntervalle(this.dDebut,this.dFin)
        }
        }

       
      }

     /*
      *charge les donnée l'orsqu'on selecltion une 
      * date présice
      */
     onSubmitDateC(event: MatDatepickerInputEvent<Date>) {
       this.range.reset();
       this.afficheGraph=false;
       this.formatDateIntervalle(this.range)
       var dateComplete:string=this.Fdate.value.dateC._i.year?this.formatDate(this.Fdate.value.dateC._i.year,Number(this.Fdate.value.dateC._i.month+1),this.Fdate.value.dateC._i.date):this.Fdate.value.dateC._i;
       this.getTravailleurNiDaC(dateComplete);
     }

    /*
      *charge les donnée l'orsqu'on selecltion une 
      * année
    */
     onSubmitPeriode(){
      this.afficheGraph= false
      this.intialiSeIntervalleDate(this.formPeriode)
       this.getTravailleurNiAnnee(this.formPeriode)
    }

    /*
    *Recuperer intervalle de temps
    *
    */
    intialiSeIntervalleDate(periode:any){
      var ann=this.formPeriode;
      var ann2=this.formPeriode;
      this.range.setValue({
        debut:ann+'-01-01',
        fin:ann+'-12-31',
      })
    }
  
  
    /*
    *renvoie les données du formulaire intervalle de date sous forme
    *  date.value ={debut:"2010-01-01", fin:"2010-01-31"}
    */
    formatDateIntervalle(date:any){
      console.log(date.value)
      if(date.value.debut && date.value.fin){
        this.dDebut =date.value.debut._i.year?this.formatDate(date.value.debut._i.year,Number(date.value.debut._i.month+1),date.value.debut._i.date):date.value.debut._i
        this.dFin =date.value.fin._i.year?this.formatDate(date.value.fin._i.year,Number(date.value.fin._i.month+1),this.range.value.fin._i.date):this.range.value.fin._i
      }
      

        // date.value.debut =date.value.debut._i.year?this.FormtRangeDate(date.value.debut._i.year,Number(date.value.debut._i.month+1),date.value.debut._i.date):date.value.debut._i
        // date.value.fin =date.value.fin._i.year?this.FormtRangeDate(date.value.fin._i.year,Number(date.value.fin._i.month+1),this.range.value.fin._i.date):this.range.value.fin._i
        // this.dDebut=date.value.debut;
        // this.dFin = date.value.fin;

 
    }
    
    /*
    * renvoie(2010,1,1) sous form "2010-01-01"
    * 
    */
     formatDate(year:any,month:any,day:any):string{
      let m = month<10?"0"+month:month
      let d= day<10?"0"+day:day
       return year+"-"+m+"-"+d 
      }


  
  /****************************Fin  Nos Implementation ********************************/

  /*
  * Calcule le total des tableaux
  *
  */
  public onCalculeTotal(dataArrayList:Array<any>):number{
    let total:number = 0;
    dataArrayList.forEach(item => {
      total += (+item.value);
    });
    return total;
  }

  /*
   * Calcule les pourcentages
   */
  public onCalculePourcentage(data:number, dataArrayList:Array<any>):number{
    let pourcentage:number = 0;
    if(this.onCalculeTotal(dataArrayList)!=0){
      pourcentage = (data*100) / this.onCalculeTotal(dataArrayList);
    }
    return +pourcentage.toFixed(2);
  }

  /*
  *Permet de changer les type de graphe affiché
  *
  */
  public onSelectionneTypeGraphe(typeGraphe:string, domId:any, indicateur:string){
    switch(indicateur){
      case "GLOBAL":
        this.graphController = typeGraphe;
        $(".btn-chart-active").removeClass("btn-chart-active");
        $("#" + domId).addClass("btn-chart-active");
        break;

      case "IMMATRICULATION" : 
        this.nouvelleImmatriculationgraphController = typeGraphe;
        $(".btn-chart-active-immat").removeClass("btn-chart-active-immat");
        $("#" + domId).addClass("btn-chart-active-immat");
        break;

      case "ACTIF" : 
        this.employeursActifsGraphController = typeGraphe;
        $(".btn-chart-active-actif").removeClass("btn-chart-active-actif");
        $("#" + domId).addClass("btn-chart-active-actif");
        break;

      case "REACTIVE" : 
        this.employeursReactiveGraphController = typeGraphe;
        $(".btn-chart-active-reactive").removeClass("btn-chart-active-reactive");
        $("#" + domId).addClass("btn-chart-active-reactive");
        break;

      case "SUSPENDU" : 
        this.employeursSuspenduGraphController = typeGraphe;
        $(".btn-chart-active-suspendu").removeClass("btn-chart-active-suspendu");
        $("#" + domId).addClass("btn-chart-active-suspendu");
        break;

      case "RADIE" : 
        this.employeursRadiesGraphController = typeGraphe;
        $(".btn-chart-active-radie").removeClass("btn-chart-active-radie");
        $("#" + domId).addClass("btn-chart-active-radie");
        break;

      default:
        //
        break;
    }
  }
  onSelect(event:any,data:Array<any>=[]) {
    console.log(event);
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
/*********************************************************** Test
 * click legend show/hide data test
 */

onSelectTest(event:any,data:Array<any>=[]) {
  console.log(event);
  
  if(this.isLegend(event)){
    if (this.isDataShown(event,data)) {
      alert("1")
      const tempData = JSON.parse(JSON.stringify(data));
      tempData.forEach((elt:any) => {
          if (elt.name === event) {
            elt.value = 0;
          }
      });
      alert("3")
      console.log(tempData)
      this.donnees=[...tempData]
    }else {
     data.forEach(elt => {         
           if (elt.name === event && elt.value !== 0){ 
            this.setChartDataBackToInitData(data, elt.name, elt.value)
           }
      });
    }      
   
  }
 
}
  isLegend = (event:any) => typeof event === 'string';


  isDataShown = (event:any,data:Array<any>) => {
    const selectedBar = data.find(model => {
        return model.name === event && model.value !== 0;
    });
    
    return typeof selectedBar !== 'undefined';
  }
  setChartDataBackToInitData = (data:Array<any>, yearName:any, yearDefValue:number) => {
    const tempData = JSON.parse(JSON.stringify(data));
    tempData.find((elt:any) => elt.name === yearName).value = yearDefValue;
    data = tempData;
    console.log(data)

  }

  isLegend2 (event:any):any{
    return typeof event;
  }  
}
/**************************************************** */
enum NgxChartsType{
  VerticalBar = "ngx-charts-bar-vertical",
  HorizontalBar = "ngx-charts-bar-horizontal"
}
