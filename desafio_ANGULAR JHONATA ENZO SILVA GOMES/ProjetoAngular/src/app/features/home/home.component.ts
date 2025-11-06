import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../core/models/user.model'; // Precisamos disto
import { CommonModule } from '@angular/common'; // Precisamos disto para o *ngIf

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule // Adicione o CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit { // Implemente OnInit
  
  user: User | null = null; // Propriedade para guardar o usuário

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Ao carregar o componente, leia o localStorage
    const userString = localStorage.getItem('user');
    if (userString) {
      this.user = JSON.parse(userString);
    }
  }

  logout(): void {
    localStorage.removeItem('user'); // Limpe o localStorage
    this.router.navigate(['/login']);
  }
}