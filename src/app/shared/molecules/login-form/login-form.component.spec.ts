import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideZonelessChangeDetection} from '@angular/core';
import {Router} from '@angular/router';
import {LoginFormComponent} from './login-form.component';

describe('LoginFormComponent', () => {
  let fixture: ComponentFixture<LoginFormComponent>;
  let component: LoginFormComponent;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginFormComponent],
      providers: [
        provideZonelessChangeDetection(),
        {provide: Router, useValue: routerSpy},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse correctamente', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('debería renderizar el formulario con campos y botones', () => {
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.nativeElement;

    const usernameInput = compiled.querySelector('input#username');
    const passwordInput = compiled.querySelector('input#password');
    expect(usernameInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();

    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toContain('Ingresar');
    expect(buttons[1].textContent).toContain('Cancelar');
  });

  it('debería navegar al dashboard al hacer clic en "Ingresar"', () => {
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.nativeElement;

    const loginButton = compiled.querySelector('button.btn-primary') as HTMLButtonElement;
    expect(loginButton).toBeTruthy();

    loginButton.click();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/vehicles']);
  });
});
