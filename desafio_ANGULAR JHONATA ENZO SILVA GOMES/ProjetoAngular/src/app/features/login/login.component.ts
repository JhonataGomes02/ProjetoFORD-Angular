import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api/api.service';
// IMPORTAÇÕES NECESSÁRIAS para o "card" de login
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Para o *ngIf

@Component({
  selector: 'app-login',
  standalone: true, // Define como Standalone
  imports: [
    CommonModule, // Necessário para *ngIf
    ReactiveFormsModule // Necessário para [formGroup]
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm: FormGroup; // O formulário que o HTML precisa
  loginError: string | null = null;
  isLoading: boolean = false; // Para feedback no botão

  constructor(
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder // Injeta o FormBuilder
  ) {
    // Cria o formulário que o [formGroup] espera
    this.loginForm = this.fb.group({
      nome: ['admin', Validators.required], // Valor inicial 'admin'
      senha: ['123456', Validators.required] // Valor inicial '123456'
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid || this.isLoading) {
      return;
    }

    this.isLoading = true; // Desabilita o botão
    this.loginError = null;
    const { nome, senha } = this.loginForm.value;

    this.apiService.login({ nome: nome, senha: senha }).subscribe({
      next: (user) => {
        // SALVA O USUÁRIO para a Home usar
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/home']);
        this.isLoading = false;
      },
      error: (err) => {
        this.loginError = err.error?.message || 'Falha na comunicação!';
        this.isLoading = false; // Reabilita o botão
      }
    });
  }
}