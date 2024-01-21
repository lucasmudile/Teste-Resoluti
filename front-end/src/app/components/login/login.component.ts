import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { Login } from 'src/app/interfaces/Login';
import { LoginResponse } from 'src/app/interfaces/LoginResponse';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _router: Router, private loginService: LoginService, private formBuilder: FormBuilder, private toastr: ToastrService) {
    localStorage.clear();
  }

  checked = true;
  email: string = '';
  password: string = '';
  
  ngOnInit(): void {

  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }


  registerForm = this.formBuilder.group({

    password: this.formBuilder.control('', Validators.required),
    userName: this.formBuilder.control('', Validators.required)

  });



  onSubmit() {

    const login: Login = {
      password: this.password,
      email: this.email
    };

    this.loginService.Login(login)
      .subscribe((response) => {

        
        if (response.succeeded) {
          this.toastr.success('Login efecutado com sucesso!','Messagem !');
          localStorage.setItem('id', response.data.id);
          localStorage.setItem('userName', response.data.userName);
          localStorage.setItem('email', response.data.email);
          localStorage.setItem('token', response.data.token);
          

          this._router.navigate(['/home']);
          setTimeout(function(){
            window.location.reload();
         }, 1000);
        }
        
        if(response.data==null){
          this.toastr.error(response.message,'Messagem !');
        } 
      },
      (error)=>{
        this.toastr.error(error.error.Message,'Messagem !');
      }
      
      );








  }

}
