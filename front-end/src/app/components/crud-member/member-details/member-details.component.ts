import { Component,Inject } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent {

  constructor(public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {


}

closeDialog(){

  const dialogRef = this.dialog.closeAll();
}

}
