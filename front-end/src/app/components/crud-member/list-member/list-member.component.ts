import { Component } from '@angular/core';
import { AddMemberComponent } from '../add-member/add-member.component';
import { DeleteMemberComponent } from '../delete-member/delete-member.component';
import { PageEvent } from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PersonService } from 'src/app/services/person/person.service';
import { MemberDetailsComponent } from '../member-details/member-details.component';

@Component({
  selector: 'app-list-member',
  templateUrl: './list-member.component.html',
  styleUrls: ['./list-member.component.scss']
})
export class ListMemberComponent {

  pageEvent: PageEvent = new PageEvent;
  displayedColumns: string[] = ['name','surname','birth','seemore','user', 'delete'];
  dataSource:any;


  totalItems:number= 0;
  totalPage:number= 0;
  search:string=""
  carregando = false;


  constructor(public dialog: MatDialog,
             private _router: Router,
             private personService:PersonService) {
              this. getAll();
            }


  addMember() {
    this._router.navigate(['/add-member']);
  }

  seeMore(person:any) {
    const dialogRef = this.dialog.open(MemberDetailsComponent,{
      height: '420px',
      width: '700px',
      disableClose: true,
      data: { person: person }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  modalDelete(name:string,id:string) {
   
    const dialogRef = this.dialog.open(DeleteMemberComponent,{
      height: '220px',
      width: '350px',
      disableClose: true,
      data: { id: id,name:name }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  getAll(){
    this.carregando = true;


      this.personService.getAll(isNaN(this.pageEvent.pageIndex)? 1:this.pageEvent.pageIndex+1,
                                isNaN(this.pageEvent.pageIndex)? 5:this.pageEvent.pageSize,this.search)
      .subscribe((users)=>{
        
      this.dataSource = users.data
      this.totalItems = users.totalItems
      this.totalPage = users.totalPage
      this.carregando = false;

    });
    }


  

    searchByName(){
      this.getAll()
    }

    
}
