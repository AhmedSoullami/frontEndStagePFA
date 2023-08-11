import { Injectable, inject } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn } from '@angular/router';
import { LoginServiceService } from '../service/login-service.service';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard{
  constructor( private loginService:LoginServiceService,
    private router:Router){}
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean {
      if (this.loginService.isAuthenticated) {
        return true;
      } else {
        Swal.fire({
          title: 'Accès non autorisé',
          text: 'Vous devez être authentifié pour accéder à cette page.',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        this.router.navigateByUrl('/login');
        return false;
      }
}
}
export const isAuthenticationGuard:CanActivateFn=(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):boolean=>{
 return inject(AuthenticationGuard).canActivate(route,state)
}
