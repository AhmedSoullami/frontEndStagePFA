import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister!:FormGroup
  constructor(private router : Router,private FB:FormBuilder,private registerServ:RegisterService){
    
  }
  ngOnInit() {
    this.formRegister=this.FB.group({
      username:this.FB.control(""),
      email:this.FB.control(""),
      password:this.FB.control(""),
      password2:this.FB.control("")
    })
  }
  log(a: any){
  console.log(a);
  
  }
  OnLogin(){
    return this.router.navigateByUrl('/login');
  }
  
  onRegister(){
    let username=this.formRegister.value.username
    let email=this.formRegister.value.email
    let passowrd=this.formRegister.value.password
    this.registerServ.register(username,email,passowrd).subscribe({
      next:data=>{
        console.log(data)
   },
      error: err=>{
            console.log(err)
   }
    });
    console.log(this.formRegister.value)


  }
  
 
}
