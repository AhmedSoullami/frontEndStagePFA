import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../service/categorie.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  categories: any;
  nomCategorie!: string;
 

  constructor(private categorieService: CategorieService) { }

  ngOnInit() {
    this.categorieService.getCategorieByUserId()
      .subscribe({
        next: data => {
          this.categories = data;
          console.log(this.categories)
        },
        error: err => {
          console.log(err);
        }
      });
  }
  createCategorie() {
    this.categorieService.createCategorie(this.nomCategorie)
      .subscribe({
        next: data => {
          console.log('Catégorie créée avec succès:', data);
          
          this.nomCategorie = '';
        },
        error: error => {
          console.error('Erreur lors de la création de la catégorie:', error);
        }
      });
  }
}
