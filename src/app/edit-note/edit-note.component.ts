import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PartageIdNoteService } from '../service/partage-id-note.service';
import { NoteService } from '../service/note.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent {
  NoteForm!:FormGroup
  id!:number
  constructor(private router:Router,private formBuilder:FormBuilder,private partageIdNoteService:PartageIdNoteService,private noteService:NoteService){}
  ngOnInit(): void {
    this.NoteForm = this.formBuilder.group({
      cle:'' ,
      valeur:''
    });
  
    this.partageIdNoteService.id.subscribe(id => {
      this.id = id;
      console.log(id)
    });
  }

  Modifier() {
    const cle = this.NoteForm.value.cle;
    const valeur = this.NoteForm.value.valeur;
  
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment enregistrer les modifications ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui, enregistrer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.noteService.updateNote(this.id, cle, valeur).subscribe({
          next: (data) => {
            console.log(data)
            Swal.fire('Succès', 'Modifications enregistrées avec succès', 'success');
            this.router.navigateByUrl('/note');
          }
        });
      }
    });
  }
  
annulerModification(){
  
    this.router.navigateByUrl('/categorie')
}

}
