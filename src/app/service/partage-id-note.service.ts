import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PartageIdNoteService {

  private idNoteSource = new BehaviorSubject<number>(0);
  id = this.idNoteSource.asObservable();

  setIdNoteid(id: number) {
    this.idNoteSource.next(id);
  }
  getIdNote(){
    return this.idNoteSource.value;
  }
}
