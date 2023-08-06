import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule,Routes} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NoteComponent } from './note/note.component';
import { CategorieComponent } from './categorie/categorie.component';
import { isAuthenticationGuard } from './guards/authentication-guard.guard';
import { AuthenticationGuard } from './guards/authentication-guard.guard';

const routes: Routes = [
{ path: 'register', component: RegisterComponent },
{ path: 'login', component: LoginComponent},
{
path:'',
redirectTo:'/login',
pathMatch:'full'
},
{path: 'note',component:NoteComponent},
{path:'categorie',component:CategorieComponent,canActivate:[isAuthenticationGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NoteComponent,
    CategorieComponent,
    
   
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  

 }






