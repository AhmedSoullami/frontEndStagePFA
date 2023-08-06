import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginServiceService } from './login-service.service';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  userId!: number | null;

  constructor(private httpcategorie: HttpClient, private loginService: LoginServiceService) {
  
  }

  getCategorieByUserId() {
    this.userId = this.loginService.getUserIdFromToken();
    return this.httpcategorie.get(`http://localhost:8081/categorie/categories/${this.userId}`);
  }
  createCategorie(nomCategorie: string) {
   const userId = this.loginService.getUserIdFromToken()
    const data = {
      nomCategorie: nomCategorie,
      userId: userId
   };

    return this.httpcategorie.post("http://localhost:8081/categorie/new", data);
 }
}
