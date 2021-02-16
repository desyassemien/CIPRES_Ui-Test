import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-admin-side-bar',
  templateUrl: './admin-side-bar.component.html',
  styleUrls: ['./admin-side-bar.component.css']
})
export class AdminSideBarComponent implements OnInit {

  
  @ViewChild(MatCalendar) _datePicker: MatCalendar<Date>

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
  };

  constructor() { }

  ngOnInit(): void {
    this._datePicker.selectedChange.subscribe(x => {
      console.log(x);
    });
  }

}
