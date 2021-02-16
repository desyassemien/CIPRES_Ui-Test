import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Tableau9Service {

  tableHeaderData:any = [ 
    {"id": 1, "libelle": groupeAgeDesignation.Hommes, "effectif": 0,"plafon":0,"nonPlafon":0},
    {"id": 2, "libelle": groupeAgeDesignation.Hommes, "effectif": 0,"plafon":0,"nonPlafon":0},
    {"id": 3, "libelle": groupeAgeDesignation.Total, "effectif": 0,"plafon":0,"nonPlafon":0},
  ];

  constructor() { }
}
enum groupeAgeDesignation{
  Hommes = "Hommes",
  Femmes = "Femmes",
  Total = "Total",

}