import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserService } from 'src/app/services/user/user.service';
import { PageEvent } from "@angular/material/paginator";
import { UpdateUserComponent } from '../update-user/update-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
/*import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';*/

export interface PeriodicElement {
  id: number;
  name: string;
  work: string;
  project: string;
  priority: string;
  badge: string;
  budget: string;
}

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent {

  pageEvent: PageEvent = new PageEvent;

  displayedColumns: string[] = ['id', 'assigned', 'name', 'priority','helo','no'];

  constructor(public dialog: MatDialog,private userService:UserService) {
    this.getAllUsers();
  }


  
  dataSource = [];

  listChurch:any[]=[];
  pageNumber:number= 1;
  pageSize:number= 10;
  totalItems:number= 0;
  totalPage:number= 0;
  search:string=""
  carregando = false;

  openDialog() {
    const dialogRef = this.dialog.open(AddUserComponent,{
      height: '700px',
      width: '800px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  


  modalEdit(user:any) {
    const dialogRef = this.dialog.open(UpdateUserComponent,{
      height: '380px',
      width: '600px',
      disableClose: true,
      data: { user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



  closeDialog() {
    const dialogRef = this.dialog.closeAll();
  }


  getAllUsers(){
    this.carregando = true;
      this.userService.getAll(isNaN(this.pageEvent.pageIndex)? 1:this.pageEvent.pageIndex+1,
                                isNaN(this.pageEvent.pageIndex)? 5:this.pageEvent.pageSize,this.search)
      .subscribe((users)=>{
      this.dataSource = users.data
      this.totalItems = users.totalItems
      this.totalPage = users.totalPage
      this.carregando = false;

    });
    }

    modalDelete(user:string,id:string) {
   
      const dialogRef = this.dialog.open(DeleteUserComponent,{
        height: '220px',
        width: '450px',
        disableClose: true,
        data: { id: id,user:user }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }


  

    searchByName(){
      this.getAllUsers()
    }

  }