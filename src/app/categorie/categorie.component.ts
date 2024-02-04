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
  nomCategorieColor!:string
  displayedCategories: any[] = [];
  pageSizeOptions: number[] = [3, 6, 9];
  currentPage = 0;
  pageSize = this.pageSizeOptions[0];
  ancienNomCategorie: string | null = null;
  nomCategorieRecherche: string = '';
 
  
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
    

  
    onAjouter(){
      this.router.navigateByUrl("/ajouterCategorie")
    }
  
    
    onEdit(id: number) {
      if (this.categories) {
        const categoryToEdit = this.categories.find((cat: any) => cat.id === id);
        if (categoryToEdit) {
          this.ancienNomCategorie = categoryToEdit.nomCategorie;
          this.categorieDataSharingService.setIdCategorie(id);
          this.router.navigateByUrl("/editCategorie");
        }
      }
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
        this.categories = this.categories.filter((cat: any) => cat.id !== idSupprime);
        this.updateDisplayedCategories();
      }
      Profile(){
           this.router.navigateByUrl('/profile')
      }
      rechercherCategorie() {
        if (this.nomCategorieRecherche) {
          this.categorieService.findCategorie(this.nomCategorieRecherche).subscribe({
            next: (resultats) => {
              if (resultats.length > 0) {
                this.nomCategorieColor="green"
                const categorieRecherchee = resultats[0]; 
                const autresCategories = this.categories.filter((cat: any)  => cat.id !== categorieRecherchee.id); 
                this.categories = [categorieRecherchee, ...autresCategories];
      
                this.updateDisplayedCategories();
                
              } else {
                Swal.fire('Aucun résultat', 'Aucune catégorie trouvée avec ce nom', 'info');
              }
            },
            error: (error) => {
              console.error('Erreur lors de la recherche de la catégorie :', error);
            }
          });
        } else {
          
          Swal.fire('Champ vide', 'Veuillez entrer un nom de catégorie pour rechercher', 'warning');
        }
      }
      
      
      
  }
  

