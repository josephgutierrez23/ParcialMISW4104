import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {VehiclesService} from './vehicles.service';
import {IVehicle} from '../models/vehicles.model';
import {provideZonelessChangeDetection} from '@angular/core';

describe('VehiclesService', () => {
  let service: VehiclesService;
  let httpMock: HttpTestingController;

  const mockVehicles: IVehicle[] = [
    {
      id: 1,
      marca: 'Renault',
      linea: 'Kangoo',
      referencia: 'Expres',
      modelo: 2017,
      kilometraje: 45000,
      color: 'Blanco',
      imagen: 'https://example.com/car1.png',
    },
    {
      id: 2,
      marca: 'Chevrolet',
      linea: 'Spark',
      referencia: 'GT',
      modelo: 2018,
      kilometraje: 32000,
      color: 'Rojo',
      imagen: 'https://example.com/car2.png',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        VehiclesService,
        provideZonelessChangeDetection()
      ],
    }).compileComponents();


  });

  beforeEach(() => {
    service = TestBed.inject(VehiclesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener la lista de vehículos', () => {
    service.getVehicles().subscribe((vehicles) => {
      expect(vehicles.length).toBe(2);
      expect(vehicles).toEqual(mockVehicles);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockVehicles);
  });
});
