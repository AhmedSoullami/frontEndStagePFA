import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule} from '@angular/material/paginator'
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NoteComponent } from './note/note.component';
import { CategorieComponent } from './categorie/categorie.component';
import { isAuthenticationGuard } from './guards/authentication-guard.guard';
import { AuthenticationGuard } from './guards/authentication-guard.guard';
import { EditCategorieComponent } from './edit-categorie/edit-categorie.component';
import { EditNoteComponent } from './edit-note/edit-note.component';
import { TokenExpireInterceptor } from './interceptors/expired-token.interceptor';
import { LoginServiceService } from './service/login-service.service';

import { TokenExpireService } from './service/token-expire.service';
import { AjouterNoteComponent } from './ajouter-note/ajouter-note.component';
import { AjouterCategorieComponent } from './ajouter-categorie/ajouter-categorie.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { ChangerPasswordComponent } from './changer-password/changer-password.component';

const routes: Routes = [
{ path: 'register', component: RegisterComponent },
{ path: 'login', component: LoginComponent},
{
path:'',
redirectTo:'/login',
pathMatch:'full'
},

{path:'categorie',component:CategorieComponent,canActivate:[isAuthenticationGuard]},
{path:'editCategorie',component:EditCategorieComponent,canActivate:[isAuthenticationGuard]},
{path: 'note',component:NoteComponent,canActivate:[isAuthenticationGuard]},
{path:'editNote',component:EditNoteComponent,canActivate:[isAuthenticationGuard]},
{path:'ajouterNote',component:AjouterNoteComponent,canActivate:[isAuthenticationGuard]},
{path:'ajouterCategorie',component:AjouterCategorieComponent,canActivate:[isAuthenticationGuard]},
{path:'profile',component:ProfileUserComponent,canActivate:[isAuthenticationGuard]},
{path:'changerPassword',component:ChangerPasswordComponent,canActivate:[isAuthenticationGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NoteComponent,
    CategorieComponent,
    EditCategorieComponent,
    EditNoteComponent,
    AjouterNoteComponent,
    AjouterCategorieComponent,
    ProfileUserComponent,
    ChangerPasswordComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    MatButtonModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    BrowserAnimationsModule
  ],

  providers: [AuthenticationGuard,CategorieComponent,NoteComponent,LoginServiceService,TokenExpireService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenExpireInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]

 
})
export class AppModule {}
