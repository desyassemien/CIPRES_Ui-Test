import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { UserService } from 'src/app/shared/services/user.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

export class auditUser {
  user: string;
  actions: string;
  status: string;
  date: string;
  heure: string;
}

@Component({
  selector: 'app-audit-user',
  templateUrl: './audit-user.component.html',
  styleUrls: ['./audit-user.component.css']
})
export class AuditUserComponent implements OnInit,AfterViewInit {
  isLoggedIn = false;
  userAll:Array<auditUser>=[];
 

   displayedColumns: string[] = ['Utilisateurs', 'Actions', 'Status', 'Date','Heure'];
   
   
   dataSource = new MatTableDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor( private auditService: AuthService,private userService:UserService,private tokenStorage:TokenStorageService) { }

  
  ngOnInit(): void {
   console.log(this.dataSource)
    this.auditHis();
}

ngAfterViewInit(){
  this.dataSource.paginator = this.paginator;
}

auditHis(){
  this.userService.auditList().subscribe(
    data=>{
      console.log(data)
      //this.userAll=data;
      data.forEach(element => {
       let users:auditUser = new auditUser();
 
        users.user=element.user ? element.user.username:'inconnu';
        users.actions=element.action;
        users.status=element.statut;
        users.date=element.actionDate.substring(0,10);
        users.heure=element.actionDate.substring(11,16)
        this.userAll.push(users);
      });
      this.dataSource.data=this.userAll;
      console.log(this.userAll)
    },
    err=>{
      console.log(err.error.message);
      
    }
  )
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


}
