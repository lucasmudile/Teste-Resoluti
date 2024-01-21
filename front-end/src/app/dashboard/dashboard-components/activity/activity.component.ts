import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
})
export class ActivityComponent implements OnInit {

  constructor(
              private route:Router) { 
              }

  ngOnInit(): void {
  }

  carregando=true;
  dataSource:any




 


    goToSeeActivity(){
      this.route.navigateByUrl('/list-activity');
    }
  
  
}
