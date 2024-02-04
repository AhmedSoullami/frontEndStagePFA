import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder ,Validators} from '@angular/forms';
import { CategorieService } from '../service/categorie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CategorieComponent } from '../categorie/categorie.component';
import { CategorieDataSharingService } from '../service/partage-data.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-categorie',
  templateUrl: './edit-categorie.component.html',
  styleUrls: ['./edit-categorie.component.css']
})
export class EditCategorieComponent implements OnInit {
  categorieForm!: FormGroup;
  nouveauNmCategorie!: string;
  id!:number;
  ancienNomCategorie!:string
  categories: any;
  oldCategoryName!:string|null;
  constructor(
    private formBuilder: FormBuilder,
    private categorieService: CategorieService,
    private router:Router,private categorieCom:CategorieComponent,
    private categorieDataSharingService: CategorieDataSharingService
  ) {}

  ngOnInit(): void {
    const categoryId = this.categorieDataSharingService.getIdCategorie();
    this.categorieService.getCategorieByUserId().subscribe({
      next: (data) => {
        this.categories = data;
        const categoryToEdit = this.categories.find((cat: any) => cat.id === categoryId);
        if (categoryToEdit) {
          this.oldCategoryName = categoryToEdit.nomCategorie;
        }
        
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.categorieForm = this.formBuilder.group({
      nomCategorie: [this.oldCategoryName, Validators.required],
      nouveauNmCategorie: ['', Validators.required],
    });
    
    this.categorieDataSharingService.id.subscribe(id => {
      this.id = id;
      console.log(id);
    });
  }
  
  

  annulerModification() {
    this.nouveauNmCategorie='';
    this.router.navigateByUrl('/categorie')
  }
  Enregister() {
    const nouveauNmCategorie = this.categorieForm.value.nouveauNmCategorie;
    if (nouveauNmCategorie === this.oldCategoryName) {
      Swal.fire("le nom du categorie deja existe")
      this.categorieForm = this.formBuilder.group({
      nouveauNmCategorie: ''
      })
      return;
    }
    else if(nouveauNmCategorie ===""){
      Swal.fire("le nom du categorie ne peut pas etre vide")
      return;
    }
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment enregistrer les modifications ?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Oui',
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categorieService.updateCategorie(this.id, nouveauNmCategorie).subscribe({
          next: (data) => {
            console.log(data);
            Swal.fire('Succès', 'Modifications enregistrées avec succès', 'success');
            this.router.navigateByUrl('/categorie');
          },
        });
      }
    });
  }
}
