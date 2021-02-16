import { Component, OnInit } from '@angular/core';
import { ImmaPathService } from 'src/app/shared/services/immatriculation/imma-path.service';

@Component({
  selector: 'app-tableaux-travailleur',
  templateUrl: './tableaux-travailleur.component.html',
  styleUrls: ['./tableaux-travailleur.component.css']
})
export class TableauxTravailleurComponent implements OnInit {
  masquer:boolean=false;
  constructor(
    private immaPathService: ImmaPathService,
  ) { }

  ngOnInit(): void {
    this.immaPathService.ontActiveLiensTravailleur();
  }

}
