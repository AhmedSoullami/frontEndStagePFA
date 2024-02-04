import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
   
  
  isAuthenticated:boolean=false;
  email:any;
  accessToken!:string
  idUser!:any
  constructor(private http: HttpClient,private router:Router) {}
  login(email: string, password: string) {
    let options = {
      headers: new HttpHeaders()
        .set('Content-type', 'application/json')
        .set('Access-Control-Allow-Origin', 'http://localhost:4200'),
    };
    let data = {
      email: email,
      password: password
    };
  

    return this.http.post("http://localhost:8081/auth/login", data, options);
  }
  logout(){
    this.isAuthenticated=false
    this.accessToken=''
    this.router.navigateByUrl("/login")
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
  getAccessToken(): string | null {
    return this.accessToken;
  }
  getTimeExpiration():number|null{
    const decodedToken: any = jwtDecode(this.accessToken);
    if (decodedToken && decodedToken.exp) {
        const timeTokenExpiration = decodedToken.exp*1000;
        return timeTokenExpiration;
    } 
    else return null
}
getUserInfoFromToken(): any {
  try {
    const decodedToken: any = jwtDecode(this.accessToken);
    return decodedToken;
  } catch (error) {
    console.error('Erreur lors du décodage du token :', error);
    return null;
  }
  
}
changePassword(oldPassword: string, newPassword: string) {
  const data = {
    oldPassword: oldPassword,
    newPassword: newPassword
  };

  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + this.accessToken
  });

  return this.http.post("http://localhost:8081/auth/changePassword", data, { headers });
}


  

  
}
