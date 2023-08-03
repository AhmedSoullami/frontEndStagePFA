import { HttpClient, HttpParams,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  isAuthenticated:boolean=false;
  username:any;
  accessToken!:string

  constructor(private http:HttpClient) { }
  login(email: string, password: string) {
    let options = {
      headers: new HttpHeaders().set("Content-type", "application/json").set("Access-Control-Allow-Origin","http://localhost:4200"
     )
    };

    let params = new HttpParams()
      .set("email", email)
      .set("password", password);
      console.log(params)

    return this.http.post("http://localhost:8081/auth/login", JSON.stringify(params), options);
  }
}
