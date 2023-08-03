import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { LoginServiceService } from '../../service/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginServ: LoginServiceService
  ) {}

  onSubmit() {}
  log(a: any) {
    console.log(a);
  }
  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: this.fb.control(''),
      password: this.fb.control(''),
    });
  }
  onLogin() {
    let email = this.formLogin.value.email;
    let password = this.formLogin.value.password;
    console.log(this.formLogin);

    this.loginServ.login(email, password).subscribe({
      next: (data) => {
        let response: any = data;
        console.log(response);
        sessionStorage.setItem(
          'currentUser',
          JSON.stringify({ token: response.accessToken })
        );

        this.router.navigate(['/note']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
