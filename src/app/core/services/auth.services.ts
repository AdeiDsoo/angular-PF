import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IStudent } from '../../layouts/dashboard/pages/students/models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authStudent$ = new BehaviorSubject<IStudent | null>(null);

  public authStudent$ = this._authStudent$.asObservable();

  login(): void {
    this._authStudent$.next({
      id: 1,
      createdAt: new Date(),
      email: 'student1@mail.com',
      firstName: 'student1',
      lastName: 'test',
      role: 'ADMIN',
    });
  }
  logout(): void {
    this._authStudent$.next(null);
  }
}
