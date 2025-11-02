import {Component, Input} from '@angular/core';
import {IVehicle} from '../../../core/models/vehicles.model';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-vehicles-detail',
  imports: [CommonModule],
  template: `
    <div class="vehicle-detail card border-secondary" *ngIf="vehicle">
      <div class="card-header text-center fw-semibold bg-light">
        {{ vehicle.marca }} {{ vehicle.linea }}
      </div>

      <div class="card-body bg-light">
        <div class="text-center mb-3">
          <img
            [src]="vehicle.imagen || 'assets/img/placeholder-car.png'"
            alt="{{ vehicle.marca }} {{ vehicle.linea }}"
            class="img-fluid border p-2 bg-white"
            style="max-width: 220px;"
          />
        </div>

        <ul class="list-unstyled small mb-0 text-start">
          <li>→ Kilometraje: {{ vehicle.kilometraje }}</li>
          <li>→ Color: {{ vehicle.color }}</li>
          <li>→ Referencia: {{ vehicle.referencia }}</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .vehicle-detail {
      min-width: 300px;
      max-width: 320px;
    }

    .card-header {
      font-size: 0.95rem;
      border-bottom: 1px solid #999;
    }

    .card-body {
      border: 1px solid #999;
      border-top: none;
    }
  `]
})
export class VehicleDetailComponent {
  @Input() vehicle: IVehicle = {
    id: 0,
    marca: '',
    linea: '',
    referencia: '',
    modelo: 0,
    kilometraje: 0,
    color: '',
    imagen: '',
  };

}
