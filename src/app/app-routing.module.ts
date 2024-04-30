import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'; // Add this
import { CoursesComponent } from './components/Course Context/courses/courses.component';
import  LogInComponent  from './components/Login Context/log-in/log-in.component'; // Add this
import  SignUpComponent  from './components/SignUp Context/sign-up/sign-up.component'; // Add this
import { ArticlesComponent } from './components/Educational Content Context/articles/articles.component';
import { ComunnityComponent } from './components/Community Context/comunnity/comunnity.component';
import { PaymentComponent } from './components/Shared/payment/payment.component';
import { CreatepostComponent } from './components/CreatePost/createpost/createpost.component';

import { authGuard } from './core/guards/auth.guard';
import { ProfileComponent } from './components/Shared/profile/profile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'courses', component: CoursesComponent },
  { path: 'login', component: LogInComponent }, 
  { path: 'signup', component: SignUpComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'comunnity', component: ComunnityComponent },
  { path: 'createpost', component: CreatepostComponent },
  { path: 'payment', component: PaymentComponent }, // Agrega esta ruta para el componente de pago
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' },
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }