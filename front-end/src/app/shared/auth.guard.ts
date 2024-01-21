import { ActivatedRouteSnapshot, CanActivate,CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService: AuthenticationService = inject(AuthenticationService);
  const toastr: ToastrService = inject(ToastrService);
  const router: Router = inject(Router);

 
  if(authService.isLogin()){
    return true;
  }else{
    router.navigate(['/login']);
    toastr.error("Não tens acesso",'Messagem !');
    return false;
  }

};