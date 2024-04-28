import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IStudent } from '../../layouts/dashboard/pages/students/models';
import { LoginData } from '../../layouts/auth/models';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private MOCK_AUTH_STUDENT: IStudent = {
    id: 1,
    createdAt: new Date(),
    email: 'student1@mail.com',
    firstName: 'student1',
    lastName: 'test',
    role: 'ADMIN',
  };
  private _authStudent$ = new BehaviorSubject<IStudent | null>(null);

  public authStudent$ = this._authStudent$.asObservable();
constructor(private router: Router){

}
  login(data: LoginData): void {
    if (data.email !== 'user@mail.com' || data.password !== '12345') {
      alert('correo o password incorrectos');
    } else {
      this._authStudent$.next(this.MOCK_AUTH_STUDENT);
      localStorage.setItem('accessToken', 'jhfhmfc6r764xd4ewzedrj6');
    }
    this.router.navigate(['dashboard', 'home'])
  }

  verifyToken(): boolean {
    const token = localStorage.getItem('accessToken');
    if (token) {
      this._authStudent$.next(this.MOCK_AUTH_STUDENT);
      return true;
    } else {
      return false;
    }
  }
  logout(): void {
    this._authStudent$.next(null);
    localStorage.removeItem('accessToken');
  }
}
