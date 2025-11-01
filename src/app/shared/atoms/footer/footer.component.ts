import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer class="text-center text-muted small mt-5 py-3 border-top">
      Contact us: +57 3102105253 -
      <a href="mailto:info@tusegundazo.com" class="text-muted text-decoration-none">
        info&#64;tusegundazo.com
      </a>
      - &#64;tusegundazo
    </footer>
  `
})
export class FooterComponent {
}
