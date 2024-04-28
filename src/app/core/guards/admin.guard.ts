import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.services';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.authStudent$.pipe(
    map((authStudent) =>
      authStudent?.role !== 'ADMIN'
        ? router.createUrlTree(['dashboard', 'home'])
        : true
    )
  );
};
