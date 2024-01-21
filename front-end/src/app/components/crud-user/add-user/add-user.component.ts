import { Component } from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';
import { UserAdd } from 'src/app/interfaces/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {




  telephone:string=""
  email:string=""
  userName:string=""
  password:string=""

  PhotoFilePath:string=""
  PhotoFileName:string=""

  constructor(public dialog: MatDialog, 
              public userSerive:UserService,
              private toastr:ToastrService,
            ) {

  }
  closeDialog() {
    const dialogRef = this.dialog.closeAll();
  }

  saveUser(){


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

    if(this.password == ""){
      this.toastr.error("Introduza a palavra passe",'Mensagem');
      return;
    }

 


    const newUser :  UserAdd = {

      email:this.email,
      userName:this.userName,
      password:this.password,
      telephone:this.telephone,
      image:this.PhotoFileName
    } 



    this.userSerive.addUser(newUser)
                   .subscribe((response)=>{
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

    uploadPhoto(event:any){
      var file=event.target.files[0];
      const formData:FormData=new FormData();
      formData.append('uploadedFile',file,file.name);
  
      this.userSerive.UploadPhoto(formData).subscribe((data:any)=>{
        this.PhotoFileName=data.toString();
        this.PhotoFilePath=this.userSerive.PhotoUrl+this.PhotoFileName;
      },
      (error)=>{
      alert("Erro"+ error)
      console.log(error)
      })
    }

}
