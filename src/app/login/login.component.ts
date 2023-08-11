import { Component,OnInit, Output,EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoginServiceService } from 'src/app/service/login-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
   formLogin!:FormGroup;
   constructor(private fb:FormBuilder,private loginServ:LoginServiceService,private router:Router){}
  
  onSubmit() {
  
  }
  log(a: any){
    console.log(a);
    
    }
    ngOnInit(): void {
      this.formLogin = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
      
    }
  onLogin(){
    if (this.formLogin.valid){
    let email=this.formLogin.value.email;
    let password = this.formLogin.value.password;
    this.loginServ.login(email,password).subscribe({
      next:data=>{
           this.loginServ.saveToken(data)
           this.loginServ.getUserIdFromToken()
           console.log("*******")
           console.log(data)
           this.loginServ.getTimeExpiration()
           this.router.navigateByUrl("/categorie")
      },
      error: err => {
        if (err.status === 401) {
          Swal.fire('Erreur', 'Mot de passe incorrect.', 'error');
        } else {
          console.log(err);
        }
      }
    })

   }else{
    Swal.fire('Erreur', 'Veuillez remplir correctement tous les champs.', 'error');

   }
   
}
}