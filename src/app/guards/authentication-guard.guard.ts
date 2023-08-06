import { Injectable, inject } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from '@angular/router';
import { LoginServiceService } from '../service/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard{
  constructor( private loginService:LoginServiceService,
    private router:Router){}
  canActivate(
    route:ActivatedRouteSnapshot,
    state:RouterStateSnapshot,
   
  ):boolean{
    if(this.loginService.isAuthenticated==true){
      
      return true;
    }
    else 
    alert("tu dois authentifier")
    this.router.navigateByUrl('/login');
    return false;
  }
}
export const isAuthenticationGuard:CanActivateFn=(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean=>{
 return inject(AuthenticationGuard).canActivate(route,state)
}