import { Component } from '@angular/core';
import { LoginServiceService } from '../service/login-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-changer-password',
  templateUrl: './changer-password.component.html',
  styleUrls: ['./changer-password.component.css']
})
export class ChangerPasswordComponent {
  oldPasswordInput!: string;
  newPasswordInput!: string;
  newPasswordInput1!:string
  constructor(private loginService:LoginServiceService,private router:Router){}
  changerMotDePasse() {
    const oldPassword = this.oldPasswordInput;
    const newPassword = this.newPasswordInput;
    const newPassword1 = this.newPasswordInput1;
  
    if (newPassword === newPassword1) {
      this.loginService.changePassword(oldPassword, newPassword).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Mot de passe changé avec succès',
            text: 'Votre mot de passe a été modifié avec succès.',
          });
          this.router.navigateByUrl('/login');
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Le nouveau mot de passe et la confirmation ne correspondent pas.',
      });
    }
  }
  
  Retour(){
    this.router.navigateByUrl('/categorie')
  }
}
