import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { CategorieDataSharingService } from './partage-data.service';
import { Note } from '../model/note.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private httpClientNotes:HttpClient,private IdCategorie:CategorieDataSharingService) { }
  afficherListeNotes(id: number | null): Observable<Note[]> {
    return this.httpClientNotes.get<Note[]>(`http://localhost:8081/note/notes/${id}`);
  }
  AjouterNote(cle: string, valeur: string, id: number): Observable<Note> {
    const dataNote = {
      cle: cle,
      valeur: valeur
    };
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    
    return this.httpClientNotes.post<Note>(`http://localhost:8081/note/ajouterNote/${id}`, dataNote, httpOptions);
  }
  
  DeleteNote(idNotes:number):Observable<Note>{
    return this.httpClientNotes.delete<Note>(`http://localhost:8081/note/supprimerNote/${idNotes}`);
  }
  updateNote(id:number,cle:string,valeur:string){
    const url = `http://localhost:8081/note/modifierNote/${id}`;
    const noteData = {
      cle: cle,
      valeur:valeur
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.httpClientNotes.put(url, noteData, httpOptions)
  }
  
}
