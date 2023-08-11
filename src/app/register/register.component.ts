import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/service/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  formRegister!: FormGroup;

  constructor(private router: Router, private FB: FormBuilder, private registerServ: RegisterService) {}

  ngOnInit() {
    this.formRegister = this.FB.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password2: ['', Validators.required]
    });
  }

  OnLogin() {
    return this.router.navigateByUrl('/login');
  }

  onRegister() {
    if (this.formRegister.valid) {
      const username = this.formRegister.value.username;
      const email = this.formRegister.value.email;
      const password = this.formRegister.value.password;
      const password2 = this.formRegister.value.password2;

      if (password !== password2) {
        Swal.fire('Erreur', 'Les mots de passe ne correspondent pas.', 'error');
        return;
      }

      this.registerServ.register(username, email, password).subscribe({
        next: data => {
          Swal.fire('Bonjour ' + username + ', vous êtes maintenant membre.');
          console.log(data);
        },
        error: err => {
          console.log(err);
        }
      });
    } else {
      Swal.fire('Erreur', 'Veuillez remplir correctement tous les champs.', 'error');
    }
  }
}
