import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.services';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
const isAuth=authService.verifyToken()

return isAuth || router.createUrlTree(['auth']);

  // return authService.authStudent$.pipe(
  //   map((authStudent) => {
  //     if (!authStudent) {
  //       return router.createUrlTree(['auth']);
  //     }
  //     return true;
  //   })
  // );
};

// return router.createUrlTree(['auth'])
// return true;
