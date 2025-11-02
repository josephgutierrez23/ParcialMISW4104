import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideZonelessChangeDetection} from '@angular/core';
import {VehiclesTableComponent} from './vehicles-table.component';
import {IVehicle} from '../../../core/models/vehicles.model';

describe('VehiclesTableComponent', () => {
  let fixture: ComponentFixture<VehiclesTableComponent>;
  let component: VehiclesTableComponent;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiclesTableComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiclesTableComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('debería renderizar un <thead> con las columnas esperadas', () => {
    component.vehicles = MOCK_VEHICLES;
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;

    const tableEl = host.querySelector('table.vehicles-table');
    expect(tableEl).toBeTruthy();

    const headerCells = tableEl!.querySelectorAll('thead tr th');
    expect(headerCells.length).toBe(4);

    const headerTexts = Array.from(headerCells).map(th => th.textContent?.trim());
    expect(headerTexts).toEqual(['#', 'Marca', 'Línea', 'Modelo']);
  });

  it('debería renderizar una fila por cada vehículo recibido', () => {
    component.vehicles = MOCK_VEHICLES;
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;

    const bodyRows = host.querySelectorAll('tbody tr');
    expect(bodyRows.length).toBe(3);

    const firstRowText = bodyRows[0].textContent ?? '';
    const secondRowText = bodyRows[1].textContent ?? '';
    const thirdRowText = bodyRows[2].textContent ?? '';

    expect(firstRowText).toContain('Renault');
    expect(firstRowText).toContain('Kangoo');
    expect(firstRowText).toContain('2017');

    expect(secondRowText).toContain('Chevrolet');
    expect(secondRowText).toContain('Spark');
    expect(secondRowText).toContain('2018');

    expect(thirdRowText).toContain('Renault');
    expect(thirdRowText).toContain('Stepway');
    expect(thirdRowText).toContain('2020');
  });

  it('debería emitir el vehículo seleccionado cuando el usuario hace click en una fila', () => {
    component.vehicles = MOCK_VEHICLES;
    fixture.detectChanges();

    const host: HTMLElement = fixture.nativeElement;
    const bodyRows = host.querySelectorAll('tbody tr');

    expect(bodyRows.length).toBe(3);

    let emittedVehicle: IVehicle | undefined;
    component.vehicleSelected.subscribe(v => {
      emittedVehicle = v;
    });

    (bodyRows[1] as HTMLElement).click();

    expect(emittedVehicle).toBeDefined();
    expect(emittedVehicle?.marca).toBe('Chevrolet');
    expect(emittedVehicle?.linea).toBe('Spark');
    expect(emittedVehicle?.modelo).toBe(2018);
  });
});
