import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieDataSharingService {
  private idCategorieSource = new BehaviorSubject<number>(0);
  id = this.idCategorieSource.asObservable();

  setIdCategorie(id: number) {
    this.idCategorieSource.next(id);
  }
  getIdCategorie(){
    return this.idCategorieSource.value;
  }
}
