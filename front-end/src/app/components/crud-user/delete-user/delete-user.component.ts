import { Component,Inject } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,
              public dialog: MatDialog,
              private toastr:ToastrService,
              private userService:UserService
              ) {


              }




              closeDialog() {
                const dialogRef = this.dialog.closeAll();
              }
            
            
              Delete(id:string) {
                
                this.userService.deleteUser(id)
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
