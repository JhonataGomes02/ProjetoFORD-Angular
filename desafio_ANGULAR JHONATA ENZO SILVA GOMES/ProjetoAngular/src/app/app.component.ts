import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // <-- IMPORTAR

@Component({
  selector: 'app-root',
  standalone: true, // <-- ADICIONAR
  imports: [RouterOutlet], // <-- ADICIONAR
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ford-dashboard';
}