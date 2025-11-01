import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VehiclesService} from '../../../core/services/vehicles.service';
import {IVehicle} from '../../../core/models/vehicles.model';

import {HeaderBannerComponent} from '../../../shared/atoms/header-banner/header-banner.component';
import {FooterComponent} from '../../../shared/atoms/footer/footer.component';
import {VehiclesTableComponent} from '../../../shared/organisms/vehicles-table/vehicles-table.component';
import {VehicleDetailComponent} from '../../../shared/organisms/vehicle-detail/vehicle-detail.component';

@Component({
  selector: 'app-vehicles-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderBannerComponent,
    FooterComponent,
    VehiclesTableComponent,
    VehicleDetailComponent,
  ],
  template: `
    <div class="vehicles-page container-fluid py-3">

      <app-header-banner></app-header-banner>

      <div class="row mt-4">
        <div class="col-lg-8 mb-4">
          <app-vehicles-table
            [vehicles]="vehicles()"
            (vehicleSelected)="onVehicleSelected($event)"
          ></app-vehicles-table>
        </div>

        <div class="col-lg-4">
          @if (selectedVehicle()) {
            <app-vehicles-detail [vehicle]="selectedVehicle()"></app-vehicles-detail>
          }
        </div>
      </div>

      <div class="mt-5">
        <app-footer></app-footer>
      </div>
    </div>
  `,
  styles: [`
    .vehicles-page {
      background-color: #f5f5f5;
      min-height: 100vh;
    }

    .row.mt-4 {
      border-top: 2px solid #ccc;
      padding-top: 1rem;
    }
  `]
})
export class VehiclesPageComponent implements OnInit {

  private readonly vehiclesService = inject(VehiclesService);

  vehicles = signal<IVehicle[]>([]);
  selectedVehicle = signal<any | null>(null);

  ngOnInit() {
    this.vehiclesService.getVehicles().subscribe({
      next: (data) => {
        this.vehicles.set(data);
      },
      error: (err) => {
        console.error('Error cargando vehículos', err);
      }
    });
  }

  onVehicleSelected(v: IVehicle) {
    this.selectedVehicle.set(this.enrichVehicle(v));
  }

  enrichVehicle(v: IVehicle) {
    return {
      ...v,
    };
  }
}
