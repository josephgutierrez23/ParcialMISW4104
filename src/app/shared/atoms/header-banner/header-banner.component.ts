import { Component } from '@angular/core';

@Component({
  selector: 'app-header-banner',
  standalone: true,
  template: `
    <div class="header-banner border-bottom pb-2 mb-4">
      <div class="container-fluid">
        <!-- Nombre de la marca -->
        <h2 class="fw-bold text-black mb-3">TuSegundazo.com</h2>

        <!-- Imagen única del banner -->
        <img
          src="assets/img/logo.png"
          alt="Comercialización de automotores nuevos y usados"
          class="img-fluid w-100"
        />
      </div>
    </div>
  `
})
export class HeaderBannerComponent {}
