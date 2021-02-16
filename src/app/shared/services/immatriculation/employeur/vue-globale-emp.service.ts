import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { Tableau1Service } from './tableau1.service';

@Injectable({
  providedIn: 'root'
})
export class VueGlobaleEmpService {

  constructor(private http:HttpClient, private router:Router, private tableau1Service: Tableau1Service) { }


  queryEmpNI(noannee:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'newI/'+noannee,{headers:rqHeader})
  }

  queryEmpActif(noannee:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'actif/'+noannee,{headers:rqHeader})
  }

  queryEmpReactive(noannee:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'reactive/'+noannee,{headers:rqHeader})
  }

  queryEmpSuspendus(noannee:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'suspendu/'+noannee,{headers:rqHeader})
  }

  queryEmpRadie(noannee:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'radie/'+noannee,{headers:rqHeader})
  }


  // *****************************Nouvelle Immatriculation********************

       //******************* intervalle NI****************************/

  queryIntervalleEmpNI(datedebut:any,datefin:any) : Observable<any>{
  var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
  return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'newIma/'+datedebut+'/'+datefin,{headers:rqHeader})
  }

  //******************* Date Complète NI****************************/

  queryEmpNIDateC(dateC:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'newImDate/'+dateC,{headers:rqHeader})
    }

//*************************************Employeurs Actifs**************************************/


       //******************* intervalle Actif****************************/

queryIntervalleEmpActif(datedebut:any,datefin:any) : Observable<any>{
var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'actifInterv/'+datedebut+'/'+datefin,{headers:rqHeader})
}

      //*******************Actif / date complete****************************/
queryEmpActifDate(dateC:any) : Observable<any>{
  var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
  return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'actifDate/'+dateC,{headers:rqHeader})
  }     

//*************************************Employeurs Reactivé**************************************/

        //******************* intervalle Reactive****************************/
  queryIntervalleEmpReactive(datedebut:any,datefin:any) : Observable<any>{
  var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
  return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'reactiveInterv/'+datedebut+'/'+datefin,{headers:rqHeader})
  }
       //*******************Reactive / date complete****************************/
  queryEmpReactiveDate(dateC:any) : Observable<any>{
  var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
  return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'reactiveDate/'+dateC,{headers:rqHeader})
}

 //*************************************Employeurs Suspendus**************************************/


         //******************* intervalle Suspendus****************************/

  queryIntervalleEmpSuspendus(datedebut:any,datefin:any) : Observable<any>{
  var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
  return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'suspenduInterv/'+datedebut+'/'+datefin,{headers:rqHeader})
}
        //******************* Suspendus / date complete****************************/
 queryEmpSuspendusDateC(dateC:any) : Observable<any>{
  var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
  return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'suspenduDate/'+dateC,{headers:rqHeader})
}




 //*************************************Employeurs Radié**************************************/



        //******************* intervalle Radie****************************/

  queryIntervalleEmpRadie(datedebut:any,datefin:any) : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'radieInterv/'+datedebut+'/'+datefin,{headers:rqHeader})
  }

       //******************* Radie / date complete****************************/
 queryEmpRadieDateC(dateC:any) : Observable<any>{
  var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
  return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'radieDate/'+dateC,{headers:rqHeader})
}
 //*************************************Employeurs Total**************************************/

           //******************* intervalle Employeurs Total****************************/
queryIntervalleTableau4(datedebut:any,datefin:any) : Observable<any>{
  var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
  return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'nbreEmployeurInterv/'+datedebut+'/'+datefin,{headers:rqHeader})
}

          //******************* Employeurs Total / date complete****************************/
 queryTotalEmpDateC(dateC:any) : Observable<any>{
  var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
  return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'nbreEmployeurDate/'+dateC,{headers:rqHeader})
}
  

}
