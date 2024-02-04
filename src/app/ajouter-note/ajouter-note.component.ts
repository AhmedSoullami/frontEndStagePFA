import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Note } from '../model/note.model';
import { CategorieDataSharingService } from '../service/partage-data.service';
import { Router } from '@angular/router';
import { NoteService } from '../service/note.service';

@Component({
  selector: 'app-ajouter-note',
  templateUrl: './ajouter-note.component.html',
  styleUrls: ['./ajouter-note.component.css']
})
export class AjouterNoteComponent implements OnInit {
  noteForm!: FormGroup;
  id!: number;

  constructor(
    private formBuilder: FormBuilder,
    private categorieDataSharingService: CategorieDataSharingService,
    private router: Router,
    private noteService:NoteService
  ) {}

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      cle: '',
      valeur: ''
    });
    this.categorieDataSharingService.id.subscribe(id => {
      this.id = id;
    });
  }

  createNote() {
    const cle = this.noteForm.value.cle;
    const valeur = this.noteForm.value.valeur;
  
    if (!cle || !valeur) {
      Swal.fire({
        title: 'Champs vides',
        text: 'Les champs clé et valeur ne peuvent pas être vides.',
        icon: 'error'
      });
      return; 
    }
  
    this.noteService.AjouterNote(cle, valeur, this.id).subscribe(
      (response: Note | null) => {
        if (response === null) {
          Swal.fire({
            title: 'Note existe déjà',
            text: `Une note avec le clé: ${cle} et la valeur: ${valeur} existe déjà.`,
            icon: 'warning'
          });
        } else {
          Swal.fire({
            html: `Note avec le clé: <span style="color: red; font-weight: bold;">${cle}</span> et la valeur: <span style="color: red; font-weight: bold;">${valeur}</span> est bien ajoutée`,
            icon: 'success'
          });
          this.router.navigateByUrl('/note');
        }
      },
      error => {
        // Gérer les erreurs liées à la requête
        console.error('Erreur lors de l\'ajout de la note:', error);
      }
    );
  }
  
  

  onAnnule() {
        this.router.navigateByUrl('/note'); 
  }
}
