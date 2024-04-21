import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.services';
import { Observable } from 'rxjs';
import { IStudent } from './pages/students/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  showFiller = false;
  showComponent = true;
  authStudent$: Observable<IStudent | null>;

  constructor(private authService: AuthService) {
    this.authStudent$ = this.authService.authStudent$;
  }

  login(): void {
    this.authService.login();
  }

  logout():void{
  this.authService.logout()
  }

  isMobile(): boolean {
    return window.innerWidth <= 460;
  }
}
