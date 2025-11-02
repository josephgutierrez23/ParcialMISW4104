import {Component, Input, Output, EventEmitter} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IVehicle} from '../../../core/models/vehicles.model';

@Component({
  selector: 'app-vehicles-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <table class="table table-bordered align-middle vehicles-table">
      <thead class="table-dark">
      <tr>
        <th style="width: 40px;">#</th>
        <th>Marca</th>
        <th>Línea</th>
        <th>Modelo</th>
      </tr>
      </thead>
      <tbody>
      <tr
        *ngFor="let v of vehicles; index as i"
        (click)="select(v)"
        class="vehicles-table__row"
      >
        <td class="fw-semibold">{{ i + 1 }}</td>
        <td>{{ v.marca }}</td>
        <td>{{ v.linea }}</td>
        <td>{{ v.modelo }}</td>
      </tr>
      </tbody>
    </table>
  `,
  styles: [`
    .vehicles-table {
      width: 100%;
      border: 1px solid #ccc;
      font-size: 0.9rem;
    }

    thead tr th {
      background-color: #2f3437 !important;
      color: #fff;
      font-weight: 600;
    }

    tbody tr {
      cursor: pointer;
    }

    tbody tr + tr td {
      border-top: 1px solid #ccc;
    }

    td, th {
      vertical-align: middle;
    }
  `]
})
export class VehiclesTableComponent {
  @Input() vehicles: IVehicle[] = [];
  @Output() vehicleSelected = new EventEmitter<IVehicle>();

  select(v: IVehicle) {
    this.vehicleSelected.emit(v);
  }
}
