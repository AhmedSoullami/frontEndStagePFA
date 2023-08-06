import { HttpClient, HttpParams,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  
  isAuthenticated:boolean=false;
  email:any;
  accessToken!:string
  idUser!:any

  constructor(private http:HttpClient) { }
  login(email: string, password: string) {
    let options = {
      headers: new HttpHeaders().set("Content-type", "application/json").set("Access-Control-Allow-Origin","http://localhost:4200"
     )
    };

    let data = {
      email: email,
      password: password
    };
  

    return this.http.post("http://localhost:8081/auth/login", data, options);
  }
  saveToken(data: any) {
    this.isAuthenticated=true;
     return this.accessToken=data['accessToken'];
    
  }
  getUserIdFromToken(): number | null {
    try {
      const decodedToken: any = jwtDecode(this.accessToken);
      if (decodedToken && decodedToken.sub) {
        const userId = decodedToken.sub.split(',')[0];
        console.log(userId)
        return userId;
      }
    } catch (error) {
      console.error('erreur decode token:', error);
    }
    return null;
  }
  

  
}
