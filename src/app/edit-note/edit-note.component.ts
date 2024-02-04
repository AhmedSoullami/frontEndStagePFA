import { Component } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
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
  ancienCle!:string;
  ancienneValeur!:string;
  
  notes!:any;
  constructor(private router:Router,private formBuilder:FormBuilder,private partageIdNoteService:PartageIdNoteService,private noteService:NoteService){}
  ngOnInit(): void {
   
    
  
    this.partageIdNoteService.id.subscribe(id => {
      this.id = id;
      console.log(id)
    });
    const idNote=this.partageIdNoteService.getIdNote();
    this.noteService.getNoteById(this.id).subscribe({
      next: (data) => {
       this.notes=data;
       const noteToEdit=this.notes
       if(noteToEdit){
       this.ancienCle = noteToEdit.cle;
       this.ancienneValeur = noteToEdit.valeur;}
      },
      error: (error) => {
        console.error("Erreur lors de la récupération de la note :", error);
      }
    });
    this.NoteForm = this.formBuilder.group({
      cle:[this.ancienCle,Validators.required] ,
      valeur:[this.ancienneValeur,Validators.required],
      newcle:['',Validators.required],
      newvaleur:['',Validators.required]
    });
  
  }

  Modifier() {
   
    const newCle = this.NoteForm.value.newcle;
    const newValeur = this.NoteForm.value.newvaleur;
  
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment enregistrer les modifications ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui, enregistrer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.noteService.updateNote(this.id, newCle, newValeur).subscribe({
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
  
    this.router.navigateByUrl('/note')
}

}
