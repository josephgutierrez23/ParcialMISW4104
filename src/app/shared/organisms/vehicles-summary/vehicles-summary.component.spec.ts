import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideZonelessChangeDetection} from '@angular/core';
import {VehiclesSummaryComponent} from './vehicles-summary.component';

describe('VehiclesSummaryComponent', () => {
  let fixture: ComponentFixture<VehiclesSummaryComponent>;
  let component: VehiclesSummaryComponent;

  const MOCK_BRAND_COUNTS: Record<string, number> = {
    Renault: 2,
    Chevrolet: 3,
    Nissan: 1,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiclesSummaryComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(VehiclesSummaryComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar los totales de cada marca ordenados alfabéticamente', () => {
    component.brandCounts = MOCK_BRAND_COUNTS;

    fixture.detectChanges();

    const compiled: HTMLElement = fixture.nativeElement;

    const rows = compiled.querySelectorAll('.vehicle-summary div strong');

    expect(rows.length).toBe(3);

    const renderedText = Array.from(rows).map(el => el.textContent?.trim() ?? '');

    expect(renderedText).toEqual([
      'Total Chevrolet:',
      'Total Nissan:',
      'Total Renault:',
    ]);

    const textContent = compiled.textContent!;
    expect(textContent).toContain('Total Renault: 2');
    expect(textContent).toContain('Total Chevrolet: 3');
    expect(textContent).toContain('Total Nissan: 1');
  });

  it('debería renderizar la línea de contacto al final', () => {
    component.brandCounts = MOCK_BRAND_COUNTS;
    fixture.detectChanges();

    const compiled: HTMLElement = fixture.nativeElement;
    const contactLine = compiled.querySelector('.contact-line');

    expect(contactLine).toBeTruthy();
    expect(contactLine?.textContent).toContain('Contact us');
    expect(contactLine?.textContent).toContain('info@tusegundazo.com');
    expect(contactLine?.textContent).toContain('@tusegundazo');
  });
});
