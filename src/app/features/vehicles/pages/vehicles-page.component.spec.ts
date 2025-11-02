import {Component, Input, provideZonelessChangeDetection} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Subject} from 'rxjs';

import {VehiclesPageComponent} from './vehicles-page.component';
import {VehiclesService} from '../../../core/services/vehicles.service';
import {IVehicle} from '../../../core/models/vehicles.model';


@Component({
  selector: 'app-header-banner',
  standalone: true,
  template: `
    <div data-testid="header-banner">Header Mock</div>`
})
class MockHeaderBannerComponent {
}

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <div data-testid="footer">Footer Mock</div>`
})
class MockFooterComponent {
}

@Component({
  selector: 'app-vehicles-table',
  standalone: true,
  template: `
    <div data-testid="vehicles-table"></div>`
})
class MockVehiclesTableComponent {
  @Input() vehicles: IVehicle[] = [];
}

@Component({
  selector: 'app-vehicles-detail',
  standalone: true,
  template: `
    <div data-testid="vehicles-detail">{{ vehicle?.marca }}</div>`
})
class MockVehicleDetailComponent {
  @Input() vehicle: IVehicle | null = null;
}

@Component({
  selector: 'app-vehicles-summary',
  standalone: true,
  template: `
    <div data-testid="vehicles-summary">
      Summary brands mock
    </div>
  `
})
class MockVehiclesSummaryComponent {
  @Input() brandCounts!: Record<string, number>;
}

class MockVehiclesService {
  private vehiclesSubject = new Subject<IVehicle[]>();

  getVehicles() {
    return this.vehiclesSubject.asObservable();
  }

  emitVehicles(list: IVehicle[]) {
    this.vehiclesSubject.next(list);
  }
}

const MOCK_VEHICLES: IVehicle[] = [
  {
    id: 1,
    marca: 'Renault',
    linea: 'Kangoo',
    referencia: 'Express',
    modelo: 2017,
    kilometraje: 45000,
    color: 'Blanco',
    imagen: 'https://example.com/renault.png',
  },
  {
    id: 2,
    marca: 'Chevrolet',
    linea: 'Spark',
    referencia: 'GT',
    modelo: 2018,
    kilometraje: 32000,
    color: 'Rojo',
    imagen: 'https://example.com/chevy.png',
  },
  {
    id: 3,
    marca: 'Renault',
    linea: 'Stepway',
    referencia: 'Iconic',
    modelo: 2020,
    kilometraje: 15000,
    color: 'Azul',
    imagen: 'https://example.com/reno2.png',
  },
];

describe('VehiclesPageComponent', () => {
  let fixture: ComponentFixture<VehiclesPageComponent>;
  let component: VehiclesPageComponent;
  let vehiclesService: MockVehiclesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        VehiclesPageComponent,
        MockHeaderBannerComponent,
        MockFooterComponent,
        MockVehiclesTableComponent,
        MockVehicleDetailComponent,
        MockVehiclesSummaryComponent,
      ],
      providers: [
        provideZonelessChangeDetection(),
        {provide: VehiclesService, useClass: MockVehiclesService},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiclesPageComponent);
    component = fixture.componentInstance;
    vehiclesService = TestBed.inject(VehiclesService) as unknown as MockVehiclesService;
  });

  it('debería crearse', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('debería suscribirse a VehiclesService en ngOnInit y poblar vehicles', () => {
    component.ngOnInit();

    vehiclesService.emitVehicles(MOCK_VEHICLES);

    expect(component.vehicles()).toEqual(MOCK_VEHICLES);
    expect(component.vehicles().length).toBe(3);

    const counts = component.brandCounts();
    expect(counts['Renault']).toBe(2);
    expect(counts['Chevrolet']).toBe(1);
    expect(counts['Nissan']).toBeUndefined();
  });

  it('debería actualizar selectedVehicle al llamar onVehicleSelected', () => {
    const chosen = MOCK_VEHICLES[1]; // Chevrolet
    component.onVehicleSelected(chosen);

    expect(component.selectedVehicle()).toEqual(chosen);
    expect(component.selectedVehicle()?.marca).toBe('Chevrolet');
  });

  it('brandCounts debería recalcularse cuando cambia vehicles()', () => {
    expect(component.vehicles()).toEqual([]);
    expect(component.brandCounts()).toEqual({});

    component.vehicles.set(MOCK_VEHICLES);

    const counts = component.brandCounts();
    expect(counts['Renault']).toBe(2);
    expect(counts['Chevrolet']).toBe(1);

    const ONLY_CHEVY: IVehicle[] = [
      {
        id: 99,
        marca: 'Chevrolet',
        linea: 'Sail',
        referencia: 'LS',
        modelo: 2019,
        kilometraje: 27000,
        color: 'Gris',
        imagen: 'https://example.com/sail.png',
      },
    ];
    component.vehicles.set(ONLY_CHEVY);

    const newCounts = component.brandCounts();
    expect(newCounts['Chevrolet']).toBe(1);
    expect(newCounts['Renault']).toBeUndefined();
  });

  it('debería renderizar la vista raíz sin explotar', () => {
    fixture.detectChanges();

    const compiled: HTMLElement = fixture.nativeElement;

    const root = compiled.querySelector('.vehicles-page');
    expect(root).toBeTruthy();
  });

  it('debería renderizar una tabla con encabezado y 3 filas de datos', () => {
    component.vehicles.set(MOCK_VEHICLES);

    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;

    const tableEl = host.querySelector('table');
    expect(tableEl).toBeTruthy();

    const allRows = tableEl!.querySelectorAll('tr');

    expect(allRows.length).toBe(4);

    const dataRows = Array.from(allRows).slice(1);

    expect(dataRows.length).toBe(3);
    expect(dataRows[0].textContent).toContain('Renault');
    expect(dataRows[1].textContent).toContain('Chevrolet');
    expect(dataRows[2].textContent).toContain('Renault');

    expect(dataRows[0].textContent).toContain('2017');
    expect(dataRows[1].textContent).toContain('2018');
    expect(dataRows[2].textContent).toContain('2020');
  });
});
