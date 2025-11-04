import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  // Ação 1: Rota de Login
  { path: 'login', component: LoginComponent },
  
  // Ação 2: Rota da Home
  { path: 'home', component: HomeComponent },
  
  // Ação 3: Rota do Dashboard
  { path: 'dashboard', component: DashboardComponent },
  
  // Redireciona para o login se a rota estiver vazia
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' } // Rota coringa
];