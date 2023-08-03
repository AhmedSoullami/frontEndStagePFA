import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpC:HttpClient) { }
  register(username:string,email:string,passowrd:string){
    let options = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:4200"
      })
    };

    let params = new HttpParams()
      .set("username",username)
      .set("email", email)
      .set("password",passowrd)
    console.log(params)
    return this.httpC.post("http://localhost:8081/user/register", JSON.stringify(params), options);
  }
  }

