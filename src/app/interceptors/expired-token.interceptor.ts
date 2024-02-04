import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError} from 'rxjs/operators';
import { LoginServiceService } from '../service/login-service.service';
import Swal from 'sweetalert2';
import { TokenExpireService } from '../service/token-expire.service';
@Injectable()
export class TokenExpireInterceptor implements HttpInterceptor {
  constructor(private tokenExpire: LoginServiceService,private router:Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    if(this.tokenExpire.isAuthenticated==true){
    console.log(this.tokenExpire.getTimeExpiration())
    const accessToken = this.tokenExpire.getAccessToken();
    if (accessToken) {
      console.log(accessToken)
      const tokenExp = this.tokenExpire.getTimeExpiration();
      const currentTime = new Date().getTime();
      
      if (tokenExp !== null && tokenExp < currentTime) {
        console.log("token expire.");
        this.showTokenExpiredAlert();

      }
    }
  }
    console.log("After getTimeExpiration()");
    return next.handle(request);
  }
  
    

  showTokenExpiredAlert() {
    Swal.fire("La durée du jeton a expiré")
    this.router.navigateByUrl("/login")
  }
}
