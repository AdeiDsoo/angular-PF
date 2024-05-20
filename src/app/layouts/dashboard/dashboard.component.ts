import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.services';
import { Observable } from 'rxjs';
import { IStudent } from './pages/students/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  showFiller = false;
  showComponent = true;
  authStudent$: Observable<IStudent | null>;

  constructor(private authService: AuthService, private router: Router) {
    this.authStudent$ = this.authService.authStudent$;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['auth']);
  }

  isMobile(): boolean {
    return window.innerWidth <= 460;
  }
}
