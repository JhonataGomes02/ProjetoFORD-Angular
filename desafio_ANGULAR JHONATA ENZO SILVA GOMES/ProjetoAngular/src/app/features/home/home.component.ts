import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; // <-- Importar RouterLink

@Component({
  selector: 'app-home',
  standalone: true, // <-- Já deve estar aqui
  imports: [RouterLink], // <-- ADICIONAR (para o routerLink funcionar no HTML)
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) { }

  /**
   * Passo 5: Item de logout
   */
  logout(): void {
    // Para um logout simples, apenas redirecionamos para o login
    this.router.navigate(['/login']);
  }
}