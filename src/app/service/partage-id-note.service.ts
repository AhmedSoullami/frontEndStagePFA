import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PartageIdNoteService {
  private ancienneCle: string | null = null;
  private ancienneValeur: string | null = null;
  private idNoteSource = new BehaviorSubject<number>(0);
  id = this.idNoteSource.asObservable();

  setIdNoteid(id: number) {
    this.idNoteSource.next(id);
  }
  getIdNote(){
    return this.idNoteSource.value;
  }
  setAnciennesValeurs(cle: string, valeur: string) {
    this.ancienneCle = cle;
    this.ancienneValeur = valeur;
  }

  getAnciennesValeurs() {
    return { ancienneCle: this.ancienneCle, ancienneValeur: this.ancienneValeur };
  }
}
