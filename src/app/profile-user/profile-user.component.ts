import { Component } from '@angular/core';
import { LoginServiceService } from '../service/login-service.service';
import { CategorieService } from '../service/categorie.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent {
  userDetails: any;
  numberOfCategories:number=0;

  constructor(private loginService: LoginServiceService,private categorieService:CategorieService,private router:Router) { }

  ngOnInit(): void {
    const userInfo = this.loginService.getUserInfoFromToken();
    if (userInfo) {
      this.userDetails = userInfo;
      console.log(this.userDetails);
      this.categorieService.getNombreCategorieUtilisateurConnecte().subscribe(
        (nombre) => {
          this.numberOfCategories = nombre;
          console.log(this.numberOfCategories)
          console.log(this.userDetails);
        },
        (error) => {
          console.error('Erreur lors de la récupération du nombre de catégories.', error);
        }
      );
    } else {
      console.error('Erreur');
    }
  }
  Categories(){
    this.router.navigateByUrl('/categorie')

  }
  ModifierPassword(){
    this.router.navigateByUrl('/changerPassword')
  }
}

