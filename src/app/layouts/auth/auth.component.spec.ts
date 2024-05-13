import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../core/services/auth.services';

describe('AuthComponent', () => {
  let componet: AuthComponent;
let fitxture: ComponentFixture<AuthComponent>
let authService:AuthService

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [ SharedModule, BrowserAnimationsModule],
    }).compileComponents();

    fitxture = TestBed.createComponent(AuthComponent);
    componet = fitxture.componentInstance;
authService=TestBed.inject(AuthService)

fitxture.detectChanges()

  });

  it('El campo email debe ser requerido', ()=>{
    const control= componet.loginForm.get('email')

control?.setValue('');

expect(control?.hasError('required')).toBeTrue()
  });

  it('El campo password debe ser requerido', ()=>{
const control = componet.loginForm.get('password');

control?.setValue('');

expect(control?.hasError('required')).toBeTrue();
  })

   it('Debe llamar markAllasTouched de loginForm al llamar login, si el formulario es invalido', () => {
componet.loginForm.setValue({
    email:'',
    password:''
})

expect(componet.loginForm.invalid).toBeTrue()

const spyOnMarkAllAsTouched= spyOn(componet.loginForm, 'markAllAsTouched')

componet.login()

expect(spyOnMarkAllAsTouched).toHaveBeenCalled()


   });
it('Debe llamar a authService.login si el formulario es valido al llamar login', ()=>{
    componet.loginForm.setValue({
      email: 'user@mmail.com',
      password: '123456',
    });

    const spyOnLogin= spyOn(authService, 'login')
    componet.login()

    expect(spyOnLogin).toHaveBeenCalled()
})
});
