import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnDestroy, OnInit {
  authStudentChangeSuscription?: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

ngOnInit(): void {
  this.suscribeToAuthUserChange()
}


ngOnDestroy(): void {
  this.authStudentChangeSuscription?.unsubscribe()
}

  suscribeToAuthUserChange(): void {
    this.authStudentChangeSuscription = this.authService.authStudent$.subscribe(
      {
        next: (authStudent) => {
          if (authStudent !== null) {
            this.router.navigate(['dashboard', 'home']);
          }
        },
      }
    );
  }

  login() {
    this.authService.login();
  }
}
