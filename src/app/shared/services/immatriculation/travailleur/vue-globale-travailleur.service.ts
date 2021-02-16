import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { Tableau1Service } from '../employeur/tableau1.service';

@Injectable({
  providedIn: 'root'
})
export class VueGlobaleTravailleurService {

  constructor(private http:HttpClient, private router:Router, private tableau1Service: Tableau1Service) { }

  // ****************************************Travailleurs Nouvelle Immatriculation************************************
  //parametre année
  queryTravailleurNewIma(noannee:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'newImaTrv/'+noannee,{headers:rqHeader})
  }
  //parametre intervalle
  queryIntervalleTravailleurNewIma(datedebut:any,datefin:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'newImaTrvInterv/'+datedebut+'/'+datefin,{headers:rqHeader})
    }
  //parametre date complète
  queryTravailleurNewImaDateC(dateC:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'newImDateTrv/'+dateC,{headers:rqHeader})
    }


// ****************************************Travailleur Actif***********************************
  //parametre année
  queryTravailleurActif(noannee:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'TrvActif/'+noannee,{headers:rqHeader})
  }
  //parametre intervalle
  queryIntervalleTravailleurActif(datedebut:any,datefin:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'TrvActifInterv/'+datedebut+'/'+datefin,{headers:rqHeader})
    }
  //parametre date complète
  queryTravailleurActifDateC(dateC:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'TrvActifDate/'+dateC,{headers:rqHeader})
    }

  
// ****************************************Travailleur Retraités***********************************
  //parametre année
  queryTravailleurRetraite(noannee:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'TrvRetraite/'+noannee,{headers:rqHeader})
  }
  //parametre intervalle
  queryIntervalleTravailleurRetraite(datedebut:any,datefin:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'TrvRetraiteInterv/'+datedebut+'/'+datefin,{headers:rqHeader})
    }
  //parametre date complète
  queryTravailleurRetraiteDateC(dateC:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'TrvRetraiteDate/'+dateC,{headers:rqHeader})
    }


    // ****************************************Travailleur Décedés***********************************
    //parametre année
    queryTravailleurDecede(noannee:any) : Observable<any>{
      var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
      return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'TrvDecede/'+noannee,{headers:rqHeader})
    }
    //parametre intervalle
    queryIntervalleTravailleurDecede(datedebut:any,datefin:any) : Observable<any>{
      var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
      return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'TrvDecedeInterv/'+datedebut+'/'+datefin,{headers:rqHeader})
      }
    //parametre date complète
    queryTravailleurDecedeDateC(dateC:any) : Observable<any>{
      var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
      return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'TrvDecedeDate/'+dateC,{headers:rqHeader})
      }


 // ****************************************Travailleur Autres Motif***********************************
    //parametre année
    queryTravailleurAutreMotif(noannee:any) : Observable<any>{
      var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
      return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'TrvAutreMotif/'+noannee,{headers:rqHeader})
    }
    //parametre intervalle
    queryIntervalleTravailleurAutreMotif(datedebut:any,datefin:any) : Observable<any>{
      var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
      return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'TrvAutreMotifInterv/'+datedebut+'/'+datefin,{headers:rqHeader})
      }
    //parametre date complète
    queryTravailleurAutreMotifDateC(dateC:any) : Observable<any>{
      var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
      return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'TrvAutreMotifDate/'+dateC,{headers:rqHeader})
      }



 // ****************************************Nombre Total Travailleur***********************************
    //parametre année
    queryNombreTravailleur(noannee:any) : Observable<any>{
      var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
      return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'nombreTotalTrv/'+noannee,{headers:rqHeader})
    }
    //parametre intervalle
    queryIntervalleNombreTravailleur(datedebut:any,datefin:any) : Observable<any>{
      var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
      return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'nombreTotalTrvInterv/'+datedebut+'/'+datefin,{headers:rqHeader})
      }
    //parametre date complète
    queryNombreTravailleurDateC(dateC:any) : Observable<any>{
      var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
      return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'nombreTotalTrvDate/'+dateC,{headers:rqHeader})
      }

}
