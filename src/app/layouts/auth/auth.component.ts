import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnDestroy, OnInit {
  authStudentChangeSuscription?: Subscription;

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
    // this.suscribeToAuthUserChange();
  }

  ngOnDestroy(): void {
    this.authStudentChangeSuscription?.unsubscribe();
  }

  // suscribeToAuthUserChange(): void {
  //   this.authStudentChangeSuscription = this.authService.authStudent$.subscribe(
  //     {
  //       next: (authStudent) => {
  //         if (authStudent !== null) {
  //           this.router.navigate(['dashboard', 'home']);
  //         }
  //       },
  //     }
  //   );
  // }

  login() {
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched()
    }else{
    this.authService.login(this.loginForm.getRawValue());
    }

  }
}
