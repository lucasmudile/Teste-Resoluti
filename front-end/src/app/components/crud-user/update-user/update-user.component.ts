import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { userUpdate } from 'src/app/interfaces/user';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public userSerive:UserService,public dialog: MatDialog,private toastr:ToastrService) {

    this.userName = data.user.userName
    this.email = data.user.email
    this.telephone = data.user.telephone
    this.userId = data.user.id
  }


  userId:string =""
  telephone:string=""
  email:string=""
  userName:string=""




  updateUser(){


    if(this.telephone ==""){
      this.toastr.error("Introduza o Telefone",'Mensagem');
      return;
    }

    if(this.email ==""){
      this.toastr.error("Introduza o email",'Mensagem');
      return;
    }

    if(this.userName ==""){
      this.toastr.error("Introduza o nome do Usuário",'Mensagem');
      return;
    }



    const updateUser :  userUpdate = {
      id:this.userId,
      email:this.email,
      userName:this.userName,
      telephone:this.telephone,
    } 

    this.userSerive.updateUser(updateUser)
                   .subscribe((response)=>{
                    this.toastr.success(response.message, 'Mensagem!');
                    this.desappearAfterAdd();
                   },
                   (error)=>{
                    console.log(error)
                     this.toastr.error(error.error.Message,'Messagem !');
                   });


  }
  


  closeDialog() {
    const dialogRef = this.dialog.closeAll();
  }




    desappearAfterAdd(){
      setTimeout(function(){
        window.location.reload();
     }, 1000);
    }

}
