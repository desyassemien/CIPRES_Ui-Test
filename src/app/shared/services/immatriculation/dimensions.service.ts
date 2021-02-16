import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Location} from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { Tableau1Service } from './employeur/tableau1.service';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

declare var $:any;
declare var $:any;

@Injectable({
  providedIn: 'root'
})
export class DimensionsService {


  constructor(private http:HttpClient, 
    private router:Router,
    private location :Location,
    private tableau1Service: Tableau1Service) { }
   

  querybrancheList() : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'brancheList/',{headers:rqHeader})
  }
  queryCategorieList() : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'categorieList/',{headers:rqHeader})
  }
  queryGroupeAgeList() : Observable<any>{
    var rqHeader= new  HttpHeaders(this.tableau1Service.requestHeader)
    return this.http.get(LayoutComponent.RESOURCE_SERVER_URL+'groupeAgeList/',{headers:rqHeader})
  }


  openCreatePDF(div,name){
    var el =document.getElementById(div)
    console.log(-window.scrollY)
    html2canvas(el,{scrollX: 0,scrollY: -window.scrollY}).then(canvas => {
      var imgWidth = 208;   
      var pageHeight = 295; 
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position , imgWidth, imgHeight)
      pdf.save(name);
    });
  }
}
