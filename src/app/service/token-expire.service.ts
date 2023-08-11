import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TokenExpireService {
  constructor(private http: HttpClient) {}

  checkToken(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get("http://localhost:8081/auth/tokenexpire", {headers});
  }
  
  showTokenExpiredAlert() {
    alert('Le jeton est expiré ou invalide.');
  }
}
