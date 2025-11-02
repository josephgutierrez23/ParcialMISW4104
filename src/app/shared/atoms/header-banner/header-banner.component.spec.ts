import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideZonelessChangeDetection} from '@angular/core';
import {HeaderBannerComponent} from './header-banner.component';

describe('HeaderBannerComponent', () => {
  let fixture: ComponentFixture<HeaderBannerComponent>;
  let component: HeaderBannerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderBannerComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderBannerComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('debería renderizar el nombre de la marca y la imagen del banner', () => {
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.nativeElement;

    const title = compiled.querySelector('h2');
    expect(title).toBeTruthy();
    expect(title?.textContent).toContain('TuSegundazo.com');

    const img = compiled.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBe('assets/img/logo.png');
    expect(img?.getAttribute('alt')).toContain('Comercialización de automotores nuevos y usados');
  });

  it('debería tener las clases de estilo principales', () => {
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.nativeElement;
    const banner = compiled.querySelector('.header-banner');
    expect(banner).toBeTruthy();
    expect(banner?.classList).toContain('border-bottom');
    expect(banner?.classList).toContain('pb-2');
  });
});
