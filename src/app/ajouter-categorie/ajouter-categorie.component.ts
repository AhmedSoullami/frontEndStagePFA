import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder,Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { CategorieService } from '../service/categorie.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ajouter-categorie',
  templateUrl: './ajouter-categorie.component.html',
  styleUrls: ['./ajouter-categorie.component.css']
})
export class AjouterCategorieComponent implements OnInit{
  categorieForm!: FormGroup;
  displayedCategories: any[] = [];
  constructor(private formBuilder: FormBuilder,private categorieService:CategorieService,private router:Router){}
  ngOnInit(): void {
    this.categorieForm = this.formBuilder.group({
      nomCategorie: ['', Validators.required],
    });
  
  }
  createCategorie(){
    const nomCategorie = this.categorieForm.value.nomCategorie;
    
    if (this.categorieForm.invalid) {
      return;
    }
  
    this.categorieService.createCategorie(nomCategorie)
      .subscribe({
        next: data => {
          if (data == null) {
            Swal.fire({
              html: `La catégorie <span style="color: green; font-weight: bold;">${nomCategorie}</span> existe déjà`,
              icon: 'warning'
            });
          } else {
            Swal.fire({
              html: `La catégorie <span style="color: green; font-weight: bold;">${nomCategorie}</span> est bien ajoutée`,
              icon: 'success'
            });
            this.displayedCategories.push(data);
            this.categorieForm.reset();
            this.router.navigateByUrl("/categorie")
          }
        },
        error: err => {
          console.error('Erreur lors de la création de la catégorie:', err);
        }
      });

  }
  onAnnule(){
       this.router.navigateByUrl("/categorie")
  }

}
