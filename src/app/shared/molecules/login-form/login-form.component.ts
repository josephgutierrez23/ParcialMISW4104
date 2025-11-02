import {Component, inject} from '@angular/core';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [RouterModule],
  template: `
    <form class="login-form mx-auto" style="max-width: 400px;">
      <div class="mb-3">
        <label for="username" class="form-label fw-semibold">Nombre de usuario</label>
        <input
          type="text"
          id="username"
          class="form-control"
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label fw-semibold">Contraseña</label>
        <input
          type="password"
          id="password"
          class="form-control"
        />
      </div>

      <div class="d-flex justify-content-center gap-3">
        <button
          type="button"
          class="btn btn-primary px-4"
          (click)="goToDashboard()"
        >
          Ingresar
        </button>

        <button
          type="button"
          class="btn btn-danger px-4"
        >
          Cancelar
        </button>
      </div>

      <div class="text-danger fw-semibold mt-3 text-center">
        Error de autenticación. Revise sus credenciales
      </div>
    </form>
  `,
  styles: `
    .btn-primary {
      background-color: #0b3b91;
    }

    .btn-danger {
      background-color: #d14646;
      border: none;
    }
  `
})
export class LoginFormComponent {
  private readonly router = inject(Router);

  goToDashboard() {
    this.router.navigate(['/vehicles']);
  }
}
