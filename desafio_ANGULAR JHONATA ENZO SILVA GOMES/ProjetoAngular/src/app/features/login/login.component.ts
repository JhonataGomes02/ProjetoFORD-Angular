import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms'; // <-- Importar FormGroup
import { Router } from '@angular/router';
import { ApiService } from '../../core/api/api.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [
    CommonModule, 
    ReactiveFormsModule 
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Passo 1: Apenas declare o formulário aqui
  loginForm: FormGroup; 

  loginError: string | null = null;

  constructor(
    private fb: FormBuilder, // O fb é criado aqui
    private apiService: ApiService,
    private router: Router
  ) {
    // Passo 2: Inicialize o formulário AQUI DENTRO
    this.loginForm = this.fb.group({
      nome: ['admin', Validators.required], // Pré-preenchido
      senha: ['123456', Validators.required] // Pré-preenchido
    });
  }

  /**
   * Passo 2 e 3: Botão de confirmação e autenticação
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginError = null;
      const { nome, senha } = this.loginForm.value;

      this.apiService.login({ nome: nome!, senha: senha! }).subscribe({
        next: (user) => {
          // Sucesso! Navega para a home
          this.router.navigate(['/home']);
        },
        error: (err) => {
          // Mostra erro (do api.js)
          this.loginError = err.error?.message || 'Erro desconhecido no login.';
        }
      });
    }
  }
}