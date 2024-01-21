import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  isLogin(){
    return localStorage.getItem('userName')!=null;
  }
}
