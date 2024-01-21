import { Component } from '@angular/core';
import { Input,Inject } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PersonService } from 'src/app/services/person/person.service';

@Component({
  selector: 'app-delete-member',
  templateUrl: './delete-member.component.html',
  styleUrls: ['./delete-member.component.scss']
})
export class DeleteMemberComponent {

  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,
              public dialog: MatDialog,
              private toastr:ToastrService,
              private personService:PersonService) {

  }

  closeDialog() {
    const dialogRef = this.dialog.closeAll();
  }


  Delete(id:string) {
    
    this.personService.deletePerson(id)
      .subscribe((response) => {
        this.toastr.success(response.message, 'Mensagem!');
        this.desappearAfterAdd();
      },
      (error)=>{
        this.toastr.error(error.error.Message,'Messagem !');
      });
  }


  desappearAfterAdd(){
    setTimeout(function(){
      window.location.reload();
   }, 1000);
  }

}
