import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError} from 'rxjs/operators';
import { LoginServiceService } from '../service/login-service.service';
import Swal from 'sweetalert2';

@Injectable()
export class TokenExpireInterceptor implements HttpInterceptor {
  constructor(private tokenExpire: LoginServiceService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Intercepting request...");
    
    return next.handle(request).pipe(
      catchError(error => {
        console.error("An error occurred:", error);
        const tokenExp = this.tokenExpire.getTimeExpiration();
        const currentTime = new Date().getTime();
        
        if (tokenExp !== null && tokenExp < currentTime) {
          console.log("Token has expired.");
          this.showTokenExpiredAlert();
        }
        
        throw error;
      })
    );
  }

  
  isTokenExpiredError(): boolean {
    const tokenExp = this.tokenExpire.getTimeExpiration();
    if (tokenExp !== undefined && tokenExp !== null) { 
        const currentTime = new Date().getTime(); 
        if (tokenExp < currentTime) {
            return true;
        } else {
            return false;
        }
    } else {
        return false; 
    }
}


  

  showTokenExpiredAlert() {
    Swal.fire("duree expire")
  }
}
