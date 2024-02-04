import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders, HttpParams} from '@angular/common/http';
import { LoginServiceService } from './login-service.service';
import { Observable,map } from 'rxjs';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  userId!: number | null;
  id!:number
  

  constructor(private httpcategorie: HttpClient, private loginService: LoginServiceService) {
  
  }


  getCategorieByUserId() {
    this.userId = this.loginService.getUserIdFromToken();
    return this.httpcategorie.get<any[]>(`http://localhost:8081/categorie/categories/${this.userId}`);
  }

 

createCategorie(nomCategorie: string): Observable<any> {
  this.userId=this.loginService.getUserIdFromToken()
  const categorieData = {
    nomCategorie: nomCategorie,
    user: this.userId
  };

  return this.httpcategorie.post(`http://localhost:8081/categorie/new/${this.userId}`, categorieData);
}
updateCategorie(id:number|null,nomCategorie:string): Observable<any>{
  const url = `http://localhost:8081/categorie/update/${id}`;
  const categorieData = {
    nomCategorie: nomCategorie,
  };
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  return this.httpcategorie.put(url, categorieData, httpOptions)
}
deleteCategorie(id:number){
return this.httpcategorie.delete(`http://localhost:8081/categorie/deleteCategorie/${id}`)
}
getNombreCategorieUtilisateurConnecte(): Observable<number> {
  return this.getCategorieByUserId().pipe(
    map((categories: any[]) => categories.length as number)
  );
}
findCategorie(nomCategorie: string): Observable<any[]> {
  const params = new HttpParams().set('nomCategorie', nomCategorie);
  
  return this.httpcategorie.get<any[]>('http://localhost:8081/categorie/rechercher', { params });
}


}
