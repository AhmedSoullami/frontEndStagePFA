import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpC: HttpClient) { }

  register(username: string, email: string, password: string) {
    let options = {
      headers: new HttpHeaders({
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:4200"
      })
    };

    let data = {
      username: username,
      email: email,
      password: password
    };

    return this.httpC.post("http://localhost:8081/user/register", data, options);
  }
}
  

