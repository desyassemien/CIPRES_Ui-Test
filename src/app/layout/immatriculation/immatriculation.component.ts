import { Component, OnInit } from '@angular/core';
import { Tableau1Service } from 'src/app/shared/services/immatriculation/employeur/tableau1.service';

@Component({
  selector: 'app-immatriculation',
  templateUrl: './immatriculation.component.html',
  styleUrls: ['./immatriculation.component.css']
})
export class ImmatriculationComponent implements OnInit {

  constructor( private tableau1Service:Tableau1Service) { }

  ngOnInit(): void {
    this.tableau1Service.updateForm()
  }

}
