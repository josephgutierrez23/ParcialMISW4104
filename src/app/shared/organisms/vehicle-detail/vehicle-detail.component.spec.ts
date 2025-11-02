import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideZonelessChangeDetection} from '@angular/core';
import {VehicleDetailComponent} from './vehicle-detail.component';
import {IVehicle} from '../../../core/models/vehicles.model';

describe('VehicleDetailComponent', () => {
  let fixture: ComponentFixture<VehicleDetailComponent>;
  let component: VehicleDetailComponent;

  const MOCK_VEHICLE: IVehicle = {
    id: 1,
    marca: 'Renault',
    linea: 'Kangoo',
    referencia: 'Express',
    modelo: 2017,
    kilometraje: 45000,
    color: 'Blanco',
    imagen: 'https://example.com/renault.png',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleDetailComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleDetailComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('debería renderizar los detalles del vehículo cuando se pasa un @Input', () => {
    component.vehicle = MOCK_VEHICLE;
    fixture.detectChanges();

    const compiled: HTMLElement = fixture.nativeElement;

    const card = compiled.querySelector('.vehicle-detail');
    expect(card).toBeTruthy();

    const header = compiled.querySelector('.card-header');
    expect(header?.textContent).toContain('Renault');
    expect(header?.textContent).toContain('Kangoo');

    const img = compiled.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBe(MOCK_VEHICLE.imagen);
    expect(img?.getAttribute('alt')).toContain('Renault Kangoo');

    const list = compiled.querySelectorAll('ul li');
    expect(list.length).toBe(3);
    expect(list[0].textContent).toContain('Kilometraje');
    expect(list[0].textContent).toContain('45000');
    expect(list[1].textContent).toContain('Color');
    expect(list[1].textContent).toContain('Blanco');
    expect(list[2].textContent).toContain('Referencia');
    expect(list[2].textContent).toContain('Express');
  });

  it('no debería renderizar nada si no hay vehicle', () => {
    component.vehicle = undefined as any;
    fixture.detectChanges();

    const compiled: HTMLElement = fixture.nativeElement;
    const card = compiled.querySelector('.vehicle-detail');

    expect(card).toBeNull();
  });
});
