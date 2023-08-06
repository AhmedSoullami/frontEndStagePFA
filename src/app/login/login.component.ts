import { Component,OnInit, Output,EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoginServiceService } from 'src/app/service/login-service.service';

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
  ngOnInit():void{
    this.formLogin=this.fb.group({
      email:this.fb.control(""),
      password: this.fb.control("")
    })
  }
  onLogin(){
    let email=this.formLogin.value.email;
    let password = this.formLogin.value.password;
    this.loginServ.login(email,password).subscribe({
      next:data=>{
           this.loginServ.saveToken(data)
           this.loginServ.getUserIdFromToken()
           this.router.navigateByUrl("/categorie")
      },
      error: err=>{
               console.log(err)
      }
    })
   }
   
}
