import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NoteService } from '../service/note.service';
import { CategorieDataSharingService } from '../service/partage-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Note } from '../model/note.model';
import { PartageIdNoteService } from '../service/partage-id-note.service';
import { Router } from '@angular/router';
import { MatPaginator ,PageEvent} from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  notes: Note[] = [];
  id!: number;
  noteForm!: FormGroup;
  idNote!: number;
  oldCle!:string;
  oldValeur!:string;
  cleColor!: string ;
  valeurColor!: string 
  cleRecherche!:string
  displayedNotes: any[] = [];
  pageSizeOptions: number[] = [5, 10, 15];
  currentPage = 0;
  pageSize = this.pageSizeOptions[0];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private noteService: NoteService,
    private categorieDataSharingService: CategorieDataSharingService,
    private formBuilder: FormBuilder,
    private router:Router,
    private partageIdNoteService:PartageIdNoteService
  ) {}

  ngOnInit() {
    this.categorieDataSharingService.id.subscribe(id => {
      this.id = id;
      console.log(id);
    });

    this.noteService.afficherListeNotes(this.id).subscribe({
      next: (data: Note[]) => {
        this.notes = data;
        this.updateDisplayeNotes();
        console.log(data);
      },
      error: (error) => {
        console.error("Erreur lors de la récupération des notes :", error);
      }
    });

    this.noteForm = this.formBuilder.group({
      cle: null,
      valeur: null
    });
  }
  updateDisplayeNotes(){
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedNotes = this.notes.slice(startIndex, endIndex);
  }
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateDisplayeNotes();
  }

  SupprimerNote(id: number) {
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment supprimer cette note ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.noteService.DeleteNote(id).subscribe({
          next: () => {
            Swal.fire('Succès', 'Note supprimée avec succès', 'success');
            this.getMiseAJourListeNotes();
          },
          error: (error) => {
            console.error('Erreur lors de la suppression de la note :', error);
          }
        });
      }
    });
  }
  
  
  getMiseAJourListeNotes() {
    this.noteService.afficherListeNotes(this.id).subscribe({
      next: (data: Note[]) => {
        this.displayedNotes = data;
      },
      error: (error) => {
        console.error("Erreur lors de la récupération des notes après la suppression :", error);
      }
    });
  }
  ModifierNote(id:number){
    if(this.notes){
      const noteToEdit=this.notes.find((cat: any) => cat.id === id);
      if(noteToEdit){
           this.oldCle=noteToEdit.cle;
           this.oldValeur=noteToEdit.valeur;
           this.partageIdNoteService.setIdNoteid(id)
           this.router.navigateByUrl("/editNote");
      }
    }
    
  }
 
  OnAjoute(){
    this.router.navigateByUrl("\ajouterNote")
  }
  OnBackCategories(){
    this.router.navigateByUrl("\categorie")
  }
  rechercherParCle() {
    if (!this.cleRecherche) {
      Swal.fire('Champ vide', 'Veuillez entrer une clé de Note pour rechercher', 'warning');
      return;
    }
  
    this.noteService.rechercheNote(this.cleRecherche).subscribe({
      next: (data: Note[]) => {
        if (data.length > 0) {
          this.cleColor="blue"
          this.valeurColor="blue"
          const noteRecherchee = data[0];
          this.notes = [noteRecherchee, ...this.notes.filter((cat: any) => cat.id !== noteRecherchee.id)];
          this.updateDisplayeNotes();
        } else {
          Swal.fire('Aucun résultat', 'Aucune Note trouvée avec cette clé', 'info');
        }
      },
      error: (error) => {
        console.error('Erreur lors de la recherche de la Note :', error);
      },
    });
  }
  
  
  
}
