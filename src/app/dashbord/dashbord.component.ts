import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  donnees:any = [
    {
      "name": "Immatriculations assujettis",
      "value": 50514400
    },
    {
      "name": "Recouvrements cotisations",
      "value": 82450236
    },
    {
      "name": "Prestations sociales",
      "value": 40875236
    },
    {
      "name": "Gestions administratives",
      "value": 62568741
    },
    {
      "name": "Gestions financières",
      "value": 30258963
    },
    {
      "name": "Actions sanitaires",
      "value": 81258963
    }
  ];

  colorScheme :any = {
    domain: ["#0d3562", "#f07531", "#fbe21c", "#444054", "#5AA454", "#e02222"]
  }

  // PIE CHARTS OPTIONS
  ngxPieChartsOptions:any = {
    view: [440, 410],
    gradient: true,
    showLegend: false,
    showLabels: false,
    doughnut: false,
    isDoughnut:true,
    explodeSlices:true,
    legendPosition: "below",
    showDataLabel:true,
    colorScheme :this.colorScheme
  }

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(event:any) {
    console.log(event);
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }


}
