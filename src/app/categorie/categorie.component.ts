import { Component, OnInit, TemplateRef} from '@angular/core';
import { CategorieService } from '../service/categorie.service';
import { LoginServiceService } from '../service/login-service.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorieDataSharingService } from '../service/partage-data.service';
import { MatPaginator ,PageEvent} from '@angular/material/paginator';
import { ViewChild } from '@angular/core';

import Swal from 'sweetalert2'
@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  categorieForm!: FormGroup;
  categories: any;
  categoryExists:boolean=false;
  displayedCategories: any[] = [];
  pageSizeOptions: number[] = [5, 10, 25];
  currentPage = 0;
  pageSize = this.pageSizeOptions[0];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
  constructor(private categorieService: CategorieService,private loginService:LoginServiceService,private formBuilder: FormBuilder,private route: ActivatedRoute
    ,private router: Router,private categorieDataSharingService: CategorieDataSharingService

    ) { }

    ngOnInit() {
      this.categorieForm = this.formBuilder.group({
        nomCategorie: ['', Validators.required],
      });
    
      this.categorieService.getCategorieByUserId().subscribe({
        next: (data) => {
          this.categories = data;
          this.updateDisplayedCategories();
          console.log(this.categories);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
    
    updateDisplayedCategories() {
      const startIndex = this.currentPage * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.displayedCategories = this.categories.slice(startIndex, endIndex);
    }
    
    onPageChange(event: PageEvent) {
      this.currentPage = event.pageIndex;
      this.pageSize = event.pageSize;
      this.updateDisplayedCategories();
    }
    
      
    createCategorie() {
      const nomCategorie = this.categorieForm.value.nomCategorie;
      if (this.categorieForm.invalid) {
        return; 
      }
      this.categoryExists = this.displayedCategories.some(category => category.nomCategorie === nomCategorie);
      if (this.categoryExists) {
        Swal.fire({
          html: `La catégorie <span style="color: green; font-weight: bold;">${nomCategorie}</span> est deja exist`,
          icon: 'success'
        });
      }
      this.categorieService.createCategorie(nomCategorie)
        .subscribe({
          next: data => {
            console.log('Catégorie créée avec succès:', data);
            Swal.fire({
              html: `La catégorie <span style="color: green; font-weight: bold;">${nomCategorie}</span> est bien ajoutée`,
              icon: 'success'
            });
    
            this.displayedCategories.push(data);
            this.categorieForm.reset();
          },
          error: err => {
            console.error('Erreur lors de la création de la catégorie:', err);
          }
        });
    }
      onEdit(id: number) {
        this.categorieDataSharingService.setIdCategorie(id);
        this.router.navigateByUrl("/editCategorie");
      }  
      VoirNotes(id: number){
        this.categorieDataSharingService.setIdCategorie(id);
        console.log("voir notes")
        this.router.navigateByUrl("/note");
      }
      logout() {
        Swal.fire({
          title: 'Déconnexion',
          text: 'Êtes-vous sûr de vouloir vous déconnecter ?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Oui, déconnexion',
          cancelButtonText: 'Annuler'
        }).then((result) => {
          if (result.isConfirmed) {
            this.loginService.logout();
          }
        });
      }
      onSupprimeCategorie(id: number) {
        Swal.fire({
          title: 'Confirmation',
          text: 'Voulez-vous vraiment supprimer cette catégorie ?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Oui, supprimer',
          cancelButtonText: 'Annuler'
        }).then((result) => {
          if (result.isConfirmed) {
            this.categorieService.deleteCategorie(id).subscribe({
              next: () => {
                Swal.fire('Succès', 'Catégorie supprimée avec succès', 'success');
                // Mettre à jour la liste des catégories après suppression
                this.miseAJourCategoriesApresSuppression(id);
              },
              error: (error) => {
                console.error('Erreur lors de la suppression de la catégorie :', error);
              }
            });
          }
        });
      }
      
      private miseAJourCategoriesApresSuppression(idSupprime: number) {
        // Filtrer la liste des catégories pour exclure la catégorie supprimée
        this.categories = this.categories.filter((cat: any) => cat.id !== idSupprime);
        // Mettre à jour les catégories affichées
        this.updateDisplayedCategories();
      }
      
      
  }
  

