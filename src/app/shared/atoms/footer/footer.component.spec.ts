import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideZonelessChangeDetection} from '@angular/core';
import {FooterComponent} from './footer.component';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;
  let component: FooterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('debería mostrar la información de contacto en el footer', () => {
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.nativeElement;
    const footer = compiled.querySelector('footer');

    expect(footer).toBeTruthy();
    expect(footer?.textContent).toContain('Contact us');
    expect(footer?.textContent).toContain('+57 3102105253');
    expect(footer?.textContent).toContain('@tusegundazo');

    const mailLink = footer?.querySelector('a[href^="mailto:"]');
    expect(mailLink).toBeTruthy();
    expect(mailLink?.textContent).toContain('info@tusegundazo.com');
  });
});
