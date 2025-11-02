import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-vehicles-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vehicle-summary text-start small">
      <ng-container *ngFor="let item of brandCountArray">
        <div>
          <strong>Total {{ item.marca }}:</strong> {{ item.count }}
        </div>
      </ng-container>

      <div class="contact-line mt-3">
        <small>
          Contact us: +57 3102105253 -
          info@tusegundazo.com -
          @tusegundazo
        </small>
      </div>
    </div>
  `,
  styles: [`
    .vehicle-summary {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #333;
      line-height: 1.4;
    }

    .contact-line {
      border-top: 1px solid #ccc;
      padding-top: .75rem;
      color: #555;
    }

    strong {
      font-weight: 600;
    }
  `]
})
export class VehiclesSummaryComponent {

  // Recibe { Renault: 2, Chevrolet: 3, Nissan: 1 }
  @Input({required: true}) brandCounts!: Record<string, number>;

  // Lo volvemos array ordenado para iterar de forma estable
  get brandCountArray() {
    // opcional: ordenar marcas por nombre ASC
    return Object.entries(this.brandCounts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([marca, count]) => ({marca, count}));
  }
}
