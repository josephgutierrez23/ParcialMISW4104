import {Component} from '@angular/core';
import {HeaderBannerComponent} from '../../../shared/atoms/header-banner/header-banner.component';
import {LoginFormComponent} from '../../../shared/molecules/login-form/login-form.component';
import {FooterComponent} from '../../../shared/atoms/footer/footer.component';


@Component({
  selector: 'app-login-page',
  imports: [
    HeaderBannerComponent,
    LoginFormComponent,
    FooterComponent,
  ],
  template: `
    <div class="login-page d-flex flex-column min-vh-100">
      <!-- Header -->
      <app-header-banner></app-header-banner>

      <!-- Contenido -->
      <div class="flex-grow-1 d-flex flex-column align-items-center justify-content-center">
        <h1 class="fw-bold mb-4">Inicio de sesión</h1>
        <app-login-form></app-login-form>
      </div>

      <!-- Footer -->
      <app-footer></app-footer>
    </div>
  `
})
export class LoginPageComponent {
}
