import { Component, OnInit } from '@angular/core';
import { Tableau1Service } from '../shared/services/immatriculation/employeur/tableau1.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  //static RESOURCE_SERVER_URL= "http://192.168.8.172:8090/";
   static RESOURCE_SERVER_URL= "http://localhost:8090/";
  static AUTHORIZATION_SERVER_URL="http://localhost:9002";

  constructor() { }

  ngOnInit(): void {
   
  }

}
