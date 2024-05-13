import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.services';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let authService: AuthService;
  let router:Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
    router= TestBed.inject(Router)
  });

  it('Debe establecer un usuario autentificado al llamar login', () => {
     const spyOnSetItem = spyOn(localStorage, 'setItem');
     const spyOnNavigate= spyOn(router, 'navigate')
    authService.login({
      email: 'user@mail.com',
      password: '12345',
    });
   
    authService.authStudent$.subscribe({
      next: (authUser) => {
        expect(authUser).toBeTruthy();
        expect(spyOnSetItem).toHaveBeenCalled();
        expect(spyOnNavigate).toHaveBeenCalled()
      },
    });
  });

  it('Debe mostrar un alert con el texto "correo o password incorrectos"', () => {
    const spyOnAlert = spyOn(window, 'alert');
    authService.login({
      email: 'fake@mail.com',
      password: 'contraseña',
    });

    expect(spyOnAlert).toHaveBeenCalledWith('correo o password incorrectos');
  });
});
